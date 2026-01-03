export const AggregateTypes = {
  Vendor: "vendor",
  Product: "product",
  Order: "order",
  Inventory: "inventory",
  Enquiry: "enquiry",
} as const;

export type AggregateType =
  (typeof AggregateTypes)[keyof typeof AggregateTypes];
