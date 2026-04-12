import type { Metadata } from "next";
import { Aref_Ruqaa, IBM_Plex_Sans_Arabic } from "next/font/google";
import { getSiteContent } from "@/lib/site-content";
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

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: content.site.pageTitle,
    description: content.site.pageDescription,
  };
}

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
