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
import { getPageSummaries } from "@/lib/site-pages";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  const pages = getPageSummaries(content);
  const newsPage = pages.find((page) => page.id === "news");
  const quotePage = pages.find((page) => page.id === "quote");
  const audioPage = pages.find((page) => page.id === "audio");
  const writerPage = pages.find((page) => page.id === "writer");
  const journeyPage = pages.find((page) => page.id === "journey");
  const honorsPage = pages.find((page) => page.id === "honors");
  const journeyPreview = {
    ...content.journey,
    eyebrow: "من المسارات",
    title: "لمحات أولى من أبواب الكاتب",
    description:
      "هذه مجرد بداية الطريق: بطاقات تمهّد للدخول إلى صفحات الأعمال الكاملة دون أن تختزلها.",
    entries: content.journey.entries.slice(0, 2),
  };
  const honorsPreview = {
    ...content.honors,
    eyebrow: "من التكريمات",
    title: "محطات بارزة من مسار التكريم",
    description:
      "مختارات سريعة تعطي الزائر شعورًا بحجم الرحلة قبل الانتقال إلى الصفحة الكاملة.",
    items: content.honors.items.slice(0, 2),
  };

  return (
    <main className="page-shell">
      <div
        aria-hidden
        className="ambient-glow right-[-10rem] top-[12rem] h-[26rem] w-[26rem] bg-[#876038]/18"
      />
      <div
        aria-hidden
        className="ambient-glow left-[-8rem] top-[52rem] h-[24rem] w-[24rem] bg-[#d4b07b]/10"
      />
      <div
        aria-hidden
        className="ambient-glow right-[12%] top-[140rem] h-[28rem] w-[28rem] bg-[#6f4f30]/14"
      />
      <HeroSection
        site={content.site}
        hero={content.hero}
        navigationLinks={content.navigationLinks}
      />
      <HomeDestinations pages={pages} />
      <WriterPulse pulse={content.pulse} />

      <section className="pb-10 md:pb-16">
        <Container>
          <Reveal>
            <div className="mesh-panel flex flex-col gap-5 rounded-[34px] p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="max-w-2xl">
                <p className="section-kicker !mb-0">نافذة شخصية</p>
                <h2 className="mt-4 text-3xl text-[#f7efe3] md:text-4xl">
                  الصفحة الرئيسية لم تعد فارغة
                </h2>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                  أصبحت البداية تعرض نبض الكاتب ولمحات حقيقية من المسارات والتكريمات،
                  بينما بقيت لكل قسم صفحته المستقلة بتفاصيله الكاملة.
                </p>
              </div>

              <Link
                href={writerPage?.href ?? "/writer"}
                className="hero-button hero-button-primary self-start md:self-auto"
              >
                افتح صفحة الكاتب
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <JourneyGrid journey={journeyPreview} />

      <section className="pb-10 md:pb-16">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-sm text-[#e7d7c1]">صفحة مستقلة للمسارات</p>
                <p className="mt-2 text-base leading-8 text-[#cbbca5]/82">
                  انتقل إلى الصفحة الكاملة لتعديل الكتب، الصور، والروابط الخاصة بكل
                  مسار من لوحة الأدمن.
                </p>
              </div>
              <Link
                href={journeyPage?.href ?? "/journey"}
                className="editorial-link text-sm md:text-base"
              >
                افتح صفحة المسارات
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <HonorsTimeline honors={honorsPreview} />

      <section className="pb-16 md:pb-20">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-sm text-[#e7d7c1]">صفحة التكريمات الكاملة</p>
                <p className="mt-2 text-base leading-8 text-[#cbbca5]/82">
                  الصفحة الكاملة تعرض بقية المحطات وتسمح بإضافة صور دروع وشهادات من
                  الأدمن بدل الاكتفاء بالنص.
                </p>
              </div>
              <Link
                href={honorsPage?.href ?? "/honors"}
                className="editorial-link text-sm md:text-base"
              >
                افتح صفحة التكريمات
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <HomeSpotlight
        quote={content.quote}
        news={content.news}
        audio={content.audio}
        newsHref={newsPage?.href ?? "/news"}
        quoteHref={quotePage?.href ?? "/quote"}
        audioHref={audioPage?.href ?? "/audio"}
      />
      <SiteFooter footer={content.footer} />
    </main>
  );
}
