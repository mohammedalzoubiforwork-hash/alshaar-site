import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { AudioExperience } from "@/components/sections/audio-experience";
import { StoryShell } from "@/components/site/story-shell";
import { getSiteContent } from "@/lib/site-content";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { buildSectionMetadata } from "@/lib/page-metadata";
import { audioCopy } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildSectionMetadata(audioCopy.title, audioCopy.description);
}

export default async function AudioPage() {
  const content = getRenderableSiteContent(await getSiteContent());

  return (
    <StoryShell
      eyebrow={audioCopy.eyebrow}
      title={audioCopy.title}
      description={audioCopy.description}
      accent="الآن هذه الصفحة مكتبة صوتيات فعلية، لا مجرد محاكاة ثابتة لمقطع واحد."
      actionLabel="عد إلى الاقتباسات"
      actionHref="/quote"
    >
      <AudioExperience
        audioTracks={content.audioTracks}
        showHeading={false}
        className="pt-0"
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="mesh-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">ملفات حقيقية</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  كل عنصر في هذه الصفحة يعتمد على ملف صوت مرفوع من الأدمن، ويمكن تشغيله
                  مباشرة من المتصفح.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="mesh-panel rounded-[32px] p-6 md:p-8">
                <span className="story-chip">واجهة هادئة</span>
                <p className="mt-5 text-base leading-8 text-[#cfbea7]/84">
                  حتى عند غياب الملفات، تبقى الصفحة محافظة على شكل مهني ورسالة واضحة بدل
                  أن تتحول إلى فراغ مربك.
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </StoryShell>
  );
}
