"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Curated project showcase items mapped to Aaditya Narayan's real portfolio projects,
// styled with verified high-resolution Unsplash stock imagery matching each project's domain.
export const PORTFOLIO_PROJECTS: WorksWheelItem[] = [
  {
    title: "Apna Agenda",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    href: "work/apna-agenda/index.html",
  },
  {
    title: "Apna Backup Mobile",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    href: "work/apna-backup/index.html",
  },
  {
    title: "Studently",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    href: "work/studently/index.html",
  },
  {
    title: "Sai Shree Balajee Homes",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    href: "work/ssb-homes/index.html",
  },
  {
    title: "Websites Showcase",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    href: "work/websites/index.html",
  },
  {
    title: "DevOps & Python Suite",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    href: "work/server-automation/index.html",
  },
  {
    title: "Soteria / @Hotel Travel",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    href: "work/soteria/index.html",
  },
  {
    title: "InVision DSM Study",
    image:
      "https://images.unsplash.com/photo-1581291518655-9523c932deda?auto=format&fit=crop&w=1200&q=80",
    href: "work/invision/index.html",
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel
        items={PORTFOLIO_PROJECTS}
        label="Works '26"
        action="Explore Project"
      />
    </div>
  );
}
