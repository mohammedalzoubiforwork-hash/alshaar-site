"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle2,
  FileText,
  Globe,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  Newspaper,
  PanelBottom,
  Plus,
  Quote,
  Save,
  Sparkles,
  Trash2,
  Volume2,
} from "lucide-react";
import type {
  JourneyEntry,
  JourneyIconName,
  LinkItem,
  NewsItem,
  SiteContent,
  SocialIconName,
  SocialLink,
  HonorItem,
} from "@/lib/site-content-types";

type AdminDashboardProps = {
  initialContent: SiteContent;
  contentPath: string;
};

type SectionId =
  | "site"
  | "hero"
  | "journey"
  | "pulse"
  | "honors"
  | "news"
  | "quote"
  | "audio"
  | "footer";

type StatusTone = "idle" | "success" | "error";

type MutateContent = (mutator: (draft: SiteContent) => void) => void;

const sectionItems: Array<{
  id: SectionId;
  label: string;
  description: string;
  icon: typeof LayoutDashboard;
}> = [
  {
    id: "site",
    label: "الهوية",
    description: "اسم الموقع والميتا وروابط الهيدر",
    icon: Globe,
  },
  {
    id: "hero",
    label: "الهيرو",
    description: "الواجهة الأولى ورسائل البداية",
    icon: Sparkles,
  },
  {
    id: "journey",
    label: "المسارات",
    description: "بطاقات الأعمال والروابط",
    icon: BookOpen,
  },
  {
    id: "pulse",
    label: "نبض الكاتب",
    description: "النص التعريفي والنبض الداخلي",
    icon: FileText,
  },
  {
    id: "honors",
    label: "التكريمات",
    description: "الخط الزمني والجوائز",
    icon: Award,
  },
  {
    id: "news",
    label: "الأخبار",
    description: "بطاقات الأخبار والصور والروابط",
    icon: Newspaper,
  },
  {
    id: "quote",
    label: "الاقتباس",
    description: "اقتباس اليوم وبطاقة المشاركة",
    icon: Quote,
  },
  {
    id: "audio",
    label: "الصوت",
    description: "وصف التجربة والمقطع الصوتي",
    icon: Volume2,
  },
  {
    id: "footer",
    label: "الفوتر",
    description: "الروابط السريعة والسوشيال",
    icon: PanelBottom,
  },
];

const journeyIconOptions: Array<{ value: JourneyIconName; label: string }> = [
  { value: "feather", label: "ريشة" },
  { value: "book-open", label: "كتاب" },
  { value: "drama", label: "مسرح" },
  { value: "user-round", label: "هوية" },
];

const socialIconOptions: Array<{ value: SocialIconName; label: string }> = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "send", label: "Telegram" },
  { value: "mail", label: "Email" },
];

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function createLinkItem(prefix: string): LinkItem {
  return {
    id: createId(prefix),
    label: "",
    href: "#",
  };
}

function createJourneyEntry(): JourneyEntry {
  return {
    id: createId("journey"),
    icon: "feather",
    title: "",
    description: "",
    ctaLabel: "ادخل المسار",
    ctaHref: "#",
  };
}

function createHonorItem(): HonorItem {
  return {
    id: createId("honor"),
    year: "",
    title: "",
    story: "",
  };
}

function createNewsItem(): NewsItem {
  return {
    id: createId("news"),
    date: "",
    title: "",
    description: "",
    href: "#",
    image: "/art/news-clouds.svg",
  };
}

function createSocialLink(): SocialLink {
  return {
    id: createId("social"),
    label: "",
    href: "#",
    icon: "instagram",
  };
}

