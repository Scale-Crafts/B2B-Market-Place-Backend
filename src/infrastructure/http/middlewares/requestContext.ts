import { Request, Response, NextFunction } from "express";
import pinoHttp from "pino-http";
import { logger } from "../../observability/logger.js";
import { generateCorrelationId } from "../../observability/correlation.js";

const IGNORE_PATHS = new Set([
  "/health",
]);

const httpLogger = pinoHttp({
  logger,

  genReqId: (req) => {
    const existing = req.headers["x-correlation-id"];
    return typeof existing === "string"
      ? existing
      : generateCorrelationId();
  },

  autoLogging: {
    ignore: (req) => IGNORE_PATHS.has(req.url ?? ""),
  },

  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

export const requestContext = [
  httpLogger,
  (req: Request, _res: Response, next: NextFunction) => {
    req.headers["x-correlation-id"] = req.id as string;
    next();
  },
];
