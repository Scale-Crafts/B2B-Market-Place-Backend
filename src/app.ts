import express from "express";
import { requestContext } from "./infrastructure/http/middlewares/requestContext";
import { eventBus } from "./infrastructure/events/eventBus";
import { createEvent } from "./infrastructure/events/createEvent";
import { EventTypes } from "./infrastructure/events/eventTypes";
import "./modules/audit/testAuditListener";
import { createVendor, approveVendor } from "./modules/vendor/index";
import { adminApproveVendor } from "./modules/admin/application/approveVendor";

export const createApp = () => {
  const app = express();

  app.use(...requestContext);
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.post("/__test/event", async (req, res) => {
    const event = createEvent({
      type: EventTypes.VendorCreated,
      aggregateId: "vendor-123",
      aggregateType: "vendor",
      payload: { name: "Test Vendor" },
      correlationId: req.headers["x-correlation-id"] as string,
    });

    await eventBus.publish(event);

    res.status(200).json({ published: true });
  });

  app.post("/__test/vendor", async (req, res) => {
    const vendor = await createVendor({
      name: "Acme Corp",
      correlationId: req.headers["x-correlation-id"] as string,
    });
  
    res.status(201).json(vendor);
  });
  
  app.post("/__test/vendor/:id/approve", async (req, res) => {
    const vendor = await approveVendor({
      vendorId: req.params.id,
      correlationId: req.headers["x-correlation-id"] as string,
    });
  
    res.status(200).json(vendor);
  });

  app.post("/__admin/vendor/:id/approve", async (req, res) => {
    await adminApproveVendor({
      vendorId: req.params.id,
      correlationId: req.headers["x-correlation-id"] as string,
    });
    res.status(200).json({ status: "approved" });
  });

  return app;
};
