import type { SiteContent } from "@/lib/site-content-types";

function hasText(value: string) {
  return value.trim().length > 0;
}

export function getRenderableSiteContent(content: SiteContent): SiteContent {
  return {
    ...content,
    works: content.works.filter(
      (item) => hasText(item.title) || hasText(item.description) || hasText(item.image),
    ),
    honors: content.honors.filter(
      (item) =>
        hasText(item.year) || hasText(item.title) || hasText(item.story) || hasText(item.image),
    ),
    news: content.news.filter(
      (item) =>
        hasText(item.date) ||
        hasText(item.title) ||
        hasText(item.description) ||
        hasText(item.image),
    ),
    quotes: content.quotes.filter((item) => hasText(item.text)),
    audioTracks: content.audioTracks.filter((item) => hasText(item.file)),
  };
}
