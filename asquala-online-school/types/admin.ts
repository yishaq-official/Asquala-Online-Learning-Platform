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
  | "revision_requested";

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
