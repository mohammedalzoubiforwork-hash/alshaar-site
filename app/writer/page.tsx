import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WriterPulse } from "@/components/sections/writer-pulse";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { buildSectionMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return buildSectionMetadata(
    content.site,
    content.pulse.title,
    content.pulse.description,
  );
}

export default async function WriterPage() {
  const content = await getSiteContent();

  return (
    <StoryShell
      site={content.site}
      navigationLinks={content.navigationLinks}
      footer={content.footer}
      eyebrow={content.pulse.eyebrow}
      title={content.pulse.title}
      description={content.pulse.description}
      accent={content.pulse.note}
      actionLabel="اقرأ التكريمات"
      actionHref="/honors"
    >
      <WriterPulse pulse={content.pulse} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">اسم الواجهة</span>
                <p className="mt-5 font-display text-3xl text-[#f7efe3]">
                  {content.pulse.badgeLabel}
                </p>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  {content.pulse.aside}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">توقيع الموقع</span>
                <p className="mt-5 font-display text-3xl text-[#f7efe3]">
                  {content.site.tagline}
                </p>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  صفحة مستقلة للكاتب تمنح النص مساحة أبطأ، وتترك السيرة تتشكل من
                  النبرة لا من التراكم فقط.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.16}>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">خيط داخلي</span>
                <p className="mt-5 font-display text-3xl text-[#f7efe3]">
                  {content.pulse.pulseCaption}
                </p>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  هذا السطر يعمل كنبض بصري ومعنوي، ويمنح الصفحة لحظة سكون قبل
                  الانتقال لما بعدها.
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
