import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { NewsSection } from "@/components/sections/news-section";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { newsCopy } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildSectionMetadata(newsCopy.title, newsCopy.description);
}

export default async function NewsPage() {
  const content = getRenderableSiteContent(await getSiteContent());
  const featured = content.news[0];

  return (
    <StoryShell
      eyebrow={newsCopy.eyebrow}
      title={newsCopy.title}
      description={newsCopy.description}
      accent="هذه الصفحة مخصصة للأخبار وحدها، ليظهر كل تحديث كحدث مستقل لا كعنصر هامشي."
      actionLabel="اقرأ الاقتباسات"
      actionHref="/quote"
    >
      <NewsSection news={content.news} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal>
            <article className="mesh-panel rounded-[34px] p-7 md:p-9">
              <span className="story-chip">الخبر الأبرز</span>
              <h2 className="mt-5 font-display text-4xl text-[#f7efe3] md:text-5xl">
                {featured?.title ?? "لا توجد أخبار بعد"}
              </h2>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                {featured?.description ??
                  "أضف خبرًا جديدًا من لوحة الأدمن ليظهر هنا بوصفه الخبر الأبرز في أعلى الصفحة."}
              </p>
            </article>
          </Reveal>
        </Container>
      </section>
    </StoryShell>
  );
}
