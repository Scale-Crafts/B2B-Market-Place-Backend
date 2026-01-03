import { VendorProps, VendorStatus } from "./vendorTypes";
import { VendorAlreadyApprovedError, VendorNotPendingError } from "./vendorErrors";

export class Vendor {
  private props: VendorProps;

  private constructor(props: VendorProps) {
    this.props = props;
  }

  static create(id: string, name: string): Vendor {
    return new Vendor({
      id,
      name,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
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
