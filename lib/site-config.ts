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
  tagline: "شاعر وكاتب ينسج من الذاكرة نصًا، ومن اللغة أثرًا",
  pageTitle: "سالم الورّاق | سيرة الكلمة",
  pageDescription:
    "موقع أدبي عربي يقدّم أعمال سالم الورّاق وتكريماته وأخباره واقتباساته وصوتياته ضمن تجربة بصرية مضيئة ومتعددة الصفحات.",
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
  headlineFirstLine: "ليست كل قراءةٍ عبورًا",
  headlineSecondLine: "وليست كل كلمةٍ تُنسى",
  description:
    "خاتمة هادئة تترك الباب مواربًا لعودة جديدة، وتمنح الأعمال والاقتباسات والصوتيات مساحة أخيرة من السكون الأنيق.",
  quickLinksTitle: "روابط سريعة",
  newsletterTitle: "رسالة أدبية",
  newsletterDescription:
    "رسالة خفيفة تصلك بكل جديد في الأعمال والأخبار والمقتطفات المختارة من عالم الكاتب.",
  emailPlaceholder: "بريدك الإلكتروني",
  newsletterButtonLabel: "اشترك الآن",
  copyright: "© سالم الورّاق. جميع الحقوق محفوظة.",
};

export const heroCopy = {
  sectionKicker: "مدخل إلى عالم سالم الورّاق",
  title: "أنا لا أكتب كي أملأ الورق، بل لأترك أثرًا يبقى",
  subtitle: "",
  primaryActionLabel: "ابدأ من نبض الكاتب",
  primaryActionHref: "/writer",
  secondaryActionLabel: "استعرض الأعمال",
  secondaryActionHref: "/journey",
  audioPillMobileLabel: "مكتبة صوتية",
  introPillLabel: "تجربة أدبية متعددة الصفحات",
  introCaption:
    "لكل صفحة شخصيتها الخاصة، بينما تبقى لوحة الأدمن بسيطة لإدارة الصور والعناصر بسرعة ووضوح.",
  visualNoteTop:
    "صورة الواجهة قابلة للتغيير من لوحة الأدمن لتبقى البداية متجددة وحاضرة بصريًا.",
  visualNoteBottom:
    "الأعمال والأخبار والتكريمات والاقتباسات والصوتيات موزعة على صفحات مستقلة تمنح كل محور مساحته وهدوءه.",
  mobileVisualNote: "من هذه الصورة تبدأ الحكاية، ثم ينساب المحتوى بهدوء عبر الصفحات.",
  scrollPrompt: "استكشف صفحات الموقع",
  heroImageAlt: "مشهد بصري هادئ للشاعر في فضاء أدبي",
  mobileHeroImageAlt: "صورة الواجهة الرئيسية",
};

export const writerCopy = {
  eyebrow: "نبض الكاتب",
  title: "صفحة تصغي إلى أثر الكاتب قبل تفاصيل السيرة",
  description:
    "مساحة أقرب إلى صورة الكاتب ونبرته، حيث يسبق الإحساس الشرح وتتكلم الملامح قبل العناوين.",
  note: "تُدار صورة الكاتب من لوحة الأدمن، أما النبرة العامة للنص فتظل ثابتة حفاظًا على هوية الصفحة.",
  badgeLabel: "سالم الورّاق",
  aside: "الكلمة تبدأ من الداخل ثم تتسع",
  pulseCaption: "من الصورة يبدأ الأثر، ثم تتوالى الحكايات",
  imageAlt: "صورة الشاعر",
  mobileImageAlt: "صورة الشاعر على الهاتف",
};

export const journeyCopy = {
  eyebrow: "الأعمال",
  title: "أعمال تفتح أكثر من باب للقراءة",
  description:
    "في هذه الصفحة تتجاور القصائد والكتب والنصوص المسرحية والسيرة الذاتية، بحيث يظهر كل عمل بعنوانه ووصفه وصورته ورابطه الخاص.",
  cardKicker: "استكشف العمل",
};

export const honorsCopy = {
  eyebrow: "التكريمات",
  title: "محطات مضيئة في مسار التقدير",
  description:
    "كل تكريم هنا يظهر بوصفه لحظة مكتملة: تاريخًا وصورةً وحكايةً قصيرة تكشف أثره في المسار.",
  itemLabelPrefix: "المحطة",
};

export const newsCopy = {
  eyebrow: "الأخبار",
  title: "أخبار تليق بالحدث",
  description:
    "إصدارات وأمسيات ومقالات جديدة تُعرض في بطاقات واضحة وسهلة التحديث من لوحة الأدمن.",
  readMoreLabel: "اقرأ الخبر",
};

export const quoteCopy = {
  eyebrow: "الاقتباسات",
  title: "اقتباسات تنبض بإيقاع النص",
  description:
    "بدل اقتباس واحد ثابت، تعرض الصفحة مجموعة اقتباسات قصيرة يمكن إضافتها أو حذفها، مع تعليق موجز عند الحاجة.",
  primaryActionLabel: "تصفح الاقتباسات",
  secondaryActionLabel: "انتقل إلى الصوتيات",
  emptyTitle: "لا توجد اقتباسات حتى الآن",
  emptyDescription: "أضف أول اقتباس من لوحة الأدمن ليظهر هنا فورًا.",
};

export const audioCopy = {
  eyebrow: "الصوتيات",
  title: "مكتبة صوتية حيّة",
  description:
    "أضف المقاطع الصوتية من لوحة الأدمن لتظهر هنا بمشغّل مباشر وواجهة واضحة وسهلة التصفح.",
  stageLabel: "جاهز للاستماع",
  emptyTitle: "لا توجد صوتيات حتى الآن",
  emptyDescription: "ارفع أول ملف صوتي من لوحة الأدمن ليظهر هنا مباشرة.",
};

export const workTypeLabels = {
  poetry: "شعر",
  books: "كتب",
  theater: "مسرح",
  biography: "سيرة",
} as const;
