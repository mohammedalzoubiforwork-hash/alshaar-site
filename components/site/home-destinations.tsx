import Link from "next/link";
import {
  ArrowLeft,
  AudioLines,
  Award,
  Feather,
  Newspaper,
  Quote,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { SitePageSummary } from "@/lib/site-pages";
import { cn } from "@/lib/utils";

const iconMap = {
  writer: UserRound,
  journey: Feather,
  honors: Award,
  news: Newspaper,
  quote: Quote,
  audio: AudioLines,
} as const;

const toneMap = {
  writer:
    "bg-[radial-gradient(circle_at_top_right,rgba(255,201,120,0.26),transparent_32%),radial-gradient(circle_at_22%_82%,rgba(126,230,220,0.1),transparent_26%),linear-gradient(180deg,rgba(24,46,68,0.98),rgba(10,24,38,0.9))]",
  journey:
    "bg-[radial-gradient(circle_at_18%_18%,rgba(126,230,220,0.24),transparent_28%),radial-gradient(circle_at_84%_76%,rgba(255,191,104,0.12),transparent_24%),linear-gradient(180deg,rgba(19,41,61,0.98),rgba(10,23,36,0.9))]",
  honors:
    "bg-[radial-gradient(circle_at_82%_20%,rgba(255,143,114,0.24),transparent_26%),radial-gradient(circle_at_12%_78%,rgba(255,225,174,0.1),transparent_22%),linear-gradient(180deg,rgba(25,43,62,0.98),rgba(10,22,34,0.9))]",
  news:
    "bg-[radial-gradient(circle_at_24%_80%,rgba(126,230,220,0.18),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(255,191,104,0.12),transparent_22%),linear-gradient(180deg,rgba(18,39,58,0.98),rgba(8,19,30,0.92))]",
  quote:
    "bg-[radial-gradient(circle_at_88%_78%,rgba(255,191,104,0.22),transparent_28%),radial-gradient(circle_at_16%_20%,rgba(255,143,114,0.12),transparent_20%),linear-gradient(180deg,rgba(24,42,61,0.98),rgba(10,21,32,0.9))]",
  audio:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(126,230,220,0.22),transparent_28%),radial-gradient(circle_at_82%_82%,rgba(255,191,104,0.12),transparent_22%),linear-gradient(180deg,rgba(18,38,57,0.98),rgba(8,18,28,0.92))]",
} as const;

type HomeDestinationsProps = {
  pages: SitePageSummary[];
};

export function HomeDestinations({ pages }: HomeDestinationsProps) {
  return (
    <section className="relative py-14 sm:py-16 md:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="section-kicker">الصفحات</span>
          <h2 className="mt-4 text-[clamp(1.9rem,8vw,3.1rem)] leading-[1.2] text-[#f7ede1] sm:mt-5 md:mt-6 md:text-5xl">
            الوصول للمحتوى أصبح أبسط
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {pages.map((page, index) => {
            const Icon = iconMap[page.id];

            return (
              <Reveal key={page.id} delay={index * 0.06}>
                <article
                  className={cn(
                    "route-card group relative h-full overflow-hidden rounded-[24px] p-4 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-2 sm:rounded-[28px] sm:p-5 md:rounded-[34px] md:p-8",
                    toneMap[page.id],
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="story-chip">{page.label}</span>
                      <div className="flex size-12 items-center justify-center rounded-full border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] text-[#fff0cf] shadow-[0_10px_28px_rgba(255,191,104,0.12)] md:size-14">
                        <Icon className="size-5 md:size-6" />
                      </div>
                    </div>

                    <div className="mt-8 md:mt-10">
                      <h3 className="text-[1.55rem] leading-[1.25] text-[#faf1e5] sm:text-[1.75rem] md:text-[2.35rem]">
                        {page.title}
                      </h3>
                    </div>

                    <div className="mt-auto pt-7 md:pt-10">
                      <Link
                        href={page.href}
                        prefetch={false}
                        className="editorial-link text-sm md:text-base"
                      >
                        دخول
                        <ArrowLeft className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
