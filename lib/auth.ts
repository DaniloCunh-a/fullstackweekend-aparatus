import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const trustedOrigins = ["http://localhost:3000", "http://192.168.0.130:3000"];

if (process.env.PUBLIC_URL) {
  trustedOrigins.push(process.env.PUBLIC_URL);
}

export const auth = betterAuth({
  trustedOrigins,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      sameSite: "lax",
      path: "/",
    },
  },
});
