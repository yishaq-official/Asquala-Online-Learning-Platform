# 📊 Phase 2 Plan: Executive Dashboard & Platform KPIs

> **File**: `docs/plan/admin-interface/02-executive-dashboard.md`  
> **Target Route**: `/admin/dashboard`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/admin-interface/00-overview.md)  
> **Status**: SPECIFIED & PLANNED  

---

## 1. Objectives & Scope

1. **Executive KPI Overview (`AdminKpiGrid`)**:
   - **Gross Marketplace Volume (GMV)**: `ETB 2,480,000` (+24.5% month-over-month growth).
   - **Platform Infrastructure Take-Rate (15%)**: `ETB 372,000` (Asquala operational revenue share).
   - **Active Enrolled Students**: `8,940 Learners` across Ethiopian universities (AAiT, AASTU, Jimma, Bahir Dar).
   - **Accredited Educators**: `48 Verified Teachers` (with verified degrees, work experience, and certifications).
   - Real-time indicator of pending items requiring board attention.

2. **Unified Audit Feed (`PendingApprovalsFeed`)**:
   - Tabbed view combining the two critical academic quality gates:
     - **Teacher Accreditation Queue**: Pending applicant dossiers awaiting credential validation (applicant headline, university degrees, years in software engineering, and auditor notes).
     - **Course Publishing Queue**: Courses submitted by teachers awaiting publication (title, instructor, module count, lesson hours, milestone quizzes, and ETB tuition).
   - Direct shortcut buttons to inspect candidate dossiers (`/admin/accreditation/[id]`) or audit course curricula (`/admin/courses/[id]`).

3. **Treasury Clearance Summary (`TreasuryQuickCard`)**:
   - Total pending withdrawal volume: `ETB 68,400` across 3 active requests.
   - Payout gateway breakdown:
     - **Telebirr Mobile Wallets**: `ETB 33,400` (2 pending instant transfers)
     - **Commercial Bank of Ethiopia (CBE)**: `ETB 35,000` (1 pending branch wire)
   - One-click CTA to open the settlement desk (`/admin/payouts`).

4. **Live Governance Activity Log (`PlatformAuditLog`)**:
   - Chronological audit stream recording board approvals, resubmission flags, course publications, and payout disbursements.

---

## 2. Layout Wireframes

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ 🟢 Academic Review Board Active                                                         │
│ Welcome, Dr. Alazar Tadesse                                                             │
│ Super Administrator & Academic Quality Control Mode                                     │
│                                            [ Audit Teachers ] [ Audit Courses ] [ Treasury ] │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────┬───────────────────┬───────────────────┬─────────────────────────┐ │
│ │ GROSS GMV         │ ASQUALA TAKE (15%)│ ACTIVE LEARNERS   │ ACCREDITED TEACHERS     │ │
│ │ ETB 2,480,000     │ ETB 372,000       │ 8,940             │ 48 Verified             │ │
│ │ +24.5% vs last mo │ +18.2% expansion  │ 4 Ethiopian Unis  │ 4 dossiers pending      │ │
│ └───────────────────┴───────────────────┴───────────────────┴─────────────────────────┘ │
├───────────────────────────────────────────────────┬─────────────────────────────────────┤
│ 📋 ACADEMIC BOARD AUDIT QUEUES                    │ 💰 TREASURY & PAYOUTS QUEUE         │
│ [ Teacher Applications (3) ] [ Course Reviews (2)]│ ETB 68,400 Pending Clearance        │
│ ───────────────────────────────────────────────── │ • Telebirr: ETB 33,400 (2 pending)  │
│ • Yishaq Abreham — Senior Cloud Architect         │ • CBE Bank: ETB 35,000 (1 pending)  │
│   AAiT (M.Sc.) • 7 yrs at Ethio FinTech           │ [ 🚀 Settle Payouts ➔ ]             │
│   [ Inspect Dossier ➔ ]                           ├─────────────────────────────────────┤
│ • Bethlehem Haile — Senior DevOps Engineer        │ 🛡️ SECURITY & AUDIT LEDGER          │
│   AASTU (B.Sc.) • 6 yrs at Ethio Telecom          │ • Oct 09: Approved Dr. Meron Ph.D.  │
│   [ Inspect Dossier ➔ ]                           │ • Oct 08: Settled ETB 18,400 CBE    │
│ • Natnael Dagne — Mobile Engineer                 │ • Oct 05: Flagged blurry scan       │
│   ⚠️ Action Required: Blurry JU transcript scan   │ [ View Full Ledger ➔ ]              │
│   [ Inspect Dossier ➔ ]                           │                                     │
└───────────────────────────────────────────────────┴─────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Deliverables

```text
asquala-online-school/
├── components/admin/dashboard/
│   ├── admin-kpi-grid.tsx                    # 4 primary metric cards (GMV, Take-rate, Students, Teachers)
│   ├── pending-approvals-feed.tsx            # Tabbed audit queues for teachers and course submissions
│   ├── treasury-quick-card.tsx               # Payout balances for Telebirr & CBE
│   └── platform-audit-log.tsx                # Real-time stream of board decisions
└── app/admin/dashboard/
    └── page.tsx                              # Executive dashboard root
```

---

## 4. Verification Checklist

- [ ] KPI cards render correct ETB values and formatted student counts.
- [ ] Switching tabs between "Teacher Applications" and "Course Reviews" toggles the audit list cleanly.
- [ ] Clicking "Inspect Dossier" navigates to `/admin/accreditation/[id]`.
- [ ] Clicking "Audit Curriculum" navigates to `/admin/courses/[id]`.
- [ ] Clicking "Open Payout Settlement Desk" navigates to `/admin/payouts`.
- [ ] Live audit feed displays formatted timestamps and auditor roles.
