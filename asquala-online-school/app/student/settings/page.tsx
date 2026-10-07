"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Settings, Shield, Sparkles } from "lucide-react";
import {
  SettingsNavTabs,
  type SettingsTab,
} from "@/components/student/settings/settings-nav-tabs";
import { ProfileDetailsForm } from "@/components/student/settings/profile-details-form";
import { LearningPreferencesForm } from "@/components/student/settings/learning-preferences-form";
import { AccountSecurityForm } from "@/components/student/settings/account-security-form";
import { NotificationPreferencesForm } from "@/components/student/settings/notification-preferences-form";

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as SettingsTab | null;
  const initialTab: SettingsTab =
    tabParam === "goals" ||
    tabParam === "security" ||
    tabParam === "notifications"
      ? tabParam
      : "profile";

  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);

  useEffect(() => {
    if (
      tabParam &&
      (tabParam === "profile" ||
        tabParam === "goals" ||
        tabParam === "security" ||
        tabParam === "notifications")
    ) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    router.replace(`/student/settings?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
            <Settings className="w-3.5 h-3.5" />
            <span>ACCOUNT &amp; PREFERENCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Settings &amp; Learning Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Manage your personal profile, calibrate your weekly study targets,
            keep your credentials secure, and configure notifications.
          </p>
        </div>

        {/* Quick status pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-xs text-muted-foreground shrink-0 shadow-2xs">
          <Shield className="w-4 h-4 text-primary" />
          <span>Verified Student Account</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <SettingsNavTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Active Tab Content Area */}
      <div className="transition-all duration-200">
        {activeTab === "profile" && <ProfileDetailsForm />}
        {activeTab === "goals" && <LearningPreferencesForm />}
        {activeTab === "security" && <AccountSecurityForm />}
        {activeTab === "notifications" && <NotificationPreferencesForm />}
      </div>
    </div>
  );
}

export default function StudentSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-20 bg-card border border-border rounded-xl" />
          <div className="h-14 bg-card border border-border rounded-xl" />
          <div className="h-96 bg-card border border-border rounded-xl" />
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}
