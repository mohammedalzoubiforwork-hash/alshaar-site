"use client";

import { useEffect, useState } from "react";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { normalizeSiteContent } from "@/lib/site-content-schema";
import type { SiteContent } from "@/lib/site-content-types";

const SITE_CONTENT_DATABASE = "alshaar-site";
const SITE_CONTENT_STORE = "site-content";
const SITE_CONTENT_KEY = "content";
const SITE_CONTENT_EVENT = "alshaar:site-content-updated";
const SITE_CONTENT_SYNC_KEY = "alshaar:site-content-sync";

function getInitialContent(content: SiteContent) {
  return getRenderableSiteContent(normalizeSiteContent(content));
}

function openSiteContentDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(SITE_CONTENT_DATABASE, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(SITE_CONTENT_STORE)) {
        database.createObjectStore(SITE_CONTENT_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("تعذر فتح قاعدة البيانات المحلية."));
  });
}

async function getStoredContentFromDatabase() {
  const database = await openSiteContentDatabase();

  return await new Promise<SiteContent | null>((resolve, reject) => {
    const transaction = database.transaction(SITE_CONTENT_STORE, "readonly");
    const store = transaction.objectStore(SITE_CONTENT_STORE);
    const request = store.get(SITE_CONTENT_KEY);

    request.onsuccess = () => {
      database.close();
      resolve(request.result ? normalizeSiteContent(request.result) : null);
    };
    request.onerror = () => {
      database.close();
      reject(request.error ?? new Error("تعذر قراءة المحتوى المحلي."));
    };
  });
}

async function writeStoredContentToDatabase(content: SiteContent) {
  const database = await openSiteContentDatabase();

  return await new Promise<SiteContent>((resolve, reject) => {
    const normalized = normalizeSiteContent(content);
    const transaction = database.transaction(SITE_CONTENT_STORE, "readwrite");
    const store = transaction.objectStore(SITE_CONTENT_STORE);

    store.put(normalized, SITE_CONTENT_KEY);

    transaction.oncomplete = () => {
      database.close();
      resolve(normalized);
    };

    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? new Error("تعذر حفظ المحتوى محليًا."));
    };
  });
}

function getEditableInitialContent(content: SiteContent) {
  return normalizeSiteContent(content);
}

function notifySiteContentUpdated() {
  window.dispatchEvent(new Event(SITE_CONTENT_EVENT));

  try {
    window.localStorage.setItem(SITE_CONTENT_SYNC_KEY, `${Date.now()}`);
  } catch {
    // Ignore storage sync errors.
  }
}

export function isBrowserContentMode() {
  return process.env.NEXT_PUBLIC_STATIC_SITE === "true";
}

export async function readBrowserSiteContent(initialContent: SiteContent) {
  const fallback = getInitialContent(initialContent);

  if (
    !isBrowserContentMode() ||
    typeof window === "undefined" ||
    typeof window.indexedDB === "undefined"
  ) {
    return fallback;
  }

  try {
    const storedContent = await getStoredContentFromDatabase();

    return storedContent ? getRenderableSiteContent(storedContent) : fallback;
  } catch {
    return fallback;
  }
}

export async function writeBrowserSiteContent(content: SiteContent) {
  if (
    !isBrowserContentMode() ||
    typeof window === "undefined" ||
    typeof window.indexedDB === "undefined"
  ) {
    return getInitialContent(content);
  }

  const normalized = await writeStoredContentToDatabase(content);
  notifySiteContentUpdated();

  return getRenderableSiteContent(normalized);
}

export async function readEditableBrowserSiteContent(initialContent: SiteContent) {
  const fallback = getEditableInitialContent(initialContent);

  if (
    !isBrowserContentMode() ||
    typeof window === "undefined" ||
    typeof window.indexedDB === "undefined"
  ) {
    return fallback;
  }

  try {
    const storedContent = await getStoredContentFromDatabase();

    return storedContent ? normalizeSiteContent(storedContent) : fallback;
  } catch {
    return fallback;
  }
}

export async function writeEditableBrowserSiteContent(content: SiteContent) {
  if (
    !isBrowserContentMode() ||
    typeof window === "undefined" ||
    typeof window.indexedDB === "undefined"
  ) {
    return getEditableInitialContent(content);
  }

  const normalized = await writeStoredContentToDatabase(content);
  notifySiteContentUpdated();

  return normalized;
}

export function subscribeToBrowserSiteContent(onChange: () => void) {
  if (!isBrowserContentMode() || typeof window === "undefined") {
    return () => undefined;
  }

  const handleCustomEvent = () => onChange();
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === SITE_CONTENT_SYNC_KEY) {
      onChange();
    }
  };

  window.addEventListener(SITE_CONTENT_EVENT, handleCustomEvent);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(SITE_CONTENT_EVENT, handleCustomEvent);
    window.removeEventListener("storage", handleStorageEvent);
  };
}

export function useResolvedSiteContent(initialContent: SiteContent) {
  const [content, setContent] = useState(() => getInitialContent(initialContent));

  useEffect(() => {
    if (!isBrowserContentMode()) {
      return;
    }

    let isActive = true;

    const syncContent = () => {
      void readBrowserSiteContent(initialContent).then((nextContent) => {
        if (isActive) {
          setContent(nextContent);
        }
      });
    };

    syncContent();

    const unsubscribe = subscribeToBrowserSiteContent(syncContent);

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [initialContent]);

  return content;
}
