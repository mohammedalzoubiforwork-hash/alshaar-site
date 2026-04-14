import type {
  AudioTrack,
  HonorItem,
  NewsItem,
  QuoteItem,
  SiteContent,
  WorkItem,
  WorkType,
} from "@/lib/site-content-types";

const workTypes = new Set<WorkType>([
  "poetry",
  "books",
  "theater",
  "biography",
]);

const legacyIconToType: Record<string, WorkType> = {
  feather: "poetry",
  "book-open": "books",
  drama: "theater",
  "user-round": "biography",
};

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function pathValue(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  if (value.length === 0) {
    return "";
  }

  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://")
    ? value
    : fallback;
}

function normalizeArray<T>(
  value: unknown,
  fallback: T[],
  normalizeItem: (item: unknown, index: number) => T,
) {
  if (!Array.isArray(value)) {
    return cloneValue(fallback);
  }

  return value.map((item, index) => normalizeItem(item, index));
}

function defaultWorkItem(index: number): WorkItem {
  return {
    id: `work-${index + 1}`,
    type: "books",
    title: "",
    description: "",
    image: "",
    href: "/journey",
  };
}

function defaultHonorItem(index: number): HonorItem {
  return {
    id: `honor-${index + 1}`,
    year: "",
    title: "",
    story: "",
    image: "",
  };
}

function defaultNewsItem(index: number): NewsItem {
  return {
    id: `news-${index + 1}`,
    date: "",
    title: "",
    description: "",
    href: "/news",
    image: "",
  };
}

function defaultQuoteItem(index: number): QuoteItem {
  return {
    id: `quote-${index + 1}`,
    text: "",
    caption: "",
  };
}

function defaultAudioTrack(index: number): AudioTrack {
  return {
    id: `audio-${index + 1}`,
    title: "",
    description: "",
    file: "",
    durationLabel: "",
  };
}

function normalizeWorkItem(value: unknown, index: number): WorkItem {
  const fallback = defaultWorkItem(index);
  const record = isRecord(value) ? value : {};
  const type = record.type;

  return {
    id: stringValue(record.id, fallback.id),
    type:
      typeof type === "string" && workTypes.has(type as WorkType)
        ? (type as WorkType)
        : fallback.type,
    title: stringValue(record.title, fallback.title),
    description: stringValue(record.description, fallback.description),
    image: pathValue(record.image, fallback.image),
    href: stringValue(record.href, fallback.href),
  };
}

function normalizeHonorItem(value: unknown, index: number): HonorItem {
  const fallback = defaultHonorItem(index);
  const record = isRecord(value) ? value : {};

  return {
    id: stringValue(record.id, fallback.id),
    year: stringValue(record.year, fallback.year),
    title: stringValue(record.title, fallback.title),
    story: stringValue(record.story, fallback.story),
    image: pathValue(record.image, fallback.image),
  };
}

function normalizeNewsItem(value: unknown, index: number): NewsItem {
  const fallback = defaultNewsItem(index);
  const record = isRecord(value) ? value : {};

  return {
    id: stringValue(record.id, fallback.id),
    date: stringValue(record.date, fallback.date),
    title: stringValue(record.title, fallback.title),
    description: stringValue(record.description, fallback.description),
    href: stringValue(record.href, fallback.href),
    image: pathValue(record.image, fallback.image),
  };
}

function normalizeQuoteItem(value: unknown, index: number): QuoteItem {
  const fallback = defaultQuoteItem(index);
  const record = isRecord(value) ? value : {};

  return {
    id: stringValue(record.id, fallback.id),
    text: stringValue(record.text, fallback.text),
    caption: stringValue(record.caption, fallback.caption),
  };
}

function normalizeAudioTrack(value: unknown, index: number): AudioTrack {
  const fallback = defaultAudioTrack(index);
  const record = isRecord(value) ? value : {};

  return {
    id: stringValue(record.id, fallback.id),
    title: stringValue(record.title, fallback.title),
    description: stringValue(record.description, fallback.description),
    file: pathValue(record.file, fallback.file),
    durationLabel: stringValue(record.durationLabel, fallback.durationLabel),
  };
}

