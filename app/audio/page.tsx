import { AudioExperience } from "@/components/sections/audio-experience";
import { StoryShell } from "@/components/site/story-shell";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { audioCopy } from "@/lib/site-config";

export function generateMetadata() {
  return buildSectionMetadata(audioCopy.title, audioCopy.description);
}

export default async function AudioPage() {
  const content = await getPublicSiteContent();

  return (
    <StoryShell
      eyebrow={audioCopy.eyebrow}
      title={audioCopy.title}
      description={audioCopy.description}
      currentPath="/audio"
      actionLabel="الاقتباسات"
      actionHref="/quote"
    >
      <AudioExperience
        audioTracks={content.audioTracks}
        showHeading={false}
        className="pt-0"
      />
    </StoryShell>
  );
}
