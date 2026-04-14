import { HonorsTimeline } from "@/components/sections/honors-timeline";
import { StoryShell } from "@/components/site/story-shell";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { honorsCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(honorsCopy.title, honorsCopy.description);
}

export default async function HonorsPage() {
  const content = await getPublicSiteContent();

  return (
    <StoryShell
      eyebrow={honorsCopy.eyebrow}
      title={honorsCopy.title}
      description={honorsCopy.description}
      currentPath="/honors"
      actionLabel="الأخبار"
      actionHref="/news"
    >
      <HonorsTimeline honors={content.honors} showHeading={false} className="pt-0" />
    </StoryShell>
  );
}
