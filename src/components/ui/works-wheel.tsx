"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Optional external live app URL */
  liveUrl?: string;
  category?: string;
  tag?: string;
  description?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
}

const CARD_H = 0.38;
const CARD_MAX_W = 0.34;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 1.14;
const BOW = 1.82;
const TITLE = 0.124;
const INDEX = 0.04;
const CULL = 1.6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Selected Works",
  action = "Explore Case Study",
  className,
  ...props
}: WorksWheelProps) {
  const navigate = useNavigate();

  const handleNavigate = React.useCallback(
    (href?: string) => {
      if (!href) return;
      if (href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        navigate(href);
      }
    },
    [navigate],
  );

  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isMobile = w < 640;
    const cardW = isMobile
      ? Math.min(w * 0.74, 320)
      : Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * (isMobile ? 2.0 : DRUM);
    const ringR = cardH * (isMobile ? 1.05 : RING_R);
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  const settling = React.useRef<number>(0);

  // Horizontal wheel / trackpad gestures only — never hijack vertical page scroll!
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      const isHorizontal =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;

      if (isHorizontal) {
        const delta = event.deltaX || event.deltaY;
        const next = target.current + delta / WHEEL_UNITS;
        to(next);
        window.clearTimeout(settling.current);
        settling.current = window.setTimeout(
          () => to(Math.round(target.current)),
          SETTLE,
        );
        // Only prevent horizontal gesture bounce if user is explicitly swiping horizontally
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          event.preventDefault();
        }
      }
      // Vertical scrolling (deltaY) is intentionally NEVER intercepted.
      // The entire webpage scrolls naturally, fluidly, and without trapping!
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to]);

  const dragStart = React.useRef<{ x: number; y: number } | null>(null);
  const dragLast = React.useRef<{ x: number; y: number } | null>(null);
  const isDragging = React.useRef(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    to(Math.max(1, Math.round(target.current) - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    to(Math.min(last + 1, Math.round(target.current) + 1));
  };

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-gradient-to-b from-zinc-50 to-zinc-100 text-foreground relative h-[650px] min-h-[480px] w-full max-w-[1200px] mx-auto rounded-3xl border border-zinc-200 overflow-hidden select-none shadow-[0_20px_45px_-20px_rgba(0,0,0,0.08)] group/container",
        className,
      )}
      {...props}
    >
      {/* Floating Prev / Next Arrow Controls */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous project"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 size-10 sm:size-12 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-black border border-zinc-200/90 shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-80 sm:opacity-90 hover:opacity-100"
      >
        <ChevronLeft className="size-5 sm:size-6 stroke-[2.2]" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next project"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 size-10 sm:size-12 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-black border border-zinc-200/90 shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-80 sm:opacity-90 hover:opacity-100"
      >
        <ChevronRight className="size-5 sm:size-6 stroke-[2.2]" />
      </button>

      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-y outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          dragStart.current = { x: event.clientX, y: event.clientY };
          dragLast.current = { x: event.clientX, y: event.clientY };
          isDragging.current = false;
          // Do NOT call setPointerCapture here so children receive click events cleanly!
        }}
        onPointerMove={(event) => {
          if (!dragLast.current || !dragStart.current) return;
          const dx = dragLast.current.x - event.clientX;
          const dy = dragLast.current.y - event.clientY;

          const dist = Math.hypot(
            event.clientX - dragStart.current.x,
            event.clientY - dragStart.current.y,
          );
          if (dist > 8) {
            isDragging.current = true;
            try {
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.setPointerCapture(event.pointerId);
              }
            } catch {}
          }

          if (!isDragging.current) return;

          // Horizontal drag takes priority, vertical drag supported as secondary
          const delta = Math.abs(dx) > Math.abs(dy) ? -dx : dy;
          to(target.current + delta / DRAG_UNITS);
          dragLast.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          try {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          } catch {}
          dragStart.current = null;
          dragLast.current = null;
          if (target.current >= 0) to(Math.round(target.current));
          setTimeout(() => {
            isDragging.current = false;
          }, 100);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight")
            to(Math.min(last + 1, Math.round(target.current) + 1));
          else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
            to(Math.max(1, Math.round(target.current) - 1));
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const isCurrent = i === active;
            return (
              <React.Fragment key={item.title}>
                <div
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={isCurrent}
                  onClick={(e) => {
                    if (isDragging.current) {
                      e.preventDefault();
                      return;
                    }
                    // Clicking an inactive card brings it directly to the front!
                    if (!isCurrent) {
                      e.preventDefault();
                      to(i + 1);
                    } else if (item.href) {
                      // Clicking the active card navigates to the project case study!
                      e.preventDefault();
                      handleNavigate(item.href);
                    }
                  }}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden] transition-opacity cursor-pointer"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-card shadow-zinc-900/15 relative block size-full overflow-hidden rounded-2xl border border-black/10 shadow-[0_20px_45px_-18px_var(--tw-shadow-color)] transition-all group-hover:border-black/25 group-hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.25)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover"
                    />
                    {item.category ? (
                      <span className="absolute top-3 left-3 bg-zinc-900/75 backdrop-blur-md text-white text-[0.68rem] px-2.5 py-1 rounded-full font-medium tracking-wide">
                        {item.category}
                      </span>
                    ) : null}
                    {action && item.href && isCurrent ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleNavigate(item.href);
                        }}
                        className="pointer-events-auto z-30 bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white absolute right-3.5 bottom-3.5 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.75rem] font-medium opacity-100 backdrop-blur-md shadow-md border border-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>{action}</span>
                        <ArrowUpRight className="size-3.5 stroke-[2.2]" aria-hidden="true" />
                      </button>
                    ) : null}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring central rest label */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-semibold text-zinc-900"
        style={{ fontSize: metrics.title || 36 }}
      >
        {label}
      </div>

      {/* Front active card title */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-6 sm:top-1/2 left-4 sm:left-[7%] sm:-translate-y-1/2 tracking-tight opacity-0 max-w-[280px] sm:max-w-[340px] z-20"
      >
        <h3 className="text-xl sm:text-4xl font-semibold text-zinc-900 leading-tight">
          {items[active]?.title}
        </h3>
        {items[active]?.description ? (
          <p className="text-xs sm:text-base text-zinc-500 font-light mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
            {items[active]?.description}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
          {items[active]?.href && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate(items[active]?.href);
              }}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="size-3.5 stroke-[2.2]" />
            </button>
          )}
          {items[active]?.liveUrl && (
            <a
              href={items[active]?.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <span>Test Live App</span>
              <ArrowUpRight className="size-3.5 stroke-[2.2]" />
            </a>
          )}
        </div>
      </div>

      {/* Right index buttons */}
      <ol
        className="text-zinc-400 absolute top-[7%] right-[3%] text-right leading-[1.8] max-h-[85%] overflow-y-auto no-scrollbar hidden sm:block z-20"
        style={{ fontSize: metrics.index || 13 }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "focus-visible:outline-foreground cursor-pointer transition-colors outline-none px-2 py-0.5 rounded-md",
                i === active
                  ? "text-zinc-900 font-semibold bg-black/5"
                  : "hover:text-zinc-700",
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>

      {/* Bottom active card indicator and dot navigator */}
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 pointer-events-none z-20">
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-sm">
          <span className="text-[0.7rem] font-mono font-medium text-zinc-700">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <span className="h-3 w-px bg-zinc-200" />
          <div className="flex items-center gap-1.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => to(idx + 1)}
                aria-label={`Jump to project ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all cursor-pointer",
                  idx === active
                    ? "w-4 bg-zinc-900"
                    : "w-1.5 bg-zinc-300 hover:bg-zinc-500",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorksWheel;
