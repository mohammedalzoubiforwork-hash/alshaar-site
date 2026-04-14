import Link from "next/link";
import { Camera, Mail, Send, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  footerCopy,
  footerLinks,
  footerSocialLinks,
  siteIdentity,
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
    <footer id="footer" className="relative pb-8 pt-14 sm:pt-16 md:pt-24">
      <Container>
        <Reveal>
          <div className="paper-panel relative overflow-hidden rounded-[28px] border border-white/10 px-4 py-7 sm:rounded-[32px] sm:px-6 sm:py-8 md:rounded-[42px] md:px-10 md:py-12 lg:px-14">
            <div
              aria-hidden
              className="ambient-glow left-[-5rem] top-[-4rem] h-48 w-48 bg-[#ffbf68]/16 float-slow"
            />
            <div
              aria-hidden
              className="ambient-glow bottom-[-5rem] right-[-4rem] h-52 w-52 bg-[#7ee6dc]/14 drift-slow"
            />
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="font-display text-[2rem] leading-[1.25] text-[#fff6ec] sm:text-[2.35rem] md:text-5xl">
                  {siteIdentity.brandName}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#dce7ee]/78 md:text-base">
                  {siteIdentity.tagline}
                </p>
              </div>

              <div className="flex flex-col gap-6 lg:items-end">
                <div>
                  <h3 className="text-sm text-[#fff6ec]">{footerCopy.quickLinksTitle}</h3>
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:flex sm:flex-wrap sm:gap-3">
                    {footerLinks.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={link.href}
                          prefetch={false}
                          className="text-[#dce7ee]/78 hover:text-[#fff6ec]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

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
              </div>
            </div>

            <div className="mt-7 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
              <p className="text-sm leading-7 text-[#d2e0e8]/72">{footerCopy.copyright}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
