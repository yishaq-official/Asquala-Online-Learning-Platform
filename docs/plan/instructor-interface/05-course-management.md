# 📚 Teacher Studio — Course Management & Directory Plan

> **File**: `docs/plan/instructor-interface/05-course-management.md`  
> **Target Route**: `/instructor/courses` via `app/instructor/courses/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

The **Course Management & Directory** page is where instructors view, organize, and administer their complete course portfolio. It supports drafting, publishing workflows, search, and direct shortcuts to curriculum editors and analytics.

Key features:
1. **Course Status Tabs & Filters**:
   - **All Courses** (total count)
   - **Published** (active in catalog)
   - **Under Review** (submitted for academic check)
   - **Drafts** (in-progress curricula)
   - **Archived** (retired courses)
2. **Interactive Course Cards / Table View**:
   - Course thumbnail, title, category, price in ETB.
   - Enrolled students count, average review score.
   - Quick action menu: Edit Curriculum, Course Settings, View Analytics, Student Preview, Submit for Review.
3. **Empty States & CTAs**:
   - When no courses match filter or when an instructor has yet to create their first course, provides a high-converting encouragement card to build their first course.

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── courses/
│           ├── page.tsx                        # Course catalog container
│           └── loading.tsx                     # Catalog skeleton loader
├── components/
│   └── instructor/
│       └── courses/
│           ├── instructor-course-card.tsx      # Comprehensive course studio card
│           ├── course-status-tabs.tsx          # Filter pills (Published, Draft, Review)
│           ├── course-search-bar.tsx           # Search by course title / topic
│           ├── course-empty-state.tsx          # "Create your first course" state
│           └── course-actions-dropdown.tsx     # Context menu for course operations
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `CourseStatusTabs` and `CourseSearchBar`.
- [ ] **Step 2**: Implement `InstructorCourseCard` with status pill, metrics, and actions.
- [ ] **Step 3**: Implement `CourseActionsDropdown` with edit, preview, and review triggers.
- [ ] **Step 4**: Implement `CourseEmptyState` with primary action button.
- [ ] **Step 5**: Build `app/instructor/courses/page.tsx` with responsive layout.
- [ ] **Step 6**: Validate TypeScript compliance with `tsc --noEmit`.
