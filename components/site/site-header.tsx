import Link from "next/link";
import { navigationLinks, siteIdentity } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1320px] px-5 pt-5 md:px-8 md:pt-7", className)}>
      <header className="rounded-[34px] border border-[rgba(160,220,227,0.18)] bg-[rgba(8,31,48,0.48)] px-4 py-4 shadow-[0_18px_54px_rgba(0,0,0,0.16)] backdrop-blur-xl lg:rounded-full lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="block">
            <p className="font-display text-2xl font-semibold text-[#fff7ef] md:text-3xl">
              {siteIdentity.brandName}
            </p>
            <p className="mt-1 text-sm text-[#d6e7ef]/78">{siteIdentity.tagline}</p>
          </Link>

          <nav className="overflow-x-auto">
            <ul className="flex min-w-max items-center gap-2 text-sm text-[#e8f2f5]/82">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 hover:bg-white/[0.08] hover:text-[#fff9f2]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="sound-pill">
              <span className="sound-dot" />
              تجربة مضيئة
            </span>
            <Link href="/admin" className="hero-button hero-button-secondary min-h-11">
              إدارة المحتوى
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
