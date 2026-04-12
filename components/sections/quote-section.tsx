import { Share2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/site-content-types";

type QuoteSectionProps = {
  quote: SiteContent["quote"];
};

export function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <section id="quote" className="relative py-24 md:py-32">
      <Container>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch">
          <Reveal>
            <div className="paper-panel relative h-full overflow-hidden rounded-[42px] p-7 md:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,177,119,0.09),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%)]" />
              <div className="relative">
                <span className="section-kicker">{quote.eyebrow}</span>
                <h2 className="mt-6 text-4xl leading-[1.2] text-[#f8eee2] md:text-5xl">
                  {quote.title}
                </h2>

                <div className="mt-10 border-y border-white/10 py-10">
                  <p className="font-display text-3xl leading-[1.9] text-[#fbf3e8] md:text-5xl md:leading-[1.8]">
                    &quot;{quote.quote}&quot;
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button type="button" className="hero-button hero-button-primary">
                    <Share2 className="size-4" />
                    {quote.shareLabel}
                  </button>
                  <button type="button" className="hero-button hero-button-secondary">
                    <Sparkles className="size-4" />
                    {quote.imageActionLabel}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="paper-panel relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[42px] p-8 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(214,177,119,0.12),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />
              <div className="relative w-full max-w-[310px]">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[30px] border border-white/10 bg-[#c7a877]/8" />
                <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-[30px] border border-white/8 bg-white/[0.02]" />

                <div className="relative aspect-[4/5] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
                  <div className="flex h-full flex-col justify-between rounded-[22px] border border-[#d7b47a]/24 bg-[#f3e7d1] p-6 text-[#221913]">
                    <div>
                      <p className="text-xs tracking-[0.28em] text-[#7b6348] uppercase">
                        {quote.cardLabel}
                      </p>
                      <div className="mt-6 h-px w-full bg-[#cab08d]" />
                    </div>
                    <p className="font-display text-2xl leading-[1.9]">
                      {quote.cardQuote}
                    </p>
                    <p className="text-xs leading-6 text-[#725b45]">
                      {quote.cardCaption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
