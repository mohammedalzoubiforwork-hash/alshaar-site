import Link from "next/link";
import { ArrowLeft, Quote as QuoteIcon, Volume2 } from "lucide-react";
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
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container>
        {featuredQuote ? (
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch">
            <Reveal>
              <div className="paper-panel relative h-full overflow-hidden rounded-[42px] p-7 md:p-10 lg:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,177,119,0.09),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%)]" />
                <div className="relative">
                  {showHeading ? (
                    <>
                      <span className="section-kicker">{quoteCopy.eyebrow}</span>
                      <h2 className="mt-6 text-4xl leading-[1.2] text-[#f8eee2] md:text-5xl">
                        {quoteCopy.title}
                      </h2>
                      <p className="mt-6 max-w-2xl text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                        {quoteCopy.description}
                      </p>
                    </>
                  ) : null}

                  <div className={cn("border-y border-white/10 py-10", showHeading ? "mt-10" : "mt-0")}>
                    <p className="font-display text-3xl leading-[1.9] text-[#fbf3e8] md:text-5xl md:leading-[1.8]">
                      &quot;{featuredQuote.text}&quot;
                    </p>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm leading-7 text-[#cfbea7]/84">
                      {featuredQuote.caption || "اقتباس مميز من صفحة الاقتباسات."}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/quote" className="hero-button hero-button-primary">
                      {quoteCopy.primaryActionLabel}
                      <ArrowLeft className="size-4" />
                    </Link>
                    <Link href={audioHref} className="hero-button hero-button-secondary">
                      {quoteCopy.secondaryActionLabel}
                      <Volume2 className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid h-full gap-5">
                {additionalQuotes.length > 0 ? (
                  additionalQuotes.map((quote, index) => (
                    <article
                      key={quote.id}
                      className={cn(
                        "paper-panel relative overflow-hidden rounded-[34px] p-6 md:p-7",
                        index === 0 && "min-h-[220px]",
                      )}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,177,119,0.08),transparent_18%)]" />
                      <div className="relative">
                        <div className="flex items-center gap-3 text-[#dec7a2]">
                          <QuoteIcon className="size-4" />
                          <span className="text-sm">اقتباس إضافي</span>
                        </div>
                        <p className="mt-5 text-2xl leading-[1.8] text-[#fbf3e8]">
                          &quot;{quote.text}&quot;
                        </p>
                        {quote.caption ? (
                          <p className="mt-4 text-sm leading-7 text-[#cfbea7]/78">
                            {quote.caption}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  ))
                ) : (
                  <article className="paper-panel flex min-h-[220px] items-center justify-center rounded-[34px] p-8 text-center">
                    <div>
                      <p className="font-display text-3xl text-[#f8eee2]">
                        اقتباس واحد مضاف حاليًا
                      </p>
                      <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                        أضف اقتباسات أخرى من الأدمن لتظهر هنا كبطاقات إضافية.
                      </p>
                    </div>
                  </article>
                )}
              </div>
            </Reveal>
          </div>
        ) : (
          <article className="paper-panel rounded-[38px] p-8 text-center">
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
