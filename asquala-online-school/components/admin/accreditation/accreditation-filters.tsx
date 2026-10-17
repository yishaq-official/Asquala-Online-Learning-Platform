"use client";

import React from "react";
import { Search, X, Filter, Award, Clock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export type AccreditationTab = "all" | "pending" | "action_required" | "approved" | "rejected";

interface AccreditationFiltersProps {
  activeTab: AccreditationTab;
  onTabChange: (tab: AccreditationTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    pending: number;
    action_required: number;
    approved: number;
    rejected: number;
  };
}

export function AccreditationFilters({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  counts,
}: AccreditationFiltersProps) {
  const tabs: Array<{
    id: AccreditationTab;
    label: string;
    count: number;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "all", label: "All Dossiers", count: counts.all, icon: Filter },
    { id: "pending", label: "Under Review", count: counts.pending, icon: Clock },
    { id: "action_required", label: "Action Required", count: counts.action_required, icon: AlertTriangle },
    { id: "approved", label: "Accredited", count: counts.approved, icon: CheckCircle2 },
    { id: "rejected", label: "Rejected", count: counts.rejected, icon: XCircle },
  ];

  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by candidate name, university (AAiT, AASTU, JU), or engineering specialty..."
          className="pl-10 pr-9 text-xs py-2.5 bg-card"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-2.5 p-1 text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-secondary text-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
