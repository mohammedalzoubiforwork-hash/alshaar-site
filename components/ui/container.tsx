import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
