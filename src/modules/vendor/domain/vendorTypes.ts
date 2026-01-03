export type VendorStatus =
  | "PENDING"
  | "APPROVED"
  | "SUSPENDED";

export interface VendorProps {
  id: string;
  name: string;
  status: VendorStatus;
  createdAt: string;
  approvedAt?: string;
}
