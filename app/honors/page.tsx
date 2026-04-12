import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HonorsTimeline } from "@/components/sections/honors-timeline";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { buildSectionMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return buildSectionMetadata(
    content.site,
    content.honors.title,
    content.honors.description,
  );
}

export default async function HonorsPage() {
  const content = await getSiteContent();

  return (
    <StoryShell
      site={content.site}
      navigationLinks={content.navigationLinks}
      footer={content.footer}
      eyebrow={content.honors.eyebrow}
      title={content.honors.title}
      description={content.honors.description}
      accent="صفحة الخط الزمني الآن مستقلة، لذلك تظهر الإنجازات كتجربة سردية كاملة لا كفقرة عابرة."
      actionLabel="انتقل إلى الأخبار"
      actionHref="/news"
    >
      <HonorsTimeline honors={content.honors} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal>
            <article className="paper-panel rounded-[34px] p-7 md:p-10">
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                <div>
                  <p className="text-sm text-[#cab08d]">محطات موثقة</p>
                  <p className="mt-4 font-display text-6xl text-[#f7efe3]">
                    {content.honors.items.length}
                  </p>
                </div>
                <p className="text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                  كل محطة من هذه المحطات أصبحت تملك الآن مساراً أهدأ داخل صفحة
                  خاصة، مع مسافة كافية للنظر في ما وراء التاريخ والعنوان.
                </p>
              </div>
            </article>
          </Reveal>
        </Container>
      </section>
    </StoryShell>
  );
}
