import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/site-content-types";

type WriterPulseProps = {
  pulse: SiteContent["pulse"];
};

export function WriterPulse({ pulse }: WriterPulseProps) {
  return (
    <section id="pulse" className="relative py-24 md:py-32">
      <Container>
        <div className="paper-panel relative overflow-hidden rounded-[42px] border border-white/10 bg-[#17120f]/84">
          <div className="absolute inset-y-0 left-0 hidden w-[38%] lg:block">
            <Image
              src="/art/writer-portrait.svg"
              alt={pulse.imageAlt}
              fill
              sizes="38vw"
              className="object-cover object-center opacity-42"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,8,6,0.08),rgba(11,8,6,0.7))]" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(211,173,117,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_38%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[260px] lg:hidden">
              <Image
                src="/art/writer-portrait.svg"
                alt={pulse.mobileImageAlt}
                fill
                sizes="100vw"
                className="object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,6,0.06),rgba(12,8,6,0.8))]" />
            </div>

            <div className="hidden lg:block" />

            <Reveal className="relative z-10 p-7 md:p-10 lg:p-16">
              <span className="section-kicker">{pulse.eyebrow}</span>
              <h2 className="mt-6 text-4xl leading-[1.2] text-[#f8eee2] md:text-5xl lg:text-6xl">
                {pulse.title}
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-[#d6c5ae]/84 md:text-xl md:leading-10">
                {pulse.description}
              </p>

              <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-[#ccb897]/82 backdrop-blur-sm md:max-w-xl">
                {pulse.note}
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <span className="rounded-full border border-[#c7a877]/22 bg-[#c7a877]/8 px-4 py-2 text-sm text-[#e8d8bf]">
                  {pulse.badgeLabel}
                </span>
                <span className="text-sm text-[#bba68a]/78">
                  {pulse.aside}
                </span>
              </div>

              <div className="mt-12">
                <div className="pulse-line" />
                <div className="mt-4 flex items-center gap-3 text-xs tracking-[0.22em] text-[#c9b18c]/76 uppercase">
                  <span className="sound-dot" />
                  {pulse.pulseCaption}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