const defaultSiteContent: SiteContent = {
  writer: {
    biography:
      "هنا تظهر السيرة الذاتية أو النبذة التعريفية بالشاعر، ويمكن تعديلها من لوحة الأدمن.",
  },
  photos: {
    heroImage: "/art/hero-scene.svg",
    writerImage: "/art/writer-portrait.svg",
  },
  works: [
    {
      id: "journey-poetry",
      type: "poetry",
      title: "الشعر",
      description: "قصائد تنصت لوجع الإنسان، وتعيد صياغته بلغة أكثر صفاءً.",
      image: "",
      href: "/journey",
    },
    {
      id: "journey-books",
      type: "books",
      title: "المؤلفات",
      description: "كتب وُلدت من التأمل، واستقرت في ذاكرة القرّاء.",
      image: "",
      href: "/journey",
    },
    {
      id: "journey-theater",
      type: "theater",
      title: "النصوص المسرحية",
      description: "نصوص كُتبت لتُرى على الخشبة كما تُقرأ على الورق.",
      image: "",
      href: "/journey",
    },
    {
      id: "journey-biography",
      type: "biography",
      title: "السيرة الذاتية",
      description: "سيرة ذاتية ترصد أثر الحياة في اللغة، لا مجرد تسلسلٍ للأحداث.",
      image: "",
      href: "/journey",
    },
  ],
  honors: [
    {
      id: "honor-2008",
      year: "2008",
      title: "جائزة الشاعر الشاب",
      story: "بداية لافتة أعلنت حضور صوته الخاص على نحو مبكر.",
      image: "",
    },
    {
      id: "honor-2012",
      year: "2012",
      title: "جائزة أفضل نص مسرحي",
      story: "لحظة انتقل فيها النص من الورق إلى الذاكرة.",
      image: "",
    },
    {
      id: "honor-2016",
      year: "2016",
      title: "وسام الثقافة",
      story: "تكريم لمسارٍ صادقٍ اتسع أثره عامًا بعد عام.",
      image: "",
    },
    {
      id: "honor-2021",
      year: "2021",
      title: "جائزة الإبداع العربي",
      story: "محطة أكدت أن الكلمة الصادقة تبلغ أبعد مما نتوقع.",
      image: "",
    },
  ],
  news: [
    {
      id: "news-clouds",
      date: "08 نيسان 2026",
      title: "إصدار ديوان جديد بعنوان \"خرائط الغيم\"",
      description:
        "ديوان جديد يواصل أسئلة الذاكرة والغياب، ويقترب من الهشاشة بوصفها وجهًا آخر للقوة.",
      href: "/news",
      image: "/art/news-clouds.svg",
    },
    {
      id: "news-evening",
      date: "22 آذار 2026",
      title: "أمسية شعرية في دار الثقافة",
      description:
        "لقاء حيّ جاورت فيه القصيدةُ الصوتَ، وعاد فيه للمنبر دفؤه وللإنصات معناه الأصيل.",
      href: "/news",
      image: "/art/news-evening.svg",
    },
    {
      id: "news-time",
      date: "11 شباط 2026",
      title: "مقال جديد: \"عن الكتابة والزمن\"",
      description:
        "تأمل جديد في علاقة الكاتب بالوقت، وكيف تتحول السنوات إلى طبقات حيّة داخل الجملة.",
      href: "/news",
      image: "/art/news-time.svg",
    },
  ],
  quotes: [
    {
      id: "quote-1",
      text: "الكتابة لا تغيّر العالم، لكنها تغيّر من يقرأ",
      caption: "اقتباس جاهز للتحول إلى بطاقة بصرية قابلة للمشاركة.",
    },
  ],
  audioTracks: [],
};

