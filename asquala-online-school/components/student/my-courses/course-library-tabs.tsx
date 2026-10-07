"use client";

import * as React from "react";

export type LibraryTab = "all" | "in_progress" | "completed";

interface CourseLibraryTabsProps {
  activeTab: LibraryTab;
  onTabChange: (tab: LibraryTab) => void;
  counts: {
    all: number;
    inProgress: number;
    completed: number;
  };
}

export function CourseLibraryTabs({
  activeTab,
  onTabChange,
  counts,
}: CourseLibraryTabsProps) {
  const tabs: { id: LibraryTab; label: string; count: number }[] = [
    { id: "all", label: "All Courses", count: counts.all },
    { id: "in_progress", label: "In Progress", count: counts.inProgress },
    { id: "completed", label: "Completed", count: counts.completed },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-xl border border-border w-fit overflow-x-auto max-w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              isActive
                ? "bg-card text-foreground shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                isActive
                  ? "bg-primary-light text-primary border border-primary-border"
                  : "bg-muted text-muted-foreground"
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
