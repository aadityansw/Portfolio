"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
  }, deps);
}

export type JourneyItem = {
  id: string;
  year: string;
  month: string;
  content: string;
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  scrollDuration?: number;
  topItems?: JourneyItem[];
  bottomItems?: JourneyItem[];
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export function Timeline({
  title = "Project Storyline",
  periodLabel = "2020 — 2026",
  textColor = "var(--color-foreground, #000000)",
  mutedTextColor = "var(--color-muted-foreground, #555555)",
  activeColor = "#ff5f00",
  backgroundColor = "var(--color-background, #ffffff)",
  imageUrl = "/img/apna-agenda.webp",
  imageAlt = "Project Cover Showcase",
  duration,
  scrollDuration = 1.2,
  topItems = [],
  bottomItems = [],
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  const allJourneyItems = [...topItems, ...bottomItems];

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 640;
    const slidePercent = isMobile ? -58 : -65;
    const lineWidth = isMobile ? "70%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : "92% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = allJourneyItems;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, y: 0 });
        gsap.set(`.description-${item.id}`, { opacity: 1, y: 0 });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: "bottom bottom",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 0, y: 40 });
      gsap.set(`.description-${item.id}`, { opacity: 0, y: 40 });
    });

    const createItemTimeline = (
      item: JourneyItem,
      startPos: number,
      endPos: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleSelector = `.title-${item.id}`;
      const descSelector = `.description-${item.id}`;

      const isTop = topItems.some((topItem) => topItem.id === item.id);
      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true,
        },
      });

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: normalizedDuration * 0.4,
        })
        .to(
          dotSelector,
          {
            scale: 1,
            duration: normalizedDuration * 0.4,
          },
          "<",
        )
        .to(
          titleSelector,
          {
            y: 0,
            opacity: 1,
            duration: normalizedDuration * 0.8,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          descSelector,
          {
            y: 0,
            opacity: 1,
            duration: normalizedDuration * 0.8,
            ease: "power2.out",
          },
          "<0.1",
        );

      return timeline;
    };

    const count = items.length || 1;
    items.forEach((item, index) => {
      const startPos = Math.round(8 + (index * 72) / count);
      const endPos = Math.round(startPos + 18);
      createItemTimeline(item, startPos, endPos);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion, topItems, bottomItems], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[220vw] max-[640px]:h-[420vh] w-full relative overflow-visible"
      style={sectionStyle}
    >
      <div className="h-screen w-full sticky top-0 flex items-center overflow-hidden">
        <div
          ref={wholeSliderRef}
          className="flex h-[32vw] w-[250vw] items-center gap-[4vw] px-[5vw] max-[640px]:h-[75vh] max-[640px]:w-[820vw] max-[640px]:px-[6vw] max-[640px]:gap-[6vw] will-change-transform"
        >
          {/* Left Hero Card */}
          <div className="h-full w-[30vw] min-w-[28vw] max-[640px]:h-[60vw] max-[640px]:w-[82vw] max-[640px]:min-w-[82vw] overflow-hidden rounded-2xl shadow-xl border border-black/10 shrink-0 bg-zinc-100">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative h-full w-full flex flex-col">
            {/* Center Axis */}
            <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 flex items-center z-10 pointer-events-none">
              <div
                className="size-[0.8vw] max-[640px]:size-[2vw] rounded-full shrink-0 shadow-sm"
                style={activeStyle}
              ></div>
              <div
                className="h-[2px] w-[0%] rounded-full journey-line will-change-[width]"
                style={activeStyle}
              ></div>
              <div
                className="size-[0.8vw] max-[640px]:size-[2vw] rounded-full shrink-0 shadow-sm"
                style={activeStyle}
              ></div>
            </div>

            {/* Top Half */}
            <div className="flex h-1/2 w-full items-end gap-[0.5vw]">
              <div className="h-full w-[22vw] min-w-[20vw] pt-[1.5vw] shrink-0 max-[640px]:w-[65vw] max-[640px]:min-w-[65vw] max-[640px]:pt-[4vw]">
                <h2 className="text-[2.8vw] leading-none max-[640px]:text-[8vw] font-semibold tracking-tight">
                  {title}
                </h2>
              </div>

              <div className="flex h-full gap-x-[16vw] pl-[2vw] max-[640px]:gap-x-[38vw]">
                {topItems.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[26vw] min-w-[24vw] px-[2vw] shrink-0 max-[640px]:w-[68vw] max-[640px]:min-w-[68vw] max-[640px]:px-[4vw]"
                  >
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full pointer-events-none">
                      <div
                        className={`size-[0.9vw] max-[640px]:size-[2.2vw] -translate-x-1/2 relative aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`h-[94%] w-[2px] origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="mt-[-1vw] space-y-[0.6vw] max-[640px]:mt-[-2vw]">
                      <h4
                        className={`title-${item.id} text-[2.2vw] leading-tight max-[640px]:text-[6vw] font-medium tracking-tight`}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} text-[1.35vw] leading-snug max-[640px]:text-[4.4vw] font-light max-w-[92%]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Half */}
            <div className="flex h-1/2 w-full items-start">
              <div className="w-[22vw] min-w-[20vw] pt-[2vw] shrink-0 max-[640px]:w-[65vw] max-[640px]:min-w-[65vw] max-[640px]:pt-[5vw]">
                <p
                  className="text-[1.5vw] leading-none max-[640px]:text-[4.2vw] font-mono tracking-wider"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              <div className="flex h-full gap-x-[20vw] ml-[8vw] max-[640px]:gap-x-[38vw] max-[640px]:ml-[10vw]">
                {bottomItems.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[26vw] min-w-[24vw] px-[2vw] shrink-0 max-[640px]:w-[68vw] max-[640px]:min-w-[68vw] max-[640px]:px-[4vw]"
                  >
                    <div className="w-full absolute left-0 bottom-[-1%] top-0 h-full pointer-events-none">
                      <div
                        className={`h-[94%] origin-top w-[2px] rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`size-[0.9vw] max-[640px]:size-[2.2vw] -translate-x-1/2 relative aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[0.6vw] pb-[1.5vw] max-[640px]:pb-[4vw]">
                      <h4
                        className={`title-${item.id} text-[2.2vw] leading-tight max-[640px]:text-[6vw] font-medium tracking-tight`}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} text-[1.35vw] leading-snug max-[640px]:text-[4.4vw] font-light max-w-[92%]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
