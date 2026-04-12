import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "right" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "right",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="mt-6 text-4xl leading-[1.2] text-[#fff4e8] md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#dbe7ee]/84 md:text-lg md:leading-9">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
