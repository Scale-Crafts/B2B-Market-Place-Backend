import { vendorRepository } from "../../vendor/infrastructure/vendorRepository";
import { prisma } from "../../../infrastructure/persistence/prisma/client";
import { eventBus } from "../../../infrastructure/events/eventBus";
import { createEvent } from "../../../infrastructure/events/createEvent";
import { EventTypes } from "../../../infrastructure/events/eventTypes";
import { AggregateTypes } from "../../../infrastructure/events/aggregateTypes";
import { ulid } from "ulid";

export async function adminRejectVendor(params: {
  vendorId: string;
  correlationId: string;
}) {
  const { vendorId, correlationId } = params;

  const vendor = await vendorRepository.getById(vendorId);

  vendor.reject();
  await vendorRepository.save(vendor);

  await prisma.$transaction([
    prisma.approvalDecision.create({
      data: {
        id: ulid(),
        entityType: "vendor",
        entityId: vendorId,
        decision: "REJECTED",
        decidedAt: new Date(),
      },
    }),

    prisma.auditLog.create({
      data: {
        id: ulid(),
        action: "VENDOR_REJECTED",
        entity: "vendor",
        entityId: vendorId,
        createdAt: new Date(),
      },
    }),
  ]);

  eventBus.publish(
    createEvent({
      type: EventTypes.VendorRejected,
      aggregateType: AggregateTypes.Vendor,
      aggregateId: vendorId,
      payload: { status: "REJECTED" },
      correlationId,
    })
  );
}
