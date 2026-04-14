import {
  audioCopy,
  honorsCopy,
  journeyCopy,
  navigationLinks,
  newsCopy,
  quoteCopy,
  writerCopy,
} from "@/lib/site-config";

export type SitePageSummary = {
  id: "writer" | "journey" | "honors" | "news" | "quote" | "audio";
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

export const sitePageSummaries: SitePageSummary[] = [
  {
    id: "writer",
    label: "نبض الكاتب",
    href: navigationLinks.find((link) => link.id === "writer")?.href ?? "/writer",
    eyebrow: writerCopy.eyebrow,
    title: writerCopy.title,
    description: writerCopy.note,
  },
  {
    id: "journey",
    label: "الأعمال",
    href: navigationLinks.find((link) => link.id === "journey")?.href ?? "/journey",
    eyebrow: journeyCopy.eyebrow,
    title: journeyCopy.title,
    description: journeyCopy.description,
  },
  {
    id: "honors",
    label: "التكريمات",
    href: navigationLinks.find((link) => link.id === "honors")?.href ?? "/honors",
    eyebrow: honorsCopy.eyebrow,
    title: honorsCopy.title,
    description: honorsCopy.description,
  },
  {
    id: "news",
    label: "الأخبار",
    href: navigationLinks.find((link) => link.id === "news")?.href ?? "/news",
    eyebrow: newsCopy.eyebrow,
    title: newsCopy.title,
    description: newsCopy.description,
  },
  {
    id: "quote",
    label: "الاقتباسات",
    href: navigationLinks.find((link) => link.id === "quote")?.href ?? "/quote",
    eyebrow: quoteCopy.eyebrow,
    title: quoteCopy.title,
    description: quoteCopy.description,
  },
  {
    id: "audio",
    label: "الصوتيات",
    href: navigationLinks.find((link) => link.id === "audio")?.href ?? "/audio",
    eyebrow: audioCopy.eyebrow,
    title: audioCopy.title,
    description: audioCopy.description,
  },
];

export const publicSitePaths = ["/", ...new Set(sitePageSummaries.map((page) => page.href))];
