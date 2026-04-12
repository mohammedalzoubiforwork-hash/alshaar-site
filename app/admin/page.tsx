import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getSiteContent();

  return (
    <AdminDashboard
      initialContent={content}
      contentPath="content/site-content.json"
    />
  );
}
