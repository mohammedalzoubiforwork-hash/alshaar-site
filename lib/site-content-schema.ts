import baseSiteContent from "@/content/site-content.json";
import type {
  HonorItem,
  JourneyEntry,
  JourneyIconName,
  LinkItem,
  NewsItem,
  SiteContent,
  SocialIconName,
  SocialLink,
} from "@/lib/site-content-types";

const journeyIcons = new Set<JourneyIconName>([
  "feather",
  "book-open",
  "drama",
  "user-round",
]);

const socialIcons = new Set<SocialIconName>([
  "instagram",
  "youtube",
  "send",
  "mail",
]);

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function imagePathValue(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  if (value.length === 0) {
    return "";
  }

  return value.startsWith("/") ? value : fallback;
}

function numberValue(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeArray<T>(
  value: unknown,
  fallback: T[],
  normalizeItem: (item: unknown, fallbackItem: T, index: number) => T,
) {
  if (!Array.isArray(value) || value.length === 0) {
    return cloneValue(fallback);
  }

  return value.map((item, index) =>
    normalizeItem(item, fallback[index] ?? fallback[fallback.length - 1], index),
  );
}

function normalizeLinkItem(
  value: unknown,
  fallback: LinkItem,
  prefix: string,
  index: number,
): LinkItem {
  const record = isRecord(value) ? value : {};

  return {
    id: stringValue(record.id, `${prefix}-${index + 1}`),
    label: stringValue(record.label, fallback.label),
    href: stringValue(record.href, fallback.href),
  };
}

function normalizeSocialLink(
  value: unknown,
  fallback: SocialLink,
  index: number,
): SocialLink {
  const record = isRecord(value) ? value : {};
  const icon = record.icon;

  return {
    ...normalizeLinkItem(record, fallback, "social", index),
    icon:
      typeof icon === "string" && socialIcons.has(icon as SocialIconName)
        ? (icon as SocialIconName)
        : fallback.icon,
  };
}

function normalizeJourneyEntry(
  value: unknown,
  fallback: JourneyEntry,
  index: number,
): JourneyEntry {
  const record = isRecord(value) ? value : {};
  const icon = record.icon;

  return {
    id: stringValue(record.id, `journey-${index + 1}`),
    icon:
      typeof icon === "string" && journeyIcons.has(icon as JourneyIconName)
        ? (icon as JourneyIconName)
        : fallback.icon,
    title: stringValue(record.title, fallback.title),
    description: stringValue(record.description, fallback.description),
    image: imagePathValue(record.image, fallback.image),
    ctaLabel: stringValue(record.ctaLabel, fallback.ctaLabel),
    ctaHref: stringValue(record.ctaHref, fallback.ctaHref),
  };
}

function normalizeHonorItem(
  value: unknown,
  fallback: HonorItem,
  index: number,
): HonorItem {
  const record = isRecord(value) ? value : {};

  return {
    id: stringValue(record.id, `honor-${index + 1}`),
    year: stringValue(record.year, fallback.year),
    title: stringValue(record.title, fallback.title),
    story: stringValue(record.story, fallback.story),
    image: imagePathValue(record.image, fallback.image),
  };
}

function normalizeNewsItem(
  value: unknown,
  fallback: NewsItem,
  index: number,
): NewsItem {
  const record = isRecord(value) ? value : {};

  return {
    id: stringValue(record.id, `news-${index + 1}`),
    date: stringValue(record.date, fallback.date),
    title: stringValue(record.title, fallback.title),
    description: stringValue(record.description, fallback.description),
    href: stringValue(record.href, fallback.href),
    image: imagePathValue(record.image, fallback.image),
  };
}

const fallbackSiteContent = cloneValue(baseSiteContent as SiteContent);

export function cloneSiteContent(value: SiteContent) {
  return cloneValue(value);
}

export const defaultSiteContent = cloneSiteContent(fallbackSiteContent);

export function normalizeSiteContent(value: unknown): SiteContent {
  const record = isRecord(value) ? value : {};
  const site = isRecord(record.site) ? record.site : {};
  const hero = isRecord(record.hero) ? record.hero : {};
  const journey = isRecord(record.journey) ? record.journey : {};
  const pulse = isRecord(record.pulse) ? record.pulse : {};
  const honors = isRecord(record.honors) ? record.honors : {};
  const news = isRecord(record.news) ? record.news : {};
  const quote = isRecord(record.quote) ? record.quote : {};
  const audio = isRecord(record.audio) ? record.audio : {};
  const footer = isRecord(record.footer) ? record.footer : {};

  return {
    site: {
      brandName: stringValue(site.brandName, fallbackSiteContent.site.brandName),
      tagline: stringValue(site.tagline, fallbackSiteContent.site.tagline),
      pageTitle: stringValue(site.pageTitle, fallbackSiteContent.site.pageTitle),
      pageDescription: stringValue(
        site.pageDescription,
        fallbackSiteContent.site.pageDescription,
      ),
    },
    navigationLinks: normalizeArray(
      record.navigationLinks,
      fallbackSiteContent.navigationLinks,
      (item, fallbackItem, index) =>
        normalizeLinkItem(item, fallbackItem, "nav", index),
    ),
    hero: {
      sectionKicker: stringValue(
        hero.sectionKicker,
        fallbackSiteContent.hero.sectionKicker,
      ),
      title: stringValue(hero.title, fallbackSiteContent.hero.title),
      subtitle: stringValue(hero.subtitle, fallbackSiteContent.hero.subtitle),
      image: imagePathValue(hero.image, fallbackSiteContent.hero.image),
      primaryActionLabel: stringValue(
        hero.primaryActionLabel,
        fallbackSiteContent.hero.primaryActionLabel,
      ),
      primaryActionHref: stringValue(
        hero.primaryActionHref,
        fallbackSiteContent.hero.primaryActionHref,
      ),
      secondaryActionLabel: stringValue(
        hero.secondaryActionLabel,
        fallbackSiteContent.hero.secondaryActionLabel,
      ),
      secondaryActionHref: stringValue(
        hero.secondaryActionHref,
        fallbackSiteContent.hero.secondaryActionHref,
      ),
      audioPillMobileLabel: stringValue(
        hero.audioPillMobileLabel,
        fallbackSiteContent.hero.audioPillMobileLabel,
      ),
      audioPillDesktopLabel: stringValue(
        hero.audioPillDesktopLabel,
        fallbackSiteContent.hero.audioPillDesktopLabel,
      ),
      introPillLabel: stringValue(
        hero.introPillLabel,
        fallbackSiteContent.hero.introPillLabel,
      ),
      introCaption: stringValue(
        hero.introCaption,
        fallbackSiteContent.hero.introCaption,
      ),
      visualNoteTop: stringValue(
        hero.visualNoteTop,
        fallbackSiteContent.hero.visualNoteTop,
      ),
      visualNoteBottom: stringValue(
        hero.visualNoteBottom,
        fallbackSiteContent.hero.visualNoteBottom,
      ),
      mobileVisualNote: stringValue(
        hero.mobileVisualNote,
        fallbackSiteContent.hero.mobileVisualNote,
      ),
      scrollPrompt: stringValue(
        hero.scrollPrompt,
        fallbackSiteContent.hero.scrollPrompt,
      ),
      heroImageAlt: stringValue(
        hero.heroImageAlt,
        fallbackSiteContent.hero.heroImageAlt,
      ),
      mobileHeroImageAlt: stringValue(
        hero.mobileHeroImageAlt,
        fallbackSiteContent.hero.mobileHeroImageAlt,
      ),
    },
    journey: {
      eyebrow: stringValue(journey.eyebrow, fallbackSiteContent.journey.eyebrow),
      title: stringValue(journey.title, fallbackSiteContent.journey.title),
      description: stringValue(
        journey.description,
        fallbackSiteContent.journey.description,
      ),
      cardKicker: stringValue(
        journey.cardKicker,
        fallbackSiteContent.journey.cardKicker,
      ),
      entries: normalizeArray(
        journey.entries,
        fallbackSiteContent.journey.entries,
        normalizeJourneyEntry,
      ),
    },
    pulse: {
      eyebrow: stringValue(pulse.eyebrow, fallbackSiteContent.pulse.eyebrow),
      title: stringValue(pulse.title, fallbackSiteContent.pulse.title),
      description: stringValue(
        pulse.description,
        fallbackSiteContent.pulse.description,
      ),
      image: imagePathValue(pulse.image, fallbackSiteContent.pulse.image),
      note: stringValue(pulse.note, fallbackSiteContent.pulse.note),
      badgeLabel: stringValue(
        pulse.badgeLabel,
        fallbackSiteContent.pulse.badgeLabel,
      ),
      aside: stringValue(pulse.aside, fallbackSiteContent.pulse.aside),
      pulseCaption: stringValue(
        pulse.pulseCaption,
        fallbackSiteContent.pulse.pulseCaption,
      ),
      imageAlt: stringValue(pulse.imageAlt, fallbackSiteContent.pulse.imageAlt),
      mobileImageAlt: stringValue(
        pulse.mobileImageAlt,
        fallbackSiteContent.pulse.mobileImageAlt,
      ),
    },
    honors: {
      eyebrow: stringValue(honors.eyebrow, fallbackSiteContent.honors.eyebrow),
      title: stringValue(honors.title, fallbackSiteContent.honors.title),
      description: stringValue(
        honors.description,
        fallbackSiteContent.honors.description,
      ),
      itemLabelPrefix: stringValue(
        honors.itemLabelPrefix,
        fallbackSiteContent.honors.itemLabelPrefix,
      ),
      items: normalizeArray(
        honors.items,
        fallbackSiteContent.honors.items,
        normalizeHonorItem,
      ),
    },
    news: {
      eyebrow: stringValue(news.eyebrow, fallbackSiteContent.news.eyebrow),
      title: stringValue(news.title, fallbackSiteContent.news.title),
      description: stringValue(
        news.description,
        fallbackSiteContent.news.description,
      ),
      readMoreLabel: stringValue(
        news.readMoreLabel,
        fallbackSiteContent.news.readMoreLabel,
      ),
      items: normalizeArray(
        news.items,
        fallbackSiteContent.news.items,
        normalizeNewsItem,
      ),
    },
    quote: {
      eyebrow: stringValue(quote.eyebrow, fallbackSiteContent.quote.eyebrow),
      title: stringValue(quote.title, fallbackSiteContent.quote.title),
      quote: stringValue(quote.quote, fallbackSiteContent.quote.quote),
      shareLabel: stringValue(
        quote.shareLabel,
        fallbackSiteContent.quote.shareLabel,
      ),
      imageActionLabel: stringValue(
        quote.imageActionLabel,
        fallbackSiteContent.quote.imageActionLabel,
      ),
      cardLabel: stringValue(
        quote.cardLabel,
        fallbackSiteContent.quote.cardLabel,
      ),
      cardQuote: stringValue(
        quote.cardQuote,
        fallbackSiteContent.quote.cardQuote,
      ),
      cardCaption: stringValue(
        quote.cardCaption,
        fallbackSiteContent.quote.cardCaption,
      ),
    },
    audio: {
      eyebrow: stringValue(audio.eyebrow, fallbackSiteContent.audio.eyebrow),
      title: stringValue(audio.title, fallbackSiteContent.audio.title),
      description: stringValue(
        audio.description,
        fallbackSiteContent.audio.description,
      ),
      stageLabel: stringValue(
        audio.stageLabel,
        fallbackSiteContent.audio.stageLabel,
      ),
      ambientLabel: stringValue(
        audio.ambientLabel,
        fallbackSiteContent.audio.ambientLabel,
      ),
      trackTitle: stringValue(
        audio.trackTitle,
        fallbackSiteContent.audio.trackTitle,
      ),
      duration: stringValue(audio.duration, fallbackSiteContent.audio.duration),
      totalSeconds: numberValue(
        audio.totalSeconds,
        fallbackSiteContent.audio.totalSeconds,
      ),
      trackDescription: stringValue(
        audio.trackDescription,
        fallbackSiteContent.audio.trackDescription,
      ),
      playLabel: stringValue(audio.playLabel, fallbackSiteContent.audio.playLabel),
      pauseLabel: stringValue(
        audio.pauseLabel,
        fallbackSiteContent.audio.pauseLabel,
      ),
      nextLabel: stringValue(audio.nextLabel, fallbackSiteContent.audio.nextLabel),
      listeningNoteTitle: stringValue(
        audio.listeningNoteTitle,
        fallbackSiteContent.audio.listeningNoteTitle,
      ),
      listeningNoteBody: stringValue(
        audio.listeningNoteBody,
        fallbackSiteContent.audio.listeningNoteBody,
      ),
      afterTrackTitle: stringValue(
        audio.afterTrackTitle,
        fallbackSiteContent.audio.afterTrackTitle,
      ),
      afterTrackBody: stringValue(
        audio.afterTrackBody,
        fallbackSiteContent.audio.afterTrackBody,
      ),
      playAriaLabel: stringValue(
        audio.playAriaLabel,
        fallbackSiteContent.audio.playAriaLabel,
      ),
      pauseAriaLabel: stringValue(
        audio.pauseAriaLabel,
        fallbackSiteContent.audio.pauseAriaLabel,
      ),
    },
    footer: {
      headlineFirstLine: stringValue(
        footer.headlineFirstLine,
        fallbackSiteContent.footer.headlineFirstLine,
      ),
      headlineSecondLine: stringValue(
        footer.headlineSecondLine,
        fallbackSiteContent.footer.headlineSecondLine,
      ),
      description: stringValue(
        footer.description,
        fallbackSiteContent.footer.description,
      ),
      quickLinksTitle: stringValue(
        footer.quickLinksTitle,
        fallbackSiteContent.footer.quickLinksTitle,
      ),
      newsletterTitle: stringValue(
        footer.newsletterTitle,
        fallbackSiteContent.footer.newsletterTitle,
      ),
      newsletterDescription: stringValue(
        footer.newsletterDescription,
        fallbackSiteContent.footer.newsletterDescription,
      ),
      emailPlaceholder: stringValue(
        footer.emailPlaceholder,
        fallbackSiteContent.footer.emailPlaceholder,
      ),
      newsletterButtonLabel: stringValue(
        footer.newsletterButtonLabel,
        fallbackSiteContent.footer.newsletterButtonLabel,
      ),
      quickLinks: normalizeArray(
        footer.quickLinks,
        fallbackSiteContent.footer.quickLinks,
        (item, fallbackItem, index) =>
          normalizeLinkItem(item, fallbackItem, "footer-link", index),
      ),
      socialLinks: normalizeArray(
        footer.socialLinks,
        fallbackSiteContent.footer.socialLinks,
        normalizeSocialLink,
      ),
      copyright: stringValue(
        footer.copyright,
        fallbackSiteContent.footer.copyright,
      ),
    },
  };
}
