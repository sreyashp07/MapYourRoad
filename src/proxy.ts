import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Next.js 16 renamed "middleware" to "proxy". Edge-safe: only the
// provider-free config runs here; it just verifies the JWT.
export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  matcher: ["/dashboard/:path*"],
};
