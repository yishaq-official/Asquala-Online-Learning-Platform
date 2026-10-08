"use client";

import React, { useState, useCallback } from "react";
import { MOCK_APPROVED_INSTRUCTOR_APPLICATION } from "@/lib/mock-instructor-data";
import { InstructorApplication } from "@/types/instructor";

import { InstructorProfileForm } from "@/components/instructor/settings/instructor-profile-form";
import { VerifiedCredentialsCard } from "@/components/instructor/settings/verified-credentials-card";
import { SubmitNewCredentialModal } from "@/components/instructor/settings/submit-new-credential-modal";
import { StudioNotificationsForm } from "@/components/instructor/settings/studio-notifications-form";
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type SettingsTab = "profile" | "credentials" | "notifications";

export default function InstructorSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [appData, setAppData] = useState<InstructorApplication>(
    MOCK_APPROVED_INSTRUCTOR_APPLICATION
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  const handleSaveProfile = (profileData: {
    fullName: string;
    headline: string;
    bio: string;
    websiteUrl: string;
    linkedinUrl: string;
    githubUrl: string;
  }) => {
    setAppData((prev) => ({
      ...prev,
      ...profileData,
    }));
    showToast("Instructor profile successfully saved!");
  };

  const handleSubmitCredential = (credData: {
    type: "degree" | "certificate";
    title: string;
    institution: string;
    yearOrDate: string;
    documentName: string;
  }) => {
    if (credData.type === "degree") {
      setAppData((prev) => ({
        ...prev,
        education: [
          ...prev.education,
          {
            id: `edu-${Date.now()}`,
            degree: credData.title,
            institution: credData.institution,
            fieldOfStudy: credData.title,
            graduationYear: Number(credData.yearOrDate) || 2026,
            documentName: credData.documentName,
            isVerified: false,
          },
        ],
      }));
    } else {
      setAppData((prev) => ({
        ...prev,
        certifications: [
          ...prev.certifications,
          {
            id: `cert-${Date.now()}`,
            title: credData.title,
            issuingOrganization: credData.institution,
            issueDate: credData.yearOrDate,
            documentName: credData.documentName,
            isVerified: false,
          },
        ],
      }));
    }

    showToast(
      `"${credData.title}" was submitted to the Academic Review Board for accreditation!`
    );
  };

  const handleSaveNotifications = () => {
    showToast("Studio notification preferences saved!");
  };

  const tabs = [
    { id: "profile" as SettingsTab, label: "Public Profile", icon: User },
    {
      id: "credentials" as SettingsTab,
      label: "Verified Credentials",
      icon: ShieldCheck,
    },
    {
      id: "notifications" as SettingsTab,
      label: "Studio Alerts",
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
          <Settings className="w-3.5 h-3.5" />
          <span>ACCOUNT &amp; ACCREDITATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Profile &amp; Teaching Credentials
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Update your public instructor identity, verified university diplomas, and studio alert preferences.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 -mb-1 transition-all ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      {activeTab === "profile" && (
        <InstructorProfileForm
          fullName={appData.fullName}
          email={appData.email}
          phone={appData.phone}
          headline={appData.headline}
          bio={appData.bio}
          websiteUrl={appData.websiteUrl}
          linkedinUrl={appData.linkedinUrl}
          githubUrl={appData.githubUrl}
          onSave={handleSaveProfile}
        />
      )}

      {activeTab === "credentials" && (
        <VerifiedCredentialsCard
          education={appData.education}
          certifications={appData.certifications}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        />
      )}

      {activeTab === "notifications" && (
        <StudioNotificationsForm onSave={handleSaveNotifications} />
      )}

      {/* Submit Credential Modal */}
      <SubmitNewCredentialModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleSubmitCredential}
      />
    </div>
  );
}
