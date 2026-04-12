import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/lib/site-content-types";

type HonorsTimelineProps = {
  honors: SiteContent["honors"];
};

export function HonorsTimeline({ honors }: HonorsTimelineProps) {
  return (
    <section id="honors" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={honors.eyebrow}
          title={honors.title}
          description={honors.description}
        />

        <div className="relative mt-16 pr-4 md:pr-10">
          <div className="absolute bottom-4 right-[11px] top-4 w-px bg-[linear-gradient(180deg,rgba(223,202,169,0.08),rgba(223,202,169,0.45),rgba(223,202,169,0.08))] md:right-6" />

          <div className="space-y-7 md:space-y-8">
            {honors.items.map((honor, index) => (
              <Reveal key={honor.year} delay={index * 0.08}>
                <div className="relative pr-10 md:pr-16">
                  <span className="absolute right-0 top-9 flex size-6 items-center justify-center rounded-full border border-[#caa46d]/26 bg-[#120d0a] md:right-[13px]">
                    <span className="size-2.5 rounded-full bg-[#d8b784]" />
                  </span>

                  <article className="paper-panel relative overflow-hidden rounded-[32px] p-6 md:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,177,119,0.08),transparent_22%)]" />
                    <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
                      <div className="font-display text-5xl leading-none text-[#d9b681]/26 md:text-7xl">
                        {honor.year}
                      </div>
                    </div>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
