"use client";

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
import { motion } from "framer-motion";
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
    "bg-[radial-gradient(circle_at_top_right,rgba(212,180,121,0.18),transparent_32%),linear-gradient(180deg,rgba(31,24,20,0.96),rgba(18,14,11,0.92))]",
  journey:
    "bg-[radial-gradient(circle_at_18%_18%,rgba(146,123,87,0.14),transparent_28%),linear-gradient(180deg,rgba(27,22,19,0.95),rgba(16,13,11,0.9))]",
  honors:
    "bg-[radial-gradient(circle_at_82%_20%,rgba(208,162,104,0.14),transparent_26%),linear-gradient(180deg,rgba(29,21,17,0.95),rgba(17,13,11,0.9))]",
  news:
    "bg-[radial-gradient(circle_at_24%_80%,rgba(112,140,165,0.12),transparent_26%),linear-gradient(180deg,rgba(22,21,23,0.95),rgba(13,12,14,0.92))]",
  quote:
    "bg-[radial-gradient(circle_at_88%_78%,rgba(214,177,119,0.14),transparent_28%),linear-gradient(180deg,rgba(30,24,18,0.95),rgba(18,14,11,0.9))]",
  audio:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(110,137,160,0.14),transparent_28%),linear-gradient(180deg,rgba(20,23,27,0.95),rgba(13,15,18,0.92))]",
} as const;

type HomeDestinationsProps = {
  pages: SitePageSummary[];
};

export function HomeDestinations({ pages }: HomeDestinationsProps) {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <span className="section-kicker">خرائط الموقع</span>
          <h2 className="mt-6 text-4xl leading-[1.2] text-[#f7ede1] md:text-5xl lg:text-6xl">
            ليس قسماً داخل صفحة، بل صفحات لها شخصيتها الخاصة
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#cfbea7]/88 md:text-lg md:leading-9">
            انتقل إلى كل محور كأنه فصل مستقل: بإيقاعه، ومساحته، وطريقته في
            السرد والظهور.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((page, index) => {
            const Icon = iconMap[page.id];

            return (
              <Reveal key={page.id} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "route-card group relative h-full overflow-hidden rounded-[34px] p-7 md:p-8",
                    toneMap[page.id],
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_28%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="story-chip">{page.label}</span>
                      <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#e8d6bb]">
                        <Icon className="size-6" />
                      </div>
                    </div>

                    <div className="mt-10">
                      <p className="text-xs tracking-[0.24em] text-[#d8c1a0]/72 uppercase">
                        {page.eyebrow}
                      </p>
                      <h3 className="mt-4 text-3xl leading-[1.25] text-[#faf1e5] md:text-4xl">
                        {page.title}
                      </h3>
                      <p className="mt-5 text-base leading-8 text-[#d2c1aa]/82">
                        {page.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-12">
                      <Link href={page.href} className="editorial-link text-sm md:text-base">
                        ادخل الصفحة
                        <ArrowLeft className="size-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
