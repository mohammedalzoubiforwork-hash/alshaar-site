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
  brandName: "سالم الورّاق",
  tagline: "كاتب وشاعر يعبر من الورق إلى الذاكرة",
  pageTitle: "سالم الورّاق | عالم الكلمة",
  pageDescription:
    "تجربة أدبية عربية متعددة الصفحات، تجمع الأعمال والتكريمات والأخبار والاقتباسات والصوتيات في مساحة هادئة وأنيقة.",
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
  headlineFirstLine: "ليس كل من قرأ... فهم",
  headlineSecondLine: "وليس كل من فهم... نسي",
  description:
    "خاتمة هادئة تبقي الباب مواربًا لعودة أخرى، وتترك النصوص والأعمال والتسجيلات تتنفس دون ازدحام أو فوضى.",
  quickLinksTitle: "روابط سريعة",
  newsletterTitle: "رسالة شهرية",
  newsletterDescription:
    "نشرة خفيفة تضم جديد الأعمال والأخبار والمقتطفات المختارة من عالم الكاتب.",
  emailPlaceholder: "بريدك الإلكتروني",
  newsletterButtonLabel: "اشترك بهدوء",
  copyright: "© سالم الورّاق. جميع الحقوق محفوظة.",
};

export const heroCopy = {
  sectionKicker: "الدخول إلى عالم سالم الورّاق",
  title: "أنا لا أكتب... أنا أترك أثراً لمن سيأتي بعدي",
  subtitle:
    "مرحبًا بك في فضاء أدبي هادئ، حيث تتحول الأعمال والتكريمات والاقتباسات والصوتيات إلى صفحات مستقلة وواضحة.",
  primaryActionLabel: "ابدأ الرحلة",
  primaryActionHref: "/writer",
  secondaryActionLabel: "تصفح الأعمال",
  secondaryActionHref: "/journey",
  audioPillMobileLabel: "مكتبة صوتية",
  introPillLabel: "واجهة هادئة متعددة الصفحات",
  introCaption:
    "كل صفحة هنا تحمل ملامحها الخاصة، بينما تبقى لوحة الأدمن خفيفة لإدارة الصور والعناصر فقط.",
  visualNoteTop:
    "صورة الواجهة تأتي من الأدمن، أما الجو العام والنصوص الأساسية فمثبتة داخل الكود للحفاظ على وضوح التجربة.",
  visualNoteBottom:
    "أعمال، أخبار، تكريمات، اقتباسات، وصوتيات تتوزع على صفحات مستقلة بدل أن تتكدس في صفحة واحدة طويلة.",
  mobileVisualNote: "هنا تبدأ الرحلة من صورة هادئة ومساحة نظيفة للمحتوى.",
  scrollPrompt: "ادخل إلى صفحات الموقع",
  heroImageAlt: "مشهد بصري هادئ للشاعر في فضاء أدبي",
  mobileHeroImageAlt: "صورة الواجهة الرئيسية",
};

export const writerCopy = {
  eyebrow: "نبض الكاتب",
  title: "صفحة تقرأ أثر الكاتب لا سيرته فقط",
  description:
    "هذه الصفحة تمنح صورة الكاتب حضورًا بصريًا هادئًا، وتترك للمحتوى مساحة تأمل أكثر من الشرح المباشر.",
  note: "صورة الكاتب تُدار من لوحة الأدمن، بينما تبقى اللغة هنا ثابتة لتحافظ الصفحة على هويتها.",
  badgeLabel: "سالم الورّاق",
  aside: "الكلمة لا تنتهي عند حدود الصفحة",
  pulseCaption: "من الصورة يبدأ الأثر... ثم تتكلم الأعمال",
  imageAlt: "صورة الشاعر",
  mobileImageAlt: "صورة الشاعر على الهاتف",
};

export const journeyCopy = {
  eyebrow: "الأعمال",
  title: "أبواب تفضي إلى أكثر من قراءة",
  description:
    "هنا تظهر الأعمال المتنوعة: شعر، كتب، نصوص مسرحية، وسيرة. كل عمل يملك صورته ووصفه ورابطه الخاص.",
  cardKicker: "عمل مفتوح",
};

export const honorsCopy = {
  eyebrow: "رحلة التكريمات",
  title: "محطات مرئية في مسار التقدير",
  description:
    "كل تكريم هنا يروى كحكاية قصيرة، مع صورة وتاريخ وعنوان يوضح مكانه في رحلة الكاتب.",
  itemLabelPrefix: "محطة",
};

export const newsCopy = {
  eyebrow: "الأخبار",
  title: "آخر المستجدات",
  description:
    "إصدارات، أمسيات، ومقالات جديدة تظهر هنا كبطاقات واضحة يمكن تحديثها من الأدمن بسهولة.",
  readMoreLabel: "اقرأ المزيد",
};

export const quoteCopy = {
  eyebrow: "الاقتباسات",
  title: "اقتباسات قابلة للإضافة والحذف",
  description:
    "الصفحة تعرض اقتباسات متعددة بدل اقتباس واحد ثابت، مع مساحة مختصرة لوصف كل اقتباس عند الحاجة.",
  primaryActionLabel: "استكشف الاقتباسات",
  secondaryActionLabel: "انتقل إلى الصوتيات",
  emptyTitle: "لا توجد اقتباسات بعد",
  emptyDescription: "أضف أول اقتباس من لوحة الأدمن ليظهر هنا مباشرة.",
};

export const audioCopy = {
  eyebrow: "الصوتيات",
  title: "مكتبة صوتية فعلية",
  description:
    "أضف تسجيلات صوتية من لوحة الأدمن، وستظهر هنا كمكتبة تشغيل مباشرة بملفات حقيقية.",
  stageLabel: "مقاطع متاحة",
  emptyTitle: "لا توجد صوتيات بعد",
  emptyDescription: "ارفع أول ملف صوتي من الأدمن ليظهر في هذه الصفحة.",
};

export const workTypeLabels = {
  poetry: "شعر",
  books: "كتب",
  theater: "مسرح",
  biography: "سيرة",
} as const;
