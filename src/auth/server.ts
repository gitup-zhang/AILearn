import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { db } from "../db";
import * as schema from "../db/schema";

const trustedOrigins = Array.from(new Set([
  "http://localhost:3000",
  "http://localhost:3001",
  "http://101.133.166.67:3000",
  "http://101.133.166.67",
  "http://101.133.166.67:80",
  process.env.APP_URL?.trim() || "",
  ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  // Legacy domains remain trusted so older deployments keep working after the rebrand.
  "http://opensynapse.top",
  "http://www.opensynapse.top",
  "https://opensynapse.top",
  "https://www.opensynapse.top",
].filter((origin): origin is string => Boolean(origin))));

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: schema,
  }),

  plugins: [bearer()],

  trustedOrigins,

  // 配置代理信任，解决 "could not determine client IP address" 警告
  trustedProxies: [
    "127.0.0.1",
    "::1",
    "101.133.166.67"
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

export type Auth = typeof auth;
