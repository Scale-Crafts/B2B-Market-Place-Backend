import { DomainEvent } from "./domainEvent.js";
import { logger } from "../observability/logger.js";

type EventHandler<T = DomainEvent> = (event: T) => Promise<void>;

class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  subscribe(eventType: string, handler: EventHandler) {
    const existing = this.handlers.get(eventType) || [];
    this.handlers.set(eventType, [...existing, handler]);
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.type) || [];

    logger.debug(
      {
        eventType: event.type,
        aggregateId: event.aggregateId,
        correlationId: event.metadata.correlationId,
      },
      "Publishing domain event"
    );

    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (error) {
        logger.error(
          {
            err: error,
            eventType: event.type,
            eventId: event.id,
          },
          "Domain event handler failed"
        );
        // Failure strategy comes later (retry, DLQ, etc.)
      }
    }
  }
}

export const eventBus = new EventBus();
