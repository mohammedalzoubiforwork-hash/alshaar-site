import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();

  return NextResponse.json({ content });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const content = await saveSiteContent(body);

    return NextResponse.json({ content });
  } catch {
    return NextResponse.json(
      {
        message: "تعذر حفظ المحتوى. تأكد من صحة البيانات ثم حاول مرة أخرى.",
      },
      { status: 400 },
    );
  }
}
