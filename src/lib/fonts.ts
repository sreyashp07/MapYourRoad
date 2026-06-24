import localFont from "next/font/local";

// Display face — big, bold, arcade headlines (replaces OldschoolGrotesk).
export const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
});

// Body / UI face — clean geometric grotesk (replaces Aeonik).
export const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});
