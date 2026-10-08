# 🎓 Teacher & Instructor Studio Architecture & Planning

> **Workspace**: `asquala-online-learning-platform/asquala-online-school`  
> **Target Routes**: `/instructor/*`, `/instructor/login`, `/instructor/apply`, `/instructor/application-status`  
> **Companion Document**: [`docs/plan/student-interface/00-overview.md`](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)  
> **Status**: APPROVED ARCHITECTURE & SPECIFICATION

---

## 🎯 Executive Vision

The **Asquala Teacher & Instructor Studio** is an enterprise-grade creator platform designed for educators, technical mentors, and academic professionals in Ethiopia and across East Africa.

Because educational quality and student trust are the platform's highest priorities, **instructor access is governed by a rigorous accreditation and evidence-based review workflow**. Before instructors can publish courses and teach students, they submit verifiable credentials—including academic degrees, past teaching experience, professional certifications, and proof documents.

---

## 🏛️ Core Principles & Design System

1. **Strictly Light Mode Only**
   - Clean, high-contrast, modern creator studio optimized for readability and sustained productivity.
   - Background: Pure whites (`#ffffff`) and soft slate neutrals (`#f8fafc`, `#f1f5f9`).
2. **Deep Emerald Green Accent Palette**
   - Primary: `#047857` (Emerald 700)
   - Primary Hover: `#065f46` (Emerald 800)
   - Primary Light Tint: `#ecfdf5` (Emerald 50)
   - Primary Border: `#a7f3d0` (Emerald 200)
   - Accent Warning/Attention: Amber 500 / Amber 50
   - **Zero Blue Colors**: No generic blues (`bg-blue-*`, `text-sky-*`).
3. **Evidence-Based Accreditation Standard**
   - Instructors must provide documentary evidence for educational degrees, years of industry/teaching experience, and accredited professional certifications before approval.
4. **Distraction-Free Creator Studio**
   - Dedicated studio navigation shell with quick switcher between Teacher Studio and Student Portal.
   - Real-time autosave indicators for course and curriculum drafting.
5. **Strict Type Safety & Performance**
   - Zero TypeScript compilation errors (`tsc --noEmit`).
   - Optimistic state updates with Zustand and server actions.

---

## 🔐 Dedicated Authentication & Accreditation Workflow

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. TEACHER RECRUITMENT & ONBOARDING ENTRY                                  │
│    URL: /instructor/apply or /instructor/login                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. EVIDENCE-BASED APPLICATION WIZARD (4 Steps)                              │
│    Step 1: Personal & Professional Profile (Name, Headline, Bio, Links)     │
│    Step 2: Educational Credentials (Degree, Institution, Transcript PDF)   │
│    Step 3: Work & Teaching Experience (Years, Roles, Subject Specialties)   │
│    Step 4: Professional Certifications & Proof Files (AWS, Cisco, Licensure)│
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. ACADEMIC BOARD REVIEW & AUDIT LIFECYCLE                                  │
│    Status: [ SUBMITTED ] ➔ [ UNDER REVIEW ] ➔ [ APPROVED / ACTION REQUIRED ]│
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. ACCESS CONTROL & STUDIO ROUTING                                          │
│    • Approved: Direct access to /instructor/dashboard & full Course Studio │
│    • Pending: Access to /instructor/application-status tracker & draft demo│
│    • Action Required: Targeted feedback with document resubmission form     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ Complete Route Hierarchy

```text
asquala-online-school/
├── app/
│   ├── (auth)/
│   │   ├── instructor-login/
│   │   │   └── page.tsx                        # Dedicated Teacher Sign-In
│   │   └── instructor-apply/
│   │       └── page.tsx                        # Multi-Step Evidence Application
│   └── instructor/
│       ├── layout.tsx                          # Studio Shell (Sidebar, Header, Mode Switcher)
│       ├── loading.tsx                         # Studio Skeleton Loader
│       ├── application-status/
│       │   └── page.tsx                        # Live Review & Document Tracker
│       ├── dashboard/
│       │   └── page.tsx                        # Studio Overview (Revenue, Students, Ratings)
│       ├── courses/
│       │   ├── page.tsx                        # Course Management & Directory
│       │   ├── create/
│       │   │   └── page.tsx                    # New Course Creation Wizard
│       │   └── [courseId]/
│       │       ├── curriculum/
│       │       │   └── page.tsx                # Interactive Module & Lesson Builder
│       │       ├── settings/
│       │       │   └── page.tsx                # Pricing (ETB/USD), Thumbnail, Objectives
│       │       └── quizzes/
│       │           └── page.tsx                # Assessment & Technical Quiz Creator
│       ├── analytics/
│       │   └── page.tsx                        # Enrollment Trends, Drop-Offs & Ratings
│       ├── qa/
│       │   └── page.tsx                        # Student Discussion & Q&A Inbox
│       ├── earnings/
│       │   └── page.tsx                        # Revenue Splits, Telebirr/CBE Payouts
│       └── settings/
│           └── page.tsx                        # Public Teacher Profile & Credentials
```

---

## 📦 Domain Models & Type Definitions (`types/instructor.ts`)

