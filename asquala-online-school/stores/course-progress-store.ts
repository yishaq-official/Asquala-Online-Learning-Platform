import { create } from "zustand";

interface CourseProgressState {
  // Completed Lessons Tracking
  completedLessonIds: string[];
  markLessonComplete: (lessonId: string) => void;
  markLessonIncomplete: (lessonId: string) => void;
  toggleLessonCompletion: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;

  // Enrolled Courses Tracking
  enrolledCourseSlugs: string[];
  enrollInCourse: (slug: string) => void;
  isCourseEnrolled: (slug: string) => boolean;

  // Personal Lesson Notes
  lessonNotes: Record<string, string>; // lessonId -> markdown content
  saveLessonNote: (lessonId: string, note: string) => void;
  getLessonNote: (lessonId: string) => string;
}

export const useCourseProgressStore = create<CourseProgressState>((set, get) => ({
  // Default seeded completed lessons matching mock curriculum
  completedLessonIds: [
    "lesson-1-1",
    "lesson-1-2",
    "lesson-1-3",
    "lesson-1-4",
    "lesson-2-1",
    "lesson-2-2",
    "lesson-2-3",
    "lesson-2-4",
    "lesson-3-1",
    "lesson-3-2",
    "lesson-3-3",
  ],

  markLessonComplete: (lessonId) =>
    set((state) => ({
      completedLessonIds: state.completedLessonIds.includes(lessonId)
        ? state.completedLessonIds
        : [...state.completedLessonIds, lessonId],
    })),

  markLessonIncomplete: (lessonId) =>
    set((state) => ({
      completedLessonIds: state.completedLessonIds.filter((id) => id !== lessonId),
    })),

  toggleLessonCompletion: (lessonId) =>
    set((state) => {
      const exists = state.completedLessonIds.includes(lessonId);
      return {
        completedLessonIds: exists
          ? state.completedLessonIds.filter((id) => id !== lessonId)
          : [...state.completedLessonIds, lessonId],
      };
    }),

  isLessonCompleted: (lessonId) => {
    return get().completedLessonIds.includes(lessonId);
  },

  // Default seeded enrolled courses
  enrolledCourseSlugs: [
    "nextjs-16-fullstack-mastery",
    "modern-postgresql-architecture",
    "tailwind-css-v4-design-systems",
    "typescript-enterprise-patterns",
  ],

  enrollInCourse: (slug) =>
    set((state) => ({
      enrolledCourseSlugs: state.enrolledCourseSlugs.includes(slug)
        ? state.enrolledCourseSlugs
        : [...state.enrolledCourseSlugs, slug],
    })),

  isCourseEnrolled: (slug) => {
    return get().enrolledCourseSlugs.includes(slug);
  },

  // Notes state
  lessonNotes: {
    "lesson-3-4":
      "Server Actions in Next.js 16 run purely on the server. Always validate input using Zod or custom schemas before calling database mutations.",
  },

  saveLessonNote: (lessonId, note) =>
    set((state) => ({
      lessonNotes: {
        ...state.lessonNotes,
        [lessonId]: note,
      },
    })),

  getLessonNote: (lessonId) => {
    return get().lessonNotes[lessonId] || "";
  },
}));
