# Apna Agenda — Meeting Scheduler & Time Management Suite

**Category:** Flutter Apps / Productivity  
**Timeline:** 2023 — 2025  
**Role:** Lead Mobile Architect & UI/UX Designer  
**Platforms:** Android, iOS  
**Stack:** Flutter, Dart, Firebase, Hive NoSQL, Figma  

---

## 📌 Executive Summary
**Apna Agenda** is a cross-platform meeting management and schedule aggregation application built with Flutter. It solves the cognitive fatigue caused by juggling disparate video conferencing platforms (Google Meet, Zoom, Microsoft Teams) and offline calendars by providing one unified, offline-first hub.

---

## 🎯 The Problem
Modern students and remote professionals participate in daily video calls spread across multiple ecosystems:
- Team standups on Google Meet
- Lectures and client workshops on Zoom
- Corporate syncs on Microsoft Teams
- Physical in-person classes and personal appointments

Switching across calendar tabs, hunting for invite URLs in emails, and missing links moments before meetings lead to significant stress and context-switching overhead.

---

## 💡 The Solution
Apna Agenda bridges offline schedules with cloud video platforms into a unified timeline:
1. **Universal Meeting Sync:** Automatically aggregates meetings into a clean, unified chronological timeline.
2. **One-Tap Native Launch:** Deep-links directly into installed apps (Meet, Zoom, Teams) without opening browser redirect wrappers.
3. **Offline-First Resilience:** Powered by Hive NoSQL database, ensuring access even without active network connectivity.
4. **Smart Conflict Prevention:** Detects overlapping commitments and warns users in advance.

---

## ⚙️ Architecture & Technical Highlights
- **Clean Architecture:** Strict separation between Presentation (Flutter Widgets), Domain (Business Logic & Use Cases), and Data (Hive & Firebase repositories).
- **State Management:** Reactive provider/bloc state management ensuring deterministic updates across tab navigations.
- **Performance:** Achieved consistent 60 FPS scrolling through widget subtree isolation and custom virtualized slivers.

---

## 🚀 Key Features
- [x] Unified Agenda View (Day, Week, Month)
- [x] Quick-Add with Smart Link Parsing
- [x] Conflict Detector & Color-Coded Priority Tags
- [x] Push Notifications with Pre-Meeting Agendas
- [x] Cloud Sync & Multi-Device Backup

---

## 📸 Media & Assets
- Cover Art: `/img/apna-agenda.webp`
- Screenshots: Available in the `img/` subfolder.
