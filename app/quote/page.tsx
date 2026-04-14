import { QuoteSection } from "@/components/sections/quote-section";
import { StoryShell } from "@/components/site/story-shell";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { quoteCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(quoteCopy.title, quoteCopy.description);
}

export default async function QuotePage() {
  const content = await getPublicSiteContent();

  return (
    <StoryShell
      eyebrow={quoteCopy.eyebrow}
      title={quoteCopy.title}
      description={quoteCopy.description}
      currentPath="/quote"
      actionLabel="الصوتيات"
      actionHref="/audio"
    >
      <QuoteSection
        quotes={content.quotes}
        showHeading={false}
        className="pt-0"
        audioHref="/audio"
      />
    </StoryShell>
  );
}
