# ⚙️ Phase 7 Plan: System Taxonomy, Revenue Rules & Security Audit Logs

> **File**: `docs/plan/admin-interface/07-taxonomy-security-audit.md`  
> **Target Route**: `/admin/settings`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/admin-interface/00-overview.md)  
> **Status**: SPECIFIED & PLANNED  

---

## 1. Objectives & Scope

1. **Curriculum Taxonomy & Categories (`CategoryManager`)**:
   - Manage the technology disciplines available for teachers when authoring curricula (Full-Stack Web, Cloud & DevOps, Mobile Development, AI & Data, Cybersecurity).
   - Card grid displaying category name, pedagogical description, icon, and active course count.
   - "Add Category" modal/inline form to dynamically introduce new technology tracks.

2. **Platform Revenue Rules (`PlatformSplitForm`)**:
   - Governance policy defining the instructor royalty split (default 85% creator net).
   - Platform infrastructure take-rate (default 15% covering hosting, streaming, and Telebirr/CBE processing).
   - Minimum withdrawal threshold configuration (default `ETB 500`).
   - "Update Governance Policy" action with visual confirmation.

3. **Cryptographic Security Audit Ledger (`SecurityAuditTable`)**:
   - Immutable chronological audit table logging every administrative action:
     - Timestamp
     - Actor name & role (`Dr. Alazar Tadesse`, Super Administrator)
     - Action type (`accreditation_approved`, `payout_settled`, `course_published`, `user_suspended`)
     - Target entity and ID
     - Action summary narrative

---

## 2. Layout Wireframes

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ‹ Back to Dashboard   •   System Governance                                 │
│ System Taxonomy, Revenue Rules & Audit Logs    [ Security Control Active ]  │
│ Configure curriculum categories, royalty splits, and inspect audit records  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🏷️ CURRICULUM TAXONOMY & DISCIPLINES                     [ + Add Category ] │
│ ┌──────────────────────┬──────────────────────┬───────────────────────────┐ │
│ │ Full-Stack Web (14)  │ Cloud & DevOps (11)  │ Mobile Development (8)    │ │
│ │ TypeScript, Next.js  │ AWS, Docker, K8s     │ Flutter, Telebirr Mini-App│ │
│ └──────────────────────┴──────────────────────┴───────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 💰 PLATFORM REVENUE SPLIT & PAYOUT RULES                                    │
│ Instructor Royalty: [ 85 ]%  •  Platform Take: [ 15 ]%  •  Min ETB: [ 500 ] │
│                                             [ 💾 Update Governance Policy ] │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🛡️ IMMUTABLE PLATFORM SECURITY & AUDIT LEDGER                               │
│ Timestamp     Auditor Actor   Event Classification   Target      Summary    │
│ ─────────────────────────────────────────────────────────────────────────── │
│ 2026-10-09    Dr. Alazar      accreditation_approved App #104    Approved Dr│
│ 2026-10-08    Dr. Alazar      payout_settled         Pay #4      ETB 18,400 │
│ 2026-10-05    Dr. Alazar      accreditation_action   App #103    Flagged JU │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Deliverables

```text
asquala-online-school/
├── components/admin/settings/
│   ├── category-manager.tsx                  # Category grid & new category creator
│   ├── platform-split-form.tsx               # 85/15 split policy configuration form
│   └── security-audit-table.tsx              # Detailed cryptographic audit ledger
└── app/admin/settings/
    └── page.tsx                              # System governance root
```

---

## 4. Verification Checklist

- [ ] "Add Category" creates a new category card with live badge count.
- [ ] Adjusting instructor royalty automatically recalculates platform take-rate (sums to 100%).
- [ ] Submitting policy changes triggers green confirmation toast.
- [ ] Audit ledger displays formatted chronological records.
