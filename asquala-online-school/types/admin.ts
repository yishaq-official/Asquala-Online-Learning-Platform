export type AdminRole =
  | "super_admin"
  | "academic_chair"
  | "curriculum_auditor"
  | "treasury_auditor";

export interface AdminAuditor {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  roleTitle: string;
  department: string;
  avatarUrl?: string;
  twoFactorEnabled: boolean;
  lastActive: string;
}

export interface AdminAuditCounts {
  pendingAccreditations: number;
  pendingCourseReviews: number;
  pendingPayoutSettlements: number;
  flaggedDisputes: number;
}

export type ReviewDecision = "approve" | "reject" | "request_revision";

export interface SystemAuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetResource: string;
  ipAddress: string;
  severity: "info" | "warning" | "critical";
}

export interface ExecutiveKpiData {
  grossGmv: number;
  gmvGrowthPercent: number;
  platformTakeRateRevenue: number;
  takeRateGrowthPercent: number;
  activeLearners: number;
  learnersGrowthPercent: number;
  accreditedTeachers: number;
  pendingAccreditationsCount: number;
}

export type AccreditationApplicationStatus =
  | "pending"
  | "action_required"
  | "approved"
  | "rejected";

export interface TeacherApplicationPreview {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  specialty?: string;
  institution: string;
  degreeTitle: string;
  yearsExperience: number;
  currentCompany: string;
  status: AccreditationApplicationStatus;
  statusNote?: string;
  submittedAt: string;
}

export interface DegreeRecord {
  id: string;
  institution: string;
  degreeLevel: "B.Sc." | "M.Sc." | "Ph.D." | "Postgrad Diploma";
  fieldOfStudy: string;
  graduationYear: number;
  documentScanName: string;
  documentScanSize: string;
  registrarVerificationId: string;
  verificationSealStatus: "verified" | "flagged_illegible" | "pending";
  scanNotes?: string;
}

export interface ExperienceRecord {
  id: string;
  role: string;
  organization: string;
  years: number;
  period: string;
  highlights: string[];
  academicReference?: {
    name: string;
    contact: string;
    title: string;
    institution: string;
  };
}

export interface CertificationRecord {
  id: string;
  title: string;
  issuer: string;
  credentialId: string;
  issueDate: string;
  verificationUrl?: string;
}

export interface AuditionLecture {
  title: string;
  durationMinutes: number;
  videoUrl: string;
  topicsCovered: string[];
}

export interface CandidateIdentity {
  fullName: string;
  officialEmail: string;
  phone: string;
  location: string;
  nationalIdVerified: boolean;
  nationalIdNumberMasked: string;
  linkedInUrl?: string;
  gitHubUrl?: string;
  portfolioUrl?: string;
}

export interface TeacherDossier {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  specialty: string;
  institution: string;
  degreeTitle: string;
  yearsExperience: number;
  currentCompany: string;
  status: AccreditationApplicationStatus;
  statusNote?: string;
  submittedAt: string;
  degrees: DegreeRecord[];
  experience: ExperienceRecord[];
  certifications: CertificationRecord[];
  auditionLecture: AuditionLecture;
  identity: CandidateIdentity;
  boardRulingHistory?: Array<{
    date: string;
    ruling: AccreditationApplicationStatus;
    auditor: string;
    notes: string;
  }>;
}

export type CoursePublicationStatus =
  | "pending_review"
  | "in_audit"
  | "approved"
  | "revision_requested"
  | "rejected";

export interface CourseModuleAudit {
  id: string;
  moduleIndex: number;
  title: string;
  lessonsCount: number;
  durationMinutes: number;
  hasMilestoneQuiz: boolean;
  quizQuestionsCount?: number;
  quizPassingThreshold?: number;
  sampleVideoTitle?: string;
  sampleVideoQuality?: string;
}

