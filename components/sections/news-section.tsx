import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

type NewsSectionProps = {
  news: SiteContent["news"];
  id?: string;
  className?: string;
  showHeading?: boolean;
};

export function NewsSection({
  news,
  id = "news",
  className,
  showHeading = true,
}: NewsSectionProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={news.eyebrow}
            title={news.title}
            description={news.description}
          />
        ) : null}

        <div className={cn("grid gap-6 lg:grid-cols-3", showHeading && "mt-14")}>
          {news.items.map((item, index) => {
            const hasNewsImage = item.image.length > 0;

            return (
              <Reveal key={item.title} delay={index * 0.08}>
              <article className="paper-panel group flex h-full flex-col overflow-hidden rounded-[32px]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {hasNewsImage ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(221,186,134,0.18),transparent_24%),radial-gradient(circle_at_78%_74%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#241a15_0%,#120d0a_100%)]" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,4,0.1),rgba(10,7,5,0.56))]" />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center gap-2 text-sm text-[#cab18a]">
                    <CalendarDays className="size-4" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="mt-5 text-2xl leading-[1.4] text-[#faf1e5] md:text-[1.9rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-8">
                    <Link href={item.href} className="editorial-link text-sm md:text-base">
                      {news.readMoreLabel}
                      <ArrowLeft className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
