import { Project } from "../types";

export const keryxSpendProject: Project = {
  id: "keryxspend",
  title: "KeryxSpend",
  company: "KeryxSpend Budget Tracker",
  category: "flutter",
  categoryLabel: "Flutter & Fintech",
  tags: ["Flutter", "Dart", "Fintech", "Budget Tracker", "Analytics", "Hive DB"],
  description: "Intelligent Personal Budget Tracker, Expense Analytics & Financial Goal Manager",
  longDescription: [
    "KeryxSpend is an intelligent budget tracking and personal finance management application engineered in Flutter. Designed to provide effortless visibility into spending habits, it combines daily expense logging, multi-category budget allocation, recurring subscription monitoring, and visual wealth analytics into one intuitive dashboard.",
    "Built with an offline-first philosophy, KeryxSpend ensures financial records remain completely private and accessible without requiring constant cloud connectivity. Users can set granular category limits (dining, groceries, utilities, savings), track daily burn rates, and receive predictive notifications before exceeding their monthly envelopes.",
    "Featuring interactive spend trend charts, currency conversion engines, and receipt capture integrations, KeryxSpend bridges complex personal finance planning with modern, frictionless mobile UX."
  ],
  features: [
    "Smart Multi-Category Budgeting: Allocate monthly envelopes across groceries, dining, entertainment, and utilities with visual burn rings.",
    "Sub-Second Expense Logging: Quick-add transaction modal with automated category tagging and date timestamps.",
    "Predictive Overspend Alerts: Proactive notifications warning when daily burn rates trajectory will exceed budget before month-end.",
    "Offline-First Local Vault: High-speed local database encryption ensuring complete financial privacy and zero downtime.",
    "Visual Analytics & Trend Charts: Interactive sparklines and category breakdowns revealing spending distributions."
  ],
  challenges: [
    "Ensuring bulletproof calculation precision across multi-currency conversions and floating-point financial values.",
    "Rendering real-time analytics graphs and animated budget progress rings with zero frame drops."
  ],
  solutions: [
    "Implemented fixed-point integer cent arithmetic and BigDecimal data structures eliminating precision drift.",
    "Optimized custom painter shaders and memoized SVG chart renderers achieving steady 60fps animations."
  ],
  techStack: [
    { name: "Flutter", category: "Cross-Platform Framework" },
    { name: "Dart", category: "Core Application Logic" },
    { name: "Hive & SQLite", category: "Encrypted Local Storage" },
    { name: "FL Chart", category: "Financial Data Visualizations" },
    { name: "Figma", category: "Fintech UI/UX & Design Tokens" }
  ],
  metrics: [
    { label: "Logging Speed", value: "<3s Quick Entry" },
    { label: "Financial Privacy", value: "100% Offline Vault" },
    { label: "Rendering Rate", value: "60 FPS Fluid Charts" }
  ],
  image: "/img/keryxspend.jpg",
  periodLabel: "2024 — 2025",
  accentColor: "#059669",
  topMilestones: [
    {
      id: "ks-2024-jun",
      year: "2024",
      month: "June",
      content: "Problem discovery: analyzing cognitive fatigue with manual spreadsheets and ad-heavy finance trackers."
    },
    {
      id: "ks-2024-oct",
      year: "2024",
      month: "October",
      content: "Core Flutter expense engine built with encrypted local Hive NoSQL database and offline envelope model."
    },
    {
      id: "ks-2025-jan",
      year: "2025",
      month: "January",
      content: "Interactive spending analytics dashboard shipped with dynamic category sparklines and burn-rate rings."
    },
    {
      id: "ks-2025-mar",
      year: "2025",
      month: "March",
      content: "Production release featuring predictive overspend warnings and automated recurring subscription logs."
    }
  ],
  bottomMilestones: [
    {
      id: "ks-2024-aug",
      year: "2024",
      month: "August",
      content: "Minimalist fintech design system constructed in Figma prioritizing rapid 3-tap transaction entry."
    },
    {
      id: "ks-2024-dec",
      year: "2024",
      month: "December",
      content: "Multi-currency conversion engine integrated with offline cached exchange rates and integer cent precision."
    },
    {
      id: "ks-2025-feb",
      year: "2025",
      month: "February",
      content: "Beta testing group with 50 personal budgeters validating 94% retention and reduced impulse expenditures."
    }
  ]
};

export default keryxSpendProject;
