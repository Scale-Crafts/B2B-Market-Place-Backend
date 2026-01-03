import { vendorRepository } from "../infrastructure/vendorRepository.js";
import { createEvent } from "../../../infrastructure/events/createEvent.js";
import { eventBus } from "../../../infrastructure/events/eventBus.js";
import { EventTypes } from "../../../infrastructure/events/eventTypes.js";

interface ApproveVendorInput {
  vendorId: string;
  correlationId: string;
}

export const approveVendor = async (input: ApproveVendorInput) => {
  const vendor = await vendorRepository.getById(input.vendorId);

  vendor.approve();

  await vendorRepository.save(vendor);

  const event = createEvent({
    type: EventTypes.VendorApproved,
    aggregateId: vendor.id,
    aggregateType: "vendor",
    payload: vendor.snapshot,
    correlationId: input.correlationId,
  });

  await eventBus.publish(event);

  return vendor.snapshot;
};
