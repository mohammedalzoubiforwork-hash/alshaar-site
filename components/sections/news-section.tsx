import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/lib/site-content-types";

type NewsSectionProps = {
  news: SiteContent["news"];
};

export function NewsSection({ news }: NewsSectionProps) {
  return (
    <section id="news" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={news.eyebrow}
          title={news.title}
          description={news.description}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {news.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="paper-panel group flex h-full flex-col overflow-hidden rounded-[32px]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
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
          ))}
        </div>
      </Container>
    </section>
  );
}
