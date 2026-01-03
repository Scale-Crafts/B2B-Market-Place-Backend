import dotenv from "dotenv";

dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: required("NODE_ENV"),
  port: Number(process.env.PORT || 3000),

  databaseUrl: required("DATABASE_URL"),
  redisUrl: required("REDIS_URL"),

  jwt: {
    accessSecret: required("JWT_ACCESS_SECRET"),
    refreshSecret: required("JWT_REFRESH_SECRET"),
    sessionSecret: required("SESSION_SECRET"),
    publicApiSecret: required("PUBLIC_API_SECRET"),
  },
};
