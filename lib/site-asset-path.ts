const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH?.trim() ?? "";

function isAbsoluteAssetPath(path: string) {
  return (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  );
}

export function resolveSiteAssetPath(path: string) {
  if (!path || !siteBasePath || isAbsoluteAssetPath(path)) {
    return path;
  }

  if (!path.startsWith("/")) {
    return path;
  }

  if (path === siteBasePath || path.startsWith(`${siteBasePath}/`)) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
