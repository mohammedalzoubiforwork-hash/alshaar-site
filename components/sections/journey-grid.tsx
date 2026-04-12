import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Drama, Feather, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { journeyCopy, workTypeLabels } from "@/lib/site-config";
import type { WorkItem, WorkType } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

const iconMap: Record<WorkType, typeof Feather> = {
  poetry: Feather,
  books: BookOpen,
  theater: Drama,
  biography: UserRound,
};

const layoutMap = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

const toneMap = [
  "bg-[radial-gradient(circle_at_top_right,rgba(255,180,95,0.18),transparent_38%),linear-gradient(180deg,rgba(18,34,52,0.94),rgba(9,19,30,0.88))]",
  "bg-[radial-gradient(circle_at_12%_18%,rgba(121,221,212,0.14),transparent_28%),linear-gradient(180deg,rgba(16,31,47,0.94),rgba(8,18,29,0.9))]",
  "bg-[radial-gradient(circle_at_88%_22%,rgba(255,141,108,0.18),transparent_24%),linear-gradient(180deg,rgba(19,34,50,0.94),rgba(9,19,30,0.9))]",
  "bg-[radial-gradient(circle_at_78%_78%,rgba(255,180,95,0.12),transparent_22%),linear-gradient(180deg,rgba(18,32,48,0.94),rgba(8,18,28,0.9))]",
];

type JourneyGridProps = {
  works: WorkItem[];
  id?: string;
  className?: string;
  showHeading?: boolean;
};

export function JourneyGrid({
  works,
  id = "journey",
  className,
  showHeading = true,
}: JourneyGridProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={journeyCopy.eyebrow}
            title={journeyCopy.title}
            description={journeyCopy.description}
          />
        ) : null}

        {works.length > 0 ? (
          <div
            className={cn(
              "grid gap-5 md:auto-rows-[minmax(250px,auto)] md:grid-cols-12",
              showHeading && "mt-14",
            )}
          >
            {works.map((entry, index) => {
              const Icon = iconMap[entry.type];
              const hasEntryImage = entry.image.length > 0;

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
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_32%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <span className="absolute left-6 top-6 font-display text-6xl text-white/[0.04] md:text-8xl">
                      0{index + 1}
                    </span>

                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
                      <div className="relative aspect-[16/10]">
                        {hasEntryImage ? (
                          <Image
                            src={entry.image}
                            alt={entry.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,180,95,0.16),transparent_24%),radial-gradient(circle_at_76%_70%,rgba(121,221,212,0.1),transparent_20%),linear-gradient(180deg,rgba(20,36,54,0.96),rgba(8,18,28,0.96))]" />
                        )}
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.08),rgba(6,12,20,0.74))]" />
                      </div>
                      <div className="absolute right-5 top-5 flex size-14 items-center justify-center rounded-full border border-white/10 bg-black/30 text-[#fff0cf] backdrop-blur-sm">
                        <Icon className="size-6" />
                      </div>
                    </div>

                    <div className="relative mt-7 flex items-start justify-between gap-4">
                      <span className="section-kicker !mb-0">{workTypeLabels[entry.type]}</span>
                      {!hasEntryImage ? (
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-[#dce7ee]">
                          أضف صورة من لوحة الأدمن
                        </span>
                      ) : null}
                    </div>

                    <div className="relative mt-6 max-w-xl">
                      <h3 className="text-3xl leading-[1.2] text-[#faf1e5] md:text-4xl">
                        {entry.title}
                      </h3>
                      <p className="mt-5 text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                        {entry.description}
                      </p>
                    </div>

                    <div className="relative mt-auto pt-12">
                      <Link href={entry.href} className="editorial-link text-sm md:text-base">
                        {journeyCopy.cardKicker}
                        <ArrowLeft className="size-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className={cn(showHeading && "mt-14")}>
            <article className="paper-panel rounded-[34px] p-8 text-center">
              <p className="font-display text-3xl text-[#f8eee2]">لا توجد أعمال بعد</p>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                أضف أول عمل من لوحة الأدمن ليظهر هنا مباشرة.
              </p>
            </article>
          </div>
        )}
      </Container>
    </section>
  );
}
