"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSiteEffects } from "@/components/site/site-effects-provider";
import { cn } from "@/lib/utils";

type SoundToggleProps = {
  className?: string;
};

export function SoundToggle({ className }: SoundToggleProps) {
  const { soundEnabled, toggleSound } = useSiteEffects();
  const label = soundEnabled ? "Disable sound effects" : "Enable sound effects";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={soundEnabled}
      title={label}
      data-sfx-hover
      onClick={toggleSound}
      className={cn("sound-toggle", className)}
    >
      {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      <span className="sr-only">{label}</span>
    </button>
  );
}
