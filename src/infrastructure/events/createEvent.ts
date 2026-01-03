import { DomainEvent } from "./domainEvent.js";
import { ulid } from "ulid";

interface CreateEventParams<TPayload> {
  type: string;
  aggregateId: string;
  aggregateType: string;
  payload: TPayload;
  correlationId: string;
  actorId?: string;
}

export const createEvent = <TPayload>(
  params: CreateEventParams<TPayload>
): DomainEvent<TPayload> => {
  return {
    id: ulid(),
    type: params.type,
    occurredAt: new Date().toISOString(),
    aggregateId: params.aggregateId,
    aggregateType: params.aggregateType,
    payload: params.payload,
    metadata: {
      correlationId: params.correlationId,
      actorId: params.actorId,
    },
  };
};
