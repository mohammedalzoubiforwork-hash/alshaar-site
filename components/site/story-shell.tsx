import type { ReactNode } from "react";
import { SiteFooter } from "@/components/sections/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { SiteHeader } from "@/components/site/site-header";
import type { LinkItem, SiteContent } from "@/lib/site-content-types";

type StoryShellProps = {
  site: SiteContent["site"];
  navigationLinks: LinkItem[];
  footer: SiteContent["footer"];
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
};

export function StoryShell({
  site,
  navigationLinks,
  footer,
  eyebrow,
  title,
  description,
  accent,
  actionLabel,
  actionHref,
  children,
}: StoryShellProps) {
  return (
    <main className="page-shell">
      <div
        aria-hidden
        className="ambient-glow right-[-8rem] top-[12rem] h-[24rem] w-[24rem] bg-[#876038]/18 drift-slow"
      />
      <div
        aria-hidden
        className="ambient-glow left-[-6rem] top-[38rem] h-[22rem] w-[22rem] bg-[#6e8091]/12 float-slow"
      />
      <SiteHeader site={site} navigationLinks={navigationLinks} />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        accent={accent}
        actionLabel={actionLabel}
        actionHref={actionHref}
      />
      {children}
      <SiteFooter footer={footer} />
    </main>
  );
}
