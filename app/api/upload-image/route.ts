import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxUploadSize = 8 * 1024 * 1024;
const uploadDirectory = path.join(process.cwd(), "public", "uploads");

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

  if (file.type === "image/png") {
    return ".png";
  }

  if (file.type === "image/webp") {
    return ".webp";
  }

  if (file.type === "image/gif") {
    return ".gif";
  }

  if (file.type === "image/svg+xml") {
    return ".svg";
  }

  return ".jpg";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "الملف غير موجود. اختر صورة ثم حاول مرة أخرى." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "الملف المختار ليس صورة صالحة." },
        { status: 400 },
      );
    }

    if (file.size > maxUploadSize) {
      return NextResponse.json(
        { message: "حجم الصورة كبير. الحد الأقصى هو 8 ميغابايت." },
        { status: 400 },
      );
    }

    const extension = extensionForFile(file);
    const baseName = sanitizeFileName(path.basename(file.name, extension)) || "image";
    const fileName = `${Date.now()}-${randomUUID().slice(0, 8)}-${baseName}${extension}`;
    const filePath = path.join(uploadDirectory, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(filePath, buffer);

    return NextResponse.json({
      path: `/uploads/${fileName}`,
      message: "تم رفع الصورة بنجاح.",
    });
  } catch {
    return NextResponse.json(
      { message: "تعذر رفع الصورة الآن. حاول مرة أخرى بعد قليل." },
      { status: 500 },
    );
  }
}
