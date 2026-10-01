# 🧭 Student Portal — Course Explore & Catalog Plan

> **File**: `docs/plan/student-interface/03-course-explore.md`  
> **Target Route**: `/student/explore` via `app/student/explore/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Course Explore & Catalog** page allows students to discover new learning paths and expand their skills.
Key goals:
1. **Dynamic Discovery**: Browse all available school courses across various disciplines.
2. **Instant Live Filtering**: Real-time category pills, difficulty level, duration, and rating filters.
3. **Debounced Search**: Fast text search matching course title, syllabus keywords, or instructor names.
4. **State Persistence**: Filter and sort state stored in URL query parameters (`?q=...&category=...&level=...&sort=...`) for shareable search states.
5. **Clear Enrollment Status**: Immediate visual distinction between courses already enrolled vs. available for enrollment.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🧭 Explore Courses                                                          │
│ Discover world-class courses designed to accelerate your tech career        │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────┐ ┌───────────────────────┐ │
│ │ 🔍 Search courses by title, topic, or tech... │ │ Sort: Most Popular ▼  │ │ Search & Sort
│ └───────────────────────────────────────────────┘ └───────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ [All] [Web Development] [Backend & DB] [Mobile Apps] [UI/UX] [Cloud/DevOps] │ Category Pills
├─────────────────────────────────────────────────────────────────────────────┤
│ Level: [All] [Beginner] [Intermediate] [Advanced]   Duration: [<5h] [5-15h] │ Quick Filters
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────┐ ┌───────────────────────┐ ┌─────────────────────┐ │
│ │ [ Course Thumbnail ]  │ │ [ Course Thumbnail ]  │ │ [ Course Thumbnail ]│ │
│ │ Beginner • 14 Hours   │ │ Advanced • 22 Hours   │ │ Interm • 8 Hours    │ │
│ │ Next.js 16 Mastery    │ │ Distributed Databases │ │ Tailwind v4 Mastery │ │
│ │ By Yishaq Abreham     │ │ By Sarah Jenkins      │ │ By Michael Chen     │ │
│ │ ⭐ 4.9 (1.2k reviews)  │ │ ⭐ 4.8 (850 reviews)   │ │ ⭐ 5.0 (420 reviews)│ │
│ │ [ ✅ Already Enrolled]│ │ [ 🚀 View Course ]    │ │ [ 🚀 View Course ]  │ │
│ └───────────────────────┘ └───────────────────────┘ └─────────────────────┘ │
│ ┌───────────────────────┐ ┌───────────────────────┐ ┌─────────────────────┐ │
│ │ Course Card 4         │ │ Course Card 5         │ │ Course Card 6       │ │
│ └───────────────────────┘ └───────────────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       └── explore/
│           ├── page.tsx                               # Explore catalog page
│           └── loading.tsx                            # Catalog skeleton loader
├── components/
│   └── student/
│       └── explore/
│           ├── course-catalog-card.tsx                # Course card with thumbnail, tags, enroll CTA
│           ├── course-category-pills.tsx              # Horizontal scrollable category filters
│           ├── course-search-input.tsx                # Debounced search bar with clear button
│           ├── course-filter-bar.tsx                  # Difficulty and duration badge toggles
│           ├── course-sort-dropdown.tsx               # Popover/select for sorting options
│           └── course-empty-state.tsx                 # Friendly "No courses found" reset state
└── types/
    └── student.ts                                     # CourseCatalogItem, FilterCriteria types
```

---

## 🧩 Component Breakdown & Props

### 1. `CourseCatalogCard` (`components/student/explore/course-catalog-card.tsx`)
- **Props**:
  ```ts
  interface CourseCatalogCardProps {
    id: string;
    slug: string;
    title: string;
    summary: string;
    thumbnailUrl: string;
    category: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    durationHours: number;
    lessonsCount: number;
    rating: number;
    reviewCount: number;
    instructor: {
      name: string;
      avatarUrl?: string;
    };
    isEnrolled: boolean;
  }
  ```
- **Visuals**:
  - Image header with category pill overlay in top-left corner.
  - Emerald star rating badge with review counter.
  - Bottom action: If `isEnrolled: true`, shows emerald "Enrolled" badge with link to `/student/courses/[slug]`; if false, shows "Explore Course" button linking to `/student/explore/[slug]`.

### 2. `CourseCategoryPills` (`components/student/explore/course-category-pills.tsx`)
- **Pills**: All, Web Development, Backend & DB, Mobile Apps, UI/UX Design, Cloud & DevOps, AI & Machine Learning.
- **Active State**: `bg-primary text-white font-medium shadow-sm`.
- **Inactive State**: `bg-card text-muted-foreground hover:text-foreground border border-border`.

### 3. `CourseSearchInput` (`components/student/explore/course-search-input.tsx`)
- Uses debounced input (300ms) to update URL search param `?q=...`.
- Includes leading `Search` icon and trailing clear `X` button when text is present.

### 4. `CourseEmptyState` (`components/student/explore/course-empty-state.tsx`)
- Shown when filter combinations yield 0 courses.
- Shows magnifying glass icon, "No courses found matching your criteria", and an emerald "Reset All Filters" button.

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Card Container | `bg-card border border-border hover:border-primary-border hover:shadow-md transition-all rounded-xl overflow-hidden flex flex-col` |
| Difficulty: Beginner | `bg-primary-light text-primary font-medium text-xs px-2 py-0.5 rounded-full` |
| Difficulty: Intermediate | `bg-secondary text-secondary-foreground font-medium text-xs px-2 py-0.5 rounded-full` |
| Difficulty: Advanced | `bg-amber-50 text-amber-700 font-medium text-xs px-2 py-0.5 rounded-full border border-amber-200` |
| Rating Stars | `text-warning fill-warning inline-flex items-center gap-1 text-sm font-semibold` |
| Enrolled Badge | `bg-primary-light text-primary border border-primary-border font-medium text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `CourseCatalogItem` and `FilterCriteria` in `types/student.ts`.
- [ ] **Step 2**: Add realistic sample catalog courses in `lib/mock-student-data.ts`.
- [ ] **Step 3**: Implement `CourseCategoryPills` and `CourseSearchInput` syncing with `useSearchParams`.
- [ ] **Step 4**: Build `CourseCatalogCard` with responsive image aspect ratio, badges, and hover lift.
- [ ] **Step 5**: Implement `CourseEmptyState` with filter reset.
- [ ] **Step 6**: Test filtering by category, search text, difficulty level, and verify card responsive grid (1 col mobile, 2 col tablet, 3 col desktop).
