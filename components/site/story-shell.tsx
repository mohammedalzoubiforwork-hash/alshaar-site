import type { ReactNode } from "react";
import { SiteFooter } from "@/components/sections/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { SiteHeader } from "@/components/site/site-header";

type StoryShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  currentPath: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
};

export function StoryShell({
  eyebrow,
  title,
  description,
  currentPath,
  actionLabel,
  actionHref,
  children,
}: StoryShellProps) {
  return (
    <main className="page-shell">
      <div
        aria-hidden
        className="ambient-glow right-[-8rem] top-[12rem] h-[24rem] w-[24rem] bg-[#ff8d6c]/18 drift-slow"
      />
      <div
        aria-hidden
        className="ambient-glow left-[-6rem] top-[38rem] h-[22rem] w-[22rem] bg-[#79ddd4]/12 float-slow"
      />
      <SiteHeader currentPath={currentPath} />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actionLabel={actionLabel}
        actionHref={actionHref}
      />
      {children}
      <SiteFooter />
    </main>
  );
}
