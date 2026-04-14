"use client";

import Link from "next/link";
import { type ChangeEvent, type ReactNode, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BookCopy,
  CheckCircle2,
  FileAudio2,
  Image as ImageIcon,
  LoaderCircle,
  Newspaper,
  Plus,
  Quote,
  Save,
  Trash2,
  Trophy,
  UserRound,
} from "lucide-react";
import {
  isBrowserContentMode,
  readEditableBrowserSiteContent,
  writeEditableBrowserSiteContent,
} from "@/components/site/browser-site-content";
import {
  clearGitHubAccessToken,
  getGitHubRepositoryLabel,
  readGitHubAccessToken,
  readGitHubSiteContent,
  saveGitHubSiteContent,
  uploadGitHubMediaFile,
  writeGitHubAccessToken,
} from "@/components/site/github-repo-storage";
import { resolveSiteAssetPath } from "@/lib/site-asset-path";
import { workTypeLabels } from "@/lib/site-config";
import type {
  AudioTrack,
  HonorItem,
  NewsItem,
  QuoteItem,
  SiteContent,
  WorkItem,
  WorkType,
} from "@/lib/site-content-types";

type AdminDashboardProps = {
  initialContent: SiteContent;
  contentPath: string;
  storageMode?: StorageMode;
};

type StorageMode = "server" | "github";
type SectionId = "writer" | "photos" | "works" | "honors" | "news" | "quotes" | "audio";
type StatusTone = "idle" | "success" | "error";
type MutateOptions = {
  save?: boolean;
  savingMessage?: string;
  successMessage?: string;
};
type MutateContent = (
  mutator: (draft: SiteContent) => void,
  options?: MutateOptions,
) => void;

const sectionItems: Array<{
  id: SectionId;
  label: string;
  description: string;
  icon: typeof ImageIcon;
}> = [
  {
    id: "writer",
    label: "نبض الكاتب",
    description: "السيرة الذاتية والنص الظاهر في قسم الكاتب",
    icon: UserRound,
  },
  {
    id: "photos",
    label: "الصور",
    description: "صورة الواجهة وصورة الكاتب وصور العناصر",
    icon: ImageIcon,
  },
  {
    id: "works",
    label: "الأعمال",
    description: "إضافة وحذف الكتب والأعمال المتنوعة",
    icon: BookCopy,
  },
  {
    id: "honors",
    label: "التكريمات",
    description: "جوائز ومحطات مع صورة ووصف",
    icon: Trophy,
  },
  {
    id: "news",
    label: "الأخبار",
    description: "أخبار وبطاقات تحديثات مع صورة",
    icon: Newspaper,
  },
  {
    id: "quotes",
    label: "الاقتباسات",
    description: "إضافة أو حذف اقتباسات قصيرة",
    icon: Quote,
  },
  {
    id: "audio",
    label: "الصوتيات",
    description: "رفع ملفات صوتية وإدارة المكتبة",
    icon: FileAudio2,
  },
];

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createWorkItem(): WorkItem {
  return {
    id: createId("work"),
    type: "books",
    title: "",
    description: "",
    image: "",
    href: "/journey",
  };
}

function createHonorItem(): HonorItem {
  return {
    id: createId("honor"),
    year: "",
    title: "",
    story: "",
    image: "",
  };
}

function createNewsItem(): NewsItem {
  return {
    id: createId("news"),
    date: "",
    title: "",
    description: "",
    href: "/news",
    image: "",
  };
}

function createQuoteItem(): QuoteItem {
  return {
    id: createId("quote"),
    text: "",
    caption: "",
  };
}

function createAudioTrack(): AudioTrack {
  return {
    id: createId("audio"),
    title: "",
    description: "",
    file: "",
    durationLabel: "",
  };
}

function getIdleStatusMessage(storageMode: StorageMode) {
  return storageMode === "github"
    ? "اربط رمز GitHub أولًا، وبعدها سيحفظ الأدمن المحتوى داخل المستودع مباشرة ويعيد نشر GitHub Pages."
    : "التعديلات غير محفوظة حتى تضغط زر الحفظ.";
}

function getContentLocationLabel(
  contentPath: string,
  storageMode: StorageMode,
) {
  return storageMode === "github"
    ? `GitHub · ${getGitHubRepositoryLabel()}`
    : contentPath;
}

