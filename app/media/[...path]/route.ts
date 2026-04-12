import { getMediaFile } from "@/lib/site-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function normalizeKey(segments: string[]) {
  if (segments.length === 0) {
    return null;
  }

  if (segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
    return null;
  }

  const key = segments.join("/");

  if (!key.startsWith("images/") && !key.startsWith("audio/")) {
    return null;
  }

  return key;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const params = await context.params;
  const key = normalizeKey(params.path);

  if (!key) {
    return new Response("Invalid media path.", { status: 400 });
  }

  const result = await getMediaFile(key);

  if (!result) {
    return new Response("Media not found.", { status: 404 });
  }

  return new Response(result.data, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": result.contentType,
    },
  });
}
