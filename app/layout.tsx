import type { Metadata } from "next";
import { Aref_Ruqaa, IBM_Plex_Sans_Arabic } from "next/font/google";
import { siteIdentity } from "@/lib/site-config";
import "./globals.css";

const displayFont = Aref_Ruqaa({
  variable: "--font-display",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const bodyFont = IBM_Plex_Sans_Arabic({
  variable: "--font-body",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: siteIdentity.pageTitle,
  description: siteIdentity.pageDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
