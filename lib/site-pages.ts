import type { LinkItem, SiteContent } from "@/lib/site-content-types";

export type SitePageSummary = {
  id:
    | "writer"
    | "journey"
    | "honors"
    | "news"
    | "quote"
    | "audio";
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

function getHref(links: LinkItem[], id: string, fallback: string) {
  return links.find((link) => link.id === id)?.href ?? fallback;
}

export function getPageSummaries(content: SiteContent): SitePageSummary[] {
  return [
    {
      id: "writer",
      label: "نبض الكاتب",
      href: getHref(content.navigationLinks, "nav-pulse", "/writer"),
      eyebrow: content.pulse.eyebrow,
      title: content.pulse.title,
      description: content.pulse.note,
    },
    {
      id: "journey",
      label: "المسارات",
      href: getHref(content.navigationLinks, "nav-journey", "/journey"),
      eyebrow: content.journey.eyebrow,
      title: content.journey.title,
      description: content.journey.description,
    },
    {
      id: "honors",
      label: "التكريمات",
      href: getHref(content.navigationLinks, "nav-honors", "/honors"),
      eyebrow: content.honors.eyebrow,
      title: content.honors.title,
      description: content.honors.description,
    },
    {
      id: "news",
      label: "الأخبار",
      href: getHref(content.navigationLinks, "nav-news", "/news"),
      eyebrow: content.news.eyebrow,
      title: content.news.title,
      description: content.news.description,
    },
    {
      id: "quote",
      label: "الاقتباس",
      href: getHref(content.navigationLinks, "nav-quote", "/quote"),
      eyebrow: content.quote.eyebrow,
      title: content.quote.title,
      description: content.quote.cardCaption,
    },
    {
      id: "audio",
      label: "الصوت",
      href: getHref(content.navigationLinks, "nav-audio", "/audio"),
      eyebrow: content.audio.eyebrow,
      title: content.audio.title,
      description: content.audio.description,
    },
  ];
}
