import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroSection } from "@/components/sections/hero-section";
import { HonorsTimeline } from "@/components/sections/honors-timeline";
import { JourneyGrid } from "@/components/sections/journey-grid";
import { SiteFooter } from "@/components/sections/site-footer";
import { WriterPulse } from "@/components/sections/writer-pulse";
import { HomeDestinations } from "@/components/site/home-destinations";
import { HomeSpotlight } from "@/components/site/home-spotlight";
import { getSiteContent } from "@/lib/site-content";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { sitePageSummaries } from "@/lib/site-pages";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = getRenderableSiteContent(await getSiteContent());
  const pages = sitePageSummaries;
  const newsPage = pages.find((page) => page.id === "news");
  const quotePage = pages.find((page) => page.id === "quote");
  const audioPage = pages.find((page) => page.id === "audio");
  const writerPage = pages.find((page) => page.id === "writer");
  const journeyPage = pages.find((page) => page.id === "journey");
  const honorsPage = pages.find((page) => page.id === "honors");

  return (
    <main className="page-shell">
      <div
        aria-hidden
        className="ambient-glow right-[-10rem] top-[12rem] h-[26rem] w-[26rem] bg-[#ff8d6c]/18"
      />
      <div
        aria-hidden
        className="ambient-glow left-[-8rem] top-[52rem] h-[24rem] w-[24rem] bg-[#79ddd4]/10"
      />
      <div
        aria-hidden
        className="ambient-glow right-[12%] top-[140rem] h-[28rem] w-[28rem] bg-[#ffb45f]/14"
      />

      <HeroSection heroImage={content.photos.heroImage} />
      <HomeDestinations pages={pages} />
      <WriterPulse writerImage={content.photos.writerImage} />

      <section className="pb-10 md:pb-16">
        <Container>
          <Reveal>
            <div className="mesh-panel flex flex-col gap-5 rounded-[34px] p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="max-w-2xl">
                <p className="section-kicker !mb-0">مقدمة واضحة</p>
                <h2 className="mt-4 text-3xl text-[#f7efe3] md:text-4xl">
                  الرئيسية الآن أوضح وأكثر حيوية
                </h2>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                  تعرض الصفحة الرئيسية لمحات منتقاة من صورة الكاتب والأعمال والتكريمات
                  والأخبار والصوتيات، بينما تحتفظ كل صفحة بتفاصيلها ومساحتها الخاصة.
                </p>
              </div>

              <Link
                href={writerPage?.href ?? "/writer"}
                className="hero-button hero-button-primary self-start md:self-auto"
              >
                انتقل إلى صفحة الكاتب
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <JourneyGrid works={content.works.slice(0, 2)} />

      <section className="pb-10 md:pb-16">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-sm text-[#e7d7c1]">بوابة سريعة إلى الأعمال</p>
                <p className="mt-2 text-base leading-8 text-[#cbbca5]/82">
                  من هنا تصل إلى صفحة الأعمال الكاملة لترى كل ما تضيفه من الأدمن، من
                  الصور والوصف إلى الروابط والأنواع.
                </p>
              </div>
              <Link
                href={journeyPage?.href ?? "/journey"}
                className="editorial-link text-sm md:text-base"
              >
                اذهب إلى الأعمال
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <HonorsTimeline honors={content.honors.slice(0, 2)} />

      <section className="pb-16 md:pb-20">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-sm text-[#e7d7c1]">بوابة سريعة إلى التكريمات</p>
                <p className="mt-2 text-base leading-8 text-[#cbbca5]/82">
                  الصفحة الكاملة تعرض المحطات بصورة أوسع، وتمنح الجوائز والشهادات
                  والذكريات حضورًا يليق بها.
                </p>
              </div>
              <Link
                href={honorsPage?.href ?? "/honors"}
                className="editorial-link text-sm md:text-base"
              >
                اذهب إلى التكريمات
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <HomeSpotlight
        featuredQuote={content.quotes[0]}
        featuredNews={content.news[0]}
        featuredAudio={content.audioTracks[0]}
        newsHref={newsPage?.href ?? "/news"}
        quoteHref={quotePage?.href ?? "/quote"}
        audioHref={audioPage?.href ?? "/audio"}
      />
      <SiteFooter />
    </main>
  );
}
