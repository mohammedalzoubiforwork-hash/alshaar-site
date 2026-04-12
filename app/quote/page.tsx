import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { QuoteSection } from "@/components/sections/quote-section";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { buildSectionMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return buildSectionMetadata(
    content.site,
    content.quote.title,
    content.quote.quote,
  );
}

export default async function QuotePage() {
  const content = await getSiteContent();

  return (
    <StoryShell
      site={content.site}
      navigationLinks={content.navigationLinks}
      footer={content.footer}
      eyebrow={content.quote.eyebrow}
      title={content.quote.title}
      description={content.quote.quote}
      accent={content.quote.cardCaption}
      actionLabel="استمع إلى الصفحة الصوتية"
      actionHref="/audio"
    >
      <QuoteSection quote={content.quote} showHeading={false} className="pt-0" />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">صياغة بصرية</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  هذه الصفحة لم تعد مجرد صندوق اقتباس داخل الصفحة الرئيسية، بل
                  مساحة مستقلة يمكن استخدامها للمشاركة والعرض والتصدير لاحقاً.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">لغة الواجهة</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  {content.quote.cardCaption}
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
