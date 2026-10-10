# 🎓 Phase 3 Plan: Teacher Accreditation & Evidence Review Desk

> **File**: `docs/plan/admin-interface/03-teacher-accreditation-desk.md`  
> **Target Routes**: `/admin/accreditation`, `/admin/accreditation/[id]`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/admin-interface/00-overview.md)  
> **Status**: SPECIFIED & PLANNED  

---

## 1. Objectives & Scope

1. **Teacher Evidence Accreditation Queue (`/admin/accreditation`)**:
   - Filter tabs: *All Dossiers*, *Under Board Review* (amber indicator), *Action Required* (resubmission flagged), *Accredited Teachers* (verified badge), *Rejected*.
   - Live search filtering by applicant name, university (AAiT, AASTU, AAU, JU), or primary teaching subject.
   - Candidate summary cards displaying university qualifications, production engineering tenure, and active review notes.

2. **Candidate Dossier Evidence Explorer (`/admin/accreditation/[id]`)**:
   - **Tab 1: University Degrees & Transcripts**:
     - Institution (e.g. AAiT, AASTU), degree level (B.Sc., M.Sc., Ph.D.), field of study, graduation year.
     - Document scan attachment card with "Inspect Scan" trigger opening a high-resolution simulation modal.
   - **Tab 2: Production Engineering & Teaching Experience**:
     - Current role, organization (e.g. Ethio Telecom, Ethio FinTech, Chapa), years of production experience.
     - Teaching experience details and academic references.
   - **Tab 3: Technical Certifications & Audition Lecture**:
     - Vendor credentials (AWS Solutions Architect, CKA, TensorFlow) with credential IDs.
     - Sample lecture recording URL with test link.
   - **Tab 4: Professional Identity**:
     - Full legal name, official email, phone (`+251 ...`), LinkedIn, GitHub, and portfolio links.

3. **Academic Board Ruling Modal (`AuditActionModal`)**:
   - **Approve as Verified Educator**: Sets status to `approved`, awards "Verified Asquala Educator" license badge, and unlocks the Creator Studio.
   - **Request Document Resubmission (Action Required)**: Flags illegible scans or missing evidence, sets status to `action_required`, and transmits instructions to the candidate.
   - **Reject Application**: Sets status to `rejected` with institutional justification.

---

## 2. Layout Wireframes

### Candidate Dossier Explorer (`/admin/accreditation/[id]`)
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ‹ Back to Accreditation Queue   •   Dossier #app-101                        │
│ Yishaq Abreham                              [ Under Board Review ]          │
│ Senior Cloud & Full-Stack Systems Architect • Specialty: Next.js & Cloud    │
│                                                 [ 🛡️ Record Board Ruling ] │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚠️ Active Board Note: Degree & transcript verified against AAiT         │ │
│ │ registry. Engineering experience validated at Ethio FinTech.            │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [ 1. University Degrees (1) ] [ 2. Experience (1) ] [ 3. Certs (2) ] [ ID ] │
│ ─────────────────────────────────────────────────────────────────────────── │
│ M.Sc. in Software Engineering & Distributed Systems                         │
│ Addis Ababa Institute of Technology (AAiT) • Class of 2020                  │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 📄 aait_msc_diploma_verified.pdf                                        │ │
│ │ Official Certified PDF Transcript (AAiT Registrar Registry)             │ │
│ │                                                  [ 👁️ Inspect Scan ]    │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Board Ruling Modal
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ Academic Board Audit Decision                                        [X] │
│ Evaluating candidate: Yishaq Abreham                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ Select Official Ruling:                                                     │
│                                                                             │
│ (o) 🟢 Approve & Grant "Verified Educator" Accreditation                    │
│     Unlocks full Creator Studio & course publishing monetization.           │
│                                                                             │
│ ( ) 🔴 Request Document Resubmission (Action Required)                      │
│     Flags illegible scans or missing evidence for candidate correction.     │
│                                                                             │
│ ( ) ⚫ Reject Application                                                   │
│     Candidate does not meet the degree or experience prerequisites.         │
│                                                                             │
│ Official Auditor Findings & Feedback Note:                                  │
│ [ Accreditation criteria verified. Awarded Verified Educator badge.       ] │
│                                                                             │
│                                    [ Cancel ]  [ 🚀 Confirm Ruling ➔ ]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Deliverables

```text
asquala-online-school/
├── components/admin/accreditation/
│   ├── accreditation-filters.tsx             # Status tabs & real-time search input
│   ├── applicant-card.tsx                    # Candidate card with qualification previews
│   ├── dossier-viewer.tsx                    # 4-tab evidence explorer with document scan modal
│   └── audit-action-modal.tsx                # Ruling modal (Approve / Action Required / Reject)
└── app/admin/accreditation/
    ├── page.tsx                              # Application queue page
    └── [id]/page.tsx                         # Single candidate inspection page
```

---

## 4. Verification Checklist

- [ ] Search input filters candidate cards by name, university, or subject specialty.
- [ ] Switching between tabs in `DossierViewer` displays degree scans, experience, certs, and identity cleanly.
- [ ] Clicking "Inspect Scan" opens document modal with legible seal verification badge.
- [ ] Recording an "Approved" ruling updates candidate status badge to `Accredited Educator` immediately.
- [ ] Recording an "Action Required" ruling updates status badge to `Action Required` with the feedback note.
