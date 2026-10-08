import { Project } from "../types";

export const websitesProject: Project = {
  id: "websites",
  title: "Websites Collection",
  company: "Websites Showcase",
  category: "web",
  categoryLabel: "Web & SaaS",
  tags: ["Web Design", "Responsive UI", "HTML5 / CSS3", "Client Work", "SEO"],
  description: "Curated Brand Websites, Product Landing Pages & Web Solutions",
  longDescription: [
    "A showcase of bespoke client websites, high-converting product pages, and digital brand identities delivered across freelance and contract engagements.",
    "Each deliverable is engineered with precision: bespoke responsive CSS grids, SEO semantic hierarchies, fluid typography, and micro-interactions.",
    "Spanning SaaS marketing sites, luxury portfolio landing pages, and international retail checkouts."
  ],
  features: [
    "Bespoke Responsive Layouts: Crafted from mobile-first grids up to ultra-wide 4K desktop screens.",
    "Conversion-Driven Landing Pages: Structured visual storytelling guiding visitors to high-conversion call-to-actions.",
    "Zero-Bloat Micro-Animations: Native CSS keyframes and hardware-accelerated transitions.",
    "Semantic SEO & OpenGraph Optimization: Structured schema markup for instantaneous Google ranking and rich social previews.",
    "Cross-Browser Pixel Perfection: Validated across Chromium, Safari, Firefox, and mobile WebKit."
  ],
  challenges: [
    "Delivering unique visual identities for diverse business verticals while maintaining consistent core performance standards.",
    "Ensuring strict accessibility (WCAG 2.1 AA) without compromising dynamic animations."
  ],
  solutions: [
    "Created an extensible design token system standardizing color contrast, typographic scales, and focus states.",
    "Implemented automated Lighthouse CI tests checking accessibility and speed on every commit."
  ],
  techStack: [
    { name: "HTML5 & Modern CSS3", category: "Core Web Foundation" },
    { name: "JavaScript & TypeScript", category: "Interactive Logic" },
    { name: "Tailwind CSS & CSS Grid", category: "Layout & Design Tokens" },
    { name: "Vite & Netlify/Vercel", category: "Build Tools & Edge Hosting" }
  ],
  metrics: [
    { label: "Client Solutions Delivered", value: "15+ Websites" },
    { label: "Client Satisfaction", value: "100% 5-Star" },
    { label: "Average Lighthouse Score", value: "96+ Across All Sites" }
  ],
  image: "/img/websites-cover.webp",
  periodLabel: "2022 — 2025",
  accentColor: "#10B981",
  topMilestones: [
    {
      id: "web-2022-jun",
      year: "2022",
      month: "June",
      content: "Freelance web studio founded, targeting bespoke front-end development and conversion-focused landing pages."
    },
    {
      id: "web-2023-mar",
      year: "2023",
      month: "March",
      content: "Engineered modular design token system standardizing typography, fluid grids, and CSS variable styling."
    },
    {
      id: "web-2024-jan",
      year: "2024",
      month: "January",
      content: "Expanded client services into corporate multi-page platforms and SaaS dashboards with API connectivity."
    },
    {
      id: "web-2025-feb",
      year: "2025",
      month: "February",
      content: "Milestone reached: 15+ bespoke client solutions delivered with 100% 5-star client review ratings."
    }
  ],
  bottomMilestones: [
    {
      id: "web-2022-nov",
      year: "2022",
      month: "November",
      content: "Automated SEO schema markup and semantic HTML5 standards introduced to achieve instant ranking indexation."
    },
    {
      id: "web-2023-aug",
      year: "2023",
      month: "August",
      content: "GSAP and native CSS micro-interaction library integrated to bring editorial flair to brand showcases."
    },
    {
      id: "web-2024-jun",
      year: "2024",
      month: "June",
      content: "E-commerce and Stripe/Razorpay payment gateway flows deployed for international boutique clients."
    }
  ]
};

export default websitesProject;
