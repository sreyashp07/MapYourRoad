import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { clashDisplay, satoshi } from "@/lib/fonts";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Preloader } from "@/components/preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${clashDisplay.variable} bg-cream text-ink antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Preloader />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
