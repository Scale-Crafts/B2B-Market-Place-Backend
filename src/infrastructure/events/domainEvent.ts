export interface DomainEvent<TPayload = unknown> {
    id: string;
    type: string;
    occurredAt: string;
    aggregateId: string;
    aggregateType: string;
    payload: TPayload;
    metadata: {
      correlationId: string;
      actorId?: string;
      idempotencyKey?: string;
    };
  }
  