import Link from "next/link";
import { navigationLinks, siteIdentity } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
  currentPath?: string;
  showMobileQuickLinks?: boolean;
};

function isActiveLink(href: string, currentPath: string) {
  return href === currentPath;
}

export function SiteHeader({
  className,
  currentPath = "/",
  showMobileQuickLinks = true,
}: SiteHeaderProps) {
  const desktopLinkClass = (href: string) =>
    cn(
      "rounded-full px-4 py-2 hover:bg-white/[0.1] hover:text-[#fffdf7]",
      isActiveLink(href, currentPath) && "bg-white/[0.12] text-[#fffdf7]",
    );

  const mobileLinkClass = (href: string) =>
    cn(
      "flex min-h-12 items-center justify-center rounded-[20px] border border-white/10 bg-[#14324c]/68 px-3 py-3 text-center text-sm font-medium leading-6 text-[#eef8fb]/90",
      isActiveLink(href, currentPath) &&
        "border-[#7ee6dc]/34 bg-[#1b4160] text-[#fffdf7]",
    );

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1320px] px-4 pt-4 sm:px-5 sm:pt-5 md:px-8 md:pt-7",
        className,
      )}
    >
      <header className="glass-topbar rounded-[28px] px-4 py-4 sm:px-5 sm:py-5 md:rounded-[34px] lg:rounded-full lg:px-6">
        <div className="hidden items-start justify-between gap-4 lg:flex lg:items-center">
          <Link href="/" className="block min-w-0 flex-1">
            <p className="font-display text-[1.65rem] font-semibold text-[#fff7ef] sm:text-3xl">
              {siteIdentity.brandName}
            </p>
            <p className="mt-1 max-w-[18rem] text-xs leading-6 text-[#d6e7ef]/78 sm:max-w-none sm:text-sm">
              {siteIdentity.tagline}
            </p>
          </Link>

          <nav className="hidden overflow-x-auto lg:block">
            <ul className="flex min-w-max items-center gap-2 text-sm text-[#e8f2f5]/82">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} prefetch={false} className={desktopLinkClass(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center lg:flex">
            <Link
              href="/admin"
              prefetch={false}
              className="hero-button hero-button-secondary min-h-11"
            >
              إدارة
            </Link>
          </div>
        </div>

        <div className="space-y-4 lg:hidden">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <Link href="/" className="block min-w-0 max-w-full flex-1">
              <p className="font-display text-[1.5rem] font-semibold leading-tight text-[#fff7ef] sm:text-[1.8rem]">
                {siteIdentity.brandName}
              </p>
              <p className="mt-2 max-w-[24rem] text-xs leading-6 text-[#d6e7ef]/78 sm:text-sm">
                {siteIdentity.tagline}
              </p>
            </Link>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Link
                href="/admin"
                prefetch={false}
                className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-[#f3fbff]"
              >
                إدارة
              </Link>
            </div>
          </div>

          {showMobileQuickLinks ? (
            <nav aria-label="قائمة التنقل" className="border-t border-white/10 pt-4">
              <ul className="grid grid-cols-2 gap-2.5 text-sm text-[#e8f2f5]/82 sm:grid-cols-3">
                {navigationLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={mobileLinkClass(link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </header>
    </div>
  );
}
