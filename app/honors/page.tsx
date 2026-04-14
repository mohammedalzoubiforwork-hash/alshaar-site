import { HonorsPageClient } from "@/components/pages/public-site-pages";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { honorsCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(honorsCopy.title, honorsCopy.description);
}

export default async function HonorsPage() {
  const content = await getPublicSiteContent();

  return <HonorsPageClient initialContent={content} />;
}
