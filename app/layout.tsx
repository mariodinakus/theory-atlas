import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "THEORY ATLAS — The Everything Lab",
  description: "A bilingual, interactive quantum gravity and theory of everything research playground. Real equations, transparent assumptions, scientific sources.",
  applicationName: "Theory Atlas",
  manifest: "/manifest.webmanifest",
  icons: {icon:"/icon.svg"},
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#16151d" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="el"><body>{children}</body></html>;
}
