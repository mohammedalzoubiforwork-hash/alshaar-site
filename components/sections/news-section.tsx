import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { newsCopy } from "@/lib/site-config";
import type { NewsItem } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

type NewsSectionProps = {
  news: NewsItem[];
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
    <section id={id} className={cn("relative py-14 sm:py-16 md:py-24", className)}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={newsCopy.eyebrow}
            title={newsCopy.title}
            description={newsCopy.description}
          />
        ) : null}

        {news.length > 0 ? (
          <div className={cn("grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3", showHeading && "mt-10 sm:mt-12 md:mt-14")}>
            {news.map((item, index) => {
              const hasNewsImage = item.image.length > 0;

              return (
                <Reveal key={item.id} delay={index * 0.08}>
                  <article className="paper-panel flex h-full flex-col overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px]">
                    <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-[4/5]">
                      {hasNewsImage ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          loading="lazy"
                          quality={72}
                          sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-top sm:object-center"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,180,95,0.18),transparent_24%),radial-gradient(circle_at_78%_74%,rgba(121,221,212,0.1),transparent_18%),linear-gradient(180deg,#14314b_0%,#091522_100%)]" />
                      )}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.1),rgba(6,12,20,0.56))]" />
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-7">
                      <div className="flex items-center gap-2 text-sm text-[#ffe6b7]">
                        <CalendarDays className="size-4" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="mt-4 text-[1.55rem] leading-[1.3] text-[#faf1e5] sm:text-[1.7rem] md:mt-5 md:text-[1.9rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.96rem] leading-7 text-[#cfbea7]/84 sm:leading-8 md:mt-4 md:text-base">
                        {item.description}
                      </p>
                      <div className="mt-auto pt-6 md:pt-8">
                        <Link
                          href={item.href}
                          prefetch={false}
                          className="editorial-link text-sm md:text-base"
                        >
                          {newsCopy.readMoreLabel}
                          <ArrowLeft className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className={cn(showHeading && "mt-14")}>
            <article className="paper-panel rounded-[30px] p-6 text-center sm:rounded-[34px] sm:p-8">
              <p className="font-display text-3xl text-[#f8eee2]">لا توجد أخبار بعد</p>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                ستظهر الأخبار هنا عند إضافتها.
              </p>
            </article>
          </div>
        )}
      </Container>
    </section>
  );
}
