# 💬 Teacher Studio — Student Q&A & Discussion Inbox Plan

> **File**: `docs/plan/instructor-interface/10-qa-discussions-inbox.md`  
> **Target Route**: `/instructor/qa` via `app/instructor/qa/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

Student support and responsiveness directly drive course ratings and student success. The **Student Q&A Inbox** aggregates all questions submitted across an instructor's courses into a unified workspace.

Key features:
1. **Unified Q&A Inbox**:
   - Filter by: *All Questions*, *Unanswered (Needs Reply)*, *Answered*, *By Course*.
   - Search by keyword or student name.
2. **Context-Rich Question View**:
   - Displays lesson title, video timestamp or reading section, student question, code snippet.
3. **Instructor Reply Composer**:
   - Markdown reply editor, pin answer as "Official Instructor Response", mark question resolved.

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── qa/
│           ├── page.tsx                        # Q&A inbox page container
│           └── loading.tsx                     # Q&A inbox skeleton loader
├── components/
│   └── instructor/
│       └── qa/
│           ├── qa-inbox-sidebar.tsx            # Questions filter list with unread counters
│           ├── qa-question-thread.tsx          # Full question and replies view
│           ├── qa-reply-composer.tsx           # Markdown editor with official reply badge
│           └── qa-empty-state.tsx              # "All caught up" inbox zero state
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `QaInboxSidebar` with filter pills and search.
- [ ] **Step 2**: Implement `QaQuestionThread` with lesson context badge.
- [ ] **Step 3**: Implement `QaReplyComposer` with optimistic response addition.
- [ ] **Step 4**: Implement `QaEmptyState` with celebratory clean inbox badge.
- [ ] **Step 5**: Validate TypeScript compliance with `tsc --noEmit`.
