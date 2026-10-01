# 🏆 Student Portal — Certificates & Credentials Hub Plan

> **File**: `docs/plan/student-interface/09-certificates-hub.md`  
> **Target Route**: `/student/certificates` via `app/student/certificates/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Certificates & Credentials Hub** showcases verified achievements earned by the student upon completing course curriculums.
Key goals:
1. **Verified Credentials**: Each certificate features a unique verification code (e.g., `ASQ-2026-NXT-8291`) and issuance date.
2. **Interactive Preview**: Full-screen printable certificate modal with elegant styling, signature, and verification seal.
3. **Sharing & Exporting**: 1-click sharing to LinkedIn, link copying, and PDF download triggers.
4. **Next Milestone Motivation**: Displays in-progress courses that are near completion to encourage finishing.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🏆 My Certificates & Credentials                                            │
│ View, download, and share your verified certificates of completion          │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────┐ ┌───────────────────────────────┐ │
│ │ 📜 CERTIFICATE OF COMPLETION          │ │ 📜 CERTIFICATE OF COMPLETION  │ │
│ │ Tailwind CSS v4 & Design Systems      │ │ TypeScript 5.5 Enterprise Arch│ │
│ │ Issued: Sept 28, 2026                 │ │ Issued: Aug 14, 2026          │ │
│ │ ID: ASQ-2026-TW4-1049                 │ │ ID: ASQ-2026-TS5-0812         │ │
│ │ Grade: 98% with Distinction           │ │ Grade: 94%                    │ │
│ │                                       │ │                               │ │
│ │ [ 👁️ Preview ]  [ 📥 PDF ]  [ 🔗 Share ]│ │ [ 👁️ Preview ]  [ 📥 PDF ]  ...│ │
│ └───────────────────────────────────────┘ └───────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎯 ALMOST THERE — UPCOMING CERTIFICATES                                     │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Next.js 16 Full-Stack Mastery: [██████████████████░░░░] 68% (8 left)    │ │
│ │ Complete 8 more lessons to unlock your verified credential. [Continue ▶]│ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       └── certificates/
│           ├── page.tsx                               # Certificates hub page
│           └── loading.tsx                            # Certificates skeleton loader
├── components/
│   └── student/
│       └── certificates/
│           ├── certificate-grid-card.tsx              # Certificate visual card
│           ├── certificate-preview-modal.tsx          # Full-size certificate printable modal
│           ├── certificate-share-popover.tsx          # Copy link & LinkedIn export
│           ├── upcoming-certificates-widget.tsx       # Near-completion courses progress
│           └── certificate-empty-state.tsx            # Zero-certificates motivator state
└── types/
    └── student.ts                                     # CertificateItem interface
```

---

## 🧩 Component Breakdown & Props

### 1. `CertificateGridCard` (`components/student/certificates/certificate-grid-card.tsx`)
- **Props**:
  ```ts
  interface CertificateGridCardProps {
    certificateId: string;
    courseTitle: string;
    courseSlug: string;
    studentName: string;
    instructorName: string;
    issueDate: string;
    verificationCode: string;
    gradePercentage?: number;
    withDistinction?: boolean;
    onPreview: () => void;
  }
  ```
- **Visuals**:
  - Certificate border with gold/emerald badge emblem.
  - Verification ID pill (`font-mono text-xs text-muted-foreground`).
  - Action buttons: "Preview Modal", "Download PDF", "Share".

### 2. `CertificatePreviewModal` (`components/student/certificates/certificate-preview-modal.tsx`)
- Dialog modal rendering a printable certificate:
  - Asquala official logo & seal in deep emerald.
  - "Certificate of Completion" title in formal serif/sans typography.
  - Student full name in prominent display text.
  - Course title and completion statement.
  - Instructor signature and verification QR placeholder.
  - Action button: "Print / Save as PDF" using `window.print()` styling.

### 3. `CertificateSharePopover` (`components/student/certificates/certificate-share-popover.tsx`)
- Popover menu:
  - "Copy Verification Link" (copies `/verify/[code]` to clipboard with confirmation toast).
  - "Add to LinkedIn Profile" (pre-filled LinkedIn certification URL).
  - "Share on Twitter/X".

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Certificate Card | `bg-card border-2 border-primary-border/60 hover:border-primary shadow-sm hover:shadow-md transition-all rounded-xl p-6` |
| Verification Pill | `bg-secondary font-mono text-xs px-2.5 py-1 rounded text-muted-foreground` |
| Distinction Badge | `bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2 py-0.5 rounded-full font-semibold` |
| Seal Emblem | `w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center border-2 border-primary` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `CertificateItem` in `types/student.ts`.
- [ ] **Step 2**: Add mock certificates in `lib/mock-student-data.ts`.
- [ ] **Step 3**: Implement `CertificateGridCard` with distinction badges and actions.
- [ ] **Step 4**: Implement `CertificatePreviewModal` with responsive printable layout.
- [ ] **Step 5**: Implement `CertificateSharePopover` with clipboard copy and toast notifications.
- [ ] **Step 6**: Test certificate preview modal opening, closing, and print triggering.
