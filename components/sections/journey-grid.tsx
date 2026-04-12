import Link from "next/link";
import { ArrowLeft, BookOpen, Drama, Feather, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { JourneyIconName, SiteContent } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

const iconMap: Record<JourneyIconName, typeof Feather> = {
  feather: Feather,
  "book-open": BookOpen,
  drama: Drama,
  "user-round": UserRound,
};

const layoutMap = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

const toneMap = [
  "bg-[radial-gradient(circle_at_top_right,rgba(201,159,98,0.16),transparent_38%),linear-gradient(180deg,rgba(38,28,22,0.94),rgba(23,17,13,0.88))]",
  "bg-[radial-gradient(circle_at_12%_18%,rgba(186,141,86,0.12),transparent_28%),linear-gradient(180deg,rgba(28,22,19,0.94),rgba(17,13,10,0.9))]",
  "bg-[radial-gradient(circle_at_88%_22%,rgba(150,116,74,0.16),transparent_24%),linear-gradient(180deg,rgba(30,23,18,0.94),rgba(18,13,10,0.9))]",
  "bg-[radial-gradient(circle_at_78%_78%,rgba(214,182,131,0.1),transparent_22%),linear-gradient(180deg,rgba(33,25,20,0.94),rgba(19,14,11,0.9))]",
];

type JourneyGridProps = {
  journey: SiteContent["journey"];
};

export function JourneyGrid({ journey }: JourneyGridProps) {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={journey.eyebrow}
          title={journey.title}
          description={journey.description}
        />

        <div className="mt-14 grid gap-5 md:auto-rows-[minmax(250px,auto)] md:grid-cols-12">
          {journey.entries.map((entry, index) => {
            const Icon = iconMap[entry.icon];

            return (
              <Reveal
                key={entry.id}
                delay={index * 0.08}
                className={cn(layoutMap[index % layoutMap.length], "h-full")}
              >
                <article
                  className={cn(
                    "paper-panel group relative flex h-full flex-col overflow-hidden rounded-[34px] p-7 md:p-8",
                    toneMap[index % toneMap.length],
                  )}
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(223,202,169,0.08),transparent_32%)]" />
                  <span className="absolute left-6 top-6 font-display text-6xl text-white/[0.04] md:text-8xl">
                    0{index + 1}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="section-kicker !mb-0">{journey.cardKicker}</span>
                    <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#d9c2a0]">
                      <Icon className="size-6" />
                    </div>
                  </div>

                  <div className="relative mt-10 max-w-xl">
                    <h3 className="text-3xl leading-[1.2] text-[#faf1e5] md:text-4xl">
                      {entry.title}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                      {entry.description}
                    </p>
                  </div>

                  <div className="relative mt-auto pt-12">
                    <Link href={entry.ctaHref} className="editorial-link text-sm md:text-base">
                      {entry.ctaLabel}
                      <ArrowLeft className="size-4" />
                    </Link>
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
