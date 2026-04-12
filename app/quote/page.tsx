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
      accent="بدل اقتباس ثابت واحد، أصبحت هذه الصفحة مساحة مفتوحة لمجموعة اقتباسات قابلة للإضافة والحذف."
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
                <span className="story-chip">بطاقات متعددة</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  كل اقتباس تضيفه من الأدمن يمكن أن يظهر هنا ضمن بطاقات مستقلة، بدل
                  الاعتماد على اقتباس واحد ثابت داخل التصميم.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="paper-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">حالة الفراغ</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  إذا حذفت كل الاقتباسات، تبقى الصفحة أنيقة مع رسالة Empty State هادئة
                  بدل أن تبدو مكسورة أو فارغة بشكل سيئ.
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
