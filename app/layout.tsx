import type { Metadata } from "next";
import { Amiri, Noto_Naskh_Arabic } from "next/font/google";
import { SiteEffectsProvider } from "@/components/site/site-effects-provider";
import { siteIdentity } from "@/lib/site-config";
import "./globals.css";

const bodyFont = Noto_Naskh_Arabic({
  variable: "--font-body",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  fallback: ["serif"],
});

const displayFont = Amiri({
  variable: "--font-heading",
  subsets: ["arabic"],
  weight: ["400", "700"],
  fallback: ["serif"],
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
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteEffectsProvider>{children}</SiteEffectsProvider>
      </body>
    </html>
  );
}
