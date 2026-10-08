import { JourneyItem } from "@/components/ui/timeline";

export interface TechStackItem {
  name: string;
  category: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  company?: string;
  category: "flutter" | "web" | "systems" | "uiux";
  categoryLabel: string;
  tags: string[];
  description: string;
  longDescription: string[];
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  techStack?: TechStackItem[];
  metrics?: ProjectMetric[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  periodLabel: string;
  accentColor: string;
  topMilestones: JourneyItem[];
  bottomMilestones: JourneyItem[];
}

export interface ArchiveEntry {
  year: string;
  title: string;
  category: string;
  client: string;
  link: string;
}