async function uploadFile(
  file: File,
  endpoint: string,
  storageMode: StorageMode,
) {
  if (storageMode === "github") {
    return await uploadGitHubMediaFile(
      file,
      endpoint.includes("audio") ? "audio" : "image",
      readGitHubAccessToken(),
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const responseText = await response.text();
  let payload: {
    path?: string;
    message?: string;
  } = {};

  try {
    payload = responseText ? (JSON.parse(responseText) as typeof payload) : {};
  } catch {
    payload = {
      message: responseText || "تعذر رفع الملف الآن. حاول مرة أخرى بعد قليل.",
    };
  }

  if (!response.ok || !payload.path) {
    throw new Error(payload.message ?? "تعذر رفع الملف.");
  }

  return payload;
}

export function AdminDashboard({
  initialContent,
  contentPath,
  storageMode = isBrowserContentMode() ? "github" : "server",
}: AdminDashboardProps) {
  const isGitHubStorageMode = storageMode === "github";
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState<SectionId>("writer");
  const [statusTone, setStatusTone] = useState<StatusTone>("idle");
  const [statusMessage, setStatusMessage] = useState(getIdleStatusMessage(storageMode));
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [githubToken, setGitHubToken] = useState("");
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);

  const stats = [
    { label: "الأعمال", value: content.works.length },
    { label: "التكريمات", value: content.honors.length },
    { label: "الأخبار", value: content.news.length },
    { label: "الصوتيات", value: content.audioTracks.length },
  ];

  async function syncGitHubContent(token: string, options?: { silent?: boolean }) {
    if (!isGitHubStorageMode || !token.trim()) {
      return;
    }

    setIsSyncingGitHub(true);

    if (!options?.silent) {
      setStatusTone("idle");
      setStatusMessage("جارٍ جلب آخر نسخة من GitHub...");
    }

    try {
      const githubContent = await readGitHubSiteContent(token);
      const previewContent = await writeEditableBrowserSiteContent(githubContent);

      setContent(previewContent);
      setIsDirty(false);
      setStatusTone("success");
      setStatusMessage("تمت مزامنة المحتوى الحالي من GitHub بنجاح.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "تعذر مزامنة المحتوى من GitHub.";
      setStatusTone("error");
      setStatusMessage(message);
    } finally {
      setIsSyncingGitHub(false);
    }
  }

  async function persistContent(
    nextContent: SiteContent,
    options?: {
      savingMessage?: string;
      successMessage?: string;
    },
  ) {
    setIsSaving(true);
    setStatusTone("idle");
    setStatusMessage(
      options?.savingMessage ??
        (storageMode === "github"
          ? "جارٍ حفظ المحتوى داخل GitHub وإطلاق نشر GitHub Pages..."
          : "جاري حفظ المحتوى في ملف البيانات..."),
    );

    try {
      if (storageMode === "github") {
        const nextStoredContent = await saveGitHubSiteContent(nextContent, githubToken);
        await writeEditableBrowserSiteContent(nextStoredContent);

        setContent(nextStoredContent);
        setIsDirty(false);
        setStatusTone("success");
        setStatusMessage(
          options?.successMessage ??
            "تم حفظ التعديلات في GitHub. سيحدّث GitHub Pages الموقع بعد اكتمال النشر.",
        );

        return;
      }

      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextContent),
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
      setStatusMessage(options?.successMessage ?? "تم حفظ التعديلات بنجاح.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "حدث خطأ غير متوقع أثناء الحفظ.";
      setIsDirty(true);
      setStatusTone("error");
      setStatusMessage(message);
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    let isActive = true;

    async function syncInitialContent() {
      if (storageMode === "github") {
        const savedToken = readGitHubAccessToken();
        const browserContent = await readEditableBrowserSiteContent(initialContent);

        if (!isActive) {
          return;
        }

        setContent(browserContent);
        setGitHubToken(savedToken);
        setIsDirty(false);
        setStatusTone("idle");
        setStatusMessage(getIdleStatusMessage(storageMode));

        setIsSyncingGitHub(true);

        try {
          const githubContent = await readGitHubSiteContent(savedToken);

          if (!isActive) {
            return;
          }

          const previewContent = await writeEditableBrowserSiteContent(githubContent);

          if (!isActive) {
            return;
          }

          setContent(previewContent);
          setStatusTone("success");
          setStatusMessage(
            savedToken
              ? "تمت مزامنة آخر نسخة محفوظة من GitHub."
              : "تم تحميل أحدث نسخة منشورة من المستودع على GitHub.",
          );
        } catch (error) {
          if (!isActive) {
            return;
          }

          if (savedToken) {
            const message =
              error instanceof Error ? error.message : "تعذر مزامنة المحتوى من GitHub.";
            setStatusTone("error");
            setStatusMessage(message);
          }
        } finally {
          if (isActive) {
            setIsSyncingGitHub(false);
          }
        }

        return;
      }

      try {
        const response = await fetch("/api/content", {
          cache: "no-store",
        });

        const payload = (await response.json()) as {
          content?: SiteContent;
        };

        if (!response.ok || !payload.content || !isActive) {
          return;
        }

        setContent(payload.content);
      } catch {
        // Keep the server-rendered fallback when the API is unavailable.
      }
    }

    void syncInitialContent();

    return () => {
      isActive = false;
    };
  }, [initialContent, storageMode]);

  const mutateContent: MutateContent = (mutator, options) => {
    const next = structuredClone(content);
    mutator(next);
    setContent(next);
    setIsDirty(true);
    setStatusTone("idle");
    setStatusMessage(
      options?.save
        ? options.savingMessage ?? "جاري حفظ التعديل..."
        : "هناك تغييرات جديدة لم تُحفظ بعد.",
    );

    if (options?.save) {
      void persistContent(next, {
        savingMessage: options.savingMessage,
        successMessage: options.successMessage,
      });
    }
  };

  async function handleSave() {
    await persistContent(content);
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "writer":
        return <WriterSectionEditor content={content} mutateContent={mutateContent} />;
      case "photos":
        return <PhotosSectionEditor content={content} mutateContent={mutateContent} />;
      case "works":
        return <WorksSectionEditor content={content} mutateContent={mutateContent} />;
      case "honors":
        return <HonorsSectionEditor content={content} mutateContent={mutateContent} />;
      case "news":
        return <NewsSectionEditor content={content} mutateContent={mutateContent} />;
      case "quotes":
        return <QuotesSectionEditor content={content} mutateContent={mutateContent} />;
      case "audio":
        return <AudioSectionEditor content={content} mutateContent={mutateContent} />;
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
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d5bb90]/20 bg-[#d5bb90]/8 px-4 py-2 text-xs text-[#e2ccaa]">
                {isGitHubStorageMode ? "لوحة الإدارة عبر GitHub" : "لوحة الأدمن"}
              </span>
              <h1 className="mt-5 font-display text-4xl text-[#fbf4e8] md:text-6xl">
                إدارة خفيفة للعناصر فقط
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#c7c0b4] md:text-lg">
                {isGitHubStorageMode
                  ? "عدّل النصوص والصور والصوتيات ثم احفظ التغييرات داخل المستودع مباشرة. بعد كل حفظ سيعيد GitHub Pages نشر الموقع بدل السيرفر القديم."
                  : "أضف أو احذف الصور والأعمال والتكريمات والأخبار والاقتباسات والصوتيات، ثم احفظ التغييرات ليقرأها الموقع مباشرة."}
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
                  <Save className="size-4" />
                )}
                {statusMessage}
              </span>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#0f141a] px-4 py-4 text-sm text-[#cabfad]">
              <span className="inline-flex items-center gap-2">
                {getContentLocationLabel(contentPath, storageMode)}
              </span>
            </div>
          </div>

          {isGitHubStorageMode ? (
            <div className="mt-4 rounded-[24px] border border-white/10 bg-[#0f141a] p-4 md:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm text-[#f3e7d0]">ربط GitHub</p>
                  <p className="mt-1 text-sm leading-7 text-[#b7ad9f]">
                    أدخل رمز GitHub Personal Access Token بصلاحية
                    {" "}
                    <span className="text-[#f3e7d0]">Contents: Read and write</span>
                    {" "}
                    لهذا المستودع فقط. الرمز يُحفَظ على هذا الجهاز ولا يُرسل إلا إلى GitHub.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const nextToken = writeGitHubAccessToken(githubToken);
                      setGitHubToken(nextToken);

                      if (!nextToken) {
                        setStatusTone("error");
                        setStatusMessage("أدخل رمز GitHub صالحًا أولًا.");
                        return;
                      }

                      void syncGitHubContent(nextToken);
                    }}
                    disabled={isSaving || isSyncingGitHub}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-[#f3ede2] transition hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSyncingGitHub ? "جارٍ الربط..." : "حفظ الرمز وربط GitHub"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearGitHubAccessToken();
                      setGitHubToken("");
                      setStatusTone("idle");
                      setStatusMessage(getIdleStatusMessage(storageMode));
                    }}
                    disabled={isSaving || isSyncingGitHub}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-transparent px-5 text-sm text-[#cbbca7] transition hover:border-white/20 hover:bg-white/[0.03] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    نسيان الرمز
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
                <input
                  type="password"
                  value={githubToken}
                  onChange={(event) => setGitHubToken(event.target.value)}
                  placeholder="github_pat_..."
                  autoComplete="off"
                  spellCheck={false}
                  className="min-h-12 w-full rounded-[18px] border border-white/10 bg-black/10 px-4 text-sm tracking-[0.08em] text-[#f5ecdd] outline-none ring-0 placeholder:tracking-normal placeholder:text-[#7f776b]"
                />
                <div className="inline-flex min-h-12 items-center rounded-[18px] border border-white/10 bg-black/10 px-4 text-sm text-[#cbbca7]">
                  {getGitHubRepositoryLabel()}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[310px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[#e7dbc4]">أقسام التحرير</p>
                  <p className="mt-1 text-xs leading-6 text-[#a9a093]">
                    تبويبات واضحة ومباشرة لإدارة محتوى الموقع.
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    isDirty ? "bg-amber-400/12 text-amber-100" : "bg-emerald-400/12 text-emerald-100"
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
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#ada496]">{description}</p>
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
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-[#f7efe3] transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <Plus className="size-4" />
      {label}
    </button>
  );
}

function FieldLabel({
  label,
  hint,
}: {
  label: string;
  hint?: string;
}) {
  return (
    <div className="mb-2">
      <label className="text-sm text-[#f7efe3]">{label}</label>
      {hint ? <p className="mt-1 text-xs text-[#9f9688]">{hint}</p> : null}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-[18px] border border-white/10 bg-black/10 px-4 text-sm text-[#f5ecdd] outline-none ring-0 placeholder:text-[#7f776b]"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="w-full rounded-[18px] border border-white/10 bg-black/10 px-4 py-3 text-sm leading-7 text-[#f5ecdd] outline-none ring-0 placeholder:text-[#7f776b]"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-[18px] border border-white/10 bg-black/10 px-4 text-sm text-[#f5ecdd] outline-none ring-0"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
  onCommit,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCommit?: (value: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const storageMode: StorageMode = isBrowserContentMode() ? "github" : "server";

  async function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const payload = await uploadFile(file, "/api/upload-image", storageMode);
      if (onCommit) {
        onCommit(payload.path ?? "");
      } else {
        onChange(payload.path ?? "");
      }
      setMessage(payload.message ?? "تم رفع الصورة بنجاح.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر رفع الصورة.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <TextInput
        label={label}
        value={value}
        onChange={onChange}
        placeholder="/uploads/image.jpg"
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#f7efe3] transition hover:border-white/20 hover:bg-white/[0.06]">
          {isUploading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ImageIcon className="size-4" />
          )}
          {isUploading ? "جاري الرفع..." : "رفع صورة"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelection}
          />
        </label>

        {value ? (
          <button
            type="button"
            onClick={() => {
              if (onCommit) {
                onCommit("");
              } else {
                onChange("");
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/8 px-4 py-2 text-sm text-rose-100"
          >
            <Trash2 className="size-4" />
            حذف الصورة
          </button>
        ) : null}

        {message ? <span className="text-xs text-[#bfb5a6]">{message}</span> : null}
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0d10]">
        <div className="relative aspect-[16/10]">
          {value ? (
            <>
              {/* Deliberately use a plain img here so freshly uploaded admin previews refresh immediately. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={value}
                src={resolveSiteAssetPath(value)}
                alt={label}
                className="h-full w-full object-cover"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(221,186,134,0.18),transparent_24%),linear-gradient(180deg,#241a15_0%,#120d0a_100%)]">
              <span className="text-sm text-[#bba68a]">لا توجد صورة مضافة</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AudioUploadField({
  label,
  value,
  onChange,
  onCommit,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCommit?: (value: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const storageMode: StorageMode = isBrowserContentMode() ? "github" : "server";

  async function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const payload = await uploadFile(file, "/api/upload-audio", storageMode);
      if (onCommit) {
        onCommit(payload.path ?? "");
      } else {
        onChange(payload.path ?? "");
      }
      setMessage(payload.message ?? "تم رفع الملف بنجاح.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر رفع الملف.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <TextInput
        label={label}
        value={value}
        onChange={onChange}
        placeholder="/uploads/audio.mp3"
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#f7efe3] transition hover:border-white/20 hover:bg-white/[0.06]">
          {isUploading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <FileAudio2 className="size-4" />
          )}
          {isUploading ? "جاري الرفع..." : "رفع ملف صوتي"}
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileSelection}
          />
        </label>

        {value ? (
          <button
            type="button"
            onClick={() => {
              if (onCommit) {
                onCommit("");
              } else {
                onChange("");
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/8 px-4 py-2 text-sm text-rose-100"
          >
            <Trash2 className="size-4" />
            حذف الملف
          </button>
        ) : null}

        {message ? <span className="text-xs text-[#bfb5a6]">{message}</span> : null}
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[#0a0d10] p-4">
        {value ? (
          <audio
            controls
            preload="none"
            className="w-full"
            src={resolveSiteAssetPath(value)}
          >
            المتصفح الحالي لا يدعم تشغيل الصوتيات.
          </audio>
        ) : (
          <p className="text-sm text-[#bba68a]">لا يوجد ملف صوتي مرفوع</p>
        )}
      </div>
    </div>
  );
}

function PhotosSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <SectionCard
      title="الصور الثابتة"
      description="هنا تدير صورة الواجهة وصورة الكاتب. أما صور الأعمال والتكريمات والأخبار فتدار من بطاقات العناصر نفسها."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ImageUploadField
          label="صورة الواجهة"
          value={content.photos.heroImage}
          onChange={(value) =>
            mutateContent((draft) => {
              draft.photos.heroImage = value;
            })
          }
          onCommit={(value) =>
            mutateContent(
              (draft) => {
                draft.photos.heroImage = value;
              },
              {
                save: true,
                savingMessage: "جاري حفظ صورة الواجهة...",
                successMessage: "تم تحديث صورة الواجهة وحفظها.",
              },
            )
          }
        />
        <ImageUploadField
          label="صورة الكاتب"
          value={content.photos.writerImage}
          onChange={(value) =>
            mutateContent((draft) => {
              draft.photos.writerImage = value;
            })
          }
          onCommit={(value) =>
            mutateContent(
              (draft) => {
                draft.photos.writerImage = value;
              },
              {
                save: true,
                savingMessage: "جاري حفظ صورة الكاتب...",
                successMessage: "تم تحديث صورة الكاتب وحفظها.",
              },
            )
          }
        />
      </div>
    </SectionCard>
  );
}

function WriterSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <SectionCard
      title="نبض الكاتب"
      description="النص وصورة الكاتب هنا يظهران داخل قسم نبض الكاتب في الصفحة الرئيسية وصفحة الكاتب."
    >
      <div className="grid gap-6">
        <ImageUploadField
          label="صورة الكاتب في نبض الكاتب"
          value={content.photos.writerImage}
          onChange={(value) =>
            mutateContent((draft) => {
              draft.photos.writerImage = value;
            })
          }
          onCommit={(value) =>
            mutateContent(
              (draft) => {
                draft.photos.writerImage = value;
              },
              {
                save: true,
                savingMessage: "جاري حفظ صورة نبض الكاتب...",
                successMessage: "تم تحديث صورة نبض الكاتب وحفظها.",
              },
            )
          }
        />
        <TextareaField
          label="السيرة الذاتية"
          value={content.writer.biography}
          onChange={(value) =>
            mutateContent((draft) => {
              draft.writer.biography = value;
            })
          }
          rows={8}
        />
      </div>
    </SectionCard>
  );
}

function WorksSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <SectionCard
      title="الأعمال"
      description="أضف الكتب والأعمال المتنوعة أو احذفها. العنصر الجديد يضاف في الأعلى."
    >
      <div className="space-y-4">
        <AddItemButton
          label="إضافة عمل"
          onClick={() =>
            mutateContent((draft) => {
              draft.works.unshift(createWorkItem());
            })
          }
        />

        {content.works.map((item, index) => (
          <ArrayItemCard
            key={item.id}
            title={item.title || `عمل ${content.works.length - index}`}
            onRemove={() =>
              mutateContent((draft) => {
                draft.works.splice(index, 1);
              })
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="العنوان"
                value={item.title}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.works[index].title = value;
                  })
                }
              />
              <SelectField
                label="النوع"
                value={item.type}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.works[index].type = value as WorkType;
                  })
                }
                options={Object.entries(workTypeLabels).map(([value, label]) => ({
                  value,
                  label,
                }))}
              />
              <div className="md:col-span-2">
                <TextareaField
                  label="الوصف"
                  value={item.description}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.works[index].description = value;
                    })
                  }
                />
              </div>
              <TextInput
                label="الرابط"
                value={item.href}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.works[index].href = value;
                  })
                }
              />
              <div className="md:col-span-2">
                <ImageUploadField
                  label="صورة العمل"
                  value={item.image}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.works[index].image = value;
                    })
                  }
                  onCommit={(value) =>
                    mutateContent(
                      (draft) => {
                        draft.works[index].image = value;
                      },
                      {
                        save: true,
                        savingMessage: "جاري حفظ صورة العمل...",
                        successMessage: "تم تحديث صورة العمل وحفظها.",
                      },
                    )
                  }
                />
              </div>
            </div>
          </ArrayItemCard>
        ))}
      </div>
    </SectionCard>
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
    <SectionCard
      title="التكريمات"
      description="كل تكريم يحتوي على سنة وعنوان ووصف وصورة اختيارية."
    >
      <div className="space-y-4">
        <AddItemButton
          label="إضافة تكريم"
          onClick={() =>
            mutateContent((draft) => {
              draft.honors.unshift(createHonorItem());
            })
          }
        />

        {content.honors.map((item, index) => (
          <ArrayItemCard
            key={item.id}
            title={item.title || `تكريم ${content.honors.length - index}`}
            onRemove={() =>
              mutateContent((draft) => {
                draft.honors.splice(index, 1);
              })
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="السنة"
                value={item.year}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.honors[index].year = value;
                  })
                }
              />
              <TextInput
                label="العنوان"
                value={item.title}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.honors[index].title = value;
                  })
                }
              />
              <div className="md:col-span-2">
                <TextareaField
                  label="الوصف"
                  value={item.story}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.honors[index].story = value;
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <ImageUploadField
                  label="صورة التكريم"
                  value={item.image}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.honors[index].image = value;
                    })
                  }
                  onCommit={(value) =>
                    mutateContent(
                      (draft) => {
                        draft.honors[index].image = value;
                      },
                      {
                        save: true,
                        savingMessage: "جاري حفظ صورة التكريم...",
                        successMessage: "تم تحديث صورة التكريم وحفظها.",
                      },
                    )
                  }
                />
              </div>
            </div>
          </ArrayItemCard>
        ))}
      </div>
    </SectionCard>
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
    <SectionCard
      title="الأخبار"
      description="أضف خبرًا بعنوان وتاريخ ووصف وصورة ورابط."
    >
      <div className="space-y-4">
        <AddItemButton
          label="إضافة خبر"
          onClick={() =>
            mutateContent((draft) => {
              draft.news.unshift(createNewsItem());
            })
          }
        />

        {content.news.map((item, index) => (
          <ArrayItemCard
            key={item.id}
            title={item.title || `خبر ${content.news.length - index}`}
            onRemove={() =>
              mutateContent((draft) => {
                draft.news.splice(index, 1);
              })
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="التاريخ"
                value={item.date}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.news[index].date = value;
                  })
                }
              />
              <TextInput
                label="العنوان"
                value={item.title}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.news[index].title = value;
                  })
                }
              />
              <div className="md:col-span-2">
                <TextareaField
                  label="الوصف"
                  value={item.description}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.news[index].description = value;
                    })
                  }
                />
              </div>
              <TextInput
                label="الرابط"
                value={item.href}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.news[index].href = value;
                  })
                }
              />
              <div className="md:col-span-2">
                <ImageUploadField
                  label="صورة الخبر"
                  value={item.image}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.news[index].image = value;
                    })
                  }
                  onCommit={(value) =>
                    mutateContent(
                      (draft) => {
                        draft.news[index].image = value;
                      },
                      {
                        save: true,
                        savingMessage: "جاري حفظ صورة الخبر...",
                        successMessage: "تم تحديث صورة الخبر وحفظها.",
                      },
                    )
                  }
                />
              </div>
            </div>
          </ArrayItemCard>
        ))}
      </div>
    </SectionCard>
  );
}

function QuotesSectionEditor({
  content,
  mutateContent,
}: {
  content: SiteContent;
  mutateContent: MutateContent;
}) {
  return (
    <SectionCard
      title="الاقتباسات"
      description="اقتباسات قصيرة مع وصف مختصر اختياري يظهر داخل البطاقة."
    >
      <div className="space-y-4">
        <AddItemButton
          label="إضافة اقتباس"
          onClick={() =>
            mutateContent((draft) => {
              draft.quotes.unshift(createQuoteItem());
            })
          }
        />

        {content.quotes.map((item, index) => (
          <ArrayItemCard
            key={item.id}
            title={item.text || `اقتباس ${content.quotes.length - index}`}
            onRemove={() =>
              mutateContent((draft) => {
                draft.quotes.splice(index, 1);
              })
            }
          >
            <div className="grid gap-4">
              <TextareaField
                label="نص الاقتباس"
                value={item.text}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.quotes[index].text = value;
                  })
                }
                rows={5}
              />
              <TextareaField
                label="وصف مختصر"
                value={item.caption}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.quotes[index].caption = value;
                  })
                }
                rows={3}
              />
            </div>
          </ArrayItemCard>
        ))}
      </div>
    </SectionCard>
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
    <SectionCard
      title="الصوتيات"
      description="ارفع ملفات صوتية حقيقية، وسيعرضها الموقع كمكتبة تشغيل مباشرة."
    >
      <div className="space-y-4">
        <AddItemButton
          label="إضافة مقطع صوتي"
          onClick={() =>
            mutateContent((draft) => {
              draft.audioTracks.unshift(createAudioTrack());
            })
          }
        />

        {content.audioTracks.map((item, index) => (
          <ArrayItemCard
            key={item.id}
            title={item.title || `صوتية ${content.audioTracks.length - index}`}
            onRemove={() =>
              mutateContent((draft) => {
                draft.audioTracks.splice(index, 1);
              })
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="العنوان"
                value={item.title}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.audioTracks[index].title = value;
                  })
                }
              />
              <TextInput
                label="المدة الظاهرة"
                value={item.durationLabel}
                onChange={(value) =>
                  mutateContent((draft) => {
                    draft.audioTracks[index].durationLabel = value;
                  })
                }
                placeholder="2:35"
              />
              <div className="md:col-span-2">
                <TextareaField
                  label="الوصف"
                  value={item.description}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.audioTracks[index].description = value;
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <AudioUploadField
                  label="الملف الصوتي"
                  value={item.file}
                  onChange={(value) =>
                    mutateContent((draft) => {
                      draft.audioTracks[index].file = value;
                    })
                  }
                  onCommit={(value) =>
                    mutateContent(
                      (draft) => {
                        draft.audioTracks[index].file = value;
                      },
                      {
                        save: true,
                        savingMessage: "جاري حفظ الملف الصوتي...",
                        successMessage: "تم تحديث الملف الصوتي وحفظه.",
                      },
                    )
                  }
                />
              </div>
            </div>
          </ArrayItemCard>
        ))}
      </div>
    </SectionCard>
  );
}
