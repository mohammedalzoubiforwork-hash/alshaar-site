import { HeroSection } from "@/components/sections/hero-section";
import { HonorsTimeline } from "@/components/sections/honors-timeline";
import { JourneyGrid } from "@/components/sections/journey-grid";
import { SiteFooter } from "@/components/sections/site-footer";
import { WriterPulse } from "@/components/sections/writer-pulse";
import { HomeDestinations } from "@/components/site/home-destinations";
import { HomeSpotlight } from "@/components/site/home-spotlight";
import { getPublicSiteContent } from "@/lib/public-site-content";
import { sitePageSummaries } from "@/lib/site-pages";

export default async function Home() {
  const content = await getPublicSiteContent();
  const pages = sitePageSummaries;
  const newsPage = pages.find((page) => page.id === "news");
  const quotePage = pages.find((page) => page.id === "quote");
  const audioPage = pages.find((page) => page.id === "audio");

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
      <WriterPulse
        writerImage={content.photos.writerImage}
        biography={content.writer.biography}
      />
      <JourneyGrid works={content.works.slice(0, 2)} />
      <HonorsTimeline honors={content.honors.slice(0, 2)} />
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
