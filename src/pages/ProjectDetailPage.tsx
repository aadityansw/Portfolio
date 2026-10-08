import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowRight, CheckCircle2, Cpu, Wrench, Sparkles } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { Timeline } from "@/components/ui/timeline";

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  const projectIndex = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[projectIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!project) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-semibold text-zinc-900">Project Not Found</h2>
        <p className="text-zinc-500 mt-3">The project you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  return (
    <article className="w-full">
      {/* Top Breadcrumb Header */}
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to All Projects</span>
        </Link>

        <span className="text-xs font-mono text-zinc-400">
          {project.periodLabel}
        </span>
      </div>

      {/* Case Study Content */}
      <div className="max-w-[800px] mx-auto px-6 pt-8 pb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 leading-[1.1]">
          {project.company || project.title}
        </h1>

        <p className="text-xl sm:text-2xl text-zinc-700 font-normal leading-relaxed mt-6">
          {project.description}
        </p>

        {/* Highlighted Project Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8 pt-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs"
              >
                <div className="text-xl sm:text-2xl font-semibold text-zinc-900">
                  {metric.value}
                </div>
                <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-mono">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-6 text-base sm:text-lg text-zinc-600 font-light leading-relaxed">
          {project.longDescription.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {project.liveUrl && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-medium transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group"
            >
              <span>Test Live App ({project.liveUrl.replace(/^https?:\/\//, "")})</span>
              <ArrowUpRight className="size-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        )}
      </div>

      {/* Featured Large Media Banner */}
      <div className="max-w-[1200px] mx-auto px-6 my-8">
        <div className="rounded-3xl overflow-hidden border border-zinc-200 shadow-xl bg-zinc-100 max-h-[700px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Key Features & Architecture Section */}
      {project.features && project.features.length > 0 && (
        <section className="max-w-[800px] mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="size-5 text-zinc-900" />
            <h2 className="text-2xl font-semibold text-zinc-900">
              Key Features &amp; Capabilities
            </h2>
          </div>
          <div className="space-y-3.5">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200/60"
              >
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-1" />
                <span className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Engineering Challenges & Solutions */}
      {project.challenges && project.solutions && (
        <section className="max-w-[800px] mx-auto px-6 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="size-5 text-zinc-900" />
            <h2 className="text-2xl font-semibold text-zinc-900">
              Technical Challenges &amp; Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
              <h3 className="text-xs uppercase font-mono tracking-wider font-semibold text-amber-800 mb-3">
                Challenges Overcome
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed list-disc list-inside">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
              <h3 className="text-xs uppercase font-mono tracking-wider font-semibold text-emerald-800 mb-3">
                Architectural Solutions
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed list-disc list-inside">
                {project.solutions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Breakdown */}
      {project.techStack && project.techStack.length > 0 && (
        <section className="max-w-[800px] mx-auto px-6 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="size-5 text-zinc-900" />
            <h2 className="text-2xl font-semibold text-zinc-900">
              Technologies &amp; Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80"
              >
                <span className="font-medium text-sm text-zinc-900">
                  {tech.name}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Horizontal Timeline Section */}
      <section className="mt-20" id="timeline">
        <div className="max-w-[1200px] mx-auto px-6 text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Roadmap &amp; Engineering Storyline
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 mt-2">
            {project.title}: Project Timeline
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-light mt-2 max-w-xl mx-auto">
            Scroll horizontally to experience the evolution of {project.title} from initial research sprint to production deployment.
          </p>
        </div>

        <Timeline
          key={project.id}
          title={`${project.title} Evolution`}
          periodLabel={project.periodLabel}
          imageUrl={project.image}
          imageAlt={project.title}
          activeColor={project.accentColor}
          topItems={project.topMilestones}
          bottomItems={project.bottomMilestones}
        />
      </section>

      {/* Next / Previous Project Footer Navigation */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 border-t border-zinc-200 mt-20 flex flex-col sm:flex-row items-center justify-between gap-6">
        {prevProject ? (
          <Link
            to={`/work/${prevProject.id}`}
            className="flex flex-col items-start group"
          >
            <span className="text-xs font-mono text-zinc-400 inline-flex items-center gap-1 group-hover:text-black">
              <ArrowLeft className="size-3" /> Previous Case Study
            </span>
            <span className="text-lg font-medium text-zinc-900 mt-1 group-hover:underline">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          to="/#projects"
          className="px-5 py-2 rounded-full border border-zinc-300 text-xs font-medium text-zinc-700 hover:border-black hover:text-black transition-colors"
        >
          All Projects
        </Link>

        {nextProject ? (
          <Link
            to={`/work/${nextProject.id}`}
            className="flex flex-col items-end group"
          >
            <span className="text-xs font-mono text-zinc-400 inline-flex items-center gap-1 group-hover:text-black">
              Next Case Study <ArrowRight className="size-3" />
            </span>
            <span className="text-lg font-medium text-zinc-900 mt-1 group-hover:underline">
              {nextProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}

export default ProjectDetailPage;
