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
    <section id={id} className={cn("relative py-14 sm:py-16 md:py-24", className)}>
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
              "grid gap-4 md:auto-rows-[minmax(250px,auto)] md:grid-cols-12 md:gap-5",
              showHeading && "mt-10 sm:mt-12 md:mt-14",
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
                      "paper-panel group relative flex h-full flex-col overflow-hidden rounded-[24px] p-4 sm:rounded-[28px] sm:p-5 md:rounded-[34px] md:p-8",
                      toneMap[index % toneMap.length],
                    )}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_32%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 font-display text-4xl text-white/[0.04] sm:left-5 sm:top-5 sm:text-5xl md:left-6 md:top-6 md:text-8xl">
                      0{index + 1}
                    </span>

                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
                      <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                        {hasEntryImage ? (
                          <Image
                            src={entry.image}
                            alt={entry.title}
                            fill
                            loading="lazy"
                            quality={72}
                            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) 50vw, 33vw"
                            className="object-cover object-top transition duration-700 group-hover:scale-[1.04] sm:object-center"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,180,95,0.16),transparent_24%),radial-gradient(circle_at_76%_70%,rgba(121,221,212,0.1),transparent_20%),linear-gradient(180deg,rgba(20,36,54,0.96),rgba(8,18,28,0.96))]" />
                        )}
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.08),rgba(6,12,20,0.74))]" />
                      </div>
                      <div className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-[#fff0cf] backdrop-blur-sm sm:size-12 md:right-5 md:top-5 md:size-14">
                        <Icon className="size-5 md:size-6" />
                      </div>
                    </div>

                    <div className="relative mt-6 flex items-start justify-between gap-3 md:mt-7">
                      <span className="section-kicker !mb-0">{workTypeLabels[entry.type]}</span>
                    </div>

                    <div className="relative mt-5 max-w-xl md:mt-6">
                      <h3 className="text-[1.6rem] leading-[1.25] text-[#faf1e5] sm:text-[1.8rem] md:text-4xl">
                        {entry.title}
                      </h3>
                      <p className="mt-4 text-[0.96rem] leading-7 text-[#cfbea7]/84 sm:leading-8 md:mt-5 md:text-lg">
                        {entry.description}
                      </p>
                    </div>

                    <div className="relative mt-auto pt-8 md:pt-12">
                      <Link
                        href={entry.href}
                        prefetch={false}
                        className="editorial-link text-sm md:text-base"
                      >
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
            <article className="paper-panel rounded-[30px] p-6 text-center sm:rounded-[34px] sm:p-8">
              <p className="font-display text-3xl text-[#f8eee2]">لا توجد أعمال بعد</p>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                سيتم إضافة الأعمال قريبًا.
              </p>
            </article>
          </div>
        )}
      </Container>
    </section>
  );
}
