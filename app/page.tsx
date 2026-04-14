import { HomePageClient } from "@/components/pages/public-site-pages";
import { getPublicSiteContent } from "@/lib/public-site-content";

export default async function Home() {
  const content = await getPublicSiteContent();

  return <HomePageClient initialContent={content} />;
}
