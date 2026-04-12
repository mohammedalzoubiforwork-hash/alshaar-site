import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { honorsCopy } from "@/lib/site-config";
import type { HonorItem } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

type HonorsTimelineProps = {
  honors: HonorItem[];
  id?: string;
  className?: string;
  showHeading?: boolean;
};

export function HonorsTimeline({
  honors,
  id = "honors",
  className,
  showHeading = true,
}: HonorsTimelineProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={honorsCopy.eyebrow}
            title={honorsCopy.title}
            description={honorsCopy.description}
          />
        ) : null}

        {honors.length > 0 ? (
          <div className={cn("relative pr-4 md:pr-10", showHeading && "mt-16")}>
            <div className="absolute bottom-4 right-[11px] top-4 w-px bg-[linear-gradient(180deg,rgba(121,221,212,0.08),rgba(255,180,95,0.45),rgba(121,221,212,0.08))] md:right-6" />

            <div className="space-y-7 md:space-y-8">
              {honors.map((honor, index) => {
                const hasHonorImage = honor.image.length > 0;

                return (
                  <Reveal key={honor.id} delay={index * 0.08}>
                    <div className="relative pr-10 md:pr-16">
                      <span className="absolute right-0 top-9 flex size-6 items-center justify-center rounded-full border border-[#ffb45f]/26 bg-[#0b1826] md:right-[13px]">
                        <span className="size-2.5 rounded-full bg-[#79ddd4]" />
                      </span>

                      <article className="paper-panel relative overflow-hidden rounded-[32px] p-6 md:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,180,95,0.1),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(121,221,212,0.08),transparent_24%)]" />
                        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.62fr)] lg:items-center">
                          <div className="max-w-2xl">
                            <p className="text-sm tracking-[0.14em] text-[#ffe6b7]/76">
                              {honorsCopy.itemLabelPrefix} {index + 1}
                            </p>
                            <h3 className="mt-3 text-3xl leading-[1.25] text-[#faf1e5] md:text-4xl">
                              {honor.title}
                            </h3>
                            <p className="mt-4 text-base leading-8 text-[#d1c0a8]/84 md:text-lg">
                              {honor.story}
                            </p>
                          </div>

                          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d2032]">
                            <div className="relative aspect-[4/3]">
                              {hasHonorImage ? (
                                <Image
                                  src={honor.image}
                                  alt={honor.title}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 28vw"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,180,95,0.18),transparent_24%),radial-gradient(circle_at_74%_70%,rgba(121,221,212,0.1),transparent_20%),linear-gradient(180deg,#14314b_0%,#091522_100%)]" />
                              )}
                              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.08),rgba(6,12,20,0.76))]" />
                              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                                <span className="text-xs tracking-[0.16em] text-[#fff0cf]/76">
                                  {hasHonorImage ? "صورة التكريم" : "أضف صورة من لوحة الأدمن"}
                                </span>
                                <div className="font-display text-5xl leading-none text-[#fff0cf]/24 md:text-6xl">
                                  {honor.year}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={cn(showHeading && "mt-16")}>
            <article className="paper-panel rounded-[34px] p-8 text-center">
              <p className="font-display text-3xl text-[#f8eee2]">لا توجد تكريمات بعد</p>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                أضف أول تكريم من لوحة الأدمن ليظهر هنا فورًا.
              </p>
            </article>
          </div>
        )}
      </Container>
    </section>
  );
}
