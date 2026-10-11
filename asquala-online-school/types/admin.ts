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
  institution: string;
  degreeTitle: string;
  yearsExperience: number;
  currentCompany: string;
  status: AccreditationApplicationStatus;
  statusNote?: string;
  submittedAt: string;
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
