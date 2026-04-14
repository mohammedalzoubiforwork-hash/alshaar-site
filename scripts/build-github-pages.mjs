import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, ".github-pages-build");
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "alshaar-site";

const excludedEntries = new Set([
  ".git",
  ".github-pages-build",
  ".next",
  "node_modules",
  "out",
]);

const githubPagesNextConfig = `import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1] ?? "alshaar-site";
const basePath = \`/\${repoName}\`;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
`;

const githubPagesAdminPage = `export default function AdminPage() {
  return (
    <main className="page-shell">
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[960px] items-center px-4 py-12 sm:px-6">
        <div className="glass-panel w-full rounded-[32px] px-6 py-10 text-center sm:px-10">
          <p className="text-sm text-[#d6e7ef]/72">GitHub Pages</p>
          <h1 className="mt-4 font-display text-3xl text-[#fff7ef] sm:text-4xl">
            لوحة الإدارة غير متاحة هنا
          </h1>
          <p className="mx-auto mt-4 max-w-[32rem] text-base leading-8 text-[#d6e7ef]/84">
            هذه النسخة مخصصة لعرض الموقع مباشرة من GitHub Pages. ميزات الإدارة والرفع الديناميكي
            تحتاج استضافة تدعم الخادم مثل Netlify أو أي بيئة Node كاملة.
          </p>
          <a
            href="../"
            className="hero-button mx-auto mt-8 inline-flex min-h-12 min-w-[12rem] items-center justify-center"
          >
            العودة إلى الموقع
          </a>
        </div>
      </section>
    </main>
  );
}
`;

async function copyProject() {
  await rm(buildDir, { recursive: true, force: true });
  await mkdir(buildDir, { recursive: true });

  const entries = await readdir(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    if (excludedEntries.has(entry.name)) {
      continue;
    }

    await cp(path.join(rootDir, entry.name), path.join(buildDir, entry.name), {
      recursive: true,
    });
  }
}

async function linkNodeModules() {
  const source = path.join(rootDir, "node_modules");
  const target = path.join(buildDir, "node_modules");

  if (!existsSync(source)) {
    throw new Error("node_modules is missing. Run npm install before building GitHub Pages.");
  }

  await symlink(source, target, process.platform === "win32" ? "junction" : "dir");
}

async function prepareStaticOnlyFiles() {
  await rm(path.join(buildDir, "app", "api"), { recursive: true, force: true });
  await rm(path.join(buildDir, "app", "media"), { recursive: true, force: true });

  const adminDir = path.join(buildDir, "app", "admin");
  await mkdir(adminDir, { recursive: true });
  await writeFile(path.join(adminDir, "page.tsx"), githubPagesAdminPage, "utf8");
  await writeFile(path.join(buildDir, "next.config.ts"), githubPagesNextConfig, "utf8");

  const contentPath = path.join(buildDir, "content", "site-content.json");
  const rawContent = await readFile(contentPath, "utf8");
  await writeFile(contentPath, rawContent.replaceAll('"/media/', '"/uploads/'), "utf8");
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const npmCliPath = process.env.npm_execpath;

    if (!npmCliPath) {
      reject(new Error("npm_execpath is missing. Run this script through npm."));
      return;
    }

    const child = spawn(process.execPath, [npmCliPath, "run", "build"], {
      cwd: buildDir,
      env: {
        ...process.env,
        GITHUB_PAGES: "true",
        GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY ?? `local/${repoName}`,
      },
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`GitHub Pages build failed with exit code ${code ?? "unknown"}.`));
    });

    child.on("error", reject);
  });
}

await copyProject();
await linkNodeModules();
await prepareStaticOnlyFiles();
await runBuild();
await writeFile(path.join(buildDir, "out", ".nojekyll"), "", "utf8");
