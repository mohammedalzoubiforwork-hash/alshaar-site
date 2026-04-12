import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { AudioExperience } from "@/components/sections/audio-experience";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { buildSectionMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return buildSectionMetadata(
    content.site,
    content.audio.title,
    content.audio.description,
  );
}

export default async function AudioPage() {
  const content = await getSiteContent();

  return (
    <StoryShell
      site={content.site}
      navigationLinks={content.navigationLinks}
      footer={content.footer}
      eyebrow={content.audio.eyebrow}
      title={content.audio.title}
      description={content.audio.description}
      accent={content.audio.ambientLabel}
      actionLabel="عد إلى الاقتباس"
      actionHref="/quote"
    >
      <AudioExperience audio={content.audio} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="mesh-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">{content.audio.listeningNoteTitle}</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  {content.audio.listeningNoteBody}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="mesh-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">{content.audio.afterTrackTitle}</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  {content.audio.afterTrackBody}
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
