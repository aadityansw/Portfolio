"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ConstellationItem {
  src: string;
  alt?: string;
  title?: string;
  /** Items that share a tag form a constellation. */
  tags: string[];
  /** Optional subtitle or description shown in caption */
  description?: string;
  /** Optional icon component or badge */
  icon?: React.ReactNode;
}

export interface ConstellationGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: ConstellationItem[];
  /** Thumbnail diameter in pixels. */
  starSize?: number;
  /** Idle drift amplitude in pixels; 0 keeps the stars still. */
  drift?: number;
  /** Seed for the scatter layout, so the same items land in the same places. */
  seed?: number;
  /** Highlight one constellation after another while nobody is hovering. */
  autoplay?: boolean;
  /** Milliseconds each autoplay constellation stays lit. */
  autoplayInterval?: number;
  onSelect?: (index: number, item: ConstellationItem) => void;
  /** React 19 passes `ref` as a regular prop. */
  ref?: React.Ref<HTMLDivElement>;
}

type Point = { x: number; y: number };
type Edge = [number, number];

const GATHER_MS = 650;
const LINE_MS = 420;
const IDLE_BEFORE_AUTOPLAY_MS = 2400;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Rejection-sampled scatter in percent of the stage, keeping stars at least
// `minDist` apart (distance measured with the stage's 16:10 shape in mind).
function scatter(count: number, seed: number, minDist: number): Point[] {
  const random = mulberry32(seed);
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    let best: Point | null = null;
    let bestScore = -1;
    for (let attempt = 0; attempt < 60; attempt++) {
      const candidate = { x: 7 + random() * 86, y: 9 + random() * 82 };
      const nearest = points.reduce(
        (m, p) => Math.min(m, Math.hypot(candidate.x - p.x, (candidate.y - p.y) * 0.625)),
        Infinity
      );
      if (nearest >= minDist) {
        best = candidate;
        break;
      }
      if (nearest > bestScore) {
        bestScore = nearest;
        best = candidate;
      }
    }
    points.push(best ?? { x: 50, y: 50 });
  }
  return points;
}

// Prim's minimum spanning tree over pixel positions: the fewest lines that still
// join every member, which is what makes it read as a constellation.
function spanningTree(indices: number[], at: (index: number) => Point): Edge[] {
  if (indices.length < 2) return [];
  const inTree = new Set<number>([indices[0]!]);
  const edges: Edge[] = [];
  while (inTree.size < indices.length) {
    let best: Edge | null = null;
    let bestDist = Infinity;
    for (const a of inTree) {
      for (const b of indices) {
        if (inTree.has(b)) continue;
        const pa = at(a);
        const pb = at(b);
        const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
        if (d < bestDist) {
          bestDist = d;
          best = [a, b];
        }
      }
    }
    if (!best) break;
    inTree.add(best[1]);
    edges.push(best);
  }
  return edges;
}

