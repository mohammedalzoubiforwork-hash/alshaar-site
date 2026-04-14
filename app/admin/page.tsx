import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getSiteContent } from "@/lib/site-content";

export default async function AdminPage() {
  const content = await getSiteContent();
  const storageMode =
    process.env.NEXT_PUBLIC_STATIC_SITE === "true" ? "github" : "server";

  return (
    <AdminDashboard
      initialContent={content}
      contentPath="content/site-content.json"
      storageMode={storageMode}
    />
  );
}