export function AdminDashboard({
  initialContent,
  contentPath,
}: AdminDashboardProps) {
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState<SectionId>("site");
  const [statusTone, setStatusTone] = useState<StatusTone>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "التعديلات غير محفوظة حتى تضغط زر الحفظ.",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const stats = [
    { label: "روابط التنقل", value: content.navigationLinks.length },
    { label: "مسارات الأعمال", value: content.journey.entries.length },
    { label: "التكريمات", value: content.honors.items.length },
    { label: "الأخبار", value: content.news.items.length },
  ];

  function mutateContent(mutator: (draft: SiteContent) => void) {
    setContent((current) => {
      const next = structuredClone(current);
      mutator(next);
      return next;
    });
    setIsDirty(true);
    setStatusTone("idle");
    setStatusMessage("هناك تغييرات جديدة لم تُحفظ بعد.");
  }

  async function handleSave() {
    setIsSaving(true);
    setStatusTone("idle");
    setStatusMessage("جاري حفظ المحتوى في ملف البيانات...");

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      const payload = (await response.json()) as {
        content?: SiteContent;
        message?: string;
      };

      if (!response.ok || !payload.content) {
        throw new Error(payload.message ?? "تعذر حفظ المحتوى.");
      }

      setContent(payload.content);
      setIsDirty(false);
      setStatusTone("success");
      setStatusMessage("تم حفظ التعديلات بنجاح، والموقع الرئيسي يقرأ منها مباشرة.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع أثناء الحفظ.";
      setStatusTone("error");
      setStatusMessage(message);
    } finally {
      setIsSaving(false);
    }
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "site":
        return <SiteSectionEditor content={content} mutateContent={mutateContent} />;
      case "hero":
        return <HeroSectionEditor content={content} mutateContent={mutateContent} />;
      case "journey":
        return (
          <JourneySectionEditor content={content} mutateContent={mutateContent} />
        );
      case "pulse":
        return <PulseSectionEditor content={content} mutateContent={mutateContent} />;
      case "honors":
        return (
          <HonorsSectionEditor content={content} mutateContent={mutateContent} />
        );
      case "news":
        return <NewsSectionEditor content={content} mutateContent={mutateContent} />;
      case "quote":
        return <QuoteSectionEditor content={content} mutateContent={mutateContent} />;
      case "audio":
        return <AudioSectionEditor content={content} mutateContent={mutateContent} />;
      case "footer":
        return (
          <FooterSectionEditor content={content} mutateContent={mutateContent} />
        );
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0d10] text-[#f3ede2]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(214,177,119,0.18),transparent_20%),radial-gradient(circle_at_8%_20%,rgba(88,122,145,0.16),transparent_24%),linear-gradient(180deg,#090c10_0%,#0d1116_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="mx-auto max-w-[1600px] px-5 py-6 md:px-8 lg:px-12 lg:py-8">
        <section className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d5bb90]/20 bg-[#d5bb90]/8 px-4 py-2 text-xs tracking-[0.2em] text-[#e2ccaa] uppercase">
                <LayoutDashboard className="size-4" />
                لوحة الإدارة
              </span>
              <h1 className="mt-5 font-display text-4xl text-[#fbf4e8] md:text-6xl">
                إدارة محتوى الموقع الرئيسي من مكان واحد
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#c7c0b4] md:text-lg">
                عدّل كل النصوص والروابط والأقسام، ثم احفظها ليقرأها الموقع العام
                مباشرة من ملف المحتوى.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-[#f3ede2] transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                عرض الموقع
                <ArrowUpRight className="size-4" />
              </Link>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d5bb90]/30 bg-[linear-gradient(135deg,#d0ad76,#8e653d)] px-5 text-sm font-medium text-[#17110c] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div
              className={`rounded-[24px] border px-4 py-4 text-sm ${
                statusTone === "success"
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                  : statusTone === "error"
                    ? "border-rose-400/20 bg-rose-400/10 text-rose-100"
                    : "border-white/10 bg-white/[0.03] text-[#d6cec0]"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {statusTone === "success" ? (
                  <CheckCircle2 className="size-4" />
                ) : statusTone === "error" ? (
                  <AlertCircle className="size-4" />
                ) : (
                  <Link2 className="size-4" />
                )}
                {statusMessage}
              </span>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#0f141a] px-4 py-4 text-sm text-[#cabfad]">
              <span className="inline-flex items-center gap-2">
                <FileText className="size-4" />
                {contentPath}
              </span>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[310px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#e7dbc4]">أقسام التحرير</p>
                  <p className="mt-1 text-xs leading-6 text-[#a9a093]">
                    تنقل سريع بين كل أجزاء الموقع.
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    isDirty
                      ? "bg-amber-400/12 text-amber-100"
                      : "bg-emerald-400/12 text-emerald-100"
                  }`}
                >
                  {isDirty ? "غير محفوظ" : "محفوظ"}
                </span>
              </div>

              <nav className="mt-5 space-y-2">
                {sectionItems.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex w-full items-start gap-3 rounded-[22px] border px-4 py-4 text-right transition ${
                        isActive
                          ? "border-[#d1b07a]/28 bg-[#d1b07a]/10"
                          : "border-white/8 bg-white/[0.02] hover:border-white/14 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-[#ead7b8]">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm text-[#f7efe3]">{section.label}</p>
                        <p className="mt-1 text-xs leading-6 text-[#a8a092]">
                          {section.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[22px] border border-white/10 bg-[#0f141a] px-4 py-4"
                  >
                    <p className="text-xs text-[#aaa193]">{stat.label}</p>
                    <p className="mt-2 font-display text-3xl text-[#f7efe3]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section>{renderActiveSection()}</section>
        </div>
      </div>
    </main>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-6">
      <div className="mb-5">
        <h2 className="font-display text-3xl text-[#f8f1e6]">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#ada496]">
          {description}
        </p>
      </div>
      {children}
    </article>
  );
}

function ArrayItemCard({
  title,
  children,
  onRemove,
}: {
  title: string;
  children: ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0f141a] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-[#f7efe3]">{title}</p>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/8 px-3 py-2 text-xs text-rose-100 transition hover:bg-rose-400/12"
        >
          <Trash2 className="size-3.5" />
          حذف
        </button>
      </div>
      {children}
    </div>
  );
}

function AddItemButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-[#f4ecde] transition hover:border-white/16 hover:bg-white/[0.06]"
    >
      <Plus className="size-4" />
      {label}
    </button>
  );
}

function FieldShell({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-[#efe5d4]">{label}</span>
      {description ? (
        <span className="mt-1 block text-xs leading-6 text-[#9d9588]">
          {description}
        </span>
      ) : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  description,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
}) {
  return (
    <FieldShell label={label} description={description}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[18px] border border-white/10 bg-[#0a1015] px-4 py-3 text-sm text-[#f6efe2] outline-none transition focus:border-[#d2b27c]/40"
      />
    </FieldShell>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <FieldShell label={label}>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value || 0))}
        className="w-full rounded-[18px] border border-white/10 bg-[#0a1015] px-4 py-3 text-sm text-[#f6efe2] outline-none transition focus:border-[#d2b27c]/40"
      />
    </FieldShell>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows,
  description,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  description?: string;
}) {
  return (
    <FieldShell label={label} description={description}>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[18px] border border-white/10 bg-[#0a1015] px-4 py-3 text-sm leading-7 text-[#f6efe2] outline-none transition focus:border-[#d2b27c]/40"
      />
    </FieldShell>
  );
}

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <FieldShell label={label}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-[18px] border border-white/10 bg-[#0a1015] px-4 py-3 text-sm text-[#f6efe2] outline-none transition focus:border-[#d2b27c]/40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function SiteSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="هوية الموقع"
        description="هذه القيم تُستخدم في الهيدر والعنوان والوصف العام للموقع."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="اسم الموقع"
            value={content.site.brandName}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.site.brandName = value;
              })
            }
          />
          <TextField
            label="السطر التعريفي"
            value={content.site.tagline}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.site.tagline = value;
              })
            }
          />
          <TextField
            label="عنوان الصفحة"
            value={content.site.pageTitle}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.site.pageTitle = value;
              })
            }
          />
          <TextAreaField
            label="وصف الصفحة"
            value={content.site.pageDescription}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.site.pageDescription = value;
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="روابط التنقل"
        description="تظهر هذه العناصر في شريط الهيدر أعلى الموقع."
      >
        <div className="space-y-4">
          {content.navigationLinks.map((link, index) => (
            <ArrayItemCard
              key={link.id}
              title={`رابط ${index + 1}`}
              onRemove={() =>
                mutateContent((draft) => {
                  draft.navigationLinks.splice(index, 1);
                })
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="النص"
                  value={link.label}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.navigationLinks[index].label = value;
                    })
                  }
                />
                <TextField
                  label="الرابط"
                  value={link.href}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.navigationLinks[index].href = value;
                    })
                  }
                />
              </div>
            </ArrayItemCard>
          ))}
        </div>

        <AddItemButton
          label="إضافة رابط جديد"
          onClick={() =>
            mutateContent((draft) => {
              draft.navigationLinks.push(createLinkItem("nav"));
            })
          }
        />
      </SectionCard>
    </div>
  );
}

function HeroSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="المحتوى الأساسي"
        description="هذه المنطقة تضبط أول انطباع يظهر للزائر."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="الكلمة الصغيرة"
            value={content.hero.sectionKicker}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.sectionKicker = value;
              })
            }
          />
          <TextAreaField
            label="العنوان الرئيسي"
            value={content.hero.title}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.title = value;
              })
            }
          />
          <TextAreaField
            label="الوصف القصير"
            value={content.hero.subtitle}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.subtitle = value;
              })
            }
          />
          <TextField
            label="نص حبة الصوت"
            value={content.hero.introPillLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.introPillLabel = value;
              })
            }
          />
          <TextAreaField
            label="وصف الهيرو"
            value={content.hero.introCaption}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.introCaption = value;
              })
            }
          />
          <TextField
            label="نص زر التمرير"
            value={content.hero.scrollPrompt}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.scrollPrompt = value;
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="الأزرار والملاحظات"
        description="يمكنك ضبط الروابط الداخلية والملاحظات فوق الصورة."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="نص الزر الأساسي"
            value={content.hero.primaryActionLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.primaryActionLabel = value;
              })
            }
          />
          <TextField
            label="رابط الزر الأساسي"
            value={content.hero.primaryActionHref}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.primaryActionHref = value;
              })
            }
          />
          <TextField
            label="نص الزر الثانوي"
            value={content.hero.secondaryActionLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.secondaryActionLabel = value;
              })
            }
          />
          <TextField
            label="رابط الزر الثانوي"
            value={content.hero.secondaryActionHref}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.secondaryActionHref = value;
              })
            }
          />
          <TextAreaField
            label="الملاحظة العلوية"
            value={content.hero.visualNoteTop}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.visualNoteTop = value;
              })
            }
          />
          <TextAreaField
            label="الملاحظة السفلية"
            value={content.hero.visualNoteBottom}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.visualNoteBottom = value;
              })
            }
          />
          <TextField
            label="نص الصوت على الجوال"
            value={content.hero.audioPillMobileLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.audioPillMobileLabel = value;
              })
            }
          />
          <TextField
            label="نص الصوت على الديسكتوب"
            value={content.hero.audioPillDesktopLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.audioPillDesktopLabel = value;
              })
            }
          />
          <TextAreaField
            label="ملاحظة الصورة على الجوال"
            value={content.hero.mobileVisualNote}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.mobileVisualNote = value;
              })
            }
          />
          <TextField
            label="بديل صورة الهيرو"
            value={content.hero.heroImageAlt}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.heroImageAlt = value;
              })
            }
          />
          <TextField
            label="بديل صورة الهيرو للجوال"
            value={content.hero.mobileHeroImageAlt}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.hero.mobileHeroImageAlt = value;
              })
            }
          />
        </div>
      </SectionCard>
    </div>
  );
}

function JourneySectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="إعدادات قسم المسارات"
        description="تتحكم بهذه النصوص في العنوان والوصف أعلى بطاقات الأعمال."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="العنوان الجانبي"
            value={content.journey.eyebrow}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.journey.eyebrow = value;
              })
            }
          />
          <TextAreaField
            label="العنوان الرئيسي"
            value={content.journey.title}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.journey.title = value;
              })
            }
          />
          <TextAreaField
            label="الوصف"
            value={content.journey.description}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.journey.description = value;
              })
            }
          />
          <TextField
            label="وسم البطاقة"
            value={content.journey.cardKicker}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.journey.cardKicker = value;
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="بطاقات المسارات"
        description="أضف أو عدّل أي مسار. سيظهر الترتيب نفسه في الواجهة."
      >
        <div className="space-y-4">
          {content.journey.entries.map((entry, index) => (
            <ArrayItemCard
              key={entry.id}
              title={`مسار ${index + 1}`}
              onRemove={() =>
                mutateContent((draft) => {
                  draft.journey.entries.splice(index, 1);
                })
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="العنوان"
                  value={entry.title}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.journey.entries[index].title = value;
                    })
                  }
                />
                <SelectField
                  label="الأيقونة"
                  value={entry.icon}
                  options={journeyIconOptions}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.journey.entries[index].icon =
                        value as JourneyIconName;
                    })
                  }
                />
                <TextAreaField
                  label="الوصف"
                  value={entry.description}
                  rows={4}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.journey.entries[index].description = value;
                    })
                  }
                />
                <TextField
                  label="نص زر البطاقة"
                  value={entry.ctaLabel}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.journey.entries[index].ctaLabel = value;
                    })
                  }
                />
                <TextField
                  label="رابط البطاقة"
                  value={entry.ctaHref}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.journey.entries[index].ctaHref = value;
                    })
                  }
                />
              </div>
            </ArrayItemCard>
          ))}
        </div>

        <AddItemButton
          label="إضافة مسار"
          onClick={() =>
            mutateContent((draft) => {
              draft.journey.entries.push(createJourneyEntry());
            })
          }
        />
      </SectionCard>
    </div>
  );
}

function PulseSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="قسم نبض الكاتب"
        description="هذا القسم يقدم الهوية الشعورية للكاتب داخل الموقع."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="العنوان الجانبي"
            value={content.pulse.eyebrow}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.eyebrow = value;
              })
            }
          />
          <TextField
            label="العنوان"
            value={content.pulse.title}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.title = value;
              })
            }
          />
          <TextAreaField
            label="النص الرئيسي"
            value={content.pulse.description}
            rows={5}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.description = value;
              })
            }
          />
          <TextAreaField
            label="النص الثانوي"
            value={content.pulse.note}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.note = value;
              })
            }
          />
          <TextField
            label="اسم الشارة"
            value={content.pulse.badgeLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.badgeLabel = value;
              })
            }
          />
          <TextField
            label="السطر الجانبي"
            value={content.pulse.aside}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.aside = value;
              })
            }
          />
          <TextField
            label="سطر النبض السفلي"
            value={content.pulse.pulseCaption}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.pulseCaption = value;
              })
            }
          />
          <TextField
            label="بديل الصورة"
            value={content.pulse.imageAlt}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.imageAlt = value;
              })
            }
          />
          <TextField
            label="بديل الصورة للجوال"
            value={content.pulse.mobileImageAlt}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.pulse.mobileImageAlt = value;
              })
            }
          />
        </div>
      </SectionCard>
    </div>
  );
}

function HonorsSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="مقدمة التكريمات"
        description="تحكم في عنوان القسم ووصفه قبل الخط الزمني."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="العنوان الجانبي"
            value={content.honors.eyebrow}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.honors.eyebrow = value;
              })
            }
          />
          <TextAreaField
            label="العنوان الرئيسي"
            value={content.honors.title}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.honors.title = value;
              })
            }
          />
          <TextAreaField
            label="الوصف"
            value={content.honors.description}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.honors.description = value;
              })
            }
          />
          <TextField
            label="بادئة العنصر"
            value={content.honors.itemLabelPrefix}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.honors.itemLabelPrefix = value;
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="عناصر الخط الزمني"
        description="كل عنصر يمثل سنة أو محطة تكريم مستقلة."
      >
        <div className="space-y-4">
          {content.honors.items.map((item, index) => (
            <ArrayItemCard
              key={item.id}
              title={`تكريم ${index + 1}`}
              onRemove={() =>
                mutateContent((draft) => {
                  draft.honors.items.splice(index, 1);
                })
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="السنة"
                  value={item.year}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.honors.items[index].year = value;
                    })
                  }
                />
                <TextField
                  label="العنوان"
                  value={item.title}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.honors.items[index].title = value;
                    })
                  }
                />
                <TextAreaField
                  label="القصة"
                  value={item.story}
                  rows={4}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.honors.items[index].story = value;
                    })
                  }
                />
              </div>
            </ArrayItemCard>
          ))}
        </div>

        <AddItemButton
          label="إضافة تكريم"
          onClick={() =>
            mutateContent((draft) => {
              draft.honors.items.push(createHonorItem());
            })
          }
        />
      </SectionCard>
    </div>
  );
}

function NewsSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="مقدمة الأخبار"
        description="الوصف هنا يظهر أعلى بطاقات الأخبار في الواجهة العامة."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="العنوان الجانبي"
            value={content.news.eyebrow}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.news.eyebrow = value;
              })
            }
          />
          <TextField
            label="العنوان الرئيسي"
            value={content.news.title}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.news.title = value;
              })
            }
          />
          <TextAreaField
            label="الوصف"
            value={content.news.description}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.news.description = value;
              })
            }
          />
          <TextField
            label="نص اقرأ المزيد"
            value={content.news.readMoreLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.news.readMoreLabel = value;
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="بطاقات الأخبار"
        description="أضف مسار الصورة من داخل `public` مثل `/art/news-clouds.svg`."
      >
        <div className="space-y-4">
          {content.news.items.map((item, index) => (
            <ArrayItemCard
              key={item.id}
              title={`خبر ${index + 1}`}
              onRemove={() =>
                mutateContent((draft) => {
                  draft.news.items.splice(index, 1);
                })
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="التاريخ"
                  value={item.date}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.news.items[index].date = value;
                    })
                  }
                />
                <TextField
                  label="العنوان"
                  value={item.title}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.news.items[index].title = value;
                    })
                  }
                />
                <TextAreaField
                  label="الوصف"
                  value={item.description}
                  rows={4}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.news.items[index].description = value;
                    })
                  }
                />
                <TextField
                  label="الرابط"
                  value={item.href}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.news.items[index].href = value;
                    })
                  }
                />
                <TextField
                  label="الصورة"
                  value={item.image}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.news.items[index].image = value;
                    })
                  }
                />
              </div>
            </ArrayItemCard>
          ))}
        </div>

        <AddItemButton
          label="إضافة خبر"
          onClick={() =>
            mutateContent((draft) => {
              draft.news.items.push(createNewsItem());
            })
          }
        />
      </SectionCard>
    </div>
  );
}

function QuoteSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="قسم الاقتباس"
        description="يمكنك تغيير الاقتباس الكبير وبطاقة المشاركة الجاهزة."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="العنوان الجانبي"
            value={content.quote.eyebrow}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.eyebrow = value;
              })
            }
          />
          <TextField
            label="العنوان الرئيسي"
            value={content.quote.title}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.title = value;
              })
            }
          />
          <TextAreaField
            label="الاقتباس"
            value={content.quote.quote}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.quote = value;
              })
            }
          />
          <TextField
            label="زر المشاركة"
            value={content.quote.shareLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.shareLabel = value;
              })
            }
          />
          <TextField
            label="زر تحويله لصورة"
            value={content.quote.imageActionLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.imageActionLabel = value;
              })
            }
          />
          <TextField
            label="عنوان البطاقة"
            value={content.quote.cardLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.cardLabel = value;
              })
            }
          />
          <TextAreaField
            label="اقتباس البطاقة"
            value={content.quote.cardQuote}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.cardQuote = value;
              })
            }
          />
          <TextAreaField
            label="وصف البطاقة"
            value={content.quote.cardCaption}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.quote.cardCaption = value;
              })
            }
          />
        </div>
      </SectionCard>
    </div>
  );
}

function AudioSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="التجربة الصوتية"
        description="كل القيم هنا تتحكم بواجهة المشغل والمحتوى النصي المصاحب له."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="العنوان الجانبي"
            value={content.audio.eyebrow}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.eyebrow = value;
              })
            }
          />
          <TextField
            label="العنوان"
            value={content.audio.title}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.title = value;
              })
            }
          />
          <TextAreaField
            label="الوصف"
            value={content.audio.description}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.description = value;
              })
            }
          />
          <TextField
            label="وسم المشهد"
            value={content.audio.stageLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.stageLabel = value;
              })
            }
          />
          <TextField
            label="السطر الهادئ"
            value={content.audio.ambientLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.ambientLabel = value;
              })
            }
          />
          <TextField
            label="عنوان المقطع"
            value={content.audio.trackTitle}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.trackTitle = value;
              })
            }
          />
          <TextField
            label="المدة الظاهرة"
            value={content.audio.duration}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.duration = value;
              })
            }
          />
          <NumberField
            label="إجمالي الثواني"
            value={content.audio.totalSeconds}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.totalSeconds = value;
              })
            }
          />
          <TextAreaField
            label="وصف المقطع"
            value={content.audio.trackDescription}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.trackDescription = value;
              })
            }
          />
          <TextField
            label="زر تشغيل"
            value={content.audio.playLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.playLabel = value;
              })
            }
          />
          <TextField
            label="زر إيقاف"
            value={content.audio.pauseLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.pauseLabel = value;
              })
            }
          />
          <TextField
            label="زر التالي"
            value={content.audio.nextLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.nextLabel = value;
              })
            }
          />
          <TextField
            label="عنوان ملاحظة الاستماع"
            value={content.audio.listeningNoteTitle}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.listeningNoteTitle = value;
              })
            }
          />
          <TextAreaField
            label="نص ملاحظة الاستماع"
            value={content.audio.listeningNoteBody}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.listeningNoteBody = value;
              })
            }
          />
          <TextField
            label="عنوان ما بعد المقطع"
            value={content.audio.afterTrackTitle}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.afterTrackTitle = value;
              })
            }
          />
          <TextAreaField
            label="نص ما بعد المقطع"
            value={content.audio.afterTrackBody}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.afterTrackBody = value;
              })
            }
          />
          <TextField
            label="وصف زر التشغيل"
            value={content.audio.playAriaLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.playAriaLabel = value;
              })
            }
          />
          <TextField
            label="وصف زر الإيقاف"
            value={content.audio.pauseAriaLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.audio.pauseAriaLabel = value;
              })
            }
          />
        </div>
      </SectionCard>
    </div>
  );
}

function FooterSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <div className="space-y-5">
      <SectionCard
        title="الرسالة الختامية"
        description="هذه المنطقة تظهر في أسفل الصفحة وتبني الانطباع الأخير."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="السطر الأول"
            value={content.footer.headlineFirstLine}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.headlineFirstLine = value;
              })
            }
          />
          <TextField
            label="السطر الثاني"
            value={content.footer.headlineSecondLine}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.headlineSecondLine = value;
              })
            }
          />
          <TextAreaField
            label="الوصف"
            value={content.footer.description}
            rows={4}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.description = value;
              })
            }
          />
          <TextField
            label="عنوان الروابط السريعة"
            value={content.footer.quickLinksTitle}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.quickLinksTitle = value;
              })
            }
          />
          <TextField
            label="عنوان الرسالة الشهرية"
            value={content.footer.newsletterTitle}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.newsletterTitle = value;
              })
            }
          />
          <TextAreaField
            label="وصف الرسالة الشهرية"
            value={content.footer.newsletterDescription}
            rows={3}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.newsletterDescription = value;
              })
            }
          />
          <TextField
            label="Placeholder البريد"
            value={content.footer.emailPlaceholder}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.emailPlaceholder = value;
              })
            }
          />
          <TextField
            label="زر الاشتراك"
            value={content.footer.newsletterButtonLabel}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.newsletterButtonLabel = value;
              })
            }
          />
          <TextField
            label="حقوق النشر"
            value={content.footer.copyright}
            onChange={(value) =>
              mutateContent((draft) => {
                draft.footer.copyright = value;
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="الروابط السريعة"
        description="تظهر هذه القائمة بجانب نموذج الاشتراك."
      >
        <div className="space-y-4">
          {content.footer.quickLinks.map((link, index) => (
            <ArrayItemCard
              key={link.id}
              title={`رابط سريع ${index + 1}`}
              onRemove={() =>
                mutateContent((draft) => {
                  draft.footer.quickLinks.splice(index, 1);
                })
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="النص"
                  value={link.label}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.footer.quickLinks[index].label = value;
                    })
                  }
                />
                <TextField
                  label="الرابط"
                  value={link.href}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.footer.quickLinks[index].href = value;
                    })
                  }
                />
              </div>
            </ArrayItemCard>
          ))}
        </div>

        <AddItemButton
          label="إضافة رابط سريع"
          onClick={() =>
            mutateContent((draft) => {
              draft.footer.quickLinks.push(createLinkItem("footer"));
            })
          }
        />
      </SectionCard>

      <SectionCard
        title="روابط السوشيال"
        description="اختر الاسم والرابط والأيقونة المناسبة لكل منصة."
      >
        <div className="space-y-4">
          {content.footer.socialLinks.map((link, index) => (
            <ArrayItemCard
              key={link.id}
              title={`منصة ${index + 1}`}
              onRemove={() =>
                mutateContent((draft) => {
                  draft.footer.socialLinks.splice(index, 1);
                })
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="الاسم"
                  value={link.label}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.footer.socialLinks[index].label = value;
                    })
                  }
                />
                <SelectField
                  label="الأيقونة"
                  value={link.icon}
                  options={socialIconOptions}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.footer.socialLinks[index].icon =
                        value as SocialIconName;
                    })
                  }
                />
                <TextField
                  label="الرابط"
                  value={link.href}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.footer.socialLinks[index].href = value;
                    })
                  }
                />
              </div>
            </ArrayItemCard>
          ))}
        </div>

        <AddItemButton
          label="إضافة منصة"
          onClick={() =>
            mutateContent((draft) => {
              draft.footer.socialLinks.push(createSocialLink());
            })
          }
        />
      </SectionCard>
    </div>
  );
}
