import { VendorProps, VendorStatus } from "./vendorTypes";
import {
  VendorAlreadyApprovedError,
  VendorAlreadyRejectedError,
  VendorAlreadySuspendedError,
  VendorNotPendingError,
} from "./vendorErrors";

export class Vendor {
  private props: VendorProps;

  private constructor(props: VendorProps) {
    this.props = props;
  }

  // For NEW vendors (business intent)
  static create(id: string, name: string): Vendor {
    return new Vendor({
      id,
      name,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
  }

  // For EXISTING vendors (persistence → domain)
  static rehydrate(props: VendorProps): Vendor {
    return new Vendor(props);
  }

  approve(): void {
    if (this.props.status === "APPROVED") {
      throw new VendorAlreadyApprovedError();
    }

    if (this.props.status !== "PENDING") {
      throw new VendorNotPendingError();
    }

    this.props.status = "APPROVED";
    this.props.approvedAt = new Date().toISOString();
  }

  reject(): void {
    if (this.props.status === "REJECTED") {
      throw new VendorAlreadyRejectedError();
    }

    this.props.status = "REJECTED";
  }

  suspend(): void {
    if (this.props.status === "SUSPENDED") {
      throw new VendorAlreadySuspendedError();
    }

    this.props.status = "SUSPENDED";
  }

  get snapshot(): VendorProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get status(): VendorStatus {
    return this.props.status;
  }
}
