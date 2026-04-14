import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.18,
}: RevealProps) {
  void delay;
  void y;
  void amount;

  return <div className={cn(className)}>{children}</div>;
}
