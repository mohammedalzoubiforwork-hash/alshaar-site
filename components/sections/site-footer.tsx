import Link from "next/link";
import { Camera, Mail, Send, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { SiteContent } from "@/lib/site-content-types";

const socialIconMap = {
  instagram: Camera,
  youtube: Video,
  send: Send,
  mail: Mail,
} as const;

type SiteFooterProps = {
  footer: SiteContent["footer"];
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer id="footer" className="relative pt-24 pb-10 md:pt-32">
      <Container>
        <div className="paper-panel overflow-hidden rounded-[42px] border border-white/10 px-6 py-10 md:px-10 md:py-14 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="font-display text-4xl leading-[1.7] text-[#f8eee2] md:text-5xl lg:text-6xl">
                {footer.headlineFirstLine}
                <br />
                {footer.headlineSecondLine}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#cfbea7]/82 md:text-lg">
                {footer.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl text-[#f5ecdc]">{footer.quickLinksTitle}</h3>
                <ul className="mt-5 space-y-3">
                  {footer.quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#d7c6ae]/78 hover:text-[#f5ecdc]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl text-[#f5ecdc]">{footer.newsletterTitle}</h3>
                <p className="mt-5 text-sm leading-7 text-[#c6b49b]/78">
                  {footer.newsletterDescription}
                </p>
                <form className="mt-5 space-y-3">
                  <input
                    type="email"
                    placeholder={footer.emailPlaceholder}
                    className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-[#f5ecdc] outline-none ring-0"
                  />
                  <button type="button" className="hero-button hero-button-secondary w-full">
                    {footer.newsletterButtonLabel}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {footer.socialLinks.map((link) => {
                const Icon = socialIconMap[link.icon];

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#e5d4ba] hover:border-[#d0ab73]/28 hover:bg-white/[0.05]"
                    aria-label={link.label}
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>

            <p className="text-sm text-[#bca98d]/76">
              {footer.copyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
