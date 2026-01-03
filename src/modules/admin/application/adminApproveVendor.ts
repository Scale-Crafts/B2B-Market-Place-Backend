import { vendorRepository } from "../../vendor/infrastructure/vendorRepository";
import { prisma } from "../../../infrastructure/persistence/prisma/client";
import { eventBus } from "../../../infrastructure/events/eventBus";
import { createEvent } from "../../../infrastructure/events/createEvent";
import { EventTypes } from "../../../infrastructure/events/eventTypes";
import { AggregateTypes } from "../../../infrastructure/events/aggregateTypes";
import { ulid } from "ulid";

export async function adminApproveVendor(params: {
  vendorId: string;
  correlationId: string;
  actorId?: string;
}) {
  const { vendorId, correlationId, actorId } = params;

  const vendor = await vendorRepository.getById(vendorId);

  vendor.approve();
  await vendorRepository.save(vendor);

  await prisma.$transaction([
    prisma.approvalDecision.create({
      data: {
        id: ulid(),
        entityType: "vendor",
        entityId: vendorId,
        decision: "APPROVED",
        decidedAt: new Date(),
      },
    }),

    prisma.auditLog.create({
      data: {
        id: ulid(),
        action: "VENDOR_APPROVED",
        entity: "vendor",
        entityId: vendorId,
        createdAt: new Date(),
      },
    }),
  ]);

  eventBus.publish(
    createEvent({
      type: EventTypes.VendorApproved,
      aggregateType: AggregateTypes.Vendor,
      aggregateId: vendorId,
      payload: { status: "APPROVED" },
      correlationId,
      actorId,
    })
  );
}
