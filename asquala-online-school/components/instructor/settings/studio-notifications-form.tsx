"use client";

import React, { useState } from "react";
import { Bell, Save, CheckCircle2, ShieldCheck, Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationPreferences {
  enrollmentsEmail: boolean;
  enrollmentsApp: boolean;
  qaQuestionsEmail: boolean;
  qaQuestionsApp: boolean;
  reviewsEmail: boolean;
  payoutSms: boolean;
  academicAnnouncements: boolean;
}

interface StudioNotificationsFormProps {
  onSave: (prefs: NotificationPreferences) => void;
}

export function StudioNotificationsForm({ onSave }: StudioNotificationsFormProps) {
  const [prefs, setPrefs] = useState<NotificationPreferences>({
    enrollmentsEmail: true,
    enrollmentsApp: true,
    qaQuestionsEmail: true,
    qaQuestionsApp: true,
    reviewsEmail: true,
    payoutSms: true,
    academicAnnouncements: true,
  });

  const toggle = (key: keyof NotificationPreferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(prefs);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
        <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
          <Bell className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">
            Creator Studio Notifications &amp; Alerts
          </h3>
          <p className="text-xs text-muted-foreground">
            Choose what events trigger email, SMS, and in-app notifications
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Item 1: Enrollments */}
        <div className="p-4 rounded-xl border border-border bg-secondary/20 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              New Course Enrollments
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Receive alerts whenever a student purchases or enrolls in your courses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggle("enrollmentsEmail")}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
              prefs.enrollmentsEmail ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                prefs.enrollmentsEmail ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Item 2: Student Q&A */}
        <div className="p-4 rounded-xl border border-border bg-secondary/20 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Student Q&amp;A Questions
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Get notified immediately when learners post questions in lesson discussion threads.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggle("qaQuestionsEmail")}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
              prefs.qaQuestionsEmail ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                prefs.qaQuestionsEmail ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Item 3: Ratings & Reviews */}
        <div className="p-4 rounded-xl border border-border bg-secondary/20 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Student Ratings &amp; Reviews
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Email digest when students submit course reviews or star ratings.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggle("reviewsEmail")}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
              prefs.reviewsEmail ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                prefs.reviewsEmail ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Item 4: Telebirr / CBE Payout SMS */}
        <div className="p-4 rounded-xl border border-border bg-secondary/20 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <span>Financial Payout SMS Dispatches</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-primary-light text-primary">
                RECOMMENDED
              </span>
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Receive immediate SMS notifications when monthly withdrawal funds are sent to your Telebirr or CBE account.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggle("payoutSms")}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
              prefs.payoutSms ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                prefs.payoutSms ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Item 5: Academic Board Bulletins */}
        <div className="p-4 rounded-xl border border-border bg-secondary/20 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Asquala Academic Board Bulletins
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Updates regarding national accreditation standards, curriculum changes, and creator webinars.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggle("academicAnnouncements")}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
              prefs.academicAnnouncements ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                prefs.academicAnnouncements ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="pt-3 border-t border-border/80 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="gap-2 text-xs shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Notification Preferences</span>
        </Button>
      </div>
    </form>
  );
}
