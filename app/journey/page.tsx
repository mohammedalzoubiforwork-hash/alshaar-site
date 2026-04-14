import { JourneyGrid } from "@/components/sections/journey-grid";
import { StoryShell } from "@/components/site/story-shell";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { journeyCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(journeyCopy.title, journeyCopy.description);
}

export default async function JourneyPage() {
  const content = await getPublicSiteContent();

  return (
    <StoryShell
      eyebrow={journeyCopy.eyebrow}
      title={journeyCopy.title}
      description={journeyCopy.description}
      currentPath="/journey"
      actionLabel="الأخبار"
      actionHref="/news"
    >
      <JourneyGrid works={content.works} showHeading={false} className="pt-0" />
    </StoryShell>
  );
}
