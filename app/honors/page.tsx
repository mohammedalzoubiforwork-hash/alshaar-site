import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HonorsTimeline } from "@/components/sections/honors-timeline";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { honorsCopy } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildSectionMetadata(honorsCopy.title, honorsCopy.description);
}

export default async function HonorsPage() {
  const content = getRenderableSiteContent(await getSiteContent());

  return (
    <StoryShell
      eyebrow={honorsCopy.eyebrow}
      title={honorsCopy.title}
      description={honorsCopy.description}
      accent="كل تكريم هنا يأخذ مكانه الطبيعي في خط زمني أنيق، لا كجملة عابرة بين بقية الأقسام."
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
                    {content.honors.length}
                  </p>
                </div>
                <p className="text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                  كل محطة تظهر هنا ببطاقة مستقلة وصورة مرافقة، لتبدو الذاكرة أكثر
                  حضورًا من مجرد تاريخ وعنوان.
                </p>
              </div>
            </article>
          </Reveal>
        </Container>
      </section>
    </StoryShell>
  );
}
