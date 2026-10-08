"use client";

import React from "react";
import { CoursePublishStatus } from "@/types/instructor";

export type FilterStatusTab = "all" | CoursePublishStatus;

interface CourseStatusTabsProps {
  activeTab: FilterStatusTab;
  onTabChange: (tab: FilterStatusTab) => void;
  counts: {
    all: number;
    published: number;
    draft: number;
    under_review: number;
    archived: number;
  };
}

export function CourseStatusTabs({
  activeTab,
  onTabChange,
  counts,
}: CourseStatusTabsProps) {
  const tabs: { id: FilterStatusTab; label: string; count: number }[] = [
    { id: "all", label: "All Courses", count: counts.all },
    { id: "published", label: "Published", count: counts.published },
    { id: "draft", label: "Drafts", count: counts.draft },
    { id: "under_review", label: "Under Review", count: counts.under_review },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
