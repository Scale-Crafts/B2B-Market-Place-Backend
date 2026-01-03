export const EventTypes = {
    VendorCreated: "vendor.created",
    VendorApproved: "vendor.approved",
    VendorRejected: "vendor.rejected",
    VendorSuspended: "vendor.suspended",
  
    ProductSubmitted: "product.submitted",
    ProductApproved: "product.approved",
  
    OrderPlaced: "order.placed",
    OrderStatusUpdated: "order.status.updated",
  
    InventoryReserved: "inventory.reserved",
    InventoryAdjusted: "inventory.adjusted",
  } as const;
  
  export type EventType = typeof EventTypes[keyof typeof EventTypes];
    