"use client";

import { useEffect, useState } from "react";
import { Pause, Play, SkipForward, Volume2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

function formatTime(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

type AudioExperienceProps = {
  audio: SiteContent["audio"];
  id?: string;
  className?: string;
  showHeading?: boolean;
};

export function AudioExperience({
  audio,
  id = "audio",
  className,
  showHeading = true,
}: AudioExperienceProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(42);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsed((current) =>
        current >= audio.totalSeconds ? 0 : current + 1,
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, [audio.totalSeconds, isPlaying]);

  const progress = (elapsed / audio.totalSeconds) * 100;
  const bars = [34, 56, 44, 78, 63, 48, 70, 40];

  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container>
        {showHeading ? (
          <Reveal className="max-w-3xl">
            <span className="section-kicker">{audio.eyebrow}</span>
            <h2 className="mt-6 text-4xl leading-[1.2] text-[#f8eee2] md:text-5xl lg:text-6xl">
              {audio.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-[#cfbea7]/86 md:text-lg md:leading-9">
              {audio.description}
            </p>
          </Reveal>
        ) : null}

        <div
          className={cn(
            "grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
            showHeading && "mt-14",
          )}
        >
          <Reveal>
            <div className="paper-panel relative overflow-hidden rounded-[42px] p-7 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(214,177,119,0.12),transparent_22%)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="section-kicker !mb-0">{audio.stageLabel}</span>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#dfccb0]/82">
                    {audio.duration}
                  </span>
                </div>

                <div className="mt-12 flex items-center justify-center">
                  <div className="relative flex size-[15rem] items-center justify-center rounded-full border border-[#c8a874]/20 bg-[radial-gradient(circle,rgba(214,177,119,0.12),rgba(255,255,255,0.02))] md:size-[18rem]">
                    <div className="absolute inset-6 rounded-full border border-white/10" />
                    <div className="absolute inset-12 rounded-full border border-[#c8a874]/18" />
                    <button
                      type="button"
                      onClick={() => setIsPlaying((current) => !current)}
                      className="hero-button hero-button-primary size-20 rounded-full p-0 md:size-24"
                      aria-label={isPlaying ? audio.pauseAriaLabel : audio.playAriaLabel}
                    >
                      {isPlaying ? (
                        <Pause className="size-7" />
                      ) : (
                        <Play className="size-7 fill-current" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-8 items-end gap-2" aria-hidden>
                  {bars.map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className={cn("wave-bar", isPlaying && "wave-bar-play")}
                      style={{
                        height: `${height}%`,
                        animationDelay: `${index * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="paper-panel relative h-full overflow-hidden rounded-[42px] p-7 md:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,177,119,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-3 text-sm text-[#cdb48f]">
                  <Volume2 className="size-4" />
                  <span>{audio.ambientLabel}</span>
                </div>

                <h3 className="mt-6 text-3xl leading-[1.3] text-[#faf1e5] md:text-5xl">
                  {audio.trackTitle}
                </h3>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#cfbea7]/84 md:text-lg md:leading-9">
                  {audio.trackDescription}
                </p>

                <div className="mt-10">
                  <div className="flex items-center justify-between text-sm text-[#cfbea7]/76">
                    <span>{formatTime(elapsed)}</span>
                    <span>{audio.duration}</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#e4cc9f,#9d7244)] transition-[width] duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="hero-button hero-button-primary"
                  >
                    <Play className="size-4 fill-current" />
                    {audio.playLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(false)}
                    className="hero-button hero-button-secondary"
                  >
                    <Pause className="size-4" />
                    {audio.pauseLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => setElapsed(0)}
                    className="hero-button hero-button-secondary"
                  >
                    <SkipForward className="size-4" />
                    {audio.nextLabel}
                  </button>
                </div>

                <div className="mt-auto grid gap-4 pt-10 md:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-[#e8d8bf]">{audio.listeningNoteTitle}</p>
                    <p className="mt-3 text-sm leading-7 text-[#c3b095]/78">
                      {audio.listeningNoteBody}
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-[#e8d8bf]">{audio.afterTrackTitle}</p>
                    <p className="mt-3 text-sm leading-7 text-[#c3b095]/78">
                      {audio.afterTrackBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
