# 📈 Teacher Studio — Student Analytics & Course Insights Plan

> **File**: `docs/plan/instructor-interface/09-student-analytics-insights.md`  
> **Target Route**: `/instructor/analytics` via `app/instructor/analytics/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: COMPLETED

---

## 🎯 Objectives & Scope

The **Student Analytics & Insights** hub gives instructors data-driven clarity on student enrollment trajectories, curriculum drop-off rates, assessment pass rates, and learner feedback.

Key features:
1. **Enrollment & Reach Metrics**:
   - Monthly and weekly enrollment volume trends.
   - Geographic / regional student breakdown (Addis Ababa, Hawassa, Bahir Dar, Jimma, International).
2. **Curriculum Drop-Off Analysis**:
   - Module-by-module completion funnel showing where students slow down or drop off.
3. **Assessment Performance**:
   - Average quiz scores, hardest questions with lowest accuracy.
4. **Student Reviews & Ratings Feed**:
   - Filterable reviews feed (5 stars to 1 star) with instructor response actions.

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── analytics/
│           ├── page.tsx                        # Analytics page container
│           └── loading.tsx                     # Analytics skeleton loader
├── components/
│   └── instructor/
│       └── analytics/
│           ├── enrollment-trend-card.tsx       # Enrollment timeline visualization
│           ├── curriculum-dropoff-funnel.tsx   # Lesson completion drop-off chart
│           ├── assessment-stats-card.tsx       # Average quiz pass rate and hardest questions
│           └── student-reviews-feed.tsx        # Filterable ratings and feedback list
```

---

## 🧪 Implementation & Verification Checklist

- [x] **Step 1**: Implement `EnrollmentTrendCard` with monthly comparisons.
- [x] **Step 2**: Implement `CurriculumDropoffFunnel` with visual completion percentages.
- [x] **Step 3**: Implement `AssessmentStatsCard` with quiz metrics.
- [x] **Step 4**: Implement `StudentReviewsFeed` with star filters and reply button.
- [x] **Step 5**: Validate TypeScript compliance with `tsc --noEmit`.

