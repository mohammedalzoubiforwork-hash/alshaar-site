import type { Metadata } from "next";
import type { SiteContent } from "@/lib/site-content-types";

export function buildSectionMetadata(
  site: SiteContent["site"],
  title: string,
  description: string,
): Metadata {
  return {
    title: `${title} | ${site.brandName}`,
    description,
  };
}
