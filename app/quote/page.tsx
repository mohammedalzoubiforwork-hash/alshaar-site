import { QuotePageClient } from "@/components/pages/public-site-pages";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { quoteCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(quoteCopy.title, quoteCopy.description);
}

export default async function QuotePage() {
  const content = await getPublicSiteContent();

  return <QuotePageClient initialContent={content} />;
}
