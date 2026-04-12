import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WriterPulse } from "@/components/sections/writer-pulse";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { writerCopy, siteIdentity } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildSectionMetadata(writerCopy.title, writerCopy.description);
}

export default async function WriterPage() {
  const content = getRenderableSiteContent(await getSiteContent());

  return (
    <StoryShell
      eyebrow={writerCopy.eyebrow}
      title={writerCopy.title}
      description={writerCopy.description}
      accent={writerCopy.note}
      actionLabel="اذهب إلى التكريمات"
      actionHref="/honors"
    >
      <WriterPulse
        writerImage={content.photos.writerImage}
        showHeading={false}
        className="pt-0"
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">اسم الكاتب</span>
                <p className="mt-5 font-display text-3xl text-[#f7efe3]">
                  {writerCopy.badgeLabel}
                </p>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  {writerCopy.aside}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">التوقيع الأدبي</span>
                <p className="mt-5 font-display text-3xl text-[#f7efe3]">
                  {siteIdentity.tagline}
                </p>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  هذه الصفحة تمنح صورة الكاتب زمنًا أوسع، وتدع السيرة تتشكل من الملامح
                  والنبرة قبل التفاصيل.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.16}>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">نبض الصفحة</span>
                <p className="mt-5 font-display text-3xl text-[#f7efe3]">
                  {writerCopy.pulseCaption}
                </p>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  هذا السطر يعمل كنبض بصري ومعنوي، ويمنح الصفحة لحظة هدوء قبل العبور
                  إلى بقية الفصول.
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
