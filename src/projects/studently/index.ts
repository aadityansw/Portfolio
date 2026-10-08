import { Project } from "../types";

export const studentlyProject: Project = {
  id: "studently",
  title: "Studently",
  company: "Studently Academic Hub",
  category: "flutter",
  categoryLabel: "Flutter Apps",
  tags: ["Flutter", "Dart", "UI/UX", "EdTech", "SQLite"],
  description: "Centralized Academic Hub & Student Portal for Colleges",
  longDescription: [
    "Studently is a comprehensive student management application developed in Flutter that revolutionizes how college students access and manage their academic information. By consolidating timetable updates, exam notices, and assignments into one intuitive platform, it streamlines the university journey.",
    "The platform eliminates information loss from fragmented chat groups and physical notice boards. Built with clean architecture and local SQLite caching, students retain full schedule access even with intermittent campus Wi-Fi connectivity.",
    "Today, Studently powers over 2,000 active students with real-time class announcements and assignment deadline reminders."
  ],
  features: [
    "Glanceable Class Timetables: Quick schedule views with next-lecture countdown indicators.",
    "Assignment Deadline Tracker: Automated reminders sent 24 hours and 2 hours prior to assignment submissions.",
    "Offline SQLite Persistence: Complete timetable and notes access during campus Wi-Fi dead-zones.",
    "Role-Based Permission Hierarchy: Faculty admins, department representatives, and students receive targeted broadcasts.",
    "Academic Attendance Analytics: Visual progress rings alerting students before crossing minimum attendance thresholds."
  ],
  challenges: [
    "Handling unreliable campus network dead-zones during peak classroom transitions.",
    "Designing an information hierarchy that remains readable in under 3 seconds between hurried lecture movements."
  ],
  solutions: [
    "Architected an offline-first SQLite synchronization engine with differential delta sync.",
    "Developed high-contrast visual glance cards with clear status pills and countdown timers."
  ],
  techStack: [
    { name: "Flutter", category: "Mobile Framework" },
    { name: "Dart", category: "Language" },
    { name: "SQLite", category: "Local High-Speed Cache" },
    { name: "Firebase Cloud Messaging", category: "Push Broadcast Engine" },
    { name: "Figma", category: "Design System & Wireframing" }
  ],
  metrics: [
    { label: "Active Student Users", value: "2,000+ Students" },
    { label: "Uptime During Exams", value: "99.9% Reliable" },
    { label: "Query Speed", value: "<15ms Cached" }
  ],
  image: "/work/studently/img/studently-cover-page.webp",
  periodLabel: "2022 — 2025",
  accentColor: "#8B5CF6",
  topMilestones: [
    {
      id: "st-2022-sep",
      year: "2022",
      month: "September",
      content: "Campus research mapping information loss across fragmented WhatsApp circulars and physical boards."
    },
    {
      id: "st-2023-may",
      year: "2023",
      month: "May",
      content: "Complete design system and responsive mobile wireframes finalized for rapid glanceability between lectures."
    },
    {
      id: "st-2024-feb",
      year: "2024",
      month: "February",
      content: "V1 student launch featuring authenticated class rosters, real-time timetable changes, and exam schedules."
    },
    {
      id: "st-2025-jan",
      year: "2025",
      month: "January",
      content: "Institutional scaling to 2,000+ active students with sub-second cached queries and zero downtime."
    }
  ],
  bottomMilestones: [
    {
      id: "st-2023-jan",
      year: "2023",
      month: "January",
      content: "Hierarchical database permissions engineered distinguishing faculty admins, student reps, and general peers."
    },
    {
      id: "st-2023-oct",
      year: "2023",
      month: "October",
      content: "Interactive assignment tracker module shipped with automated reminders 24 hours prior to deadline."
    },
    {
      id: "st-2024-aug",
      year: "2024",
      month: "August",
      content: "Local SQLite offline caching implemented to keep schedules accessible without campus Wi-Fi."
    }
  ]
};

export default studentlyProject;
