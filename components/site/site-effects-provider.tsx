"use client";

import Lenis from "lenis";
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SiteEffectsContextValue = {
  soundEnabled: boolean;
  toggleSound: () => void;
};

const SITE_SOUND_KEY = "alshaar:sound-enabled";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const NATIVE_SCROLL_QUERY = "(max-width: 960px), (hover: none), (pointer: coarse)";
const hoverSoundSelector = [
  "[data-sfx-hover]",
  "summary",
  "a.hero-button",
  "a.editorial-link",
  ".glass-topbar a:not(.hero-button)",
  "#footer a",
].join(", ");

const SiteEffectsContext = createContext<SiteEffectsContextValue | null>(null);
type LegacyMediaQueryList = MediaQueryList & {
  addListener: (listener: () => void) => void;
  removeListener: (listener: () => void) => void;
};

function writeAscii(view: DataView, offset: number, value: string) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

function subscribeToMediaQuery(query: MediaQueryList, onChange: () => void) {
  if ("addEventListener" in query) {
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }

  const legacyQuery = query as LegacyMediaQueryList;

  legacyQuery.addListener(onChange);

  return () => legacyQuery.removeListener(onChange);
}

function createHoverToneUrl() {
  const sampleRate = 22050;
  const durationMs = 72;
  const totalSamples = Math.floor((sampleRate * durationMs) / 1000);
  const fadeSamples = Math.max(1, Math.floor(totalSamples * 0.22));
  const bytesPerSample = 2;
  const dataSize = totalSamples * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * bytesPerSample, true);
  view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, dataSize, true);

  for (let sampleIndex = 0; sampleIndex < totalSamples; sampleIndex += 1) {
    const attack = Math.min(1, sampleIndex / fadeSamples);
    const release = Math.min(1, (totalSamples - sampleIndex) / fadeSamples);
    const envelope = Math.min(attack, release);
    const waveform =
      Math.sin((2 * Math.PI * 680 * sampleIndex) / sampleRate) * 0.18 * envelope;

    view.setInt16(44 + sampleIndex * bytesPerSample, waveform * 0x7fff, true);
  }

  return URL.createObjectURL(new Blob([buffer], { type: "audio/wav" }));
}

export function SiteEffectsProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [useNativeScroll, setUseNativeScroll] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(SITE_SOUND_KEY);

      if (storedValue !== null) {
        setSoundEnabled(storedValue === "1");
      }
    } catch {
      // Ignore storage access issues and keep the default.
    }
  }, []);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const nativeScrollQuery = window.matchMedia(NATIVE_SCROLL_QUERY);
    const syncQueries = () => {
      setPrefersReducedMotion(reducedMotionQuery.matches);
      setUseNativeScroll(nativeScrollQuery.matches);
    };

    syncQueries();

    const unsubscribeReducedMotion = subscribeToMediaQuery(reducedMotionQuery, syncQueries);
    const unsubscribeNativeScroll = subscribeToMediaQuery(nativeScrollQuery, syncQueries);

    return () => {
      unsubscribeReducedMotion();
      unsubscribeNativeScroll();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || useNativeScroll) {
      document.documentElement.classList.remove("lenis-enhanced");

      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.78,
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 0.94,
    });
    let frameId = 0;

    document.documentElement.classList.add("lenis-enhanced");

    const onFrame = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(onFrame);
    };

    frameId = window.requestAnimationFrame(onFrame);

    return () => {
      document.documentElement.classList.remove("lenis-enhanced");
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [prefersReducedMotion, useNativeScroll]);

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioUrlRef.current ??= createHoverToneUrl();

      const hoverAudio = new Audio(audioUrlRef.current);

      hoverAudio.preload = "none";
      hoverAudio.volume = 0.1;
      hoverAudio.setAttribute("playsinline", "true");
      audioRef.current = hoverAudio;
    }

    return audioRef.current;
  };

  const playAudio = () => {
    const hoverAudio = ensureAudio();

    hoverAudio.pause();
    hoverAudio.currentTime = 0;
    void hoverAudio.play().catch(() => undefined);
  };

  const playHoverSoundFromEffects = useEffectEvent(() => {
    if (prefersReducedMotion || !soundEnabled) {
      return;
    }

    playAudio();
  });

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const hoveredElement =
        event.target instanceof Element ? event.target.closest(hoverSoundSelector) : null;

      if (!hoveredElement) {
        return;
      }

      if (event.relatedTarget instanceof Node && hoveredElement.contains(event.relatedTarget)) {
        return;
      }

      playHoverSoundFromEffects();
    };

    const handleFocusIn = (event: FocusEvent) => {
      const focusedElement =
        event.target instanceof Element ? event.target.closest(hoverSoundSelector) : null;

      if (!focusedElement) {
        return;
      }

      playHoverSoundFromEffects();
    };

    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  const toggleSound = () => {
    const nextValue = !soundEnabled;

    startTransition(() => {
      setSoundEnabled(nextValue);
    });

    try {
      window.localStorage.setItem(SITE_SOUND_KEY, nextValue ? "1" : "0");
    } catch {
      // Ignore storage access issues when persistence is unavailable.
    }

    if (nextValue) {
      window.setTimeout(() => {
        if (prefersReducedMotion) {
          return;
        }

        playAudio();
      }, 0);
    }
  };

  return (
    <SiteEffectsContext.Provider
      value={{
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </SiteEffectsContext.Provider>
  );
}

export function useSiteEffects() {
  const context = useContext(SiteEffectsContext);

  if (!context) {
    throw new Error("useSiteEffects must be used within a SiteEffectsProvider.");
  }

  return context;
}
