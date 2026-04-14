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
      <h2 className="mt-4 text-[clamp(1.95rem,8.7vw,3.35rem)] leading-[1.2] text-[#fff6ee] drop-shadow-[0_0_24px_rgba(255,182,118,0.1)] sm:mt-5 md:mt-6 md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[#e3edf3]/86 sm:mt-5 sm:leading-8 md:mt-6 md:text-lg md:leading-9">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
