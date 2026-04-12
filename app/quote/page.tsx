import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { QuoteSection } from "@/components/sections/quote-section";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { quoteCopy } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildSectionMetadata(quoteCopy.title, quoteCopy.description);
}

export default async function QuotePage() {
  const content = getRenderableSiteContent(await getSiteContent());

  return (
    <StoryShell
      eyebrow={quoteCopy.eyebrow}
      title={quoteCopy.title}
      description={quoteCopy.description}
      accent="هنا تصبح الاقتباسات مساحة متجددة يمكن توسيعها أو حذفها من دون أن يفقد التصميم توازنه."
      actionLabel="استمع إلى الصوتيات"
      actionHref="/audio"
    >
      <QuoteSection
        quotes={content.quotes}
        showHeading={false}
        className="pt-0"
        audioHref="/audio"
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">تنوع الاقتباسات</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  يمكن لكل اقتباس تضيفه من الأدمن أن يظهر هنا في بطاقة مستقلة، من دون
                  أن يفقد التصميم انسجامه.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">حالة فارغة أنيقة</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  حتى إذا حذفت جميع الاقتباسات، تبقى الصفحة متوازنة مع رسالة واضحة بدل
                  أن تبدو فارغة أو مكسورة.
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
