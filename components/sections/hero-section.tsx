"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, Play, Volume2 } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
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
          <Image
            src="/art/hero-scene.svg"
            alt={hero.heroImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 0vw, 44vw"
            className="object-cover object-center opacity-90"
          />
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

      <Container className="relative flex min-h-screen flex-col py-5 md:py-7">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[32px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl lg:rounded-full lg:px-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl text-[#f5ecdc] md:text-3xl">
                  {site.brandName}
                </p>
                <p className="mt-1 text-sm text-[#cdb89a]/78">
                  {site.tagline}
                </p>
              </div>
              <div className="sound-pill lg:hidden">
                <span className="sound-dot" />
                <Volume2 className="size-4" />
                {hero.audioPillMobileLabel}
              </div>
            </div>

            <nav className="overflow-x-auto">
              <ul className="flex min-w-max items-center gap-2 text-sm text-[#dccab1]/80">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-full px-4 py-2 hover:bg-white/[0.05] hover:text-[#f6ecdd]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden lg:flex">
              <div className="sound-pill">
                <span className="sound-dot" />
                <Volume2 className="size-4" />
                {hero.audioPillDesktopLabel}
              </div>
            </div>
          </div>
        </motion.header>

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
              <Image
                src="/art/hero-scene.svg"
                alt={hero.mobileHeroImageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-90"
              />
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
          <Link href="#journey" className="sound-pill">
            <ArrowDown className="size-4" />
            {hero.scrollPrompt}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
