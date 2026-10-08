# InVision DSM Architecture — Enterprise Design Tokens & Governance

**Category:** UI/UX & Design Systems  
**Timeline:** 2022 — 2024  
**Scope:** Design Token Architecture, Cross-Platform Synchronizer, Component Specs  
**Role:** Lead Design System Architect  
**Tools:** Figma, Style Dictionary, Storybook, WCAG AA, Tokens Studio  

---

## 📌 Executive Summary
An enterprise design system architecture case study demonstrating how centralized design tokens and structured governance eliminate visual debt across cross-functional engineering teams while ensuring universal WCAG accessibility.

---

## 🎯 The Problem
As product teams scale, visual drift multiplies:
- 12 separate product repositories utilized 84 slightly mismatched hex shades of blue and gray.
- Button padding, focus indicators, and modal corner radii differed across web and mobile builds.
- Hand-off misinterpretations accounted for up to 30% of sprint QA bugs.

---

## 💡 The Solution
1. **Three-Tier Token Architecture:** Global Tokens (raw values) → Alias/Semantic Tokens (intent, e.g. `surface.interactive.hover`) → Component Tokens (`button.primary.background`).
2. **Automated Cross-Platform Translation:** Style Dictionary translates Figma tokens directly into CSS variables, Tailwind classes, and Flutter Dart constants.
3. **Automated Accessibility Testing:** Perceptual contrast verification (WCAG 2.1 AA) baked into token export pipelines.
4. **Interactive Component Catalog:** Living Storybook documentation with copy-paste code snippets for React and Flutter developers.

---

## 🚀 Key Outcomes
- 84 scattered color hexes pruned down to 16 semantic color tokens.
- +45% reduction in frontend design QA turnaround time.
- 100% WCAG 2.1 AA compliant color pairings.

---

## 📸 Media & Assets
- Cover Art: `/work/invision/img/DSM.webp`
- Gallery Specs: Located in `/work/invision/img/`
