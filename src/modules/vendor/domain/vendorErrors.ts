export class VendorAlreadyApprovedError extends Error {
    constructor() {
      super("Vendor is already approved");
    }
  }
  
  export class VendorNotPendingError extends Error {
    constructor() {
      super("Vendor must be in PENDING state");
    }
  }
  