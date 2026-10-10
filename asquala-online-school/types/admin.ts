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
