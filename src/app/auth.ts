//src/app/auth.ts

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "@/lib/prisma";

// Create a Prisma adapter for Lucia authentication
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// Configure Lucia authentication
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: true, // Enable automatic expiration
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  // Extract user attributes from database user
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      displayName: databaseUserAttributes.displayName,
    };
  },
});

// Extend Lucia module for type safety
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

// Define the structure of database user attributes
interface DatabaseUserAttributes {
  id: string;
  username: string;
  displayName: string;
}

// Cached function to validate user request
export const validateRequest = cache(
  async () => {
    // Retrieve session ID from cookies
    const sessionId =
      (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

    // If no session ID, return null user and session
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    // Validate the session
    const result = await lucia.validateSession(sessionId);

    try {
      // Handle fresh session and set expiration
      if (result.session && result.session.fresh) {
        const expiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          {
            ...sessionCookie.attributes,
            expires: expiresAt,
          }
        );
      }

      // Handle invalid session
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}

    return result;
  }
);
