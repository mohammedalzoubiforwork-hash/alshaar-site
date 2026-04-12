import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  accent,
  actionLabel,
  actionHref,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
      <div aria-hidden className="ambient-glow right-[6%] top-12 h-52 w-52 bg-[#ff8d6c]/16 float-slow" />
      <div aria-hidden className="ambient-glow left-[8%] top-36 h-44 w-44 bg-[#79ddd4]/14 drift-slow" />

      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end">
          <Reveal className="max-w-4xl">
            <span className="section-kicker">{eyebrow}</span>
            <h1 className="text-balance mt-7 text-5xl leading-[1.18] text-[#fbf3e8] md:text-7xl lg:text-[5.3rem]">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#d6c6b1]/82 md:text-xl md:leading-10">
              {description}
            </p>
            {actionLabel && actionHref ? (
              <div className="mt-9">
                <Link href={actionHref} className="hero-button hero-button-primary">
                  {actionLabel}
                  <ArrowLeft className="size-4" />
                </Link>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mesh-panel relative overflow-hidden rounded-[38px] p-6 md:p-8">
              <div className="soft-grid absolute inset-0 opacity-25" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,180,95,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(121,221,212,0.14),transparent_22%)]" />
              <div className="relative">
                <span className="story-chip">صفحة مستقلة</span>
                <p className="mt-5 font-display text-3xl leading-[1.5] text-[#f9f1e4] md:text-4xl">
                  {accent ?? "كل صفحة هنا فصل مستقل، لكنه ينتمي إلى روح واحدة وإيقاع بصري متماسك."}
                </p>
                <div className="mt-8 h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,180,95,0.35),rgba(121,221,212,0.22),rgba(255,255,255,0.02))]" />
                <p className="mt-6 text-sm leading-8 text-[#c8b9a1]/78">
                  تنقل أوضح، ألوان أكثر إشراقًا، ومساحة تمنح المحتوى حضورًا من دون
                  ازدحام أو تشويش.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
