import type { Metadata } from "next";
import { siteIdentity } from "@/lib/site-config";

export function buildSectionMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | ${siteIdentity.brandName}`,
    description,
  };
}
