import { Project } from "../types";

export const apnaBackupProject: Project = {
  id: "apna-backup",
  title: "Apna Backup Mobile",
  company: "Apna Backup Telemetry",
  category: "flutter",
  categoryLabel: "Flutter & Systems",
  tags: ["Flutter", "WebSockets", "REST APIs", "DevOps", "Linux"],
  description: "Live Server Monitoring & Telemetry Application",
  longDescription: [
    "Apna Backup Mobile bridges the gap between complex cloud server infrastructure and mobile accessibility. It provides real-time server health telemetry, disk threshold tracking, and failover triggers straight from an operator's smartphone.",
    "Engineered with a low-overhead WebSocket daemon and a Flutter mobile frontend, it streams CPU, memory, load averages, and network metrics with sub-second latency.",
    "The system incorporates secure mTLS device authorization, ensuring only authorized system engineers can issue emergency service restarts or execute failover routines."
  ],
  features: [
    "Sub-Second Live Telemetry: Streams CPU, RAM, disk I/O, and socket load over secure WebSockets.",
    "Multi-Node Fleet Dashboard: Monitors 10+ distributed Linux production servers simultaneously.",
    "Mobile Failover Trigger: Issues authenticated emergency service restarts directly from smartphone.",
    "Proactive Push Alerts: Fires urgent push notifications when storage exceeds 85% or processes hang.",
    "Encrypted mTLS Communication: Mutual TLS device certificates ensure zero unauthorized server command access."
  ],
  challenges: [
    "Minimizing mobile battery drain while keeping persistent WebSocket telemetry streams open.",
    "Ensuring fail-safe execution of sensitive Linux server commands over unpredictable mobile networks."
  ],
  solutions: [
    "Implemented adaptive telemetry polling frequencies based on app lifecycle state (active foreground vs background).",
    "Engineered an idempotent server command verification handshake with cryptographic nonces."
  ],
  techStack: [
    { name: "Flutter", category: "Cross-Platform Mobile" },
    { name: "Dart", category: "Mobile Logic" },
    { name: "Python / Go", category: "Server Daemon Engine" },
    { name: "WebSockets & mTLS", category: "Secure Real-Time Protocol" },
    { name: "Ubuntu Linux", category: "Target Infrastructure" }
  ],
  metrics: [
    { label: "Stream Latency", value: "<150ms Telemetry" },
    { label: "Active Fleets", value: "10+ Linux Nodes" },
    { label: "Security Level", value: "mTLS Encrypted" }
  ],
  image: "/img/apna-backup.webp",
  periodLabel: "2023 — 2025",
  accentColor: "#2563EB",
  topMilestones: [
    {
      id: "ab-2023-apr",
      year: "2023",
      month: "April",
      content: "DevOps audit reveals critical delay during off-hour server incidents due to lack of accessible mobile metrics."
    },
    {
      id: "ab-2023-dec",
      year: "2023",
      month: "December",
      content: "Engineered lightweight daemon broadcasting CPU, memory, and disk health metrics over secure WebSockets."
    },
    {
      id: "ab-2024-aug",
      year: "2024",
      month: "August",
      content: "Real-time telemetry UI built in Flutter with dynamic SVG gauges, interactive sparklines, and latency indicators."
    },
    {
      id: "ab-2025-mar",
      year: "2025",
      month: "March",
      content: "Automated failover triggering and encrypted emergency SSH reboot commands executed straight from mobile."
    }
  ],
  bottomMilestones: [
    {
      id: "ab-2023-sep",
      year: "2023",
      month: "September",
      content: "Established end-to-end mTLS authentication ensuring only authorized operator devices can stream cluster telemetry."
    },
    {
      id: "ab-2024-apr",
      year: "2024",
      month: "April",
      content: "Zero-latency push notification pipeline integrated to alert on disk exhaustion and process memory leaks."
    },
    {
      id: "ab-2024-dec",
      year: "2024",
      month: "December",
      content: "Multi-node fleet dashboard rolled out, monitoring 10+ distributed Linux instances simultaneously."
    }
  ]
};

export default apnaBackupProject;
