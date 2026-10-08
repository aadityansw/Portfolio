# Server Automation & Python Suite — Telemetry, Backups & PBX Engine

**Category:** Systems & Python  
**Timeline:** 2022 — 2025  
**OS Environment:** Ubuntu Linux LTS  
**Role:** DevOps & Systems Engineer  
**Stack:** Python 3, Bash, Systemd, Linux Cron, Asterisk / FreePBX, SSH Hardening  

---

## 📌 Executive Summary
An enterprise infrastructure automation toolkit designed to ensure 99.9% uptime, hands-off nightly backups, automated security hardening, and programmatic VoIP PBX routing on Linux servers.

---

## 🎯 The Problem
Unmanaged cloud servers frequently succumb to:
1. Disk overflow caused by unrotated logs and unpurged temporary directories.
2. Silent database corruption discovered only when a server needs to be restored.
3. Brute-force botnet SSH authentication floods consuming CPU cycles.
4. Voice PBX routing dead-ends causing dropped customer support calls.

---

## 💡 The Solution
A collection of self-healing scripts and daemons:
- **Nightly Backup Daemon:** Takes incremental database snapshots, verifies SHA-256 hashes, encrypts payloads, and syncs offsite with retention lifecycle rules.
- **Service Watchdog:** Audits system resources every 60 seconds; auto-restarts misbehaving daemons and triggers alert webhooks.
- **Telephony Routing Logic:** Python scripts monitoring Asterisk call queues, recording metrics, and ensuring automated failover routing.
- **Firewall Guardian:** Dynamically adds malicious IP addresses to iptables / ufw drop tables upon repeated failed authentication attempts.

---

## 🚀 Key Features
- [x] Incremental encrypted off-site cloud backups
- [x] Self-healing systemd service watchdogs
- [x] Automated database integrity validation drills
- [x] PBX VoIP queue health metrics and failover routing
- [x] Automated security audit and firewall hardening

---

## 📸 Media & Assets
- Cover Art: `/img/server-automation.jpg`
