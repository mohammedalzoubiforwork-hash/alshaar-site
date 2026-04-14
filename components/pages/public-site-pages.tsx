"use client";

import { AudioExperience } from "@/components/sections/audio-experience";
import { HeroSection } from "@/components/sections/hero-section";
import { HonorsTimeline } from "@/components/sections/honors-timeline";
import { JourneyGrid } from "@/components/sections/journey-grid";
import { NewsSection } from "@/components/sections/news-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { WriterPulse } from "@/components/sections/writer-pulse";
import { HomeDestinations } from "@/components/site/home-destinations";
import { HomeSpotlight } from "@/components/site/home-spotlight";
import { useResolvedSiteContent } from "@/components/site/browser-site-content";
import { StoryShell } from "@/components/site/story-shell";
import { audioCopy, honorsCopy, journeyCopy, newsCopy, quoteCopy, writerCopy } from "@/lib/site-config";
import { sitePageSummaries } from "@/lib/site-pages";
import type { SiteContent } from "@/lib/site-content-types";

type PublicPageProps = {
  initialContent: SiteContent;
};

export function HomePageClient({ initialContent }: PublicPageProps) {
  const content = useResolvedSiteContent(initialContent);
  const pages = sitePageSummaries;
  const newsPage = pages.find((page) => page.id === "news");
  const quotePage = pages.find((page) => page.id === "quote");
  const audioPage = pages.find((page) => page.id === "audio");

  return (
    <main className="page-shell">
      <div
        aria-hidden
        className="ambient-glow right-[-10rem] top-[12rem] h-[28rem] w-[28rem] bg-[#ff8d6c]/22"
      />
      <div
        aria-hidden
        className="ambient-glow left-[-8rem] top-[52rem] h-[26rem] w-[26rem] bg-[#79ddd4]/14"
      />
      <div
        aria-hidden
        className="ambient-glow right-[12%] top-[140rem] h-[30rem] w-[30rem] bg-[#ffb45f]/18"
      />
      <div
        aria-hidden
        className="ambient-glow left-[18%] top-[96rem] h-[24rem] w-[24rem] bg-[#ff9db6]/12"
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

export function WriterPageClient({ initialContent }: PublicPageProps) {
  const content = useResolvedSiteContent(initialContent);

  return (
    <StoryShell
      eyebrow={writerCopy.eyebrow}
      title={writerCopy.title}
      description={writerCopy.description}
      currentPath="/writer"
      actionLabel="التكريمات"
      actionHref="/honors"
    >
      <WriterPulse
        writerImage={content.photos.writerImage}
        biography={content.writer.biography}
        showHeading={false}
        className="pt-0"
      />
    </StoryShell>
  );
}

export function JourneyPageClient({ initialContent }: PublicPageProps) {
  const content = useResolvedSiteContent(initialContent);

  return (
    <StoryShell
      eyebrow={journeyCopy.eyebrow}
      title={journeyCopy.title}
      description={journeyCopy.description}
      currentPath="/journey"
      actionLabel="الأخبار"
      actionHref="/news"
    >
      <JourneyGrid works={content.works} showHeading={false} className="pt-0" />
    </StoryShell>
  );
}

export function HonorsPageClient({ initialContent }: PublicPageProps) {
  const content = useResolvedSiteContent(initialContent);

  return (
    <StoryShell
      eyebrow={honorsCopy.eyebrow}
      title={honorsCopy.title}
      description={honorsCopy.description}
      currentPath="/honors"
      actionLabel="الأخبار"
      actionHref="/news"
    >
      <HonorsTimeline honors={content.honors} showHeading={false} className="pt-0" />
    </StoryShell>
  );
}

export function NewsPageClient({ initialContent }: PublicPageProps) {
  const content = useResolvedSiteContent(initialContent);

  return (
    <StoryShell
      eyebrow={newsCopy.eyebrow}
      title={newsCopy.title}
      description={newsCopy.description}
      currentPath="/news"
      actionLabel="الاقتباسات"
      actionHref="/quote"
    >
      <NewsSection news={content.news} showHeading={false} className="pt-0" />
    </StoryShell>
  );
}

export function QuotePageClient({ initialContent }: PublicPageProps) {
  const content = useResolvedSiteContent(initialContent);

  return (
    <StoryShell
      eyebrow={quoteCopy.eyebrow}
      title={quoteCopy.title}
      description={quoteCopy.description}
      currentPath="/quote"
      actionLabel="الصوتيات"
      actionHref="/audio"
    >
      <QuoteSection
        quotes={content.quotes}
        showHeading={false}
        className="pt-0"
        audioHref="/audio"
      />
    </StoryShell>
  );
}

export function AudioPageClient({ initialContent }: PublicPageProps) {
  const content = useResolvedSiteContent(initialContent);

  return (
    <StoryShell
      eyebrow={audioCopy.eyebrow}
      title={audioCopy.title}
      description={audioCopy.description}
      currentPath="/audio"
      actionLabel="الاقتباسات"
      actionHref="/quote"
    >
      <AudioExperience
        audioTracks={content.audioTracks}
        showHeading={false}
        className="pt-0"
      />
    </StoryShell>
  );
}
