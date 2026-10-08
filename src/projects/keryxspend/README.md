# KeryxSpend — Application Case Study & Technical Documentation

> **Live Demo:** [https://keryxspend.vercel.app](https://keryxspend.vercel.app)  
> **Platforms:** Android, iOS, and Web  
> **Stack:** Flutter 3.27+, Dart, Firebase Auth, Cloud Firestore, `fl_chart`, `home_widget`, `url_launcher`  
> **Naming Note:** Also referenced as *SpendTrack* in Figma and `expense_tracker` in Dart package naming.

---

## 📌 Executive Summary
**KeryxSpend** is a personal finance application built with Flutter and Firebase (Authentication + Cloud Firestore) for tracking expenses, debts and credits, subscriptions, and budgets in one place, with Google sign-in and real-time cloud synchronization.

It answers four everyday money questions:
1. **Where is my money going?** — Expenses feed, Stats tab with 6-month trends, category donut charts, and payment method totals.
2. **Who owes me, and who do I owe?** — Debts tab with per-person ledgers, partial repayments, waterfall settlement, and UPI "Pay Now" deep-linking.
3. **What am I subscribed to, and when does it renew?** — Subscriptions tab with renewal countdowns, reminders, and "Did it get deducted?" auto-logging prompts.
4. **Am I overspending?** — Budgets with live month-to-date tracking, 80% amber threshold, and 100%+ overspend alerts.

---

## 🚀 Feature Guide

### 1. Authentication
* **Google Sign-In:** Uses Firebase Auth (`signInWithPopup` on web; `google_sign_in` token exchange on Android and iOS).
* **AuthGate:** Listens to `authStateChanges()` stream to automatically switch between Login and the main app shell.

### 2. Expenses & Bill Splitting
* **Live Expenses Feed:** Real-time stream with running totals, newest first.
* **Quick-Add Modal:** Bottom sheet with amount quick-add chips (`+₹100`, `+₹500`, `+₹1,000`), categories, and payment methods.
* **Split a Bill:** Enter total paid, select participants (autocompleted from Debts), and split equally or custom. The full amount is logged as an expense; each participant's share automatically becomes a "they owe you" entry in the Debts ledger.

### 3. Debts with Waterfall Settlement
* **Per-Person Ledger:** Two directions: *They owe me* (lent) and *I owe them* (borrowed). Grouped by normalized name (Rahul, rahul, "Rahul " resolve to one identity).
* **Waterfall Settlement Algorithm:** A payment automatically settles the person's oldest pending entries first, then spills over into the next.
* **Repayment-to-Expense Pipeline:** When you pay back borrowed money, atomic Firestore `WriteBatch` automatically logs that repayment as an expense in the **Debt Cleared** category. Incoming repayments do not generate expenses.
* **UPI "Pay Now" Flow:** Deep links directly into Indian UPI apps (Google Pay, PhonePe, Paytm) with pre-filled amounts and remembered UPI IDs.

### 4. Subscriptions & Smart Prompts
* **Tracking & Normalization:** Monthly, quarterly, half-yearly, annual, or custom cycles normalized to an estimated monthly total.
* **Auto-Rolling Renewal Dates:** Single anchor date steps forward whole cycles automatically.
* **"Did it get deducted?" Prompt:** Fires the day after renewal passes. Tapping "Yes" auto-logs an expense on the renewal date with pre-selected category and payment method.

### 5. Budgets & Stats
* **Live Category Envelopes:** Overall or per-category monthly limits with color-coded states (normal under 80%, amber at 80%, red at 100%+).
* **Visual Analytics:** Interactive FL Chart line graphs showing 6-month spending trends, plus donut charts ranked with progress bars.

### 6. Home & Lock-Screen Widgets
* Native Android Kotlin `AppWidgetProvider` and iOS `WidgetKit` extensions (via `home_widget`) displaying today's total spend and opening directly into the Quick Add sheet with one tap.

---

## ⚙️ Architecture & Key Patterns

```text
Screens / Widgets  ──►  Repositories  ──►  Cloud Firestore
      ▲                                         │
      └───────── Firestore Streams (StreamBuilder) ◄───┘
```

1. **Zero State-Management Boilerplate:** Clean layered architecture with native `StreamBuilder` widgets updating whenever cloud documents change.
2. **Single-Collection Override Pattern:** Default categories and payment methods live in client code; Firestore documents only exist when custom items or overrides are created.
3. **Atomic WriteBatches:** Multi-document mutations (like debt settlements generating linked expense records) commit atomically to prevent ledger desync.
4. **Tree-Shake-Safe Icon Lookup:** Custom category icons resolve via a static code-point lookup table (`resolveCategoryIcon`), preventing Flutter release builds from stripping icons.

---

## 🛠️ Tech Stack & Dependencies
* **Framework:** Flutter 3.27+, Dart
* **Backend:** Cloud Firestore, Firebase Authentication
* **Data Visualization:** `fl_chart`
* **Notifications:** `flutter_local_notifications`, `timezone`
* **Widgets & Deep Links:** `home_widget`, `url_launcher` (UPI protocols)
* **Design System:** iOS-inspired blue and white palette (`#007AFF` brand, `#1C1C1E` ink, San Francisco typography)

---

## 🌐 Live Access
Test the live production web build:  
👉 **[keryxspend.vercel.app](https://keryxspend.vercel.app)**
