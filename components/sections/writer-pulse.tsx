import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { writerCopy } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type WriterPulseProps = {
  writerImage: string;
  biography: string;
  id?: string;
  className?: string;
  showHeading?: boolean;
};

export function WriterPulse({
  writerImage,
  biography,
  id = "pulse",
  className,
  showHeading = true,
}: WriterPulseProps) {
  const hasWriterImage = writerImage.length > 0;

  return (
    <section id={id} className={cn("relative py-14 sm:py-16 md:py-24", className)}>
      <Container>
        <div className="paper-panel relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,197,109,0.08),transparent_32%),linear-gradient(180deg,rgba(18,41,61,0.9),rgba(10,28,44,0.84))] sm:rounded-[32px] md:rounded-[42px]">
          <div className="absolute inset-y-0 left-0 hidden w-[38%] lg:block">
            {hasWriterImage ? (
              <Image
                src={writerImage}
                alt={writerCopy.imageAlt}
                fill
                loading="lazy"
                quality={72}
                sizes="(max-width: 1023px) 0px, 38vw"
                className="object-cover object-center opacity-42"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,180,95,0.22),transparent_22%),linear-gradient(180deg,#173551_0%,#0b1826_100%)]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,27,0.04),rgba(7,17,27,0.68))]" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,180,95,0.2),transparent_18%),radial-gradient(circle_at_18%_82%,rgba(121,221,212,0.1),transparent_18%),radial-gradient(circle_at_54%_20%,rgba(255,157,182,0.08),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_38%)]" />

          <div className="relative grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative aspect-[4/3] min-h-0 overflow-hidden lg:hidden">
              {hasWriterImage ? (
                <Image
                  src={writerImage}
                  alt={writerCopy.mobileImageAlt}
                  fill
                  loading="lazy"
                  quality={72}
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 0px"
                  className="object-cover object-top opacity-45"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,180,95,0.22),transparent_24%),linear-gradient(180deg,#173551_0%,#0b1826_100%)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,28,0.06),rgba(8,18,28,0.8))]" />
            </div>

            <div className="hidden lg:block" />

            <Reveal className="relative z-10 p-4 sm:p-6 md:p-10 lg:p-16">
              {showHeading ? (
                <>
                  <span className="section-kicker">{writerCopy.eyebrow}</span>
                  <h2 className="mt-4 text-[clamp(2rem,8.8vw,3.5rem)] leading-[1.18] text-[#fff6ec] sm:mt-5 md:mt-6 md:text-5xl lg:text-6xl">
                    {writerCopy.title}
                  </h2>
                </>
              ) : null}
              <p
                className={cn(
                  "max-w-2xl text-[0.98rem] leading-7 text-[#dce7ee]/84 sm:text-base sm:leading-8 md:text-xl md:leading-10",
                  showHeading ? "mt-8" : "mt-2",
                )}
              >
                {biography}
              </p>

              <div className="mt-7 flex flex-wrap items-start gap-3 sm:mt-8 sm:items-center sm:gap-4 md:mt-10">
                <span className="rounded-full border border-[#ffb45f]/28 bg-[linear-gradient(135deg,rgba(255,180,95,0.16),rgba(255,157,182,0.08))] px-4 py-2 text-sm text-[#fff0cf]">
                  {writerCopy.badgeLabel}
                </span>
                <span className="text-sm text-[#d2e0e8]/78">{writerCopy.aside}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
