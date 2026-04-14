import { randomUUID } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { saveMediaFile } from "@/lib/site-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxUploadSize = 8 * 1024 * 1024;
const maxRasterWidth = 2400;
const maxRasterHeight = 2400;
const optimizedImageQuality = 82;
const optimizableImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

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

async function optimizeImageFile(file: File) {
  const extension = extensionForFile(file);

  if (!optimizableImageTypes.has(file.type)) {
    return {
      extension,
      file,
    };
  }

  try {
    const sharp = (await import("sharp")).default;
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const transformer = sharp(inputBuffer, {
      animated: true,
      failOn: "none",
      limitInputPixels: 24_000_000,
    });
    const metadata = await transformer.metadata();

    if ((metadata.pages ?? 1) > 1) {
      return {
        extension,
        file,
      };
    }

    let pipeline = transformer.rotate();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    const needsResize = width > maxRasterWidth || height > maxRasterHeight;

    if (needsResize) {
      pipeline = pipeline.resize({
        width: maxRasterWidth,
        height: maxRasterHeight,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    const outputBuffer = await pipeline
      .webp({
        quality: optimizedImageQuality,
        effort: 4,
      })
      .toBuffer();

    const shouldKeepOriginal =
      !needsResize && outputBuffer.byteLength >= inputBuffer.byteLength * 0.98;

    if (shouldKeepOriginal) {
      return {
        extension,
        file,
      };
    }

    return {
      extension: ".webp",
      file: new File(
        [new Uint8Array(outputBuffer)],
        `${path.basename(file.name, extension) || "image"}.webp`,
        {
          type: "image/webp",
        },
      ),
    };
  } catch (error) {
    console.warn("image optimization skipped", error);

    return {
      extension,
      file,
    };
  }
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

    const optimized = await optimizeImageFile(file);
    const baseName =
      sanitizeFileName(path.basename(optimized.file.name, optimized.extension)) || "image";
    const fileName = `${Date.now()}-${randomUUID().slice(0, 8)}-${baseName}${optimized.extension}`;

    const result = await saveMediaFile({
      key: `images/${fileName}`,
      file: optimized.file,
    });

    return NextResponse.json({
      path: result.path,
      message: "تم رفع الصورة بنجاح.",
    });
  } catch (error) {
    console.error("upload image failed", error);
    return NextResponse.json(
      { message: "تعذر رفع الصورة الآن. حاول مرة أخرى بعد قليل." },
      { status: 500 },
    );
  }
}
