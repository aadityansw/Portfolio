import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { PROJECTS } from "@/data/projects";

const masterTopItems = [
  {
    id: "m-2020-mar",
    year: "2020",
    month: "March",
    content: "Initial research into cross-platform mobile frameworks and asynchronous distributed systems.",
  },
  {
    id: "m-2022-jan",
    year: "2022",
    month: "January",
    content: "Linux server administration, telephony PBX scripts, and Python automation daemons built.",
  },
  {
    id: "m-2023-jun",
    year: "2023",
    month: "June",
    content: "Production Flutter applications engineered with real-time WebSocket telemetry and offline-first Hive storage.",
  },
  {
    id: "m-2025-jan",
    year: "2025",
    month: "January",
    content: "Advanced 3D spatial user interfaces, interactive timeline engines, and multi-tenant platforms deployed.",
  },
];

const masterBottomItems = [
  {
    id: "m-2021-jul",
    year: "2021",
    month: "July",
    content: "First commercial web deliverables completed with bespoke design token systems and semantic CSS layouts.",
  },
  {
    id: "m-2022-sep",
    year: "2022",
    month: "September",
    content: "InVision DSM system study and multi-brand design tokens architecture published.",
  },
  {
    id: "m-2024-feb",
    year: "2024",
    month: "February",
    content: "Campus-wide rollout of Studently academic portal serving over 2,000 university students.",
  },
];

export function TimelinesPage() {
  return (
    <div className="w-full">
      {/* Lead-in Header */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-16 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          Multi-Year Evolution
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-900 mt-3 max-w-3xl mx-auto">
          Project Timelines &amp; Roadmaps
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
          Scroll down to explore the macro engineering journey from 2020 to 2026, or jump directly into the individual development timeline of any project below.
        </p>
      </section>

      {/* Master Macro Timeline */}
      <section className="mb-28">
        <div className="max-w-[1200px] mx-auto px-6 mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
            Macro Storyline (2020 &mdash; 2026)
          </h2>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Scroll down through this section to scrub the track sideways.
          </p>
        </div>

        <Timeline
          title="Macro Storyline"
          periodLabel="2020 — 2026"
          imageUrl="/img/apna-agenda.webp"
          imageAlt="Aaditya Narayan Engineering Journey"
          activeColor="#ff5f00"
          topItems={masterTopItems}
          bottomItems={masterBottomItems}
        />
      </section>

      {/* Project Timelines Directory Grid */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-zinc-200">
        <div className="text-center sm:text-left mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Directory
          </span>
          <h2 className="text-3xl font-semibold text-zinc-900 mt-1">
            Individual Project Timelines
          </h2>
          <p className="text-sm text-zinc-500 font-light mt-1.5 max-w-xl">
            Each project features its own dedicated interactive horizontal timeline documenting sprint milestones, architectural challenges, and release dates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-zinc-300 transition-all duration-300"
            >
              <div>
                <div className="h-44 rounded-2xl overflow-hidden mb-5 bg-zinc-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-zinc-700 font-medium">{project.categoryLabel}</span>
                  <span>{project.periodLabel}</span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-900">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-500 font-light mt-2 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-200/60 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-light">
                  <Clock className="size-3.5 text-zinc-400" />
                  <span>{project.topMilestones.length + project.bottomMilestones.length} Milestones</span>
                </span>

                <Link
                  to={`/work/${project.id}#timeline`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-black group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore Timeline</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TimelinesPage;
