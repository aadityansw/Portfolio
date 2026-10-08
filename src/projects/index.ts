export * from "./types";

import { Project, ArchiveEntry } from "./types";
import { keryxSpendProject } from "./keryxspend";
import { apnaAgendaProject } from "./apna-agenda";
import { studentlyProject } from "./studently";
import { apnaBackupProject } from "./apna-backup";
import { ssbHomesProject } from "./ssb-homes";

// Individual project exports
export {
  keryxSpendProject,
  apnaAgendaProject,
  studentlyProject,
  apnaBackupProject,
  ssbHomesProject,
};

// Aggregated selected projects list for portfolio showcase
export const PROJECTS: Project[] = [
  keryxSpendProject,
  apnaAgendaProject,
  studentlyProject,
  apnaBackupProject,
  ssbHomesProject,
];

// Helper methods to access project data easily
export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}

// Full historical archive catalog
export const ARCHIVE_ENTRIES: ArchiveEntry[] = [
  { year: "2025", title: "KeryxSpend Budget Tracker", category: "Flutter / Fintech", client: "Self-Initiated", link: "/work/keryxspend" },
  { year: "2025", title: "Apna Agenda V2", category: "Flutter App", client: "Self-Initiated", link: "/work/apna-agenda" },
  { year: "2024", title: "Studently Academic Hub", category: "Flutter / Dart", client: "EdTech", link: "/work/studently" },
  { year: "2024", title: "Apna Backup Telemetry", category: "Flutter & Systems", client: "Infrastructure", link: "/work/apna-backup" },
  { year: "2024", title: "Sai Shree Balajee Homes", category: "Web & Admin", client: "SSB Group", link: "/work/ssb-homes" },
  { year: "2023", title: "Live Server Fleet Daemon", category: "DevOps & Go", client: "Infrastructure", link: "/work/apna-backup" },
  { year: "2023", title: "Automated PBX Engine", category: "Python / Telephony", client: "Telecom", link: "#" },
  { year: "2022", title: "Academic Attendance Bot", category: "Python / Telegram", client: "College Lab", link: "#" },
];
