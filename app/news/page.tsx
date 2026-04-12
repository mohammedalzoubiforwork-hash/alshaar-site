import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { NewsSection } from "@/components/sections/news-section";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { buildSectionMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return buildSectionMetadata(
    content.site,
    content.news.title,
    content.news.description,
  );
}

export default async function NewsPage() {
  const content = await getSiteContent();
  const featured = content.news.items[0];

  return (
    <StoryShell
      site={content.site}
      navigationLinks={content.navigationLinks}
      footer={content.footer}
      eyebrow={content.news.eyebrow}
      title={content.news.title}
      description={content.news.description}
      accent="صفحة الأخبار الآن مخصصة للتحديثات فقط، مع مساحة بصرية تسمح للخبر أن يظهر كحدث لا كعنصر بين عناصر كثيرة."
      actionLabel="اقرأ الاقتباس"
      actionHref="/quote"
    >
      <NewsSection news={content.news} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal>
            <article className="mesh-panel rounded-[34px] p-7 md:p-9">
              <span className="story-chip">الخبر الأحدث</span>
              <h2 className="mt-5 font-display text-4xl text-[#f7efe3] md:text-5xl">
                {featured?.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                {featured?.description}
              </p>
            </article>
          </Reveal>
        </Container>
      </section>
    </StoryShell>
  );
}
