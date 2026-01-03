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

export class VendorAlreadyRejectedError extends Error {
  constructor() {
    super("Vendor is already rejected");
  }
}

export class VendorAlreadySuspendedError extends Error {
  constructor() {
    super("Vendor is already suspended");
  }
}
