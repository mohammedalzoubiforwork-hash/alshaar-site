import { randomUUID } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { saveMediaFile } from "@/lib/site-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxUploadSize = 20 * 1024 * 1024;

function sanitizeFileName(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function extensionForFile(file: File) {
  const extension = path.extname(file.name).toLowerCase();

  if (extension) {
    return extension;
  }

  if (file.type === "audio/mpeg") {
    return ".mp3";
  }

  if (file.type === "audio/wav" || file.type === "audio/x-wav") {
    return ".wav";
  }

  if (file.type === "audio/ogg") {
    return ".ogg";
  }

  if (file.type === "audio/mp4") {
    return ".m4a";
  }

  return ".mp3";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "الملف غير موجود. اختر ملفًا صوتيًا ثم حاول مرة أخرى." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("audio/")) {
      return NextResponse.json(
        { message: "الملف المختار ليس ملفًا صوتيًا صالحًا." },
        { status: 400 },
      );
    }

    if (file.size > maxUploadSize) {
      return NextResponse.json(
        { message: "حجم الملف كبير. الحد الأقصى هو 20 ميغابايت." },
        { status: 400 },
      );
    }

    const extension = extensionForFile(file);
    const baseName = sanitizeFileName(path.basename(file.name, extension)) || "audio";
    const fileName = `${Date.now()}-${randomUUID().slice(0, 8)}-${baseName}${extension}`;

    const result = await saveMediaFile({
      key: `audio/${fileName}`,
      file,
    });

    return NextResponse.json({
      path: result.path,
      message: "تم رفع الملف الصوتي بنجاح.",
    });
  } catch (error) {
    console.error("upload audio failed", error);
    return NextResponse.json(
      { message: "تعذر رفع الملف الصوتي الآن. حاول مرة أخرى بعد قليل." },
      { status: 500 },
    );
  }
}
