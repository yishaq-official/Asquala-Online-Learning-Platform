"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Search,
  Hash,
  Copy,
  Check,
  Lock,
  Calendar,
  Layers,
  Coins,
  FileCheck,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import { SecurityAuditLogEntry, SecurityAuditActionType } from "@/types/admin";
import { useAdminUiStore } from "@/stores/admin-ui-store";

export function SecurityAuditTable() {
  const { securityAuditLogs } = useAdminUiStore();

  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "accreditation" | "payout" | "course" | "security"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    return securityAuditLogs.filter((log) => {
      // Category filter
      if (categoryFilter === "accreditation") {
        if (!log.actionType.startsWith("accreditation")) return false;
      } else if (categoryFilter === "payout") {
        if (log.actionType !== "payout_settled") return false;
      } else if (categoryFilter === "course") {
        if (!log.actionType.startsWith("course")) return false;
      } else if (categoryFilter === "security") {
        if (
          !log.actionType.startsWith("user") &&
          log.actionType !== "policy_updated" &&
          log.actionType !== "category_created"
        ) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesActor = log.actorName.toLowerCase().includes(query);
        const matchesTarget = log.targetEntity.toLowerCase().includes(query) || log.targetId.toLowerCase().includes(query);
        const matchesSummary = log.summary.toLowerCase().includes(query);
        const matchesHash = log.cryptoHash.toLowerCase().includes(query);
        if (!matchesActor && !matchesTarget && !matchesSummary && !matchesHash) {
          return false;
        }
      }

      return true;
    });
  }, [securityAuditLogs, categoryFilter, searchQuery]);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getActionBadge = (type: SecurityAuditActionType) => {
    switch (type) {
      case "accreditation_approved":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-950 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-700" />
            Accreditation Approved
          </span>
        );
      case "payout_settled":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-950 border border-emerald-200">
            <Coins className="w-3 h-3 text-emerald-700" />
            Payout Settled
          </span>
        );
      case "course_published":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300">
            <FileCheck className="w-3 h-3 text-emerald-800" />
            Course Published
          </span>
        );
      case "course_revision":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Revision Flagged
          </span>
        );
      case "user_suspended":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-900 border border-rose-200">
            <Lock className="w-3 h-3 text-rose-600" />
            Account Suspended
          </span>
        );
      case "policy_updated":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-950 border border-emerald-200">
            <Coins className="w-3 h-3 text-emerald-700" />
            Policy Ratified
          </span>
        );
      case "category_created":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-950 border border-emerald-200">
            <Layers className="w-3 h-3 text-emerald-700" />
            Taxonomy Added
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
            Governance Event
          </span>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl shadow-2xs overflow-hidden">
      {/* Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-800" />
              Immutable Cryptographic Security & Governance Ledger
            </h2>
            <p className="text-xs text-muted-foreground">
              Real-time SHA-256 verifiable audit records for compliance, payouts, and board accreditations
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Cryptographically Verified</span>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "all", label: "All Events" },
              { id: "accreditation", label: "Accreditation" },
              { id: "payout", label: "Disbursements" },
              { id: "course", label: "Course Publishing" },
              { id: "security", label: "Security & Policy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  categoryFilter === tab.id
                    ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search audit ledger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="py-3 px-6">Timestamp & IP</th>
              <th className="py-3 px-4">Auditor Actor</th>
              <th className="py-3 px-4">Classification</th>
              <th className="py-3 px-4">Target Resource</th>
              <th className="py-3 px-4">Summary Narrative</th>
              <th className="py-3 px-6 text-right">Cryptographic Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-muted-foreground">
                  <div className="max-w-xs mx-auto space-y-2">
                    <p className="font-semibold text-foreground">No ledger entries match query</p>
                    <p className="text-[11px]">
                      Try clearing search parameters or switching event filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  {/* Timestamp & IP */}
                  <td className="py-4 px-6">
                    <p className="font-bold text-foreground">{log.timestamp}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {log.ipAddress}
                    </p>
                  </td>

                  {/* Auditor Actor */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border shrink-0">
                        <Image
                          src={log.actorAvatar}
                          alt={log.actorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-xs">{log.actorName}</p>
                        <p className="text-[10px] text-muted-foreground">{log.actorRole}</p>
                      </div>
                    </div>
                  </td>

                  {/* Classification */}
                  <td className="py-4 px-4">{getActionBadge(log.actionType)}</td>

                  {/* Target Entity */}
                  <td className="py-4 px-4">
                    <p className="font-semibold text-foreground">{log.targetEntity}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {log.targetId}
                    </p>
                  </td>

                  {/* Narrative Summary */}
                  <td className="py-4 px-4 max-w-xs">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {log.summary}
                    </p>
                  </td>

                  {/* Cryptographic Hash */}
                  <td className="py-4 px-6 text-right">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-muted/60 px-2 py-1 rounded border border-border">
                      <Hash className="w-3 h-3 text-emerald-800" />
                      <span>{log.cryptoHash.slice(0, 16)}...</span>
                      <button
                        onClick={() => handleCopyHash(log.cryptoHash)}
                        className="text-muted-foreground hover:text-foreground transition-colors ml-1"
                        title="Copy full SHA-256 hash"
                      >
                        {copiedHash === log.cryptoHash ? (
                          <Check className="w-3 h-3 text-emerald-700" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-xs">
            No audit records found.
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-semibold">
                  {log.timestamp}
                </span>
                {getActionBadge(log.actionType)}
              </div>

              <div>
                <p className="font-bold text-foreground text-xs">{log.targetEntity}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{log.targetId}</p>
              </div>

              <p className="text-xs text-muted-foreground">{log.summary}</p>

              <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground">
                <span>By {log.actorName}</span>
                <button
                  onClick={() => handleCopyHash(log.cryptoHash)}
                  className="font-mono text-emerald-800 flex items-center gap-1 hover:underline"
                >
                  <Hash className="w-3 h-3" />
                  <span>Copy SHA-256</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
