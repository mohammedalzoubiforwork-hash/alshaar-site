import { AudioExperience } from "@/components/sections/audio-experience";
import { HeroSection } from "@/components/sections/hero-section";
import { HonorsTimeline } from "@/components/sections/honors-timeline";
import { JourneyGrid } from "@/components/sections/journey-grid";
import { NewsSection } from "@/components/sections/news-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { WriterPulse } from "@/components/sections/writer-pulse";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

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
      <JourneyGrid journey={content.journey} />
      <WriterPulse pulse={content.pulse} />
      <HonorsTimeline honors={content.honors} />
      <NewsSection news={content.news} />
      <QuoteSection quote={content.quote} />
      <AudioExperience audio={content.audio} />
      <SiteFooter footer={content.footer} />
    </main>
  );
}
