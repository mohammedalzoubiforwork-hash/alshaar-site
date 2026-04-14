import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20">
      <Container>
        <Reveal className="max-w-4xl">
          <span className="section-kicker">{eyebrow}</span>
          <h1 className="text-balance mt-4 text-[clamp(2.2rem,10vw,4.8rem)] leading-[1.18] text-[#fff6ee] drop-shadow-[0_0_24px_rgba(255,182,118,0.1)] sm:mt-5 md:mt-7 md:text-7xl lg:text-[5.3rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[#e2d4c0]/86 sm:mt-5 sm:text-base sm:leading-8 md:mt-6 md:text-lg md:leading-9">
            {description}
          </p>
          {actionLabel && actionHref ? (
            <div className="mt-7 sm:mt-8">
              <Link href={actionHref} className="hero-button hero-button-primary w-full sm:w-auto">
                {actionLabel}
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
