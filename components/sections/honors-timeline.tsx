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
    <section id={id} className={cn("relative py-14 sm:py-16 md:py-24", className)}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={honorsCopy.eyebrow}
            title={honorsCopy.title}
            description={honorsCopy.description}
          />
        ) : null}

        {honors.length > 0 ? (
          <div className={cn("relative pr-2 sm:pr-3 md:pr-10", showHeading && "mt-10 sm:mt-12 md:mt-16")}>
            <div className="absolute bottom-3 right-[7px] top-3 w-px bg-[linear-gradient(180deg,rgba(121,221,212,0.08),rgba(255,180,95,0.45),rgba(121,221,212,0.08))] md:bottom-4 md:right-6 md:top-4" />

            <div className="space-y-5 md:space-y-8">
              {honors.map((honor, index) => {
                const hasHonorImage = honor.image.length > 0;

                return (
                  <Reveal key={honor.id} delay={index * 0.08}>
                    <div className="relative pr-6 sm:pr-8 md:pr-16">
                      <span className="absolute right-0 top-6 flex size-5 items-center justify-center rounded-full border border-[#ffb45f]/26 bg-[#0b1826] md:right-[13px] md:top-9 md:size-6">
                        <span className="size-2.5 rounded-full bg-[#79ddd4]" />
                      </span>

                      <article className="paper-panel relative overflow-hidden rounded-[24px] p-4 sm:rounded-[28px] sm:p-5 md:rounded-[32px] md:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,180,95,0.1),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(121,221,212,0.08),transparent_24%)]" />
                        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.62fr)] lg:items-center">
                          <div className="max-w-2xl">
                            <p className="text-sm font-medium text-[#ffe6b7]/76">
                              {honorsCopy.itemLabelPrefix} {index + 1}
                            </p>
                            <h3 className="mt-3 text-[1.6rem] leading-[1.25] text-[#faf1e5] sm:text-[1.8rem] md:text-4xl">
                              {honor.title}
                            </h3>
                            <p className="mt-3 text-[0.96rem] leading-7 text-[#d1c0a8]/84 sm:leading-8 md:mt-4 md:text-lg">
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
                                  loading="lazy"
                                  quality={72}
                                  sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(100vw - 4rem), 28vw"
                                  className="object-cover object-center"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,180,95,0.18),transparent_24%),radial-gradient(circle_at_74%_70%,rgba(121,221,212,0.1),transparent_20%),linear-gradient(180deg,#14314b_0%,#091522_100%)]" />
                              )}
                              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.08),rgba(6,12,20,0.76))]" />
                              <div className="absolute bottom-4 left-4 font-display text-4xl leading-none text-[#fff0cf]/24 sm:text-5xl md:text-6xl">
                                {honor.year}
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
            <article className="paper-panel rounded-[30px] p-6 text-center sm:rounded-[34px] sm:p-8">
              <p className="font-display text-3xl text-[#f8eee2]">لا توجد تكريمات بعد</p>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                ستظهر التكريمات هنا عند إضافتها.
              </p>
            </article>
          </div>
        )}
      </Container>
    </section>
  );
}
