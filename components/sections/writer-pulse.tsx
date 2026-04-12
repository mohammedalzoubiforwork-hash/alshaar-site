import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { writerCopy } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type WriterPulseProps = {
  writerImage: string;
  id?: string;
  className?: string;
  showHeading?: boolean;
};

export function WriterPulse({
  writerImage,
  id = "pulse",
  className,
  showHeading = true,
}: WriterPulseProps) {
  const hasWriterImage = writerImage.length > 0;

  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container>
        <div className="paper-panel relative overflow-hidden rounded-[42px] border border-white/10 bg-[#17120f]/84">
          <div className="absolute inset-y-0 left-0 hidden w-[38%] lg:block">
            {hasWriterImage ? (
              <Image
                src={writerImage}
                alt={writerCopy.imageAlt}
                fill
                sizes="38vw"
                className="object-cover object-center opacity-42"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(217,180,119,0.2),transparent_22%),linear-gradient(180deg,#231a14_0%,#120d0a_100%)]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,8,6,0.08),rgba(11,8,6,0.7))]" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(211,173,117,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_38%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[260px] lg:hidden">
              {hasWriterImage ? (
                <Image
                  src={writerImage}
                  alt={writerCopy.mobileImageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-45"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(217,180,119,0.22),transparent_24%),linear-gradient(180deg,#231a14_0%,#120d0a_100%)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,6,0.06),rgba(12,8,6,0.8))]" />
            </div>

            <div className="hidden lg:block" />

            <Reveal className="relative z-10 p-7 md:p-10 lg:p-16">
              {showHeading ? (
                <>
                  <span className="section-kicker">{writerCopy.eyebrow}</span>
                  <h2 className="mt-6 text-4xl leading-[1.2] text-[#f8eee2] md:text-5xl lg:text-6xl">
                    {writerCopy.title}
                  </h2>
                </>
              ) : null}
              <p
                className={cn(
                  "max-w-2xl text-lg leading-9 text-[#d6c5ae]/84 md:text-xl md:leading-10",
                  showHeading ? "mt-8" : "mt-2",
                )}
              >
                {writerCopy.description}
              </p>

              <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-[#ccb897]/82 backdrop-blur-sm md:max-w-xl">
                {writerCopy.note}
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <span className="rounded-full border border-[#c7a877]/22 bg-[#c7a877]/8 px-4 py-2 text-sm text-[#e8d8bf]">
                  {writerCopy.badgeLabel}
                </span>
                <span className="text-sm text-[#bba68a]/78">{writerCopy.aside}</span>
              </div>

              <div className="mt-12">
                <div className="pulse-line" />
                <div className="mt-4 flex items-center gap-3 text-xs tracking-[0.22em] text-[#c9b18c]/76 uppercase">
                  <span className="sound-dot" />
                  {writerCopy.pulseCaption}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
