import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { JourneyGrid } from "@/components/sections/journey-grid";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { buildSectionMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return buildSectionMetadata(
    content.site,
    content.journey.title,
    content.journey.description,
  );
}

export default async function JourneyPage() {
  const content = await getSiteContent();

  return (
    <StoryShell
      site={content.site}
      navigationLinks={content.navigationLinks}
      footer={content.footer}
      eyebrow={content.journey.eyebrow}
      title={content.journey.title}
      description={content.journey.description}
      accent="هنا تتوزع الأعمال على مسارات واضحة بدل أن تضيع كعناوين داخل صفحة طويلة."
      actionLabel="تابع إلى الأخبار"
      actionHref="/news"
    >
      <JourneyGrid journey={content.journey} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <article className="mesh-panel rounded-[30px] p-6">
                <p className="text-xs text-[#bca98d]">عدد المسارات</p>
                <p className="mt-4 font-display text-5xl text-[#f7efe3]">
                  {content.journey.entries.length}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="mesh-panel rounded-[30px] p-6">
                <p className="text-xs text-[#bca98d]">أول باب</p>
                <p className="mt-4 font-display text-3xl text-[#f7efe3]">
                  {content.journey.entries[0]?.title}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.16}>
              <article className="mesh-panel rounded-[30px] p-6">
                <p className="text-xs text-[#bca98d]">آخر باب</p>
                <p className="mt-4 font-display text-3xl text-[#f7efe3]">
                  {content.journey.entries.at(-1)?.title}
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
