import Link from "next/link";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { quoteCopy } from "@/lib/site-config";
import type { QuoteItem } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

type QuoteSectionProps = {
  quotes: QuoteItem[];
  id?: string;
  className?: string;
  showHeading?: boolean;
  audioHref?: string;
};

export function QuoteSection({
  quotes,
  id = "quote",
  className,
  showHeading = true,
  audioHref = "/audio",
}: QuoteSectionProps) {
  const featuredQuote = quotes[0];
  const additionalQuotes = quotes.slice(1);

  return (
    <section id={id} className={cn("relative py-14 sm:py-16 md:py-24", className)}>
      <Container>
        {featuredQuote ? (
          <div
            className={cn(
              "grid gap-4 sm:gap-5 md:gap-7",
              additionalQuotes.length > 0 &&
                "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch",
            )}
          >
            <Reveal>
              <div className="paper-panel relative h-full overflow-hidden rounded-[28px] p-4 sm:rounded-[32px] sm:p-6 md:rounded-[42px] md:p-10 lg:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,180,95,0.12),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(121,221,212,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%)]" />
                <div className="relative">
                  {showHeading ? (
                    <>
                      <span className="section-kicker">{quoteCopy.eyebrow}</span>
                      <h2 className="mt-4 text-[clamp(1.95rem,8.7vw,3.25rem)] leading-[1.2] text-[#f8eee2] sm:mt-5 md:mt-6 md:text-5xl">
                        {quoteCopy.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-[0.96rem] leading-7 text-[#cfbea7]/84 sm:mt-5 sm:leading-8 md:mt-6 md:text-lg">
                        {quoteCopy.description}
                      </p>
                    </>
                  ) : null}

                  <div
                    className={cn(
                      "border-y border-white/10 py-6 sm:py-8 md:py-10",
                      showHeading ? "mt-8 md:mt-10" : "mt-0",
                    )}
                  >
                    <p className="font-display text-[1.7rem] leading-[1.85] text-[#fbf3e8] sm:text-[2.2rem] md:text-5xl md:leading-[1.8]">
                      &quot;{featuredQuote.text}&quot;
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                    <Link href="/quote" className="hero-button hero-button-primary w-full sm:w-auto">
                      {quoteCopy.primaryActionLabel}
                      <ArrowLeft className="size-4" />
                    </Link>
                    <Link href={audioHref} className="hero-button hero-button-secondary w-full sm:w-auto">
                      {quoteCopy.secondaryActionLabel}
                      <Volume2 className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {additionalQuotes.length > 0 ? (
              <Reveal delay={0.1}>
                <div className="grid h-full gap-4 sm:gap-5">
                  {additionalQuotes.map((quote, index) => (
                    <article
                      key={quote.id}
                      className={cn(
                        "paper-panel relative overflow-hidden rounded-[24px] p-4 sm:rounded-[28px] sm:p-6 md:rounded-[34px] md:p-7",
                        index === 0 && "min-h-[220px]",
                      )}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,180,95,0.08),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(121,221,212,0.06),transparent_20%)]" />
                      <div className="relative">
                        <p className="text-[1.45rem] leading-[1.8] text-[#fbf3e8] sm:text-[1.7rem] md:text-2xl md:leading-[1.8]">
                          &quot;{quote.text}&quot;
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        ) : (
          <article className="paper-panel rounded-[32px] p-6 text-center sm:rounded-[38px] sm:p-8">
            <p className="font-display text-4xl text-[#f8eee2]">{quoteCopy.emptyTitle}</p>
            <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
              {quoteCopy.emptyDescription}
            </p>
          </article>
        )}
      </Container>
    </section>
  );
}
