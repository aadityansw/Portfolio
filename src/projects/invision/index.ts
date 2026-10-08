import { Project } from "../types";

export const invisionProject: Project = {
  id: "invision",
  title: "InVision DSM System",
  company: "InVision DSM Study",
  category: "uiux",
  categoryLabel: "UI/UX Design",
  tags: ["Product Design", "Prototyping", "DSM", "Design Tokens", "Accessibility"],
  description: "Design System Architecture & Collaborative Prototyping Platform",
  longDescription: [
    "A comprehensive design system architecture study establishing enterprise design token taxonomies, component governance, and automated developer handoffs.",
    "Audited visual inconsistencies across cross-functional squad repositories and established centralized color, typography, spacing, and radius tokens.",
    "Achieved WCAG 2.1 AA accessibility compliance across all components while streamlining design-to-code velocity."
  ],
  features: [
    "Centralized Design Token Taxonomy: Unified JSON schema managing color, type scales, elevation, and radius across Web and Mobile.",
    "Synchronized Multi-Brand Theming: Light, Dark, and High-Contrast token modes with zero style regressions.",
    "Automated Developer Handoffs: Generates copyable React and Flutter component snippets directly from Figma specs.",
    "Strict WCAG 2.1 AA Compliance: Automated contrast checker integrated into continuous component testing.",
    "Component Governance Framework: Clear contribution guidelines and deprecation lifecycles preventing visual drift."
  ],
  challenges: [
    "Reconciling conflicting button, modal, and input states across 12 distinct legacy product squad repositories.",
    "Ensuring accessibility contrast requirements without diminishing brand visual expression."
  ],
  solutions: [
    "Conducted an exhaustive visual debt audit consolidating 84 arbitrary hex colors down to a cohesive 16-shade token palette.",
    "Engineered programmatic color palette generator with perceptual contrast calculation (APCA & WCAG)."
  ],
  techStack: [
    { name: "Figma Tokens Studio", category: "Token Management" },
    { name: "Style Dictionary", category: "Cross-Platform Token Translation" },
    { name: "React & Storybook", category: "Living Component Documentation" },
    { name: "WCAG 2.1 AA Tooling", category: "Accessibility Validation" }
  ],
  metrics: [
    { label: "Token Consolidation", value: "84 colors → 16 tokens" },
    { label: "Developer Handoff Velocity", value: "+45% Faster" },
    { label: "Accessibility Rating", value: "100% WCAG AA" }
  ],
  image: "/work/invision/img/DSM.webp",
  periodLabel: "2022 — 2024",
  accentColor: "#F43F5E",
  topMilestones: [
    {
      id: "dsm-2022-apr",
      year: "2022",
      month: "April",
      content: "Enterprise audit evaluating visual debt and inconsistencies across 12 distinct product squad repositories."
    },
    {
      id: "dsm-2022-nov",
      year: "2022",
      month: "November",
      content: "Atomic token hierarchy established governing typography scales, color palettes, elevation shadows, and radiuses."
    },
    {
      id: "dsm-2023-jun",
      year: "2023",
      month: "June",
      content: "Multi-brand UI library constructed with synchronized Light, Dark, and High-Contrast token themes."
    },
    {
      id: "dsm-2024-mar",
      year: "2024",
      month: "March",
      content: "Complete design system guidelines published with copyable React/Flutter component code snippets."
    }
  ],
  bottomMilestones: [
    {
      id: "dsm-2022-aug",
      year: "2022",
      month: "August",
      content: "Governance model structured defining token contribution workflows and automated deprecation warnings."
    },
    {
      id: "dsm-2023-feb",
      year: "2023",
      month: "February",
      content: "Interactive prototype sandbox built to evaluate component accessibility and state transitions."
    },
    {
      id: "dsm-2023-oct",
      year: "2023",
      month: "October",
      content: "Automated WCAG 2.1 AA accessibility validation test suite integrated into design token builds."
    }
  ]
};

export default invisionProject;
