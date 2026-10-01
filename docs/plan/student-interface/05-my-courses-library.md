# 📚 Student Portal — Enrolled Courses Library Plan

> **File**: `docs/plan/student-interface/05-my-courses-library.md`  
> **Target Route**: `/student/courses` via `app/student/courses/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **My Courses Library** is the student's central hub for all active and finished learning paths.
Key goals:
1. **Organization by Status**: Seamless tabs for "All", "In Progress", and "Completed" courses.
2. **Clear Progress Transparency**: Exact completion percentages, completed lesson count (e.g., `18 / 24 lessons`), and emerald progress bars.
3. **Frictionless Resumption**: 1-click "Continue Learning" button taking the student directly to their next incomplete lesson.
4. **Certificate Access**: For 100% completed courses, display an emerald "View Certificate" badge and action.
5. **Quick Search**: Filter enrolled courses by title without reloading the page.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📚 My Learning Library                                                      │
│ Manage your enrolled courses, track your progress, and review certifications │
├─────────────────────────────────────────────────────────────────────────────┤
│ [ All Courses (4) ]  [ In Progress (3) ]  [ Completed (1) ]                 │ Status Tabs
├──────────────────────────────────────────────────────┬──────────────────────┤
│ 🔍 Filter enrolled courses...                        │ Sort: Recently Active│ Search & Sort
├──────────────────────────────────────────────────────┴──────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Thumbnail] Next.js 16 Full-Stack Mastery with Drizzle & Auth           │ │
│ │             Instructor: Yishaq Abreham • Last active: 2 hours ago       │ │
│ │             [████████████████████░░░░░░] 68% • 16 of 24 lessons         │ │
│ │                                            [ 🚀 Continue Learning ] [⋮] │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Thumbnail] Modern PostgreSQL Architecture & Indexing                   │ │
│ │             Instructor: Sarah Jenkins • Last active: 3 days ago         │ │
│ │             [████████░░░░░░░░░░░░░░░░░░] 25% • 3 of 12 lessons          │ │
│ │                                            [ 🚀 Continue Learning ] [⋮] │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Thumbnail] Tailwind CSS v4 & Modern Design Systems                     │ │
│ │             Instructor: Alex Rivera • Completed Sept 2026               │ │
│ │             [██████████████████████████] 100% • 18 of 18 lessons        │ │
│ │             🏆 Certificate Earned          [ 🎓 View Certificate ] [⋮]  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       └── courses/
│           ├── page.tsx                               # Enrolled courses library page
│           └── loading.tsx                            # Library skeleton loader
├── components/
│   └── student/
│       └── my-courses/
│           ├── course-library-tabs.tsx                # Status filter tabs (All, In Progress, Completed)
│           ├── course-progress-card.tsx               # Enrolled course card with progress bar
│           ├── course-library-search.tsx              # Quick filter input
│           └── course-library-empty-state.tsx         # Empty state for new students
└── types/
    └── student.ts                                     # EnrolledCourseItem interface
```

---

## 🧩 Component Breakdown & Props

### 1. `CourseProgressCard` (`components/student/my-courses/course-progress-card.tsx`)
- **Props**:
  ```ts
  interface CourseProgressCardProps {
    courseId: string;
    slug: string;
    title: string;
    thumbnailUrl: string;
    instructorName: string;
    lastAccessedAt: string;
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
    nextLessonId?: string;
    isCompleted: boolean;
    certificateId?: string;
  }
  ```
- **States**:
  - **In Progress**: Displays percentage bar in deep emerald (`var(--primary)`), next lesson title, and "Continue Learning" CTA.
  - **Completed**: Displays full green bar (`100%`), "Completed" checkmark pill, and "View Certificate" CTA routing to `/student/certificates`.

### 2. `CourseLibraryTabs` (`components/student/my-courses/course-library-tabs.tsx`)
- Pill navigation with counts:
  - All Courses (total count)
  - In Progress (active count)
  - Completed (graduated count)
- Active indicator: `bg-primary text-white font-medium shadow-sm`.

### 3. `CourseLibraryEmptyState` (`components/student/my-courses/course-library-empty-state.tsx`)
- Rendered if student has 0 courses in selected tab.
- Includes graduation cap graphic, message ("You haven't enrolled in any courses yet"), and direct link button to `/student/explore`.

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Card Container | `bg-card border border-border rounded-xl p-5 hover:border-primary-border transition-all flex flex-col md:flex-row gap-5 items-center` |
| Progress Fill | `bg-primary h-2 rounded-full transition-all duration-500` |
| Progress Track | `bg-secondary h-2 rounded-full overflow-hidden w-full` |
| Completed Badge | `bg-primary-light text-primary font-semibold text-xs px-2.5 py-1 rounded-full border border-primary-border flex items-center gap-1` |
| Tab Active | `bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium` |
| Tab Inactive | `text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-2 rounded-lg text-sm font-medium` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `EnrolledCourseItem` in `types/student.ts`.
- [ ] **Step 2**: Add mock enrolled courses with varying progress percentages (0%, 25%, 68%, 100%).
- [ ] **Step 3**: Build `CourseLibraryTabs` with dynamic count badges.
- [ ] **Step 4**: Build `CourseProgressCard` with progress bar calculations and dynamic actions.
- [ ] **Step 5**: Test tab switching (All, In Progress, Completed) and search query filtering.
- [ ] **Step 6**: Verify responsive stacking from desktop row view to mobile card view.
