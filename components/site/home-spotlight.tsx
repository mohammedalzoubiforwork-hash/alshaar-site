import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { AudioTrack, NewsItem, QuoteItem } from "@/lib/site-content-types";

type HomeSpotlightProps = {
  featuredQuote?: QuoteItem;
  featuredNews?: NewsItem;
  featuredAudio?: AudioTrack;
  newsHref: string;
  quoteHref: string;
  audioHref: string;
};

export function HomeSpotlight({
  featuredQuote,
  featuredNews,
  featuredAudio,
  newsHref,
  quoteHref,
  audioHref,
}: HomeSpotlightProps) {
  return (
    <section className="relative pb-14 sm:pb-16 md:pb-24">
      <Container>
        <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <article className="mesh-panel relative overflow-hidden rounded-[28px] p-4 sm:rounded-[32px] sm:p-6 md:rounded-[38px] md:p-10">
              <div className="soft-grid absolute inset-0 opacity-20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,104,0.24),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(126,230,220,0.16),transparent_24%)]" />
              <div className="relative">
                <span className="section-kicker">اقتباس</span>
                <p className="mt-5 font-display text-[1.7rem] leading-[1.8] text-[#fbf3e8] sm:mt-6 sm:text-[2.2rem] md:mt-8 md:text-5xl md:leading-[1.7]">
                  {featuredQuote ? `“${featuredQuote.text}”` : "سيُضاف اقتباس قريبًا."}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link href={quoteHref} className="hero-button hero-button-primary w-full sm:w-auto">
                    الاقتباسات
                    <ArrowLeft className="size-4" />
                  </Link>
                  <Link href={audioHref} className="hero-button hero-button-secondary w-full sm:w-auto">
                    الصوتيات
                    <ArrowLeft className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 md:gap-6">
            <Reveal delay={0.08}>
              <article className="paper-panel overflow-hidden rounded-[26px] p-4 sm:rounded-[30px] sm:p-6 md:rounded-[34px] md:p-8">
                <div className="flex items-center gap-3 text-sm text-[#d9bf97]">
                  <CalendarDays className="size-4" />
                  <span>{featuredNews?.date ?? "آخر تحديث"}</span>
                </div>
                <h3 className="mt-4 text-[1.55rem] leading-[1.25] text-[#faf1e5] sm:text-[1.75rem] md:mt-5 md:text-3xl">
                  {featuredNews?.title ?? "سيُضاف خبر قريبًا."}
                </h3>
                <div className="mt-6 sm:mt-8">
                  <Link href={newsHref} className="editorial-link text-sm md:text-base">
                    الأخبار
                    <ArrowLeft className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.14}>
              <article className="paper-panel overflow-hidden rounded-[26px] p-4 sm:rounded-[30px] sm:p-6 md:rounded-[34px] md:p-8">
                <span className="story-chip">الصوتيات</span>
                <h3 className="mt-4 text-[1.55rem] leading-[1.25] text-[#faf1e5] sm:text-[1.75rem] md:mt-5 md:text-3xl">
                  {featuredAudio?.title ?? "سيُضاف مقطع صوتي قريبًا."}
                </h3>
                <div className="mt-5 flex flex-col items-start gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                  <span className="sound-pill">{featuredAudio?.durationLabel || "قريبًا"}</span>
                  <Link href={audioHref} className="editorial-link text-sm md:text-base">
                    الصوتيات
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
