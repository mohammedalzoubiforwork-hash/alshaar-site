export type StaticLink = {
  id: string;
  label: string;
  href: string;
};

export type StaticSocialIconName = "instagram" | "youtube" | "send" | "mail";

export type StaticSocialLink = {
  label: string;
  href: string;
  icon: StaticSocialIconName;
};

export const siteIdentity = {
  brandName: "محمد سعيد الضنحاني",
  tagline: "شاعر وكاتب",
  pageTitle: "محمد سعيد الضنحاني | سيرة الكلمة",
  pageDescription:
    "موقع محمد سعيد الضنحاني: الأعمال، التكريمات، الأخبار، الاقتباسات، والصوتيات.",
};

export const navigationLinks: StaticLink[] = [
  { id: "writer", label: "نبض الكاتب", href: "/writer" },
  { id: "journey", label: "الأعمال", href: "/journey" },
  { id: "honors", label: "التكريمات", href: "/honors" },
  { id: "news", label: "الأخبار", href: "/news" },
  { id: "quote", label: "الاقتباسات", href: "/quote" },
  { id: "audio", label: "الصوتيات", href: "/audio" },
];

export const footerLinks: StaticLink[] = [
  { id: "home", label: "الصفحة الرئيسية", href: "/" },
  ...navigationLinks,
];

export const footerSocialLinks: StaticSocialLink[] = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Telegram", href: "#", icon: "send" },
  { label: "Email", href: "#", icon: "mail" },
];

export const footerCopy = {
  headlineFirstLine: "محمد سعيد الضنحاني",
  headlineSecondLine: "شاعر وكاتب",
  description: "الأعمال، الأخبار، والاقتباسات في مكان واحد.",
  quickLinksTitle: "روابط سريعة",
  newsletterTitle: "رسالة أدبية",
  newsletterDescription:
    "رسالة خفيفة تصلك بكل جديد في الأعمال والأخبار والمقتطفات المختارة من عالم الكاتب.",
  emailPlaceholder: "بريدك الإلكتروني",
  newsletterButtonLabel: "اشترك الآن",
  copyright: "© محمد سعيد الضنحاني. جميع الحقوق محفوظة.",
};

export const heroCopy = {
  sectionKicker: "محمد سعيد الضنحاني",
  title: "أنا لا أكتب كي أملأ الورق، بل لأترك أثرًا يبقى",
  subtitle: "شاعر وكاتب",
  primaryActionLabel: "صفحة الكاتب",
  primaryActionHref: "/writer",
  secondaryActionLabel: "الأعمال",
  secondaryActionHref: "/journey",
  audioPillMobileLabel: "مكتبة صوتية",
  introPillLabel: "محتوى مختار",
  introCaption: "الأعمال، التكريمات، الأخبار، الاقتباسات، والصوتيات.",
  visualNoteTop: "صورة الواجهة الرئيسية.",
  visualNoteBottom: "محتوى واضح ومباشر.",
  mobileVisualNote: "صورة الواجهة الرئيسية.",
  scrollPrompt: "تابع",
  heroImageAlt: "مشهد بصري هادئ للشاعر في فضاء أدبي",
  mobileHeroImageAlt: "صورة الواجهة الرئيسية",
};

export const writerCopy = {
  eyebrow: "نبض الكاتب",
  title: "محمد سعيد الضنحاني",
  description: "شاعر وكاتب.",
  note: "صوت وصورة ومسار.",
  badgeLabel: "محمد سعيد الضنحاني",
  aside: "الكلمة تبدأ من الداخل",
  pulseCaption: "صوت هادئ ونبرة واضحة",
  imageAlt: "صورة الشاعر",
  mobileImageAlt: "صورة الشاعر على الهاتف",
};

export const journeyCopy = {
  eyebrow: "الأعمال",
  title: "الأعمال",
  description: "قصائد، مؤلفات، نصوص مسرحية، وسيرة.",
  cardKicker: "عرض العمل",
};

export const honorsCopy = {
  eyebrow: "التكريمات",
  title: "التكريمات",
  description: "أبرز محطات التقدير والجوائز.",
  itemLabelPrefix: "المحطة",
};

export const newsCopy = {
  eyebrow: "الأخبار",
  title: "الأخبار",
  description: "آخر الأخبار والإصدارات.",
  readMoreLabel: "اقرأ الخبر",
};

export const quoteCopy = {
  eyebrow: "الاقتباسات",
  title: "الاقتباسات",
  description: "اقتباسات مختارة من النصوص.",
  primaryActionLabel: "الاقتباسات",
  secondaryActionLabel: "الصوتيات",
  emptyTitle: "لا توجد اقتباسات حتى الآن",
  emptyDescription: "سيتم إضافة الاقتباسات قريبًا.",
};

export const audioCopy = {
  eyebrow: "الصوتيات",
  title: "الصوتيات",
  description: "مقاطع صوتية للاستماع المباشر.",
  stageLabel: "استماع",
  emptyTitle: "لا توجد صوتيات حتى الآن",
  emptyDescription: "سيتم إضافة المقاطع الصوتية قريبًا.",
};

export const workTypeLabels = {
  poetry: "شعر",
  books: "كتب",
  theater: "مسرح",
  biography: "سيرة",
} as const;
