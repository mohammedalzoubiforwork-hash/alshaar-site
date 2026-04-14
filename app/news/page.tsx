import { NewsSection } from "@/components/sections/news-section";
import { StoryShell } from "@/components/site/story-shell";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { newsCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(newsCopy.title, newsCopy.description);
}

export default async function NewsPage() {
  const content = await getPublicSiteContent();

  return (
    <StoryShell
      eyebrow={newsCopy.eyebrow}
      title={newsCopy.title}
      description={newsCopy.description}
      currentPath="/news"
      actionLabel="الاقتباسات"
      actionHref="/quote"
    >
      <NewsSection news={content.news} showHeading={false} className="pt-0" />
    </StoryShell>
  );
}
