import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { LinkItem, SiteContent } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  site: SiteContent["site"];
  navigationLinks: LinkItem[];
  className?: string;
};

export function SiteHeader({
  site,
  navigationLinks,
  className,
}: SiteHeaderProps) {
  return (
    <Container className={cn("pt-5 md:pt-7", className)}>
      <header className="rounded-[34px] border border-white/10 bg-white/[0.045] px-4 py-4 backdrop-blur-xl lg:rounded-full lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="block">
            <p className="font-display text-2xl text-[#f5ecdc] md:text-3xl">
              {site.brandName}
            </p>
            <p className="mt-1 text-sm text-[#cdb89a]/78">{site.tagline}</p>
          </Link>

          <nav className="overflow-x-auto">
            <ul className="flex min-w-max items-center gap-2 text-sm text-[#dccab1]/80">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 hover:bg-white/[0.05] hover:text-[#f6ecdd]"
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
              مساحة هادئة
            </span>
            <Link href="/admin" className="hero-button hero-button-secondary min-h-11">
              إدارة المحتوى
            </Link>
          </div>
        </div>
      </header>
    </Container>
  );
}
