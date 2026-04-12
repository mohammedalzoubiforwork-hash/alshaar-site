export type LinkItem = {
  id: string;
  label: string;
  href: string;
};

export type JourneyIconName =
  | "feather"
  | "book-open"
  | "drama"
  | "user-round";

export type SocialIconName = "instagram" | "youtube" | "send" | "mail";

export type JourneyEntry = {
  id: string;
  icon: JourneyIconName;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HonorItem = {
  id: string;
  year: string;
  title: string;
  story: string;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

export type SocialLink = LinkItem & {
  icon: SocialIconName;
};

export type SiteContent = {
  site: {
    brandName: string;
    tagline: string;
    pageTitle: string;
    pageDescription: string;
  };
  navigationLinks: LinkItem[];
  hero: {
    sectionKicker: string;
    title: string;
    subtitle: string;
    primaryActionLabel: string;
    primaryActionHref: string;
    secondaryActionLabel: string;
    secondaryActionHref: string;
    audioPillMobileLabel: string;
    audioPillDesktopLabel: string;
    introPillLabel: string;
    introCaption: string;
    visualNoteTop: string;
    visualNoteBottom: string;
    mobileVisualNote: string;
    scrollPrompt: string;
    heroImageAlt: string;
    mobileHeroImageAlt: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    description: string;
    cardKicker: string;
    entries: JourneyEntry[];
  };
  pulse: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    badgeLabel: string;
    aside: string;
    pulseCaption: string;
    imageAlt: string;
    mobileImageAlt: string;
  };
  honors: {
    eyebrow: string;
    title: string;
    description: string;
    itemLabelPrefix: string;
    items: HonorItem[];
  };
  news: {
    eyebrow: string;
    title: string;
    description: string;
    readMoreLabel: string;
    items: NewsItem[];
  };
  quote: {
    eyebrow: string;
    title: string;
    quote: string;
    shareLabel: string;
    imageActionLabel: string;
    cardLabel: string;
    cardQuote: string;
    cardCaption: string;
  };
  audio: {
    eyebrow: string;
    title: string;
    description: string;
    stageLabel: string;
    ambientLabel: string;
    trackTitle: string;
    duration: string;
    totalSeconds: number;
    trackDescription: string;
    playLabel: string;
    pauseLabel: string;
    nextLabel: string;
    listeningNoteTitle: string;
    listeningNoteBody: string;
    afterTrackTitle: string;
    afterTrackBody: string;
    playAriaLabel: string;
    pauseAriaLabel: string;
  };
  footer: {
    headlineFirstLine: string;
    headlineSecondLine: string;
    description: string;
    quickLinksTitle: string;
    newsletterTitle: string;
    newsletterDescription: string;
    emailPlaceholder: string;
    newsletterButtonLabel: string;
    quickLinks: LinkItem[];
    socialLinks: SocialLink[];
    copyright: string;
  };
};
