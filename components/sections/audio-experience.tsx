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
    <section id={id} className={cn("relative py-14 sm:py-16 md:py-24", className)}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow={audioCopy.eyebrow}
            title={audioCopy.title}
            description={audioCopy.description}
          />
        ) : null}

        {audioTracks.length > 0 ? (
          <div className={cn("grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-2", showHeading && "mt-10 sm:mt-12 md:mt-14")}>
            {audioTracks.map((track, index) => (
              <Reveal key={track.id} delay={index * 0.08}>
                <article className="paper-panel relative overflow-hidden rounded-[26px] p-4 sm:rounded-[30px] sm:p-6 md:rounded-[38px] md:p-9">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(121,221,212,0.12),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(255,180,95,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
                  <div className="relative">
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
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

                    <h3 className="mt-5 text-[1.6rem] leading-[1.25] text-[#faf1e5] sm:text-[1.8rem] md:mt-6 md:text-4xl">
                      {track.title}
                    </h3>
                    <p className="mt-3 text-[0.96rem] leading-7 text-[#cfbea7]/84 sm:leading-8 md:mt-4 md:text-lg">
                      {track.description}
                    </p>

                    <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-3 sm:mt-6 sm:p-4 md:mt-8 md:rounded-[28px]">
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
            <article className="paper-panel rounded-[32px] p-6 text-center sm:rounded-[38px] sm:p-8">
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
