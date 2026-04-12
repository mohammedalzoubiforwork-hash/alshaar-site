"use client";

import { Headphones, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { audioCopy } from "@/lib/site-config";
import type { AudioTrack } from "@/lib/site-content-types";
import { cn } from "@/lib/utils";

type AudioExperienceProps = {
  audioTracks: AudioTrack[];
  id?: string;
  className?: string;
  showHeading?: boolean;
};

export function AudioExperience({
  audioTracks,
  id = "audio",
  className,
  showHeading = true,
}: AudioExperienceProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={audioCopy.eyebrow}
            title={audioCopy.title}
            description={audioCopy.description}
          />
        ) : null}

        {audioTracks.length > 0 ? (
          <div className={cn("grid gap-6 lg:grid-cols-2", showHeading && "mt-14")}>
            {audioTracks.map((track, index) => (
              <Reveal key={track.id} delay={index * 0.08}>
                <article className="paper-panel relative overflow-hidden rounded-[38px] p-7 md:p-9">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(121,221,212,0.12),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(255,180,95,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
                  <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="sound-pill">
                        <Headphones className="size-4" />
                        {audioCopy.stageLabel}
                      </span>
                      {track.durationLabel ? (
                        <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#fff0cf]/84">
                          {track.durationLabel}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-6 text-3xl leading-[1.3] text-[#faf1e5] md:text-4xl">
                      {track.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-[#cfbea7]/84 md:text-lg">
                      {track.description}
                    </p>

                    <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
                      {track.file ? (
                        <audio controls preload="none" className="w-full" src={track.file}>
                          المتصفح الحالي لا يدعم تشغيل الصوتيات.
                        </audio>
                      ) : (
                        <div className="flex items-center gap-3 text-sm text-[#dce7ee]/78">
                          <PlayCircle className="size-4" />
                          الملف الصوتي غير متاح بعد.
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={cn(showHeading && "mt-14")}>
            <article className="paper-panel rounded-[38px] p-8 text-center">
              <p className="font-display text-4xl text-[#f8eee2]">{audioCopy.emptyTitle}</p>
              <p className="mt-4 text-base leading-8 text-[#cfbea7]/84">
                {audioCopy.emptyDescription}
              </p>
            </article>
          </div>
        )}
      </Container>
    </section>
  );
}
