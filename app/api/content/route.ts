import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import { publicSitePaths } from "@/lib/site-pages";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const content = await getSiteContent();

  return NextResponse.json({ content });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const content = await saveSiteContent(body);

    for (const path of publicSitePaths) {
      revalidatePath(path, "page");
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("save content failed", error);

    return NextResponse.json(
      {
        message: "تعذر حفظ المحتوى. تأكد من صحة البيانات ثم حاول مرة أخرى.",
      },
      { status: 400 },
    );
  }
}
