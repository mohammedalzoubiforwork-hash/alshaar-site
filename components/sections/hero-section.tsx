"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, Play, Volume2 } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/site/site-header";
import type { LinkItem, SiteContent } from "@/lib/site-content-types";

type HeroSectionProps = {
  site: SiteContent["site"];
  hero: SiteContent["hero"];
  navigationLinks: LinkItem[];
};

export function HeroSection({
  site,
  hero,
  navigationLinks,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const hasHeroImage = hero.image.length > 0;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-screen overflow-clip"
    >
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="ambient-glow left-[4%] top-[10%] h-72 w-72 bg-[#b58c59]/14"
      />
      <motion.div
        aria-hidden
        style={{ y: visualY }}
        className="absolute inset-y-[14%] left-[4%] hidden w-[44%] lg:block"
      >
        <div className="relative h-full overflow-hidden rounded-[42px] border border-white/10 bg-[#15100d] shadow-[0_32px_120px_rgba(0,0,0,0.44)]">
          {hasHeroImage ? (
            <Image
              src={hero.image}
              alt={hero.heroImageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 0vw, 44vw"
              className="object-cover object-center opacity-90"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(217,180,119,0.3),transparent_22%),radial-gradient(circle_at_78%_64%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,#231a14_0%,#110c09_100%)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,4,0.22),rgba(9,7,5,0.74))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(215,170,107,0.14),transparent_22%),radial-gradient(circle_at_25%_72%,rgba(255,255,255,0.06),transparent_18%)]" />
          <div className="absolute right-6 top-6 max-w-[16rem] rounded-[26px] border border-white/10 bg-black/18 p-4 backdrop-blur-md">
            <p className="text-xs leading-6 text-[#f1e4d0]/82">
              {hero.visualNoteTop}
            </p>
          </div>
          <div className="absolute bottom-6 left-6 max-w-[18rem] rounded-[26px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md">
            <p className="text-xs leading-6 text-[#f1e4d0]/72">
              {hero.visualNoteBottom}
            </p>
          </div>
        </div>
      </motion.div>

      <SiteHeader site={site} navigationLinks={navigationLinks} className="relative" />

      <Container className="relative flex min-h-[calc(100vh-7rem)] flex-col">
        <div className="mt-6 flex justify-end lg:hidden">
          <div className="sound-pill">
            <span className="sound-dot" />
            <Volume2 className="size-4" />
            {hero.audioPillMobileLabel}
          </div>
        </div>

        <div className="grid flex-1 items-center gap-12 py-14 md:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative z-10 max-w-3xl"
          >
            <span className="section-kicker">{hero.sectionKicker}</span>
            <h1 className="text-balance mt-7 text-5xl leading-[1.18] text-[#fbf3e8] md:text-7xl lg:text-[5.7rem] lg:leading-[1.1]">
              {hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#d6c6b1]/82 md:text-xl md:leading-10">
              {hero.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={hero.primaryActionHref}
                className="hero-button hero-button-primary"
              >
                {hero.primaryActionLabel}
                <ArrowLeft className="size-4" />
              </Link>
              <Link
                href={hero.secondaryActionHref}
                className="hero-button hero-button-secondary"
              >
                {hero.secondaryActionLabel}
                <ArrowLeft className="size-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center">
              <div className="sound-pill">
                <div className="flex size-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04]">
                  <Play className="size-4 fill-current" />
                </div>
                {hero.introPillLabel}
              </div>
              <p className="max-w-md text-sm leading-7 text-[#bca98d]/82">
                {hero.introCaption}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="relative min-h-[420px] lg:hidden"
          style={{ y: visualY }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[38px] border border-white/10 bg-[#15100d] shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
            {hasHeroImage ? (
              <Image
                src={hero.image}
                alt={hero.mobileHeroImageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-90"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(217,180,119,0.3),transparent_22%),radial-gradient(circle_at_82%_68%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#231a14_0%,#110c09_100%)]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,4,0.2),rgba(10,7,5,0.72))]" />
          </div>
            <div className="absolute left-5 top-5 max-w-[14rem] rounded-[24px] border border-white/10 bg-black/18 p-4 backdrop-blur-md">
              <p className="text-xs leading-6 text-[#f1e4d0]/78">
                {hero.mobileVisualNote}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="self-start pb-6"
        >
          <Link href={hero.secondaryActionHref} className="sound-pill">
            <ArrowDown className="size-4" />
            {hero.scrollPrompt}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
