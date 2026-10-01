export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseCategory =
  | "All"
  | "Web Development"
  | "Backend & DB"
  | "Mobile Apps"
  | "UI/UX Design"
  | "Cloud & DevOps"
  | "Data Science";

export interface StudentStats {
  enrolledCoursesCount: number;
  totalHoursLearned: number;
  currentStreakDays: number;
  completedCertificatesCount: number;
}

export interface JumpBackInItem {
  courseTitle: string;
  courseSlug: string;
  moduleTitle: string;
  lessonTitle: string;
  lessonId: string;
  progressPercentage: number;
  durationMinutesRemaining: number;
  thumbnailUrl: string;
}

export interface UpcomingDeadline {
  id: string;
  title: string;
  courseTitle: string;
  courseSlug: string;
  type: "quiz" | "milestone" | "live_session";
  dueDate: string;
  dueLabel: string;
  isUrgent?: boolean;
}

export interface Instructor {
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  totalStudents?: number;
  coursesCount?: number;
}

export interface CourseCatalogItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  category: CourseCategory;
  level: DifficultyLevel;
  durationHours: number;
  lessonsCount: number;
  rating: number;
  reviewCount: number;
  instructor: Instructor;
  isEnrolled: boolean;
  price?: string;
}

export interface CourseResource {
  id: string;
  title: string;
  type: "pdf" | "zip" | "github" | "link";
  size?: string;
  url: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  order: number;
  durationMinutes: number;
  type: "video" | "reading" | "quiz";
  isCompleted?: boolean;
  isCurrent?: boolean;
  isLocked?: boolean;
  isPreview?: boolean;
  videoUrl?: string;
  readingContent?: string;
  quizId?: string;
  resources?: CourseResource[];
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseDetail extends CourseCatalogItem {
  description: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  modules: CourseModule[];
  certificateAvailable: boolean;
  lastUpdated: string;
  language: string;
}

export interface EnrolledCourseItem {
  courseId: string;
  slug: string;
  title: string;
  thumbnailUrl: string;
  category: CourseCategory;
  instructorName: string;
  lastAccessedAt: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  nextLessonId?: string;
  nextLessonTitle?: string;
  isCompleted: boolean;
  certificateId?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  codeSnippet?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizDetail {
  id: string;
  title: string;
  courseTitle: string;
  courseSlug: string;
  moduleTitle: string;
  durationMinutes: number;
  passingScorePercentage: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  scorePercentage: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswersCount: number;
  timeSpentSeconds: number;
  answers: Record<string, string>; // questionId -> selectedOptionId
}

export interface CertificateItem {
  id: string;
  courseTitle: string;
  courseSlug: string;
  studentName: string;
  instructorName: string;
  issueDate: string;
  verificationCode: string;
  gradePercentage?: number;
  withDistinction?: boolean;
}

export interface StudentProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  headline: string;
  bio: string;
  targetSkills: string[];
}

export interface LearningPreferences {
  weeklyHoursGoal: number;
  reminderDays: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
  reminderTime: string; // e.g. "19:00"
  notifyAnnouncements: boolean;
  notifyDeadlines: boolean;
  notifyWeeklyDigest: boolean;
  notifyNewCourses: boolean;
}