```typescript
export type InstructorApplicationStatus = 
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "action_required"
  | "rejected";

export interface EducationRecord {
  id: string;
  degree: string;              // e.g. "B.Sc. in Computer Science"
  institution: string;         // e.g. "Addis Ababa University"
  fieldOfStudy: string;        // e.g. "Software Engineering"
  graduationYear: number;      // e.g. 2021
  documentUrl?: string;        // Uploaded transcript/diploma file
  documentName?: string;
  isVerified?: boolean;
}

export interface ExperienceRecord {
  id: string;
  role: string;                // e.g. "Senior Full-Stack Engineer"
  organization: string;        // e.g. "Ethiopian Artificial Intelligence Institute"
  yearsOfExperience: number;   // e.g. 5
  isTeachingRole: boolean;     // e.g. true
  description: string;
}

export interface CertificateRecord {
  id: string;
  title: string;               // e.g. "AWS Certified Solutions Architect"
  issuingOrganization: string; // e.g. "Amazon Web Services"
  issueDate: string;           // e.g. "2024-05"
  credentialId?: string;       // e.g. "AWS-091823"
  documentUrl?: string;        // Uploaded certificate PDF/image
  documentName?: string;
  isVerified?: boolean;
}

export interface InstructorApplication {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  primarySubject: string;      // e.g. "Web Development & Cloud"
  targetAudience: string;      // e.g. "University Students & Career Switchers"
  status: InstructorApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;        // Feedback from admin / academic board
  education: EducationRecord[];
  experience: ExperienceRecord[];
  certifications: CertificateRecord[];
  sampleVideoUrl?: string;     // Link to course intro / lecture sample
}

export type CoursePublishStatus = "draft" | "under_review" | "published" | "archived";

export interface InstructorCourseItem {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  category: string;
  status: CoursePublishStatus;
  price: number;               // 0 for free, in ETB
  enrolledStudentsCount: number;
  averageRating: number;
  reviewsCount: number;
  totalLessonsCount: number;
  totalDurationMinutes: number;
  publishedAt?: string;
  lastUpdatedAt: string;
}

export interface InstructorStatKPIs {
  totalRevenueETB: number;
  revenueThisMonthETB: number;
  totalStudentsCount: number;
  activeStudentsThisWeek: number;
  averageRating: number;
  totalReviewsCount: number;
  publishedCoursesCount: number;
  draftCoursesCount: number;
}
```

---

## 🚀 Phased Implementation Roadmap

| Phase | Milestone | Deliverables |
|---|---|---|
| **Phase 1** | **Teacher Auth & Application Wizard** | Dedicated `/instructor/login`, `/instructor/apply` with 4-step evidence submission (Education, Experience, Certificates). |
| **Phase 2** | **Application Review Tracker** | `/instructor/application-status` with review stages timeline, document audit checklist, and resubmission modal. |
| **Phase 3** | **Teacher Studio Shell** | Responsive desktop/mobile Studio Sidebar, Topbar with "Switch to Student Portal", user menu. |
| **Phase 4** | **Studio Overview Dashboard** | `/instructor/dashboard` with revenue KPIs (ETB), student enrollment counter, course rating metrics, quick actions. |
| **Phase 5** | **Course Management & Catalog** | `/instructor/courses` directory with status badges (*Published*, *Draft*, *In Review*), search, and course cards. |
| **Phase 6** | **Course Builder & Curriculum Editor** | `/instructor/courses/[id]/curriculum` with interactive module/lesson creator, video/reading editor, reordering. |
| **Phase 7** | **Course Metadata & Pricing Settings** | `/instructor/courses/[id]/settings` with title, category, ETB pricing selector, learning objectives list. |
| **Phase 8** | **Assessment & Quiz Builder** | `/instructor/courses/[id]/quizzes` with question builder, passing threshold, code snippet editor. |
| **Phase 9** | **Student Analytics & Insights** | `/instructor/analytics` with enrollment velocity charts, drop-off rate monitors, feedback reviews. |
| **Phase 10** | **Q&A Forum Inbox** | `/instructor/qa` with unified inbox for unanswered student queries across all instructor courses. |
| **Phase 11** | **Earnings & Payouts (Telebirr/CBE)** | `/instructor/earnings` with revenue breakdown, platform split, Telebirr/CBE withdrawal management. |
| **Phase 12** | **Public Profile & Credentials Settings** | `/instructor/settings` with teacher bio, credentials showcase, payout details. |

---

## 🎨 Color Tokens & Aesthetic Compliance

- **Primary Emerald**: `var(--primary)` (`#047857`)
- **Primary Hover**: `var(--primary-hover)` (`#065f46`)
- **Primary Light Tint**: `var(--primary-light)` (`#ecfdf5`)
- **Primary Border**: `var(--primary-border)` (`#a7f3d0`)
- **Card Background**: `var(--card)` (`#ffffff`)
- **Muted Text**: `var(--muted-foreground)` (`#64748b`)
- **Neutral Secondary**: `var(--secondary)` (`#f1f5f9`)
- **Status Badges**:
  - Approved / Published: Emerald (`bg-primary-light text-primary border-primary-border`)
  - Under Review: Amber (`bg-amber-50 text-amber-700 border-amber-200`)
  - Action Required / Rejected: Rose/Destructive (`bg-rose-50 text-rose-700 border-rose-200`)
  - Draft: Slate/Muted (`bg-secondary text-muted-foreground border-border`)
