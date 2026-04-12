import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { JourneyGrid } from "@/components/sections/journey-grid";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { journeyCopy } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildSectionMetadata(journeyCopy.title, journeyCopy.description);
}

export default async function JourneyPage() {
  const content = getRenderableSiteContent(await getSiteContent());

  return (
    <StoryShell
      eyebrow={journeyCopy.eyebrow}
      title={journeyCopy.title}
      description={journeyCopy.description}
      accent="هنا تتوزع الأعمال على بطاقات واضحة بدل أن تضيع كعناوين داخل صفحة واحدة طويلة."
      actionLabel="تابع إلى الأخبار"
      actionHref="/news"
    >
      <JourneyGrid works={content.works} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <article className="mesh-panel rounded-[30px] p-6">
                <p className="text-xs text-[#bca98d]">عدد الأعمال</p>
                <p className="mt-4 font-display text-5xl text-[#f7efe3]">
                  {content.works.length}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="mesh-panel rounded-[30px] p-6">
                <p className="text-xs text-[#bca98d]">أول عمل</p>
                <p className="mt-4 font-display text-3xl text-[#f7efe3]">
                  {content.works[0]?.title ?? "لا يوجد"}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.16}>
              <article className="mesh-panel rounded-[30px] p-6">
                <p className="text-xs text-[#bca98d]">آخر عمل</p>
                <p className="mt-4 font-display text-3xl text-[#f7efe3]">
                  {content.works.at(-1)?.title ?? "لا يوجد"}
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
