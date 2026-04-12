import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeSiteContent } from "@/lib/site-content-schema";
import type { SiteContent } from "@/lib/site-content-types";

export const siteContentPath = path.join(
  process.cwd(),
  "content",
  "site-content.json",
);

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(siteContentPath, "utf8");
    return normalizeSiteContent(JSON.parse(raw));
  } catch {
    return normalizeSiteContent({});
  }
}

export async function saveSiteContent(content: unknown): Promise<SiteContent> {
  const normalized = normalizeSiteContent(content);

  await mkdir(path.dirname(siteContentPath), { recursive: true });
  await writeFile(
    siteContentPath,
    `${JSON.stringify(normalized, null, 2)}\n`,
    "utf8",
  );

  return normalized;
}
