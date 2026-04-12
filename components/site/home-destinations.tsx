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
    "bg-[radial-gradient(circle_at_top_right,rgba(255,180,95,0.2),transparent_32%),linear-gradient(180deg,rgba(18,34,52,0.96),rgba(9,19,30,0.92))]",
  journey:
    "bg-[radial-gradient(circle_at_18%_18%,rgba(121,221,212,0.16),transparent_28%),linear-gradient(180deg,rgba(16,31,48,0.95),rgba(9,19,30,0.9))]",
  honors:
    "bg-[radial-gradient(circle_at_82%_20%,rgba(255,141,108,0.18),transparent_26%),linear-gradient(180deg,rgba(20,34,50,0.95),rgba(10,19,29,0.9))]",
  news:
    "bg-[radial-gradient(circle_at_24%_80%,rgba(121,221,212,0.14),transparent_26%),linear-gradient(180deg,rgba(18,32,48,0.95),rgba(8,18,28,0.92))]",
  quote:
    "bg-[radial-gradient(circle_at_88%_78%,rgba(255,180,95,0.16),transparent_28%),linear-gradient(180deg,rgba(20,34,49,0.95),rgba(10,19,29,0.9))]",
  audio:
    "bg-[radial-gradient(circle_at_20%_20%,rgba(121,221,212,0.18),transparent_28%),linear-gradient(180deg,rgba(17,31,46,0.95),rgba(8,18,28,0.92))]",
} as const;

type HomeDestinationsProps = {
  pages: SitePageSummary[];
};

export function HomeDestinations({ pages }: HomeDestinationsProps) {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <span className="section-kicker">خرائط القراءة</span>
          <h2 className="mt-6 text-4xl leading-[1.2] text-[#f7ede1] md:text-5xl lg:text-6xl">
            كل محور هنا صفحة كاملة لا مجرد قسم عابر
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#cfbea7]/88 md:text-lg md:leading-9">
            تنتقل بين محاور الموقع كما لو أنك تعبر فصولًا متجاورة: لكل صفحة إيقاعها
            وصورتها وطريقتها في تقديم النص.
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
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="story-chip">{page.label}</span>
                      <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#fff0cf]">
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
                        افتح الصفحة
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
