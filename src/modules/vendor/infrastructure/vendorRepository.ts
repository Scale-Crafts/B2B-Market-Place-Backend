import { Vendor } from "../domain/vendor";
import { prisma } from "../../../infrastructure/persistence/prisma/client";

class VendorRepository {
  async save(vendor: Vendor): Promise<void> {
    const v = vendor.snapshot;

    await prisma.vendor.upsert({
      where: { id: v.id },
      create: {
        id: v.id,
        name: v.name,
        status: v.status,
        createdAt: new Date(v.createdAt),
        approvedAt: v.approvedAt ? new Date(v.approvedAt) : null,
      },
      update: {
        name: v.name,
        status: v.status,
        approvedAt: v.approvedAt ? new Date(v.approvedAt) : null,
      },
    });
  }

  async getById(id: string): Promise<Vendor> {
    const row = await prisma.vendor.findUnique({ where: { id } });

    if (!row) {
      throw new Error("Vendor not found");
    }

    return Vendor.rehydrate({
      id: row.id,
      name: row.name,
      status: row.status as any,
      createdAt: row.createdAt.toISOString(),
      approvedAt: row.approvedAt?.toISOString(),
    });
  }
}

export const vendorRepository = new VendorRepository();
