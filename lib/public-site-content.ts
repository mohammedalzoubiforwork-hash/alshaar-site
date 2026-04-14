import { cache } from "react";
import { getRenderableSiteContent } from "@/lib/site-content-display";
import { getSiteContent } from "@/lib/site-content";

export const getPublicSiteContent = cache(async () => {
  return getRenderableSiteContent(await getSiteContent());
});
