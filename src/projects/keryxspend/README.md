# KeryxSpend — Intelligent Personal Budget Tracker & Expense Manager

**Category:** Flutter & Fintech  
**Timeline:** 2024 — 2025  
**Platforms:** Android, iOS  
**Role:** Lead Mobile Engineer & Fintech UI Designer  
**Stack:** Flutter, Dart, Hive DB, SQLite, FL Chart, Figma  

---

## 📌 Executive Summary
**KeryxSpend** is an intelligent personal budget tracker and expense manager engineered in Flutter. It empowers individuals to gain complete mastery over their personal finances through multi-category budget envelopes, sub-second expense logging, predictive overspend alerts, and visual analytics—all safeguarded by an offline-first encrypted vault.

---

## 🎯 The Problem
Most personal finance applications suffer from three critical flaws:
1. **Ad Bloat & Invasive Bank Sync:** Forcing users to link active banking credentials or endure financial product advertisements.
2. **High Friction Entry:** Complicated multi-step transaction forms that cause people to abandon expense logging after a few days.
3. **Reactive Rather Than Proactive:** Showing where money was spent only *after* the budget has already been exceeded.

---

## 💡 The Solution
KeryxSpend re-engineers personal financial tracking around simplicity, speed, and privacy:
1. **Rapid 3-Tap Transaction Logging:** Log any purchase in under 3 seconds with auto-suggested merchant names and smart category tags.
2. **Visual Category Envelopes:** Real-time progress rings indicating exact remaining balances across Dining, Groceries, Shopping, and Utilities.
3. **Predictive Burn-Rate Alerts:** Machine learning heuristics calculate your daily burn rate and alert you days in advance if you're on track to exhaust category budgets.
4. **100% Offline Encrypted Privacy:** Financial transactions never leave your device without explicit encrypted export.

---

## 🚀 Key Features
- [x] Multi-Category Budget Allocation & Remaining Balances
- [x] Rapid Expense Quick-Add with Timestamp History
- [x] Recurring Subscription & Bill Payment Tracker
- [x] Interactive 30-Day Spending Trend Sparklines
- [x] Multi-Currency Support with Offline Exchange Rates
- [x] Savings Goal Target Rings & Milestones

---

## ⚙️ Architecture & Technical Highlights
- **Fixed-Point Arithmetic:** Completely avoids floating-point roundoff errors by processing all ledger calculations in integer cents.
- **Offline-First Hive Storage:** Instantaneous read/write speeds (<5ms query times) with on-disk AES-256 encryption.
- **Hardware-Accelerated Charts:** Custom-tuned FL Chart graphs rendering fluidly at 60 FPS without UI jank.

---

## 📸 Media & Assets
- Cover Art: `/img/keryxspend.jpg`
