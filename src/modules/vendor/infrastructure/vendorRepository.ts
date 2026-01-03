import { Vendor } from "../domain/vendor.js";

class VendorRepository {
  private store = new Map<string, Vendor>();

  async save(vendor: Vendor): Promise<void> {
    this.store.set(vendor.id, vendor);
  }

  async getById(id: string): Promise<Vendor> {
    const vendor = this.store.get(id);
    if (!vendor) {
      throw new Error("Vendor not found");
    }
    return vendor;
  }
}

export const vendorRepository = new VendorRepository();
