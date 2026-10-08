# 🔎 Teacher Studio — Application Review & Status Tracker Plan

> **File**: `docs/plan/instructor-interface/02-application-status-review.md`  
> **Target Route**: `/instructor/application-status`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

After submitting their credentials and documents, prospective educators need complete transparency into where their application stands. The **Application Status & Review Tracker** provides:

1. **Review Stage Timeline**:
   - Stage 1: **Application Submitted** — Initial dossier recorded.
   - Stage 2: **Academic Credential Verification** — Degrees, transcripts, and institution validity audit.
   - Stage 3: **Experience & Industry Accreditation Audit** — Verification of years in industry and certificates.
   - Stage 4: **Academic Board Decision** — Final approval, request for clarification, or decline.
2. **Document Audit Checklist**:
   - Summarizes every document submitted (Degree Transcript, Professional Certificate, CV/Portfolio).
   - Shows individual document verification badges (`Verified`, `Under Audit`, `Re-upload Requested`).
3. **State Variations**:
   - **`under_review` (Pending)**: Calming progress indicators, expected review turnaround (24–48 business hours), and options to edit contact information.
   - **`approved`**: Emerald celebration banner, verified instructor credentials badge, and primary CTA: **"Enter Instructor Studio ➔"** (links to `/instructor/dashboard`).
   - **`action_required`**: Clear feedback note from the academic review board (e.g., *"Please provide a clear scan of your official Bachelor degree transcript"*), plus an inline document re-upload modal.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎓 Instructor Application Status                                           │
│ Application ID: ASQ-APP-2026-9812  •  Submitted: Oct 8, 2026               │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ⏳ APPLICATION UNDER ACADEMIC REVIEW                                     │ │
│ │ Estimated completion: Within 24–48 hours                                │ │
│ │                                                                         │ │
│ │  [✓] Application Submitted ➔ [⏳] Document Audit ➔ [ ] Board Approval    │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📋 SUBMITTED EVIDENCE DOSSIER                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ • Degree Certificate:   B.Sc. in Computer Science (AAU) [📎 View PDF]    │ │
│ │ • Industry Role:        Senior Software Engineer (5 yrs) [✓ Verified]    │ │
│ │ • Certification:        AWS Certified Solutions Architect [📎 View PDF]  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [ Need Help? Contact Academic Support ]         [ Preview Studio Demo ➔ ]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── application-status/
│           ├── page.tsx                        # Live Review Tracker Page
│           └── loading.tsx                     # Status Skeleton Loader
├── components/
│   └── instructor/
│       └── status/
│           ├── review-timeline-stepper.tsx     # 4-stage audit timeline
│           ├── submitted-dossier-card.tsx      # Evidence documents breakdown
│           ├── action-required-banner.tsx      # Re-upload instructions & notes
│           ├── document-resubmit-modal.tsx     # Re-upload document modal
│           └── approval-celebration-card.tsx   # Verified celebration & studio CTA
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `ReviewTimelineStepper` with distinct visual states for completed, active, and upcoming stages.
- [ ] **Step 2**: Implement `SubmittedDossierCard` displaying education, experience, and certificates with mock document preview action.
- [ ] **Step 3**: Implement `ActionRequiredBanner` and `DocumentResubmitModal` for requesting and providing updated evidence files.
- [ ] **Step 4**: Implement `ApprovalCelebrationCard` with direct link to `/instructor/dashboard`.
- [ ] **Step 5**: Build `/instructor/application-status/page.tsx` supporting status switching (mock toggle for demonstration).
- [ ] **Step 6**: Validate TypeScript compliance with `tsc --noEmit`.
