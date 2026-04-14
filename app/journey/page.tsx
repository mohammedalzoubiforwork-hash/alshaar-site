import { JourneyPageClient } from "@/components/pages/public-site-pages";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { journeyCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(journeyCopy.title, journeyCopy.description);
}

export default async function JourneyPage() {
  const content = await getPublicSiteContent();

  return <JourneyPageClient initialContent={content} />;
}
