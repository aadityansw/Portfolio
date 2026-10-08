import { Project } from "../types";

export const soteriaProject: Project = {
  id: "soteria",
  title: "Soteria / @Hotel Travel",
  company: "Soteria Travel Platform",
  category: "uiux",
  categoryLabel: "UI/UX Design",
  tags: ["UI/UX", "Design System", "Mobile First", "E-Commerce", "Figma"],
  description: "Interactive Travel Booking Interface & Social Travel Experience",
  longDescription: [
    "A product design study rethinking the hospitality booking experience for modern digital nomads and creator-led communities.",
    "Reduces traditional 7-step booking journeys down to an intuitive 3-tap checkout with integrated creator video reviews and map clustering.",
    "Includes an exhaustive Figma component system with 40+ responsive artboards, light/dark mode variations, and micro-interaction prototypes."
  ],
  features: [
    "3-Tap Booking Flow: Re-architected checkout sequence cutting friction and checkout drop-off rates.",
    "Creator-Driven Discovery: Hotel listings feature authentic vertical video reviews from verified travel creators.",
    "Interactive Spatial Map Clustering: Dynamic geographical view with live neighborhood price badges and amenity filters.",
    "Comprehensive 40+ Screen Design System: Atomic Figma library covering mobile iOS, Android, and responsive web states.",
    "Bilingual & Currency Selector: Frictionless currency conversions and localized language toggles."
  ],
  challenges: [
    "Condensing exhaustive hotel amenity lists, room varieties, and tax disclosures into a compact mobile card layout without clutter.",
    "Maintaining fast interactive map performance with hundreds of localized hotel pins."
  ],
  solutions: [
    "Designed expandable progressive disclosure cards highlighting key amenities with visual iconography.",
    "Established a clustered pin hierarchy grouping properties by neighborhood density with instant zoom-in transitions."
  ],
  techStack: [
    { name: "Figma", category: "Component Systems & Wireframing" },
    { name: "Protopie", category: "High-Fidelity Micro-Interactions" },
    { name: "Design Tokens", category: "Semantic Color & Typography Taxonomy" }
  ],
  metrics: [
    { label: "Checkout Steps", value: "Reduced from 7 to 3" },
    { label: "Usability Preference", value: "85% User Satisfaction" },
    { label: "Design Artboards", value: "40+ Responsive Screens" }
  ],
  image: "/work/soteria/img/Athotel.webp",
  periodLabel: "2022 — 2024",
  accentColor: "#06B6D4",
  topMilestones: [
    {
      id: "sot-2022-aug",
      year: "2022",
      month: "August",
      content: "User research analyzing booking drop-off rates on legacy OTA sites among digital nomad demographics."
    },
    {
      id: "sot-2023-feb",
      year: "2023",
      month: "February",
      content: "Social-first discovery experience conceptualized around influencer reels and curated photo geotags."
    },
    {
      id: "sot-2023-sep",
      year: "2023",
      month: "September",
      content: "Interactive prototype constructed in Figma spanning 40+ artboards with micro-interaction states."
    },
    {
      id: "sot-2024-may",
      year: "2024",
      month: "May",
      content: "Design system handoff finalized with responsive iOS and Web breakpoints, design tokens, and SVG icons."
    }
  ],
  bottomMilestones: [
    {
      id: "sot-2022-nov",
      year: "2022",
      month: "November",
      content: "Information architecture re-engineered from 7 disjointed check-out screens down to a 3-tap checkout flow."
    },
    {
      id: "sot-2023-may",
      year: "2023",
      month: "May",
      content: "Usability testing with 20 frequent travelers validating an 85% preference for card-based discovery."
    },
    {
      id: "sot-2024-jan",
      year: "2024",
      month: "January",
      content: "Interactive map exploration UI perfected with smooth clustering and dynamic neighborhood price badges."
    }
  ]
};

export default soteriaProject;
