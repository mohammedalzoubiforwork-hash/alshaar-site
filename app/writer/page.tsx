import { WriterPulse } from "@/components/sections/writer-pulse";
import { StoryShell } from "@/components/site/story-shell";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { writerCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(writerCopy.title, writerCopy.description);
}

export default async function WriterPage() {
  const content = await getPublicSiteContent();

  return (
    <StoryShell
      eyebrow={writerCopy.eyebrow}
      title={writerCopy.title}
      description={writerCopy.description}
      currentPath="/writer"
      actionLabel="التكريمات"
      actionHref="/honors"
    >
      <WriterPulse
        writerImage={content.photos.writerImage}
        biography={content.writer.biography}
        showHeading={false}
        className="pt-0"
      />
    </StoryShell>
  );
}
