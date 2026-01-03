import { eventBus } from "../../infrastructure/events/eventBus.js";
import { EventTypes } from "../../infrastructure/events/eventTypes.js";
import { DomainEvent } from "../../infrastructure/events/domainEvent.js";
import { logger } from "../../infrastructure/observability/logger.js";

eventBus.subscribe(EventTypes.VendorCreated, async (event: DomainEvent) => {
  logger.info(
    {
      eventType: event.type,
      aggregateId: event.aggregateId,
      payload: event.payload,
    },
    "Audit: Vendor created"
  );
});
