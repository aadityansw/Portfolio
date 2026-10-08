import { Project } from "../types";

export const keryxSpendProject: Project = {
  id: "keryxspend",
  title: "KeryxSpend",
  company: "KeryxSpend (SpendTrack)",
  category: "flutter",
  categoryLabel: "Flutter & Fintech",
  tags: [
    "Flutter 3.27+",
    "Dart",
    "Firebase Auth",
    "Cloud Firestore",
    "fl_chart",
    "Home Widget",
    "UPI Deep Links",
  ],
  description:
    "All-in-One Personal Finance Suite: Real-time Expenses, Waterfall Debts, Subscriptions & Budget Envelopes",
  longDescription: [
    "KeryxSpend (also known as SpendTrack) is an intelligent personal finance application engineered with Flutter and Firebase (Authentication + Cloud Firestore) that answers four everyday money questions: Where is my money going? Who owes me, and who do I owe? What am I subscribed to, and when does it renew? and Am I overspending?",
    "Built with a clean reactive architecture without third-party state boilerplate, the UI updates continuously through Firestore StreamBuilders. The app features bill splitting with automatic per-person debt generation, a per-person ledger with waterfall debt settlement and UPI 'Pay Now' deep links, and subscriptions with recurring cycle countdowns and next-day deduction confirmation prompts.",
    "Engineered for Android, iOS, and Web, KeryxSpend includes native Kotlin and Swift home/lock-screen widgets (via home_widget), atomic WriteBatches ensuring 100% financial consistency between debts and expenses, and Google Sign-in with real-time multi-device synchronization."
  ],
  features: [
    "Live Expenses Feed & Quick Bill-Split: Real-time expense feed with quick-add chips (+₹100, +₹500, +₹1,000) and multi-person bill splitting that automatically logs friends' shares into the Debts ledger.",
    "Waterfall Debt Settlement & UPI 'Pay Now': Per-person lending/borrowing ledger where repayments automatically settle the oldest debt entries first. Borrowed repayments automatically log as 'Debt Cleared' expenses, and UPI deep-links launch GPay, PhonePe, or Paytm.",
    "Subscription Lifecycle Tracker & Deduction Prompts: Auto-rolling renewal dates with countdown urgency indicators, scheduled local notification reminders, and a next-day 'Did it get deducted?' prompt that auto-records verified renewals.",
    "Live Budget Envelopes & Overspend Warnings: Monthly category limits calculated live against current month's expenses, with 80% amber threshold and 100%+ overspend alert states.",
    "Stats & 6-Month Spending Analytics: Interactive FL Chart line trends, category breakdown donut charts, payment method totals, and month-over-month percentage changes.",
    "Single-Collection Override Pattern: Lightweight database design where built-in category defaults live in client code and Firestore documents only exist when custom categories or overrides are created."
  ],
  challenges: [
    "Preventing financial ledger drift when splitting bills or recording debt repayments across multiple Firestore collections.",
    "Handling UPI payment deep-linking across fragmented Android OS choosers and strict iOS URL scheme permissions.",
    "Ensuring custom category icons render cleanly on Android release builds without getting stripped by icon tree-shaking."
  ],
  solutions: [
    "Engineered atomic WriteBatch commits ensuring debt repayments and 'Debt Cleared' expense records commit simultaneously or fail together.",
    "Built dedicated platform query schemes (<queries> on Android, LSApplicationQueriesSchemes on iOS) with custom in-app choosers for Google Pay, PhonePe, and Paytm.",
    "Implemented a static resolveCategoryIcon code-point lookup table preventing release-build Flutter icon tree-shaking from stripping custom icons."
  ],
  techStack: [
    { name: "Flutter 3.27+", category: "Cross-Platform Framework" },
    { name: "Dart", category: "Core Application Logic" },
    { name: "Firebase Auth", category: "Google Sign-In & AuthGate Stream" },
    { name: "Cloud Firestore", category: "Real-time Streams & Atomic WriteBatches" },
    { name: "fl_chart", category: "Interactive Financial Trend Graphs" },
    { name: "home_widget", category: "Native Android & iOS Lock-Screen Widgets" },
    { name: "flutter_local_notifications", category: "Scheduled Renewal Alerts" },
    { name: "url_launcher", category: "UPI Deep Links (GPay, PhonePe, Paytm)" },
  ],
  metrics: [
    { label: "Live Web App", value: "keryxspend.vercel.app" },
    { label: "Real-time Sync", value: "Firestore Streams" },
    { label: "Platforms", value: "Android, iOS & Web" },
  ],
  image: "/img/keryxspend.jpg",
  liveUrl: "https://keryxspend.vercel.app",
  periodLabel: "2024 — 2025",
  accentColor: "#059669",
  topMilestones: [
    {
      id: "ks-2024-jun",
      year: "2024",
      month: "June",
      content: "Initial product research: analyzing friction in manual spreadsheets, invasive bank-sync apps, and noisy split-bill groups."
    },
    {
      id: "ks-2024-oct",
      year: "2024",
      month: "October",
      content: "Engineered core Flutter architecture with Firestore streams, single-collection override patterns, and Google Sign-in AuthGate."
    },
    {
      id: "ks-2025-jan",
      year: "2025",
      month: "January",
      content: "Shipped waterfall debt settlement algorithm, automatic 'Debt Cleared' expense syncing, and UPI Pay Now deep-linking."
    },
    {
      id: "ks-2025-mar",
      year: "2025",
      month: "March",
      content: "Production deployment on Vercel (keryxspend.vercel.app) with native home/lock-screen widgets and subscription auto-prompts."
    }
  ],
  bottomMilestones: [
    {
      id: "ks-2024-aug",
      year: "2024",
      month: "August",
      content: "Constructed iOS-inspired design system in Figma with San Francisco typography and bottom-sheet quick add modals."
    },
    {
      id: "ks-2024-dec",
      year: "2024",
      month: "December",
      content: "Integrated FL Chart spending trend charts, category donut breakdowns, and dynamic 80%/100% budget envelope thresholds."
    },
    {
      id: "ks-2025-feb",
      year: "2025",
      month: "February",
      content: "Built native WidgetKit (iOS) and AppWidgetProvider (Android) extension targets for instant 1-tap expense logging."
    }
  ]
};

export default keryxSpendProject;
