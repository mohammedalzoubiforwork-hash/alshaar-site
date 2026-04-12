import Link from "next/link";
import { ArrowLeft, CalendarDays, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/site-content-types";

type HomeSpotlightProps = {
  quote: SiteContent["quote"];
  news: SiteContent["news"];
  audio: SiteContent["audio"];
  newsHref: string;
  quoteHref: string;
  audioHref: string;
};

export function HomeSpotlight({
  quote,
  news,
  audio,
  newsHref,
  quoteHref,
  audioHref,
}: HomeSpotlightProps) {
  const featuredNews = news.items[0];

  return (
    <section className="relative pb-24 md:pb-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <article className="mesh-panel relative overflow-hidden rounded-[38px] p-7 md:p-10">
              <div className="soft-grid absolute inset-0 opacity-20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,177,119,0.16),transparent_24%)]" />
              <div className="relative">
                <span className="section-kicker">{quote.eyebrow}</span>
                <p className="mt-8 font-display text-3xl leading-[1.85] text-[#fbf3e8] md:text-5xl md:leading-[1.7]">
                  &quot;{quote.quote}&quot;
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href={quoteHref} className="hero-button hero-button-primary">
                    {quote.shareLabel}
                    <ArrowLeft className="size-4" />
                  </Link>
                  <Link href={audioHref} className="hero-button hero-button-secondary">
                    استمع إلى المقطع
                    <PlayCircle className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.08}>
              <article className="paper-panel overflow-hidden rounded-[34px] p-6 md:p-8">
                <div className="flex items-center gap-3 text-sm text-[#d9bf97]">
                  <CalendarDays className="size-4" />
                  <span>{featuredNews?.date}</span>
                </div>
                <h3 className="mt-5 text-3xl leading-[1.3] text-[#faf1e5]">
                  {featuredNews?.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  {featuredNews?.description}
                </p>
                <div className="mt-8">
                  <Link href={newsHref} className="editorial-link text-sm md:text-base">
                    زيارة صفحة الأخبار
                    <ArrowLeft className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.14}>
              <article className="paper-panel overflow-hidden rounded-[34px] p-6 md:p-8">
                <span className="story-chip">المشهد الصوتي</span>
                <h3 className="mt-5 text-3xl leading-[1.3] text-[#faf1e5]">
                  {audio.trackTitle}
                </h3>
                <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                  {audio.trackDescription}
                </p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="sound-pill">{audio.duration}</span>
                  <Link href={audioHref} className="editorial-link text-sm md:text-base">
                    افتح الصفحة الصوتية
                    <ArrowLeft className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