export interface CourseAuditDetail {
  id: string;
  title: string;
  subtitle: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  instructorTitle: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  language: "Amharic & English" | "Amharic" | "English";
  priceETB: number;
  instructorRoyaltyETB: number; // 85%
  platformTakeRateETB: number;  // 15%
  status: CoursePublicationStatus;
  statusNote?: string;
  submittedAt: string;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: CourseModuleAudit[];
  totalModules: number;
  totalLessons: number;
  totalDurationHours: number;
  totalQuizzes: number;
  passingThresholdPercent: number; // 80% or 85%
  videoQuality: string; // e.g. "1080p Full HD"
  starterFilesIncluded: boolean;
  boardRulingHistory?: Array<{
    date: string;
    ruling: CoursePublicationStatus;
    auditor: string;
    notes: string;
  }>;
}

export interface CourseReviewPreview {
  id: string;
  title: string;
  instructorName: string;
  instructorAvatar: string;
  category: string;
  modulesCount: number;
  lessonsCount: number;
  durationHours: number;
  quizCount: number;
  priceETB: number;
  status: CoursePublicationStatus;
  statusNote?: string;
  submittedAt: string;
}

export interface TreasuryClearancePreview {
  totalPendingETB: number;
  totalPendingCount: number;
  telebirrPendingETB: number;
  telebirrCount: number;
  cbePendingETB: number;
  cbeCount: number;
  lastSettlementBatchId: string;
  lastSettlementTime: string;
}

export interface PlatformAuditItem {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  status: "approved" | "flagged" | "settled" | "rejected";
}

export type PayoutChannel = "telebirr" | "cbe";

export type PayoutStatus = "pending" | "settled" | "flagged";

export interface PayoutTransaction {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  instructorAvatar: string;
  amountETB: number;
  channel: PayoutChannel;
  telebirrPhone?: string;
  cbeAccountNumber?: string;
  cbeAccountName?: string;
  cbeBranch?: string;
  status: PayoutStatus;
  requestedAt: string;
  settledAt?: string;
  settledBy?: string;
  transactionRefId?: string;
  notes?: string;
}

export interface TreasurySummaryStats {
  totalPendingETB: number;
  totalPendingCount: number;
  telebirrPendingETB: number;
  telebirrCount: number;
  cbePendingETB: number;
  cbeCount: number;
  settledThisMonthETB: number;
  settledCount: number;
}

export type PlatformUserRole =
  | "student"
  | "instructor"
  | "academic_auditor"
  | "treasury_auditor"
  | "super_admin";

export type PlatformUserStatus = "active" | "suspended" | "pending_verification";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: PlatformUserRole;
  isAccreditedTeacher: boolean;
  institution?: string;
  status: PlatformUserStatus;
  joinedAt: string;
  activityMetric: string;
  lastActive: string;
  phone?: string;
  department?: string;
}

export interface UserDirectorySummaryStats {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  accreditedInstructors: number;
  totalAdmins: number;
  suspendedUsers: number;
}

export interface CurriculumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  courseCount: number;
  popularTags: string[];
  isActive: boolean;
}

export interface PlatformRevenuePolicy {
  instructorRoyaltyPercent: number; // default 85
  platformTakeRatePercent: number;  // default 15
  minimumWithdrawalETB: number;     // default 500
  payoutSchedule: "instant" | "weekly" | "monthly";
  telebirrFeeCoveredByPlatform: boolean;
  lastUpdated: string;
  updatedBy: string;
}

export type SecurityAuditActionType =
  | "accreditation_approved"
  | "accreditation_rejected"
  | "accreditation_revision"
  | "payout_settled"
  | "course_published"
  | "course_revision"
  | "user_suspended"
  | "user_reactivated"
  | "policy_updated"
  | "category_created";

export interface SecurityAuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  actorAvatar: string;
  actionType: SecurityAuditActionType;
  targetEntity: string;
  targetId: string;
  summary: string;
  cryptoHash: string;
  ipAddress: string;
}



