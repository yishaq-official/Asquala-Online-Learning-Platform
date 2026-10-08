export type InstructorApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "action_required"
  | "rejected";

export interface EducationRecord {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: number;
  documentUrl?: string;
  documentName?: string;
  isVerified?: boolean;
}

export interface ExperienceRecord {
  id: string;
  role: string;
  organization: string;
  yearsOfExperience: number;
  isTeachingRole: boolean;
  description: string;
}

export interface CertificateRecord {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  documentUrl?: string;
  documentName?: string;
  isVerified?: boolean;
}

export interface InstructorApplication {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  primarySubject: string;
  targetAudience: string;
  status: InstructorApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
  education: EducationRecord[];
  experience: ExperienceRecord[];
  certifications: CertificateRecord[];
  sampleVideoUrl?: string;
}

export type CoursePublishStatus =
  | "draft"
  | "under_review"
  | "published"
  | "archived";

export interface InstructorCourseItem {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  category: string;
  status: CoursePublishStatus;
  price: number; // in ETB (0 for free)
  enrolledStudentsCount: number;
  averageRating: number;
  reviewsCount: number;
  totalLessonsCount: number;
  totalDurationMinutes: number;
  publishedAt?: string;
  lastUpdatedAt: string;
}

export interface InstructorStatKPIs {
  totalRevenueETB: number;
  revenueThisMonthETB: number;
  totalStudentsCount: number;
  activeStudentsThisWeek: number;
  averageRating: number;
  totalReviewsCount: number;
  publishedCoursesCount: number;
  draftCoursesCount: number;
}

export type CourseDifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
export type CourseLanguage = "English" | "Amharic" | "Afaan Oromoo";

export interface CourseSettingsData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: CourseDifficultyLevel;
  language: CourseLanguage;
  thumbnailUrl: string;
  promotionalVideoUrl?: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  isPaid: boolean;
  priceETB: number;
  status: CoursePublishStatus;
  certificateAvailable: boolean;
}

