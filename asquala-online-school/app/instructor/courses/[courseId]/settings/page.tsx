"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { getInstructorCourseSettings } from "@/lib/mock-instructor-data";
import { CourseSettingsData, CoursePublishStatus } from "@/types/instructor";
import { CourseBasicInfoForm } from "@/components/instructor/course-settings/course-basic-info-form";
import { CourseMediaUploader } from "@/components/instructor/course-settings/course-media-uploader";
import { LearningOutcomesEditor } from "@/components/instructor/course-settings/learning-outcomes-editor";
import { CoursePricingCard } from "@/components/instructor/course-settings/course-pricing-card";
import { CoursePublishPanel } from "@/components/instructor/course-settings/course-publish-panel";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";

export default function CourseSettingsPage() {
  const params = useParams();
  const courseId = typeof params?.courseId === "string" ? params.courseId : "";

  const [settings, setSettings] = useState<CourseSettingsData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  useEffect(() => {
    if (courseId) {
      const initialSettings = getInstructorCourseSettings(courseId);
      setSettings(initialSettings);
    }
  }, [courseId]);

  const handleUpdate = (fields: Partial<CourseSettingsData>) => {
    setSettings((prev) => (prev ? { ...prev, ...fields } : null));
  };

  const handleSave = () => {
    if (!settings) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Course settings and monetization options saved successfully!");
    }, 600);
  };

  const handleSubmitForReview = () => {
    if (!settings) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSettings((prev) => (prev ? { ...prev, status: "under_review" } : null));
      showToast("Course submitted for Academic Review! Our committee is auditing your materials.");
    }, 600);
  };

  const handleStatusChange = (nextStatus: CoursePublishStatus) => {
    if (!settings) return;
    setSettings((prev) => (prev ? { ...prev, status: nextStatus } : null));
    showToast(`Course status updated to ${nextStatus.replace("_", " ")}.`);
  };

  if (!settings) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-secondary/50 rounded-2xl border border-border" />
        <div className="h-64 bg-secondary/50 rounded-2xl border border-border" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>CONFIGURATION &amp; METADATA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Course Settings &amp; Pricing
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Configure course metadata, cover media, Ethiopian Birr (ETB) tuition, and peer review status.
        </p>
      </div>

      {/* 1. Basic Information */}
      <CourseBasicInfoForm
        title={settings.title}
        subtitle={settings.subtitle}
        description={settings.description}
        category={settings.category}
        level={settings.level}
        language={settings.language}
        certificateAvailable={settings.certificateAvailable}
        onChange={handleUpdate}
      />

      {/* 2. Media & Thumbnail */}
      <CourseMediaUploader
        thumbnailUrl={settings.thumbnailUrl}
        promotionalVideoUrl={settings.promotionalVideoUrl}
        onChange={handleUpdate}
      />

      {/* 3. Learning Outcomes & Prerequisites */}
      <LearningOutcomesEditor
        whatYouWillLearn={settings.whatYouWillLearn}
        prerequisites={settings.prerequisites}
        onChange={handleUpdate}
      />

      {/* 4. Monetization & Pricing */}
      <CoursePricingCard
        isPaid={settings.isPaid}
        priceETB={settings.priceETB}
        onChange={handleUpdate}
      />

      {/* 5. Publishing Panel */}
      <CoursePublishPanel
        status={settings.status}
        isSaving={isSaving}
        onSave={handleSave}
        onSubmitForReview={handleSubmitForReview}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
