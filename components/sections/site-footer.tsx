import Link from "next/link";
import { Camera, Mail, Send, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  footerCopy,
  footerLinks,
  footerSocialLinks,
  type StaticSocialIconName,
} from "@/lib/site-config";

const socialIconMap: Record<StaticSocialIconName, typeof Camera> = {
  instagram: Camera,
  youtube: Video,
  send: Send,
  mail: Mail,
};

export function SiteFooter() {
  return (
    <footer id="footer" className="relative pb-10 pt-24 md:pt-32">
      <Container>
        <div className="paper-panel overflow-hidden rounded-[42px] border border-white/10 px-6 py-10 md:px-10 md:py-14 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="font-display text-4xl leading-[1.7] text-[#fff6ec] md:text-5xl lg:text-6xl">
                {footerCopy.headlineFirstLine}
                <br />
                {footerCopy.headlineSecondLine}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#dce7ee]/82 md:text-lg">
                {footerCopy.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl text-[#fff6ec]">{footerCopy.quickLinksTitle}</h3>
                <ul className="mt-5 space-y-3">
                  {footerLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#dce7ee]/78 hover:text-[#fff6ec]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl text-[#fff6ec]">{footerCopy.newsletterTitle}</h3>
                <p className="mt-5 text-sm leading-7 text-[#d2e0e8]/78">
                  {footerCopy.newsletterDescription}
                </p>
                <form className="mt-5 space-y-3">
                  <input
                    type="email"
                    placeholder={footerCopy.emailPlaceholder}
                    className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-[#fff6ec] outline-none ring-0"
                  />
                  <button type="button" className="hero-button hero-button-secondary w-full">
                    {footerCopy.newsletterButtonLabel}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {footerSocialLinks.map((link) => {
                const Icon = socialIconMap[link.icon];

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#fff0cf] hover:border-[#79ddd4]/28 hover:bg-white/[0.06]"
                    aria-label={link.label}
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>

            <p className="text-sm text-[#d2e0e8]/72">{footerCopy.copyright}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
