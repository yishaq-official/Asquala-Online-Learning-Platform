# 📝 Student Portal — Quiz & Assessment Runner Plan

> **File**: `docs/plan/student-interface/08-quiz-runner.md`  
> **Target Route**: `/student/courses/[slug]/quizzes/[quizId]` via `app/student/courses/[slug]/quizzes/[quizId]/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Quiz & Assessment Runner** validates student knowledge at the end of each module or milestone.
Key goals:
1. **Stress-Free Assessment**: Clear question navigation, optional countdown timer, and answered/unanswered tracker dots.
2. **Accessible Choice Interface**: Large, keyboard-friendly multiple-choice options with code snippet formatting.
3. **Instant Detailed Grading**: Immediate score breakdown showing correct vs. incorrect answers and detailed explanations.
4. **Mastery & Retakes**: Unlocks the next module upon passing (>= 70%) and provides clean retake options if needed.

---

## 📐 Layout Wireframe

### During Quiz
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📝 Module 2 Assessment: Drizzle ORM & Database Design                       │
│ Question 3 of 10  •  Time Remaining: ⏱️ 11:45                              │
│ [1] [2] [ 3 ] [4] [5] [6] [7] [8] [9] [10] (Navigation Dots)                │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Question 3:                                                             │ │
│ │ Which Drizzle function is used to define a one-to-many relationship     │ │
│ │ between tables in a schema definition?                                  │ │
│ │                                                                         │ │
│ │  (A) relations() from 'drizzle-orm'                                    │ │
│ │  (B) foreignKey() from 'drizzle-orm/pg-core'                            │ │
│ │  (C) hasMany() from 'drizzle-orm'                                      │ │
│ │  (D) joinTable() from 'drizzle-orm/pg-core'                            │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ [ ◀ Previous Question ]                              [ Next Question ▶ ]    │
│                                                (or [ Submit Assessment ✅ ])│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Post-Submission Results View
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎉 Assessment Complete! You Scored 90% (Passing Grade: 70%)                 │
│ 9 of 10 Questions Correct  •  Time Taken: 8 min 24 sec                      │
│                                                                             │
│ [ 🚀 Continue to Next Module ]                       [ 🔄 Retake Quiz ]     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📋 DETAILED QUESTION BREAKDOWN                                              │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ✅ Question 1: PostgreSQL Connection Pooling (Correct)                  │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ ❌ Question 2: Drizzle Migration CLI Commands (Incorrect)               │ │
│ │    Your Answer: npx drizzle-kit migrate                                 │ │
│ │    Correct Answer: npx drizzle-kit push (for rapid prototyping)         │ │
│ │    Explanation: drizzle-kit push applies schema changes directly...     │ │
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
│           └── [slug]/
│               └── quizzes/
│                   └── [quizId]/
│                       ├── page.tsx                   # Quiz runner & results controller
│                       └── loading.tsx                # Quiz skeleton loader
├── components/
│   └── student/
│       └── quiz/
│           ├── quiz-header.tsx                        # Quiz title, timer, and progress dots
│           ├── question-card.tsx                      # Current question prompt & selectable options
│           ├── quiz-progress-dots.tsx                 # Numbered jump pill navigation
│           ├── quiz-control-bar.tsx                   # Previous, Next, and Submit actions
│           ├── quiz-results-summary.tsx               # Score percentage, passing badge, CTAs
│           └── quiz-question-review.tsx               # Post-quiz correct/incorrect explanation list
└── types/
    └── student.ts                                     # QuizQuestion, QuizSubmission, QuizResult
```

---

## 🧩 Component Breakdown & Props

### 1. `QuizHeader` (`components/student/quiz/quiz-header.tsx`)
- Displays quiz title, module label, and total questions.
- Includes countdown timer with amber warning when under 3 minutes.
- Displays `QuizProgressDots` showing answered (emerald), current (ringed), and unvisited (slate).

### 2. `QuestionCard` (`components/student/quiz/question-card.tsx`)
- **Props**:
  ```ts
  interface QuestionCardProps {
    questionIndex: number;
    totalQuestions: number;
    questionText: string;
    codeSnippet?: string;
    options: { id: string; text: string }[];
    selectedOptionId?: string;
    onSelectOption: (optionId: string) => void;
  }
  ```
- Renders clickable options styled as radio cards with smooth hover and selected emerald borders.

### 3. `QuizResultsSummary` (`components/student/quiz/quiz-results-summary.tsx`)
- Evaluates score:
  - If `>= passingScore` (e.g. 70%): Emerald trophy icon, "Congratulations! You passed.", button to proceed to next lesson.
  - If `< passingScore`: Amber exclamation icon, "You didn't pass this time", with "Retake Quiz" button.

### 4. `QuizQuestionReview` (`components/student/quiz/quiz-question-review.tsx`)
- Full accordion or list of all questions with student answers vs correct answers.
- Highlights explanation box explaining why the correct answer is right.

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Question Card Surface | `bg-card border border-border rounded-xl p-6 shadow-sm` |
| Selected Option Card | `border-2 border-primary bg-primary-light/40 text-foreground font-medium p-4 rounded-lg` |
| Unselected Option Card | `border border-border bg-card hover:bg-secondary/50 text-foreground p-4 rounded-lg cursor-pointer transition-colors` |
| Timer Pill (Normal) | `bg-secondary text-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5` |
| Timer Pill (Warning) | `bg-warning-light text-warning-foreground border border-warning px-3 py-1.5 rounded-full text-sm font-semibold animate-pulse` |
| Correct Badge | `bg-primary-light text-primary border border-primary-border font-semibold text-xs px-2.5 py-1 rounded-full` |
| Incorrect Badge | `bg-destructive/10 text-destructive border border-destructive/20 font-semibold text-xs px-2.5 py-1 rounded-full` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `QuizQuestion` and `QuizResult` types in `types/student.ts`.
- [ ] **Step 2**: Add mock quiz fixture with 5-10 questions in `lib/mock-student-data.ts`.
- [ ] **Step 3**: Implement `QuestionCard` with single-selection radio logic and code blocks.
- [ ] **Step 4**: Implement `QuizHeader` with timer countdown and `QuizProgressDots`.
- [ ] **Step 5**: Implement quiz submission logic with score evaluation.
- [ ] **Step 6**: Implement `QuizResultsSummary` and `QuizQuestionReview` with retry button.
- [ ] **Step 7**: Verify state transitions (in-progress → submitted → retake).