function migrateLegacySiteContent(record: Record<string, unknown>): SiteContent {
  const hero = isRecord(record.hero) ? record.hero : {};
  const pulse = isRecord(record.pulse) ? record.pulse : {};
  const journey = isRecord(record.journey) ? record.journey : {};
  const honors = isRecord(record.honors) ? record.honors : {};
  const news = isRecord(record.news) ? record.news : {};
  const quote = isRecord(record.quote) ? record.quote : {};
  const audio = isRecord(record.audio) ? record.audio : {};

  const migratedQuote =
    typeof quote.quote === "string" && quote.quote.trim().length > 0
      ? [
          {
            id: stringValue(quote.id, "quote-1"),
            text: stringValue(quote.quote, ""),
            caption: stringValue(quote.cardCaption, ""),
          },
        ]
      : cloneValue(defaultSiteContent.quotes);

  const migratedAudioFile =
    pathValue(audio.file, "") ||
    pathValue(audio.src, "") ||
    pathValue(audio.trackFile, "");

  const migratedAudioTracks = migratedAudioFile
    ? [
        {
          id: stringValue(audio.id, "audio-1"),
          title: stringValue(audio.trackTitle, "مقطع صوتي"),
          description: stringValue(audio.trackDescription, ""),
          file: migratedAudioFile,
          durationLabel: stringValue(audio.duration, ""),
        },
      ]
    : cloneValue(defaultSiteContent.audioTracks);

  return {
    writer: {
      biography: stringValue(
        pulse.description,
        defaultSiteContent.writer.biography,
      ),
    },
    photos: {
      heroImage: pathValue(hero.image, defaultSiteContent.photos.heroImage),
      writerImage: pathValue(pulse.image, defaultSiteContent.photos.writerImage),
    },
    works: Array.isArray(journey.entries)
      ? journey.entries.map((item, index) => {
          const entry = isRecord(item) ? item : {};
          const fallback = defaultWorkItem(index);
          const legacyType =
            typeof entry.icon === "string" ? legacyIconToType[entry.icon] : undefined;

          return {
            id: stringValue(entry.id, fallback.id),
            type: legacyType ?? fallback.type,
            title: stringValue(entry.title, fallback.title),
            description: stringValue(entry.description, fallback.description),
            image: pathValue(entry.image, fallback.image),
            href: stringValue(entry.ctaHref, fallback.href),
          };
        })
      : cloneValue(defaultSiteContent.works),
    honors: Array.isArray(honors.items)
      ? honors.items.map((item, index) => normalizeHonorItem(item, index))
      : cloneValue(defaultSiteContent.honors),
    news: Array.isArray(news.items)
      ? news.items.map((item, index) => normalizeNewsItem(item, index))
      : cloneValue(defaultSiteContent.news),
    quotes: migratedQuote,
    audioTracks: migratedAudioTracks,
  };
}

export function cloneSiteContent(value: SiteContent) {
  return cloneValue(value);
}

export const defaultContent = cloneSiteContent(defaultSiteContent);
export const defaultSiteContentValue = cloneSiteContent(defaultSiteContent);

export function normalizeSiteContent(value: unknown): SiteContent {
  const record = isRecord(value) ? value : {};
  const hasNewShape =
    "writer" in record ||
    "photos" in record ||
    "works" in record ||
    "honors" in record ||
    "news" in record ||
    "quotes" in record ||
    "audioTracks" in record;

  if (!hasNewShape) {
    return migrateLegacySiteContent(record);
  }

  const photos = isRecord(record.photos) ? record.photos : {};
  const writer = isRecord(record.writer) ? record.writer : {};

  return {
    writer: {
      biography: stringValue(writer.biography, defaultSiteContent.writer.biography),
    },
    photos: {
      heroImage: pathValue(photos.heroImage, defaultSiteContent.photos.heroImage),
      writerImage: pathValue(
        photos.writerImage,
        defaultSiteContent.photos.writerImage,
      ),
    },
    works: normalizeArray(record.works, defaultSiteContent.works, normalizeWorkItem),
    honors: normalizeArray(record.honors, defaultSiteContent.honors, normalizeHonorItem),
    news: normalizeArray(record.news, defaultSiteContent.news, normalizeNewsItem),
    quotes: normalizeArray(record.quotes, defaultSiteContent.quotes, normalizeQuoteItem),
    audioTracks: normalizeArray(
      record.audioTracks,
      defaultSiteContent.audioTracks,
      normalizeAudioTrack,
    ),
  };
}
