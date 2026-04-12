import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getStore } from "@netlify/blobs";
import { normalizeSiteContent } from "@/lib/site-content-schema";
import type { SiteContent } from "@/lib/site-content-types";

const CONTENT_STORE_NAME = "site-content";
const CONTENT_KEY = "site-content.json";
const MEDIA_STORE_NAME = "site-media";

export const siteContentPath = path.join(
  process.cwd(),
  "content",
  "site-content.json",
);

const localUploadsPath = path.join(process.cwd(), "public", "uploads");

function isBlobStorageEnabled() {
  return (
    Boolean(
      process.env.NETLIFY_BLOBS_SITE_ID && process.env.NETLIFY_BLOBS_TOKEN,
    ) || process.env.NETLIFY === "true"
  );
}

function getContentStore() {
  const siteID = process.env.NETLIFY_BLOBS_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  const apiURL = process.env.NETLIFY_BLOBS_API_URL;

  if (siteID && token) {
    return getStore(CONTENT_STORE_NAME, {
      ...(apiURL ? { apiURL } : {}),
      consistency: "strong",
      siteID,
      token,
    });
  }

  return getStore(CONTENT_STORE_NAME, {
    consistency: "strong",
  });
}

function getMediaStore() {
  const siteID = process.env.NETLIFY_BLOBS_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  const apiURL = process.env.NETLIFY_BLOBS_API_URL;

  if (siteID && token) {
    return getStore(MEDIA_STORE_NAME, {
      ...(apiURL ? { apiURL } : {}),
      consistency: "strong",
      siteID,
      token,
    });
  }

  return getStore(MEDIA_STORE_NAME, {
    consistency: "strong",
  });
}

function getLocalUploadPath(key: string) {
  return path.join(localUploadsPath, key);
}

function contentTypeFromKey(key: string) {
  const extension = path.extname(key).toLowerCase();

  switch (extension) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".mp3":
      return "audio/mpeg";
    case ".wav":
      return "audio/wav";
    case ".ogg":
      return "audio/ogg";
    case ".m4a":
      return "audio/mp4";
    default:
      return "application/octet-stream";
  }
}

async function readLocalSiteContent() {
  try {
    const raw = await readFile(siteContentPath, "utf8");
    return normalizeSiteContent(JSON.parse(raw));
  } catch {
    return normalizeSiteContent({});
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  if (isBlobStorageEnabled()) {
    try {
      const data = await getContentStore().get(CONTENT_KEY, {
        consistency: "strong",
        type: "json",
      });

      if (data !== null) {
        return normalizeSiteContent(data);
      }

      return await readLocalSiteContent();
    } catch {
      return await readLocalSiteContent();
    }
  }

  return await readLocalSiteContent();
}

export async function saveSiteContent(content: unknown): Promise<SiteContent> {
  const normalized = normalizeSiteContent(content);

  if (isBlobStorageEnabled()) {
    await getContentStore().setJSON(CONTENT_KEY, normalized);
    return normalized;
  }

  await mkdir(path.dirname(siteContentPath), { recursive: true });
  await writeFile(
    siteContentPath,
    `${JSON.stringify(normalized, null, 2)}\n`,
    "utf8",
  );

  return normalized;
}

export async function saveMediaFile({
  key,
  file,
}: {
  key: string;
  file: File;
}) {
  const contentType = file.type || contentTypeFromKey(key);

  if (isBlobStorageEnabled()) {
    await getMediaStore().set(key, file, {
      metadata: {
        contentType,
        originalName: file.name,
      },
    });
  } else {
    const filePath = getLocalUploadPath(key);
    const buffer = Buffer.from(await file.arrayBuffer());

    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, buffer);
  }

  return {
    path: `/media/${key}`,
    contentType,
  };
}

export async function getMediaFile(key: string) {
  if (isBlobStorageEnabled()) {
    const result = await getMediaStore().getWithMetadata(key, {
      consistency: "strong",
      type: "arrayBuffer",
    });

    if (!result) {
      return null;
    }

    return {
      data: result.data,
      contentType:
        typeof result.metadata.contentType === "string"
          ? result.metadata.contentType
          : contentTypeFromKey(key),
    };
  }

  try {
    const filePath = getLocalUploadPath(key);
    const data = await readFile(filePath);

    return {
      data,
      contentType: contentTypeFromKey(key),
    };
  } catch {
    return null;
  }
}
