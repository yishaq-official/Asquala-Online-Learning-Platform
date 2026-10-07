"use client";

import React from "react";
import { User, Target, ShieldCheck, Bell } from "lucide-react";

export type SettingsTab = "profile" | "goals" | "security" | "notifications";

interface SettingsNavTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

interface TabItem {
  id: SettingsTab;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  {
    id: "profile",
    label: "Profile Details",
    description: "Avatar, bio & target skills",
    icon: User,
  },
  {
    id: "goals",
    label: "Learning Goals",
    description: "Study hours & reminder cadence",
    icon: Target,
  },
  {
    id: "security",
    label: "Account & Security",
    description: "Password & active devices",
    icon: ShieldCheck,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts & email preferences",
    icon: Bell,
  },
];

export function SettingsNavTabs({
  activeTab,
  onTabChange,
}: SettingsNavTabsProps) {
  return (
    <div className="w-full border-b border-border bg-card/60 rounded-xl p-1.5 md:p-2 shadow-xs">
      <nav
        className="grid grid-cols-2 lg:grid-cols-4 gap-1.5"
        aria-label="Settings Navigation"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all cursor-pointer ${
                isActive
                  ? "bg-card text-foreground shadow-xs border border-primary/20 ring-1 ring-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
              }`}
            >
              <div
                className={`p-2 rounded-md shrink-0 transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground group-hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div
                  className={`text-sm font-semibold truncate ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {tab.label}
                </div>
                <div className="text-xs text-muted-foreground truncate hidden sm:block">
                  {tab.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
