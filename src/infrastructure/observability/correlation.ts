import { ulid } from "ulid";

export const generateCorrelationId = (): string => {
  return ulid();
};
