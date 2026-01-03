import { Vendor } from "../domain/vendor.js";
import { vendorRepository } from "../infrastructure/vendorRepository.js";
import { createEvent } from "../../../infrastructure/events/createEvent.js";
import { eventBus } from "../../../infrastructure/events/eventBus.js";
import { EventTypes } from "../../../infrastructure/events/eventTypes.js";
import { ulid } from "ulid";
import { AggregateTypes } from "../../../infrastructure/events/aggregateTypes.js";

interface CreateVendorInput {
  name: string;
  correlationId: string;
}

export const createVendor = async (input: CreateVendorInput) => {
  const vendor = Vendor.create(ulid(), input.name);

  await vendorRepository.save(vendor);

  const event = createEvent({
    type: EventTypes.VendorCreated,
    aggregateId: vendor.id,
    aggregateType: AggregateTypes.Vendor,
    payload: vendor.snapshot,
    correlationId: input.correlationId,
  });

  await eventBus.publish(event);

  return vendor.snapshot;
};
