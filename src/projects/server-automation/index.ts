import { Project } from "../types";

export const serverAutomationProject: Project = {
  id: "server-automation",
  title: "Server Automation & Python Suite",
  company: "DevOps & Server Automation",
  category: "systems",
  categoryLabel: "Systems & Python",
  tags: ["Python", "Linux / Ubuntu", "Bash", "Telephony", "Cron Automation"],
  description: "Automated Server Health Telemetry, Backup Engines & Failover Scripts",
  longDescription: [
    "An infrastructure engineering suite built on Ubuntu Linux, Python, and Bash to automate cloud server health monitoring, nightly backups, and telephony PBX routing.",
    "Features custom Python daemons that audit CPU, RAM, disk thresholds, and network connectivity, triggering automated off-site backups and instant notifications before downtime occurs.",
    "Includes VoIP PBX programmatic call handling, IVR health diagnostics, and automated server firewall hardening scripts."
  ],
  features: [
    "Incremental Cloud Backup Engine: Nightly delta backups with cryptographic SHA-256 checksums and offsite S3/B2 sync.",
    "Self-Healing Service Watchdog: Monitors vital web services and initiates auto-restarts upon unresponsive health checks.",
    "Telephony & PBX Automation: Programmatic call routing, IVR tree validation, and SIP trunk telemetry.",
    "Firewall Hardening & Intrusion Defense: Automated iptables scripts mitigating brute-force SSH attacks and rate-limiting abusive IP ranges.",
    "Automated Disaster Recovery Drills: Periodic test restoration verifying database backup integrity."
  ],
  challenges: [
    "Preventing backup tasks from causing disk I/O bottlenecks and starving production web traffic.",
    "Handling intermittent network interruptions during large remote multi-gigabyte archive syncs."
  ],
  solutions: [
    "Configured ionice and nice scheduling priorities alongside rsync bandwidth throttling during peak hours.",
    "Engineered chunked, resumable multipart uploads with exponential backoff retry algorithms."
  ],
  techStack: [
    { name: "Python 3", category: "Daemon Engine & Parsing" },
    { name: "Bash & POSIX Shell", category: "System Scripting & Cron" },
    { name: "Ubuntu Linux", category: "OS Environment" },
    { name: "Systemd", category: "Service Management" },
    { name: "Asterisk / FreePBX", category: "Telephony Engine" }
  ],
  metrics: [
    { label: "Data Durability", value: "99.9% Verified" },
    { label: "Incident Recovery Time", value: "<5 min Failover" },
    { label: "Automated Scripts", value: "30+ Production Tasks" }
  ],
  image: "/img/server-automation.jpg",
  periodLabel: "2022 — 2025",
  accentColor: "#EF4444",
  topMilestones: [
    {
      id: "dev-2022-jan",
      year: "2022",
      month: "January",
      content: "Linux Ubuntu server administration foundation established across enterprise hosting environments."
    },
    {
      id: "dev-2022-oct",
      year: "2022",
      month: "October",
      content: "Automated Python daemon built for nightly incremental backups and off-site cloud sync."
    },
    {
      id: "dev-2023-aug",
      year: "2023",
      month: "August",
      content: "Telephony & VoIP PBX automation scripts implemented for programmatic call routing."
    },
    {
      id: "dev-2024-nov",
      year: "2024",
      month: "November",
      content: "Comprehensive system health telemetry suite deployed with automated self-healing restart triggers."
    }
  ],
  bottomMilestones: [
    {
      id: "dev-2022-may",
      year: "2022",
      month: "May",
      content: "Bash utility library built for automated package updates, firewall hardening, and SSH auditing."
    },
    {
      id: "dev-2023-feb",
      year: "2023",
      month: "February",
      content: "Database dump and point-in-time recovery testing scripts certified for 99.9% data durability."
    },
    {
      id: "dev-2024-apr",
      year: "2024",
      month: "April",
      content: "Log analysis engine built in Python to parse server access spikes and prevent brute-force attacks."
    }
  ]
};

export default serverAutomationProject;
