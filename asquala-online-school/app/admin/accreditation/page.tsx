"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import {
  AccreditationFilters,
  AccreditationTab,
} from "@/components/admin/accreditation/accreditation-filters";
import { ApplicantCard } from "@/components/admin/accreditation/applicant-card";

export default function AccreditationQueuePage() {
  const { teacherDossiers } = useAdminUiStore();
  const dossiersList = useMemo(() => Object.values(teacherDossiers), [teacherDossiers]);

  const [activeTab, setActiveTab] = useState<AccreditationTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: dossiersList.length,
      pending: dossiersList.filter((d) => d.status === "pending").length,
      action_required: dossiersList.filter((d) => d.status === "action_required").length,
      approved: dossiersList.filter((d) => d.status === "approved").length,
      rejected: dossiersList.filter((d) => d.status === "rejected").length,
    };
  }, [dossiersList]);

  // Filtered applicants
  const filteredDossiers = useMemo(() => {
    return dossiersList.filter((d) => {
      // Tab filter
      if (activeTab === "pending" && d.status !== "pending") return false;
      if (activeTab === "action_required" && d.status !== "action_required") return false;
      if (activeTab === "approved" && d.status !== "approved") return false;
      if (activeTab === "rejected" && d.status !== "rejected") return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = d.name.toLowerCase().includes(query);
        const matchesInst = d.institution.toLowerCase().includes(query);
        const matchesDegree = d.degreeTitle.toLowerCase().includes(query);
        const matchesSpec = d.specialty.toLowerCase().includes(query);
        const matchesCompany = d.currentCompany.toLowerCase().includes(query);
        return matchesName || matchesInst || matchesDegree || matchesSpec || matchesCompany;
      }

      return true;
    });
  }, [dossiersList, activeTab, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-3xl bg-linear-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Higher Education Accreditation Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Teacher Evidence & Accreditation Queue
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Audit applicant university transcripts (AAiT, AASTU, JU), verify 3+ years production engineering tenure, and grant Verified Educator licenses.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <div className="text-center px-2">
              <span className="block text-xl font-bold text-white">
                {counts.pending + counts.action_required}
              </span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                Needs Action
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/20" />
            <div className="text-center px-2">
              <span className="block text-xl font-bold text-white">
                {counts.approved}
              </span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                Accredited
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <AccreditationFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
      />

      {/* Applicant Cards Grid */}
      {filteredDossiers.length === 0 ? (
        <div className="p-12 text-center bg-card border border-border rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            No dossiers match your criteria
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different status filter tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDossiers.map((dossier) => (
            <ApplicantCard key={dossier.id} dossier={dossier} />
          ))}
        </div>
      )}
    </div>
  );
}
