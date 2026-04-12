import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

type HonorsTimelineProps = {
  honors: SiteContent["honors"];
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
            eyebrow={honors.eyebrow}
            title={honors.title}
            description={honors.description}
          />
        ) : null}

        <div className={cn("relative pr-4 md:pr-10", showHeading && "mt-16")}>
          <div className="absolute bottom-4 right-[11px] top-4 w-px bg-[linear-gradient(180deg,rgba(223,202,169,0.08),rgba(223,202,169,0.45),rgba(223,202,169,0.08))] md:right-6" />

          <div className="space-y-7 md:space-y-8">
            {honors.items.map((honor, index) => {
              const hasHonorImage = honor.image.length > 0;

              return (
                <Reveal key={honor.year} delay={index * 0.08}>
                <div className="relative pr-10 md:pr-16">
                  <span className="absolute right-0 top-9 flex size-6 items-center justify-center rounded-full border border-[#caa46d]/26 bg-[#120d0a] md:right-[13px]">
                    <span className="size-2.5 rounded-full bg-[#d8b784]" />
                  </span>

                  <article className="paper-panel relative overflow-hidden rounded-[32px] p-6 md:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,177,119,0.08),transparent_22%)]" />
                    <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.62fr)] lg:items-center">
                      <div className="max-w-2xl">
                        <p className="text-sm tracking-[0.2em] text-[#c5ad87]/72 uppercase">
                          {honors.itemLabelPrefix} {index + 1}
                        </p>
                        <h3 className="mt-3 text-3xl leading-[1.25] text-[#faf1e5] md:text-4xl">
                          {honor.title}
                        </h3>
                        <p className="mt-4 text-base leading-8 text-[#d1c0a8]/84 md:text-lg">
                          {honor.story}
                        </p>
                      </div>

                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#140f0b]">
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
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(221,186,134,0.18),transparent_24%),radial-gradient(circle_at_74%_70%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,#241a15_0%,#120d0a_100%)]" />
                          )}
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,4,0.08),rgba(7,5,4,0.76))]" />
                          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                            <span className="text-xs tracking-[0.22em] text-[#dec7a2]/74 uppercase">
                              {hasHonorImage ? "صورة التكريم" : "أضف صورة من الأدمن"}
                            </span>
                            <div className="font-display text-5xl leading-none text-[#f2ddba]/26 md:text-6xl">
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
      </Container>
    </section>
  );
}
