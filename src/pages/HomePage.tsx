import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import { WorksWheel, WorksWheelItem } from "@/components/ui/works-wheel";
import { PROJECTS, ARCHIVE_ENTRIES, Project } from "@/data/projects";

type CategoryFilter = "all" | "flutter" | "web" | "systems" | "uiux";

interface HomePageProps {
  onOpenSkills?: () => void;
}

export function HomePage({ onOpenSkills }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [archiveSearch, setArchiveSearch] = useState("");

  // Filtered projects for the current category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Convert to WorksWheelItems
  const wheelItems: WorksWheelItem[] = useMemo(() => {
    return filteredProjects.map((p) => ({
      title: p.title,
      image: p.image,
      href: `/work/${p.id}`,
      category: p.categoryLabel,
      description: p.description,
    }));
  }, [filteredProjects]);

  // Category counts and tabs
  const categories = useMemo(() => {
    const allCount = PROJECTS.length;
    const flutterCount = PROJECTS.filter((p) => p.category === "flutter").length;
    const webCount = PROJECTS.filter((p) => p.category === "web").length;
    const systemsCount = PROJECTS.filter((p) => p.category === "systems").length;

    const list = [
      { id: "all" as const, label: "All", count: allCount },
      { id: "flutter" as const, label: "Flutter Apps", count: flutterCount },
      { id: "web" as const, label: "Web & SaaS", count: webCount },
      { id: "systems" as const, label: "Systems", count: systemsCount },
    ];
    return list.filter((c) => c.id === "all" || c.count > 0);
  }, []);

  // Filtered archive entries
  const filteredArchive = useMemo(() => {
    const q = archiveSearch.toLowerCase().trim();
    if (!q) return ARCHIVE_ENTRIES;
    return ARCHIVE_ENTRIES.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.year.includes(q) ||
        entry.client.toLowerCase().includes(q)
    );
  }, [archiveSearch]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-16 sm:pt-24 sm:pb-24">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800 mb-6">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          <span>Available for Flutter &amp; Web Development</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-900 leading-[1.08] max-w-4xl">
          Web Design. App Development. Flutter. Python. UX. &amp; More
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
          Specializing in high-performance cross-platform Flutter applications, responsive modern web interfaces, and robust server automation.
        </p>
      </section>

      {/* Project Controls Bar */}
      <section className="max-w-[1200px] mx-auto px-6 mb-10" id="projects">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-zinc-200/80">
          {/* Categories Tablist */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all inline-flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:text-black hover:border-zinc-400"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[0.65rem] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Showcase View: 3D Works Wheel */}
      <section className="max-w-[1200px] mx-auto px-6 mb-24">
        <div className="py-2">
          <WorksWheel
            key={activeCategory} // remounts smooth geometry on category switch
            items={wheelItems}
            label="Selected Works"
            action="View Case Study"
          />
          <p className="text-center text-xs text-zinc-400 font-light mt-4">
            Scroll wheel or drag cards to turn the 3D spatial drum • Click card to open case study
          </p>
        </div>
      </section>

      {/* Project Archive Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-zinc-200" id="archive">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              All Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 mt-2">
              Project Archive &amp; Index
            </h2>
            <p className="text-sm text-zinc-500 font-light mt-2 max-w-lg">
              A structured catalog of applications, client engagements, systems engineering, and open experiments.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter by keyword or year..."
              value={archiveSearch}
              onChange={(e) => setArchiveSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all"
            />
          </div>
        </div>

        {/* Archive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                <th className="py-3 font-medium">Year</th>
                <th className="py-3 font-medium">Project</th>
                <th className="py-3 font-medium hidden sm:table-cell">Discipline</th>
                <th className="py-3 font-medium hidden md:table-cell">Client / Role</th>
                <th className="py-3 font-medium text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredArchive.map((entry, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-zinc-50/70 transition-colors group"
                >
                  <td className="py-4 font-mono text-xs text-zinc-500">{entry.year}</td>
                  <td className="py-4 font-medium text-zinc-900">{entry.title}</td>
                  <td className="py-4 text-zinc-500 font-light hidden sm:table-cell">
                    {entry.category}
                  </td>
                  <td className="py-4 text-zinc-400 font-light hidden md:table-cell">
                    {entry.client}
                  </td>
                  <td className="py-4 text-right">
                    {entry.link.startsWith("/") ? (
                      <Link
                        to={entry.link}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 hover:text-black"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="size-3" />
                      </Link>
                    ) : (
                      <span className="text-xs text-zinc-400">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
