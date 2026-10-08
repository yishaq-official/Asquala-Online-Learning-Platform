# ⚙️ Teacher Studio — Course Settings & Pricing Plan

> **File**: `docs/plan/instructor-interface/07-course-settings-pricing.md`  
> **Target Route**: `/instructor/courses/[courseId]/settings`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

The **Course Settings & Pricing** page manages the public identity, monetization, prerequisites, and publication status of a course.

Key features:
1. **Basic Information & Category**:
   - Course Title, Subtitle, and Full Description (markdown/rich text).
   - Category selector (Web Development, Data Science, DevOps, Mobile, Business, Design).
   - Difficulty Level (Beginner, Intermediate, Advanced, All Levels).
   - Language (English, Amharic, Afaan Oromoo).
2. **Media & Thumbnail**:
   - Course Thumbnail uploader with 16:9 preview.
   - Promotional Video / Teaser URL.
3. **What Students Will Learn & Prerequisites**:
   - Dynamic tag list of 4–8 learning outcomes.
   - Prerequisites list (e.g. "Basic understanding of JavaScript").
4. **Monetization & Pricing**:
   - Free vs. Paid toggle.
   - Price selector in Ethiopian Birr (ETB) (e.g. Free, 500 ETB, 1,200 ETB, 2,500 ETB, 4,000 ETB) with estimated instructor earnings after platform fee.
5. **Publishing & Academic Review**:
   - "Submit for Academic Review" action with review guidelines checklist.

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── courses/
│           └── [courseId]/
│               └── settings/
│                   ├── page.tsx                # Course settings page
│                   └── loading.tsx             # Settings skeleton loader
├── components/
│   └── instructor/
│       └── course-settings/
│           ├── course-basic-info-form.tsx      # Title, category, level, description
│           ├── course-media-uploader.tsx       # Thumbnail & teaser video
│           ├── learning-outcomes-editor.tsx    # "What you will learn" dynamic manager
│           ├── course-pricing-card.tsx         # Free/paid & ETB pricing breakdown
│           └── course-publish-panel.tsx        # Submit for review / archive actions
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `CourseBasicInfoForm` with validation.
- [ ] **Step 2**: Implement `CourseMediaUploader` with 16:9 thumbnail preview.
- [ ] **Step 3**: Implement `LearningOutcomesEditor` for outcomes and prerequisites.
- [ ] **Step 4**: Implement `CoursePricingCard` showing instructor revenue share calculation.
- [ ] **Step 5**: Implement `CoursePublishPanel` with review submission confirmation modal.
- [ ] **Step 6**: Validate TypeScript compliance with `tsc --noEmit`.
