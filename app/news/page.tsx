import { NewsPageClient } from "@/components/pages/public-site-pages";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { newsCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(newsCopy.title, newsCopy.description);
}

export default async function NewsPage() {
  const content = await getPublicSiteContent();

  return <NewsPageClient initialContent={content} />;
}
