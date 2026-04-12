import { HeroSection } from "@/components/sections/hero-section";
import { SiteFooter } from "@/components/sections/site-footer";
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
