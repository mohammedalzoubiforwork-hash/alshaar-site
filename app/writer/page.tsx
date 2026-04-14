import { WriterPageClient } from "@/components/pages/public-site-pages";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { writerCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(writerCopy.title, writerCopy.description);
}

export default async function WriterPage() {
  const content = await getPublicSiteContent();

  return <WriterPageClient initialContent={content} />;
}
