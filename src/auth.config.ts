import type { NextAuthConfig } from "next-auth";

export default {
  // Providers live in auth.ts (Node runtime) — the Credentials
  // authorize() uses Mongoose + bcrypt, which can't run on the edge.
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard");
      if (isProtected) return isLoggedIn;
      return true;
    },
  },
} satisfies NextAuthConfig;
