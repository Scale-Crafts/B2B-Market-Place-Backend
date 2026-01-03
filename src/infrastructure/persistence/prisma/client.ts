import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // <-- THIS FIXES THE ERROR
  },
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "error", "warn"],
});
