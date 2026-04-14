"use client";

import { normalizeSiteContent } from "@/lib/site-content-schema";
import type { SiteContent } from "@/lib/site-content-types";

const GITHUB_TOKEN_KEY = "alshaar:github-token";
const DEFAULT_REPOSITORY = "mohammedalzoubiforwork-hash/alshaar-site";
const DEFAULT_BRANCH = "main";

type GitHubRepoConfig = {
  owner: string;
  repo: string;
  branch: string;
  repository: string;
};

type GitHubContentsResponse = {
  content?: string;
  message?: string;
  sha?: string;
};

function getGitHubRepoConfig(): GitHubRepoConfig | null {
  const repository =
    process.env.NEXT_PUBLIC_GITHUB_REPOSITORY?.trim() || DEFAULT_REPOSITORY;
  const [owner, repo] = repository.split("/");

  if (!owner || !repo) {
    return null;
  }

  return {
    owner,
    repo,
    branch: process.env.NEXT_PUBLIC_GITHUB_BRANCH?.trim() || DEFAULT_BRANCH,
    repository,
  };
}

function requireGitHubRepoConfig() {
  const config = getGitHubRepoConfig();

  if (!config) {
    throw new Error("تعذر تحديد مستودع GitHub الخاص بالموقع.");
  }

  return config;
}

function buildContentsApiUrl(filePath: string) {
  const { owner, repo } = requireGitHubRepoConfig();
  const encodedPath = filePath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;
}

function getGitHubHeaders(token: string | undefined, contentType?: string) {
  const headers = new Headers({
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  });

  if (token?.trim()) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  return headers;
}

async function readGitHubJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function getRepositoryFile(
  filePath: string,
  token?: string,
): Promise<GitHubContentsResponse | null> {
  const { branch } = requireGitHubRepoConfig();
  const url = `${buildContentsApiUrl(filePath)}?ref=${encodeURIComponent(branch)}`;
  const response = await fetch(url, {
    headers: getGitHubHeaders(token),
  });

  if (response.status === 404) {
    return null;
  }

  const payload = await readGitHubJson<GitHubContentsResponse>(response);

  if (!response.ok) {
    throw new Error(payload?.message ?? "تعذر قراءة الملف من GitHub.");
  }

  return payload;
}

function decodeBase64Utf8(value: string) {
  const normalized = value.replace(/\n/g, "");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64Utf8(value: string) {
  const bytes = new TextEncoder().encode(value);
  return encodeBytesToBase64(bytes);
}

function encodeBytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

async function putRepositoryFile({
  filePath,
  contentBase64,
  message,
  token,
}: {
  filePath: string;
  contentBase64: string;
  message: string;
  token: string;
}) {
  const { branch } = requireGitHubRepoConfig();
  const existingFile = await getRepositoryFile(filePath, token);
  const response = await fetch(buildContentsApiUrl(filePath), {
    method: "PUT",
    headers: getGitHubHeaders(token, "application/json"),
    body: JSON.stringify({
      message,
      branch,
      content: contentBase64,
      ...(existingFile?.sha ? { sha: existingFile.sha } : {}),
    }),
  });
  const payload = await readGitHubJson<GitHubContentsResponse>(response);

  if (!response.ok) {
    throw new Error(payload?.message ?? "تعذر حفظ الملف في GitHub.");
  }

  return payload;
}

function sanitizeFileNamePart(value: string) {
  const sanitized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return sanitized || "file";
}

function getFileExtension(file: File, kind: "image" | "audio") {
  const fileName = file.name.trim();
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex >= 0 && dotIndex < fileName.length - 1) {
    return sanitizeFileNamePart(fileName.slice(dotIndex + 1));
  }

  if (kind === "image") {
    if (file.type === "image/png") return "png";
    if (file.type === "image/webp") return "webp";
    if (file.type === "image/svg+xml") return "svg";
    if (file.type === "image/gif") return "gif";
    return "jpg";
  }

  if (file.type === "audio/wav") return "wav";
  if (file.type === "audio/ogg") return "ogg";
  if (file.type === "audio/mp4" || file.type === "audio/x-m4a") return "m4a";
  return "mp3";
}

function getFileBaseName(file: File) {
  const fileName = file.name.trim();
  const dotIndex = fileName.lastIndexOf(".");
  const rawBaseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;

  return sanitizeFileNamePart(rawBaseName);
}

export function getGitHubRepositoryLabel() {
  const config = getGitHubRepoConfig();
  return config ? `${config.repository} · ${config.branch}` : "GitHub";
}

export function readGitHubAccessToken() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return window.localStorage.getItem(GITHUB_TOKEN_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}

export function writeGitHubAccessToken(token: string) {
  if (typeof window === "undefined") {
    return "";
  }

  const trimmed = token.trim();

  try {
    if (trimmed) {
      window.localStorage.setItem(GITHUB_TOKEN_KEY, trimmed);
    } else {
      window.localStorage.removeItem(GITHUB_TOKEN_KEY);
    }
  } catch {
    // Ignore storage errors and keep the token in memory only.
  }

  return trimmed;
}

export function clearGitHubAccessToken() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(GITHUB_TOKEN_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export async function readGitHubSiteContent(token = "") {
  const file = await getRepositoryFile("content/site-content.json", token);

  if (!file?.content) {
    throw new Error("تعذر العثور على ملف المحتوى داخل المستودع.");
  }

  return normalizeSiteContent(JSON.parse(decodeBase64Utf8(file.content)));
}

export async function saveGitHubSiteContent(content: SiteContent, token: string) {
  if (!token.trim()) {
    throw new Error("أدخل رمز GitHub أولًا قبل حفظ التعديلات.");
  }

  const normalized = normalizeSiteContent(content);
  await putRepositoryFile({
    filePath: "content/site-content.json",
    contentBase64: encodeBase64Utf8(`${JSON.stringify(normalized, null, 2)}\n`),
    message: "Update site content",
    token,
  });

  return normalized;
}

export async function uploadGitHubMediaFile(
  file: File,
  kind: "image" | "audio",
  token: string,
) {
  if (!token.trim()) {
    throw new Error("أدخل رمز GitHub أولًا قبل رفع الملفات.");
  }

  const folder = kind === "image" ? "public/uploads/images" : "public/uploads/audio";
  const extension = getFileExtension(file, kind);
  const fileName = `${Date.now()}-${getFileBaseName(file)}.${extension}`;
  const filePath = `${folder}/${fileName}`;
  const contentBase64 = encodeBytesToBase64(new Uint8Array(await file.arrayBuffer()));

  await putRepositoryFile({
    filePath,
    contentBase64,
    message: `Upload ${kind} asset ${fileName}`,
    token,
  });

  return {
    path: kind === "image" ? `/uploads/images/${fileName}` : `/uploads/audio/${fileName}`,
    message: "تم رفع الملف إلى GitHub. سيظهر للعامة بعد اكتمال نشر GitHub Pages.",
  };
}
