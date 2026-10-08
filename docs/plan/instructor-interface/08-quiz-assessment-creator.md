# 🧪 Teacher Studio — Assessment & Quiz Builder Plan

> **File**: `docs/plan/instructor-interface/08-quiz-assessment-creator.md`  
> **Target Route**: `/instructor/courses/[courseId]/quizzes`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: COMPLETED

---

## 🎯 Objectives & Scope

Technical assessments and quizzes are essential for verifying student mastery and issuing accredited certificates on Asquala. The **Assessment & Quiz Builder** allows teachers to construct checkpoints and final exams.

Key features:
1. **Quiz Configuration**:
   - Quiz Title, target module association, duration in minutes (e.g. 15 mins), and passing score percentage (default 80%).
2. **Question Management**:
   - Question prompt editor with optional code snippet block.
   - 4 multiple-choice options with single correct option radio selector.
   - Pedagogical explanation editor: Explains why the correct answer is right and why distractors are wrong.
3. **Reordering & Preview**:
   - Reorder questions, duplicate questions, and student runner preview modal.

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── courses/
│           └── [courseId]/
│               └── quizzes/
│                   ├── page.tsx                # Quiz creator container
│                   └── loading.tsx             # Quiz creator skeleton
├── components/
│   └── instructor/
│       └── quizzes/
│           ├── quiz-config-card.tsx            # Title, duration, passing threshold
│           ├── question-editor-item.tsx        # Stepped question card with options
│           ├── add-question-modal.tsx          # New question builder form
│           ├── code-snippet-input.tsx          # Syntax highlighted code input
│           └── quiz-preview-modal.tsx          # Student runner simulation
```

---

## 🧪 Implementation & Verification Checklist

- [x] **Step 1**: Implement `QuizConfigCard` with time and passing score inputs.
- [x] **Step 2**: Implement `QuestionEditorItem` with 4 options and explanation.
- [x] **Step 3**: Implement `AddQuestionModal` and `CodeSnippetInput`.
- [x] **Step 4**: Implement `QuizPreviewModal` to test assessment from student perspective.
- [x] **Step 5**: Validate TypeScript compliance with `tsc --noEmit`.

