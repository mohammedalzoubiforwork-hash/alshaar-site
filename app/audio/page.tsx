import { AudioPageClient } from "@/components/pages/public-site-pages";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { audioCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(audioCopy.title, audioCopy.description);
}

export default async function AudioPage() {
  const content = await getPublicSiteContent();

  return <AudioPageClient initialContent={content} />;
}
