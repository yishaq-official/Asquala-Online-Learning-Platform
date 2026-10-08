# 🛠️ Teacher Studio — Curriculum & Lesson Builder Plan

> **File**: `docs/plan/instructor-interface/06-course-builder-curriculum.md`  
> **Target Route**: `/instructor/courses/[courseId]/curriculum`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

The **Curriculum & Lesson Builder** is the heart of the course creation experience. It gives teachers an intuitive, structured editor to organize their course into sequential modules and individual learning activities (Video Lectures, Reading Guides, Quizzes, Downloadable Assets).

Key features:
1. **Module & Lesson Tree**:
   - Add new modules (e.g. "Module 1: Foundations", "Module 2: Database Design").
   - Reorder modules and lessons with up/down controls.
   - Delete, rename, and collapse/expand module accordions.
2. **Multi-Type Lesson Creator Modal**:
   - **Video Lesson**: Video URL / upload, duration in minutes, downloadable lesson attachments, lesson preview toggle.
   - **Reading Lesson**: Markdown text editor with formatted preview, duration in minutes.
   - **Quiz Lesson**: Linked to quiz assessment builder.
3. **Autosave & Draft Controls**:
   - Unsaved changes indicator and instant local / optimistic save.
   - "Preview as Student" quick action button.

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── courses/
│           └── [courseId]/
│               ├── curriculum/
│               │   ├── page.tsx                # Curriculum builder container
│               │   └── loading.tsx             # Builder skeleton loader
│               └── layout.tsx                  # Course management sub-navigation
├── components/
│   └── instructor/
│       └── curriculum/
│           ├── curriculum-module-item.tsx      # Module container with nested lessons
│           ├── curriculum-lesson-item.tsx      # Individual lesson card with type badge
│           ├── add-module-modal.tsx            # New module creation dialog
│           ├── add-lesson-modal.tsx            # Lesson type selector and creation form
│           ├── lesson-editor-drawer.tsx        # Slide-over video/reading content editor
│           └── curriculum-top-bar.tsx          # Autosave status & preview button
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `CurriculumTopBar` with breadcrumb and autosave indicator.
- [ ] **Step 2**: Implement `CurriculumModuleItem` with drag / reorder and lesson list.
- [ ] **Step 3**: Implement `CurriculumLessonItem` with duration, type badge, and edit triggers.
- [ ] **Step 4**: Implement `AddLessonModal` supporting video, reading, and quiz types.
- [ ] **Step 5**: Implement `LessonEditorDrawer` with markdown and video metadata.
- [ ] **Step 6**: Validate TypeScript compliance with `tsc --noEmit`.
