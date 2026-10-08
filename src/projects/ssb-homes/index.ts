import { Project } from "../types";

export const ssbHomesProject: Project = {
  id: "ssb-homes",
  title: "Sai Shree Balajee Homes",
  company: "SSB Homes Real Estate",
  category: "web",
  categoryLabel: "Web & SaaS",
  tags: ["Web Dev", "JavaScript", "Admin Portal", "Real Estate", "Tailwind CSS"],
  description: "Modern Real Estate Platform with Custom Admin Management",
  longDescription: [
    "A bespoke real estate web application built to showcase residential properties with architectural elegance, accompanied by an administrative content management system.",
    "The platform balances high-resolution architectural 4K renders with blazing fast load times through an automated asset optimization pipeline.",
    "Features interactive floor plans, neighborhood mapping, dynamic WhatsApp broker inquiries, and a protected administrative dashboard."
  ],
  features: [
    "Architectural Gallery & Interactive Floor Plans: High-resolution zoomable floor layouts and unit configurations.",
    "Bespoke Administrative CMS: Enables sales agents to update pricing, availability status, and brochures without technical overhead.",
    "Instant WhatsApp Lead Routing: One-tap unit inquiry button directly connects interested buyers with assigned sales representatives.",
    "Neighborhood Spatial Mapping: Highlights nearby schools, hospitals, transit hubs, and commercial complexes.",
    "Lighthouse-Optimized Asset Pipeline: Next-gen image formats deliver 4K architectural visual fidelity with sub-second page loads."
  ],
  challenges: [
    "Displaying heavy multi-megabyte 3D architectural renders without degrading mobile page load speed.",
    "Creating an intuitive content update portal usable by non-technical property sales managers."
  ],
  solutions: [
    "Engineered an automated responsive WebP/AVIF generation pipeline with lazy loading and blur placeholders.",
    "Developed a clean, form-based administrative interface with real-time preview and instant static regeneration."
  ],
  techStack: [
    { name: "JavaScript / React", category: "Frontend Engine" },
    { name: "Tailwind CSS", category: "Modern Styling System" },
    { name: "Netlify", category: "Hosting & Serverless Functions" },
    { name: "Figma", category: "UI/UX & Architectural Layouts" }
  ],
  metrics: [
    { label: "Google Lighthouse", value: "98/100 Performance" },
    { label: "Lead Response Time", value: "<60s via WhatsApp" },
    { label: "Asset Compression", value: "70% Bandwidth Saved" }
  ],
  image: "/work/ssb-homes/img/ssbhomes-cover.webp",
  liveUrl: "https://ssbhomes.netlify.app/",
  periodLabel: "2023 — 2024",
  accentColor: "#D97706",
  topMilestones: [
    {
      id: "ssb-2023-aug",
      year: "2023",
      month: "August",
      content: "Client engagement & requirements gathering for luxury residential development catalog."
    },
    {
      id: "ssb-2023-nov",
      year: "2023",
      month: "November",
      content: "Architectural gallery layout and floorplan interactive modal system designed in Figma."
    },
    {
      id: "ssb-2024-mar",
      year: "2024",
      month: "March",
      content: "Frontend application built featuring seamless filtering by property type, size, and location."
    },
    {
      id: "ssb-2024-jul",
      year: "2024",
      month: "July",
      content: "Custom admin dashboard delivered, enabling property agents to update prices and unit availability."
    }
  ],
  bottomMilestones: [
    {
      id: "ssb-2023-oct",
      year: "2023",
      month: "October",
      content: "Asset compression pipeline engineered delivering crisp high-res 4K renders with zero lag."
    },
    {
      id: "ssb-2024-jan",
      year: "2024",
      month: "January",
      content: "Automated enquiry pipeline integrated sending leads straight to sales reps via WhatsApp and email."
    },
    {
      id: "ssb-2024-may",
      year: "2024",
      month: "May",
      content: "Netlify production launch certified with a 98+ Google Lighthouse performance rating."
    }
  ]
};

export default ssbHomesProject;
