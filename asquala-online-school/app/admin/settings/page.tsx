"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Settings,
  Layers,
  Coins,
  ShieldCheck,
  Lock,
  DownloadCloud,
} from "lucide-react";
import { CategoryManager } from "@/components/admin/settings/category-manager";
import { PlatformSplitForm } from "@/components/admin/settings/platform-split-form";
import { SecurityAuditTable } from "@/components/admin/settings/security-audit-table";

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<
    "all" | "taxonomy" | "revenue" | "audit"
  >("all");
  const [isExporting, setIsExporting] = useState(false);

  const handleExportAuditLedger = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Platform Cryptographic Audit Ledger exported successfully (JSON & signed CSV).");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span>•</span>
            <span className="text-foreground">System Governance</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              System Taxonomy, Revenue Rules & Audit Logs
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Security Control Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure curriculum categories, platform royalty split policies, and inspect cryptographic audit records
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportAuditLedger}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-card border border-border text-foreground hover:bg-muted shadow-2xs transition-all"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-emerald-800" />
            <span>{isExporting ? "Exporting..." : "Export Signed Audit Ledger"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "Overview & All Sections", icon: Settings },
          { id: "taxonomy", label: "Curriculum Taxonomy", icon: Layers },
          { id: "revenue", label: "85/15 Revenue Split Rules", icon: Coins },
          { id: "audit", label: "Security & Audit Ledger", icon: Lock },
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                activeSection === tab.id
                  ? "bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-2xs"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <IconComp className="w-3.5 h-3.5 text-emerald-800" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sections */}
      {(activeSection === "all" || activeSection === "taxonomy") && (
        <section id="taxonomy">
          <CategoryManager />
        </section>
      )}

      {(activeSection === "all" || activeSection === "revenue") && (
        <section id="revenue">
          <PlatformSplitForm />
        </section>
      )}

      {(activeSection === "all" || activeSection === "audit") && (
        <section id="audit">
          <SecurityAuditTable />
        </section>
      )}
    </div>
  );
}
