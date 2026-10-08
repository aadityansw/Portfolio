# Apna Backup Mobile — Live Server Monitoring & Telemetry Daemon

**Category:** Flutter & Systems Engineering  
**Timeline:** 2023 — 2025  
**Role:** Systems Engineer & Mobile Developer  
**Target Infrastructure:** Ubuntu Linux Servers  
**Stack:** Flutter, Dart, Python, WebSockets, mTLS, Linux Daemon  

---

## 📌 Executive Summary
**Apna Backup Mobile** enables DevOps engineers and system administrators to monitor real-time server health metrics, track disk capacity trends, and trigger emergency failover routines directly from iOS and Android devices.

---

## 🎯 The Problem
Production servers experience memory leaks, process crashes, and sudden disk exhaustion during off-peak hours (nights and weekends). Operators without laptop access frequently lose critical minutes before being able to connect and run diagnostics, risking extended downtime and data loss.

---

## 💡 The Solution
A low-overhead, daemon-driven telemetry architecture:
1. **Lightweight Python/Go Server Daemon:** Runs natively on Ubuntu servers with minimal CPU impact (<0.5%).
2. **Sub-Second WebSockets:** Streams real-time metrics (CPU usage, memory allocation, load average, disk headroom) over encrypted channels.
3. **Mutual TLS (mTLS):** Prevents man-in-the-middle attacks and guarantees only authenticated devices can view telemetry or trigger failover routines.
4. **Mobile Fast-Action Triggers:** One-tap authenticated service restart or failover redirection.

---

## 🚀 Key Features
- [x] Sub-second telemetry gauges and sparkline graphs
- [x] Multi-node fleet monitoring dashboard
- [x] Disk threshold alarms and proactive push alerts
- [x] Authenticated emergency service restart commands
- [x] End-to-end mTLS device authentication

---

## 📸 Media & Assets
- Cover Art: `/img/apna-backup.webp`
- Screenshots: Available in the `img/` subfolder.
