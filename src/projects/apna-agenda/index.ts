import { Project } from "../types";

export const apnaAgendaProject: Project = {
  id: "apna-agenda",
  title: "Apna Agenda",
  company: "Apna Agenda Application",
  category: "flutter",
  categoryLabel: "Flutter Apps",
  tags: ["Flutter", "Dart", "Firebase", "Productivity", "Hive DB"],
  description: "Cross-platform Meeting Scheduler & Time Management Suite",
  longDescription: [
    "Apna Agenda is a powerful scheduling and meeting management application developed in Flutter that redefines how professionals and students organize their time. By consolidating offline scheduling and multiple online meeting platforms—such as Google Meet, Zoom, and Microsoft Teams—into one unified app, it simplifies collaboration and boosts productivity.",
    "The idea for Apna Agenda emerged from the growing need to reduce the hassle of managing multiple apps and calendars for meetings. As someone who understands the challenges of context switching between platforms, I envisioned an all-in-one solution that ensures meetings are easy to organize, access, and track.",
    "As the sole developer, I took full ownership of designing the application architecture, user experience, and implementation. Leveraging the Flutter framework, I created a smooth, cross-platform experience that performs consistently across Android and iOS devices."
  ],
  features: [
    "Unified Multi-Platform Scheduling: Consolidates Google Meet, Zoom, and MS Teams links into unified calendar slots.",
    "Offline-First Architecture: Hive NoSQL database ensures instant read/write access without active internet connection.",
    "Automated Conflict Resolution: Detects overlapping meetings and warns before dual-booking occurrences.",
    "One-Tap Meeting Entry: Direct deep-linking launches meetings natively inside respective video calling apps.",
    "Customizable Alerts & Notifications: Timed push notifications with pre-meeting preparation agendas."
  ],
  challenges: [
    "Resolving timezone variations and leap-day edge cases across external calendar APIs.",
    "Optimizing Flutter list rendering and memory allocations to guarantee consistent 60fps scrolling on budget Android devices."
  ],
  solutions: [
    "Constructed a normalized UTC epoch timestamp pipeline with local timezone conversion hooks.",
    "Implemented virtualized sliver lists, cached image renderers, and reactive state management reducing memory footprints by 42%."
  ],
  techStack: [
    { name: "Flutter", category: "Cross-Platform Framework" },
    { name: "Dart", category: "Programming Language" },
    { name: "Firebase Auth & Firestore", category: "Backend & Cloud Sync" },
    { name: "Hive DB", category: "Local High-Performance Cache" },
    { name: "Figma", category: "UI/UX & Prototyping" }
  ],
  metrics: [
    { label: "Rendering Performance", value: "60 FPS Constant" },
    { label: "Memory Footprint", value: "-42% Optimized" },
    { label: "Platforms", value: "Android & iOS" }
  ],
  image: "/img/apna-agenda.webp",
  periodLabel: "2023 — 2025",
  accentColor: "#ff5f00",
  topMilestones: [
    {
      id: "aa-2023-mar",
      year: "2023",
      month: "March",
      content: "Initial problem discovery: analyzing meeting management fatigue across Google Meet, Zoom, and Teams."
    },
    {
      id: "aa-2023-nov",
      year: "2023",
      month: "November",
      content: "Flutter architecture engineered with unified event state management and offline-first Hive storage."
    },
    {
      id: "aa-2024-jul",
      year: "2024",
      month: "July",
      content: "Integrated multi-platform calendar APIs with automated conflict resolution and deep-linking."
    },
    {
      id: "aa-2025-feb",
      year: "2025",
      month: "February",
      content: "V2 production release shipping with customizable notifications and multi-device cloud synchronization."
    }
  ],
  bottomMilestones: [
    {
      id: "aa-2023-jul",
      year: "2023",
      month: "July",
      content: "Prototype design sprints validating intuitive agenda creation flows with university students."
    },
    {
      id: "aa-2024-mar",
      year: "2024",
      month: "March",
      content: "Android beta release launched with real-time class timetables and one-tap meeting entry."
    },
    {
      id: "aa-2024-nov",
      year: "2024",
      month: "November",
      content: "iOS optimization pass completed, achieving 60fps scrolling and lock-screen widget support."
    }
  ]
};

export default apnaAgendaProject;
