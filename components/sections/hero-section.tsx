import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { heroCopy } from "@/lib/site-config";
import { SiteHeader } from "@/components/site/site-header";

type HeroSectionProps = {
  heroImage: string;
};

export function HeroSection({ heroImage }: HeroSectionProps) {
  const hasHeroImage = heroImage.length > 0;

  return (
    <section id="home" className="relative isolate overflow-clip sm:min-h-[100svh] lg:min-h-screen">
      <div
        aria-hidden
        className="ambient-glow left-[4%] top-[10%] h-72 w-72 bg-[#ff8d6c]/22 drift-slow"
      />
      <div
        aria-hidden
        className="ambient-glow right-[10%] top-[8%] h-64 w-64 bg-[#7ee6dc]/18 float-slow"
      />
      <SiteHeader currentPath="/" className="relative" showMobileQuickLinks={false} />

      <Container className="relative flex min-h-0 flex-col pb-4 sm:min-h-[calc(100svh-6.5rem)] sm:pb-0 lg:min-h-[calc(100vh-7rem)]">
        <div className="grid flex-1 items-start gap-4 py-4 sm:items-center sm:gap-8 sm:py-10 md:gap-10 md:py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:py-20">
          <Reveal
            delay={0.18}
            y={32}
            className="order-2 relative min-h-[11rem] overflow-hidden rounded-[28px] aspect-[16/9] sm:min-h-[22rem] sm:rounded-[38px] lg:order-1 lg:min-h-[36rem] lg:rounded-[42px] lg:aspect-auto xl:min-h-[42rem]"
          >
            <div className="hero-frame absolute inset-0 rounded-[28px] border border-white/10 bg-[#0c1f31] sm:rounded-[38px] lg:rounded-[42px]">
              {hasHeroImage ? (
                <Image
                  src={heroImage}
                  alt={heroCopy.heroImageAlt}
                  fill
                  priority
                  quality={78}
                  sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), 44vw"
                  className="object-cover object-top opacity-90 sm:object-center"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(255,180,95,0.28),transparent_22%),radial-gradient(circle_at_78%_64%,rgba(121,221,212,0.12),transparent_20%),linear-gradient(180deg,#14314b_0%,#091522_100%)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.18),rgba(7,13,22,0.72))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(255,180,95,0.16),transparent_22%),radial-gradient(circle_at_25%_72%,rgba(121,221,212,0.08),transparent_18%)]" />
            </div>
          </Reveal>

          <Reveal delay={0.12} y={28} className="order-1 relative z-10 max-w-3xl lg:order-2">
            <span className="section-kicker">{heroCopy.sectionKicker}</span>
            <h1 className="text-balance mt-3 text-[clamp(2.3rem,10vw,4.7rem)] leading-[1.18] text-[#fff7ee] sm:mt-5 md:mt-7 md:text-7xl lg:text-[5.7rem] lg:leading-[1.1]">
              {heroCopy.title}
            </h1>
            {heroCopy.subtitle ? (
              <p className="mt-3 max-w-xl text-[0.98rem] leading-7 text-[#dbe8ef]/84 sm:mt-6 sm:text-base sm:leading-8 md:mt-7 md:text-xl md:leading-10">
                {heroCopy.subtitle}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-10">
              <Link
                href={heroCopy.primaryActionHref}
                className="hero-button hero-button-primary w-full sm:w-auto"
              >
                {heroCopy.primaryActionLabel}
                <ArrowLeft className="size-4" />
              </Link>
              <Link
                href={heroCopy.secondaryActionHref}
                className="hero-button hero-button-secondary w-full sm:w-auto"
              >
                {heroCopy.secondaryActionLabel}
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.34} y={18} className="hidden self-stretch sm:block sm:self-start sm:pb-6">
          <Link
            href={heroCopy.secondaryActionHref}
            className="editorial-link justify-center text-sm sm:justify-start md:text-base"
          >
            <ArrowDown className="size-4" />
            {heroCopy.scrollPrompt}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
