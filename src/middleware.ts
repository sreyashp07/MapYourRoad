import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Edge-safe: only the provider-free config runs here.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/dashboard/:path*"],
};
