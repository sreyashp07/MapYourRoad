import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const p = nextUrl.pathname;
      const isProtected =
        p.startsWith("/dashboard") || p.startsWith("/builder");
      if (isProtected) return isLoggedIn;
      return true;
    },
  },
} satisfies NextAuthConfig;