export function ConstellationGallery({
  items,
  starSize = 85,
  drift = 10,
  seed = 7,
  autoplay = false,
  autoplayInterval = 8300,
  onSelect,
  ref,
  className,
  style,
  ...rest
}: ConstellationGalleryProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const starRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const wrapRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [autoTag, setAutoTag] = React.useState<string | null>(null);
  const [gathered, setGathered] = React.useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const live = React.useRef({
    raf: 0,
    start: 0,
    lastInput: -Infinity,
    lines: new Map<string, SVGLineElement>(),
    flights: [] as Animation[],
  });

  const setRootRef = (node: HTMLDivElement | null) => {
    stageRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const positions = React.useMemo(() => scatter(items.length, seed, items.length > 18 ? 10.5 : 14), [items.length, seed]);
  const tags = React.useMemo(() => Array.from(new Set(items.flatMap((item) => item.tags))), [items]);
  const phases = React.useMemo(() => {
    const random = mulberry32(seed + 1);
    return items.map(() => ({
      px: random() * Math.PI * 2,
      py: random() * Math.PI * 2,
      fx: 0.18 + random() * 0.12,
      fy: 0.14 + random() * 0.12,
    }));
  }, [items, seed]);

  const focusIndex = gathered ?? hovered;
  const activeTags = React.useMemo(() => {
    if (focusIndex !== null) return new Set(items[focusIndex]?.tags ?? []);
    if (autoTag) return new Set([autoTag]);
    return null;
  }, [focusIndex, autoTag, items]);
  const members = React.useMemo(() => {
    if (!activeTags) return null;
    return items
      .map((_, index) => index)
      .filter((index) => items[index]!.tags.some((tag) => activeTags.has(tag)));
  }, [activeTags, items]);
  const memberSet = React.useMemo(() => (members ? new Set(members) : null), [members]);
  const label = focusIndex !== null ? items[focusIndex]?.tags.join(" · ") : autoTag;

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(motion.matches);
    onMotion();
    motion.addEventListener("change", onMotion);
    return () => motion.removeEventListener("change", onMotion);
  }, []);

  // Idle drift and line following run in one frame loop
  React.useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    if (!stage || !svg) return;
    const s = live.current;
    const box = stage.getBoundingClientRect();

    // 1. Ambient minimum spanning tree connecting ALL stars in the galaxy
    const allIndices = items.map((_, i) => i);
    const ambientEdges = spanningTree(allIndices, (i) => ({
      x: positions[i]!.x * box.width,
      y: positions[i]!.y * box.height,
    }));

    // 2. Active highlighted edges for the current constellation
    const activeEdges =
      members && members.length > 1
        ? spanningTree(members, (i) => ({
            x: positions[i]!.x * box.width,
            y: positions[i]!.y * box.height,
          }))
        : [];

    const activeSet = new Set(activeEdges.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`));
    const allEdges = [...ambientEdges, ...activeEdges];
    const wanted = new Set(allEdges.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`));

    for (const [key, line] of s.lines) {
      if (!wanted.has(key)) {
        line.remove();
        s.lines.delete(key);
      }
    }

    for (const [a, b] of allEdges) {
      const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
      const isActive = activeSet.has(key);
      let line = s.lines.get(key);
      if (!line) {
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("data-edge", key);
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
        s.lines.set(key, line);
        if (!reducedMotion) {
          line.animate([{ opacity: 0 }, { opacity: isActive ? 1 : 0.55 }], { duration: LINE_MS, easing: "ease-out" });
        }
      }

      if (isActive) {
        line.setAttribute("stroke", "#2563eb"); // Electric blue for active constellation
        line.setAttribute("stroke-width", "2.5");
        line.removeAttribute("stroke-dasharray");
        line.setAttribute("opacity", "1");
        line.style.filter = "drop-shadow(0 0 6px rgba(37, 99, 235, 0.45))";
      } else {
        line.setAttribute("stroke", "#94a3b8"); // Slate gray on white background
        line.setAttribute("stroke-width", "1.5");
        line.setAttribute("stroke-dasharray", "4 4");
        line.setAttribute("opacity", "0.45");
        line.style.filter = "none";
      }
    }

    const center = (index: number) => {
      const star = starRefs.current[index];
      const rect = stage.getBoundingClientRect();
      if (!star) return { x: 0, y: 0 };
      const r = star.getBoundingClientRect();
      return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
    };

    const frame = (now: number) => {
      s.raf = 0;
      if (!s.start) s.start = now;
      const t = (now - s.start) / 1000;
      const still = reducedMotion || drift === 0 || gathered !== null;
      for (let i = 0; i < items.length; i++) {
        const star = starRefs.current[i];
        if (!star) continue;
        const p = phases[i]!;
        const dx = still ? 0 : Math.sin(t * p.fx * Math.PI * 2 + p.px) * drift;
        const dy = still ? 0 : Math.cos(t * p.fy * Math.PI * 2 + p.py) * drift;
        star.style.translate = `${dx.toFixed(2)}px ${dy.toFixed(2)}px`;
      }
      for (const [key, line] of s.lines) {
        const [a, b] = key.split("-").map(Number) as [number, number];
        const pa = center(a);
        const pb = center(b);
        line.setAttribute("x1", pa.x.toFixed(1));
        line.setAttribute("y1", pa.y.toFixed(1));
        line.setAttribute("x2", pb.x.toFixed(1));
        line.setAttribute("y2", pb.y.toFixed(1));
      }
      if ((!still || s.lines.size > 0 || s.flights.length > 0) && !document.hidden) {
        s.raf = requestAnimationFrame(frame);
      }
    };
    const kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(frame);
    };
    kick();
    document.addEventListener("visibilitychange", kick);
    return () => {
      document.removeEventListener("visibilitychange", kick);
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [members, positions, phases, items.length, drift, gathered, reducedMotion]);

  React.useEffect(() => {
    if (!autoplay || tags.length === 0) return;
    let cursor = -1;
    const tick = () => {
      const idle = performance.now() - live.current.lastInput > IDLE_BEFORE_AUTOPLAY_MS;
      if (!idle || hovered !== null || gathered !== null) {
        setAutoTag(null);
        return;
      }
      cursor = (cursor + 1) % tags.length;
      setAutoTag(tags[cursor] ?? null);
    };
    tick();
    const timer = window.setInterval(tick, autoplayInterval);
    return () => window.clearInterval(timer);
  }, [autoplay, autoplayInterval, tags, hovered, gathered]);

  const flyTo = React.useCallback(
    (index: number | null) => {
      const stage = stageRef.current;
      if (!stage) return;
      const s = live.current;
      for (const flight of s.flights) flight.cancel();
      s.flights = [];
      const rect = stage.getBoundingClientRect();
      const ringMembers =
        index === null
          ? []
          : items
              .map((_, i) => i)
              .filter((i) => i !== index && items[i]!.tags.some((tag) => items[index]!.tags.includes(tag)));
      const captionReserve = index !== null && items[index]?.title ? 72 : 48;
      const freeHeight = rect.height - captionReserve;
      const centerY = (freeHeight / 2 / rect.height) * 100;
      const ringScale = Math.min(
        1.25,
        Math.max(
          0.8,
          ((2 * Math.PI * Math.min(rect.width, freeHeight) * 0.34) /
            Math.max(1, ringMembers.length) /
            starSize) *
            0.85
        )
      );
      const radius = Math.min(
        Math.min(rect.width, freeHeight) * 0.34,
        freeHeight / 2 - (starSize * ringScale) / 2 - 8
      );
      const heroScale =
        Math.min(freeHeight * 0.5, rect.width * 0.32, (radius - (starSize * ringScale) / 2) * 2 - 12) / starSize;
      for (let i = 0; i < items.length; i++) {
        const wrap = wrapRefs.current[i];
        if (!wrap) continue;
        const home = positions[i]!;
        let target = { x: home.x, y: home.y, scale: 1 };
        if (index !== null) {
          if (i === index) target = { x: 50, y: centerY, scale: heroScale };
          else {
            const k = ringMembers.indexOf(i);
            if (k >= 0) {
              const angle = -Math.PI / 2 + (k / ringMembers.length) * Math.PI * 2;
              target = {
                x: 50 + ((Math.cos(angle) * radius) / rect.width) * 100,
                y: centerY + ((Math.sin(angle) * radius) / rect.height) * 100,
                scale: ringScale,
              };
            }
          }
        }
        const dx = ((target.x - home.x) / 100) * rect.width;
        const dy = ((target.y - home.y) / 100) * rect.height;
        const to = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${target.scale.toFixed(3)})`;
        const from = getComputedStyle(wrap).transform;
        wrap.style.transform = to;
        if (reducedMotion) continue;
        const flight = wrap.animate(
          [{ transform: from === "none" ? "translate(0px, 0px) scale(1)" : from }, { transform: to }],
          {
            duration: GATHER_MS,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          }
        );
        s.flights.push(flight);
        flight.finished
          .then(() => {
            s.flights = s.flights.filter((f) => f !== flight);
          })
          .catch(() => undefined);
      }
    },
    [items, positions, starSize, reducedMotion]
  );

  const gather = React.useCallback(
    (index: number | null) => {
      live.current.lastInput = performance.now();
      setGathered(index);
      flyTo(index);
      if (index !== null) onSelect?.(index, items[index]!);
    },
    [flyTo, onSelect, items]
  );

  React.useEffect(() => {
    if (gathered === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") gather(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gathered, gather]);

  const hero = gathered !== null ? items[gathered] : null;

  return (
    <div
      ref={setRootRef}
      data-slot="constellation-gallery"
      data-state={gathered !== null ? "gathered" : activeTags ? "lit" : "idle"}
      className={cn(
        "relative isolate aspect-[16/10] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white text-zinc-900 shadow-xl select-none",
        className
      )}
      style={style}
      onPointerMove={() => {
        live.current.lastInput = performance.now();
      }}
      onClick={(event) => {
        if (gathered !== null && event.target === event.currentTarget) gather(null);
      }}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-100"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(239, 246, 255, 0.85), #ffffff 75%)",
        }}
      />
      <svg ref={svgRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />

      {items.map((item, index) => {
        const p = positions[index]!;
        const isMember = memberSet ? memberSet.has(index) : true;
        const isFocus = focusIndex === index;
        const isHero = gathered === index;
        return (
          <div
            key={`${item.src}-${index}`}
            ref={(node) => {
              wrapRefs.current[index] = node;
            }}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: starSize,
              height: starSize,
              marginLeft: -starSize / 2,
              marginTop: -starSize / 2,
              zIndex: isHero ? 30 : isMember && memberSet ? 20 : 10,
            }}
          >
            <button
              ref={(node) => {
                starRefs.current[index] = node;
              }}
              type="button"
              data-star
              data-index={index}
              data-member={memberSet ? isMember : undefined}
              data-hero={isHero || undefined}
              aria-label={item.title ?? item.alt ?? `Skill ${index + 1}`}
              aria-pressed={isHero}
              onPointerEnter={() => {
                live.current.lastInput = performance.now();
                setHovered(index);
              }}
              onPointerLeave={() => setHovered((h) => (h === index ? null : h))}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered((h) => (h === index ? null : h))}
              onClick={() => gather(isHero ? null : index)}
              className={cn(
                "group relative block size-full overflow-hidden rounded-full border-2 border-zinc-200/90 bg-white shadow-md p-2 transition-[opacity,scale,box-shadow,border-color] duration-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                memberSet && !isMember && "opacity-35 scale-90 blur-[0.2px]",
                memberSet && isMember && !isHero && "scale-110 shadow-[0_0_24px_rgba(37,99,235,0.3)] border-blue-500 bg-blue-50/50",
                isFocus && !isHero && "scale-125 z-20 border-blue-600 shadow-[0_0_28px_rgba(37,99,235,0.4)]",
                isHero && "rounded-3xl border-2 border-zinc-900 shadow-2xl p-4 bg-white"
              )}
              style={{ transition: isHero ? "border-radius 0.4s" : undefined }}
            >
              <div className="size-full flex flex-col items-center justify-center p-1 relative">
                <img
                  src={item.src}
                  alt={item.alt ?? item.title ?? ""}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLElement;
                    img.style.display = "none";
                    const fallback = img.parentElement?.querySelector(".star-fallback") as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                  className="size-full object-contain pointer-events-none drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-110"
                />
                <div className="star-fallback hidden size-full items-center justify-center font-bold text-xs text-zinc-900">
                  {item.title ? item.title.slice(0, 2).toUpperCase() : "✦"}
                </div>
              </div>
            </button>
          </div>
        );
      })}

      {label && gathered === null && (
        <div
          data-label
          className="pointer-events-none absolute left-6 top-6 rounded-full border border-zinc-200 bg-white/95 px-4 py-1.5 font-mono text-xs text-zinc-700 shadow-sm backdrop-blur"
        >
          ✦ Constellation: <span className="font-semibold text-blue-600">{label}</span>
        </div>
      )}

      {hero && (
        <div data-caption className="pointer-events-none absolute inset-x-0 bottom-8 z-40 flex justify-center px-4">
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-200 bg-white/95 px-6 py-3 text-center shadow-xl backdrop-blur max-w-md">
            {hero.title && <p className="text-sm font-semibold text-zinc-900">{hero.title}</p>}
            {hero.description && (
              <p className="text-xs text-zinc-600 leading-relaxed">{hero.description}</p>
            )}
            <p className="font-mono text-[11px] text-zinc-400 mt-0.5">
              {hero.tags.join(" · ")} &bull; Click star again to scatter
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConstellationGallery;
