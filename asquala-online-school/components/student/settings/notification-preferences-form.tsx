"use client";

import React, { useState } from "react";
import {
  Bell,
  Mail,
  CheckCircle2,
  AlertCircle,
  Save,
  MessageSquare,
  CalendarCheck,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_LEARNING_PREFERENCES } from "@/lib/mock-student-data";

export function NotificationPreferencesForm() {
  const [notifyAnnouncements, setNotifyAnnouncements] = useState(
    MOCK_LEARNING_PREFERENCES.notifyAnnouncements
  );
  const [notifyDeadlines, setNotifyDeadlines] = useState(
    MOCK_LEARNING_PREFERENCES.notifyDeadlines
  );
  const [notifyWeeklyDigest, setNotifyWeeklyDigest] = useState(
    MOCK_LEARNING_PREFERENCES.notifyWeeklyDigest
  );
  const [notifyNewCourses, setNotifyNewCourses] = useState(
    MOCK_LEARNING_PREFERENCES.notifyNewCourses
  );
  const [emailFrequency, setEmailFrequency] = useState<
    "immediate" | "daily" | "weekly"
  >("daily");

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      setFeedback({
        type: "success",
        message: "Notification preferences saved successfully!",
      });

      setTimeout(() => {
        setFeedback(null);
      }, 4000);
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to update notification settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const notificationToggles = [
    {
      id: "announcements",
      title: "Course Announcements & Updates",
      description:
        "Instant notifications when instructors post new lessons, solution videos, or project updates.",
      icon: MessageSquare,
      checked: notifyAnnouncements,
      onChange: () => setNotifyAnnouncements(!notifyAnnouncements),
    },
    {
      id: "deadlines",
      title: "Upcoming Deadlines & Quiz Alerts",
      description:
        "Reminders 24 hours prior to scheduled assessments, assignment submissions, and weekly goals.",
      icon: CalendarCheck,
      checked: notifyDeadlines,
      onChange: () => setNotifyDeadlines(!notifyDeadlines),
    },
    {
      id: "weeklyDigest",
      title: "Weekly Learning Streak & Digest",
      description:
        "A personalized breakdown of total hours studied, lessons completed, and current active streak.",
      icon: TrendingUp,
      checked: notifyWeeklyDigest,
      onChange: () => setNotifyWeeklyDigest(!notifyWeeklyDigest),
    },
    {
      id: "newCourses",
      title: "Curated Course Recommendations",
      description:
        "Occasional suggestions for new certifications and courses tailored to your target skills.",
      icon: BookOpen,
      checked: notifyNewCourses,
      onChange: () => setNotifyNewCourses(!notifyNewCourses),
    },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border text-sm transition-all ${
            feedback.type === "success"
              ? "bg-primary-light/50 border-primary-border text-primary"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-primary" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-destructive" />
          )}
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}

      {/* Email & Alert Channels */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Notification Channels & Events
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Choose which events you want to be notified about via email and in-app alerts.
          </p>
        </div>

        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
          {notificationToggles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start sm:items-center justify-between gap-4 p-4 bg-card hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-secondary text-primary shrink-0 mt-0.5 sm:mt-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Accessible Emerald Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.checked}
                  onClick={item.onChange}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    item.checked ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      item.checked ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Email Summary Frequency */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email Frequency Preference
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            How often would you like to receive non-urgent email digests?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: "immediate",
              title: "Real-Time",
              sub: "Instant email as events happen",
            },
            {
              id: "daily",
              title: "Daily Digest",
              sub: "Consolidated morning briefing",
            },
            {
              id: "weekly",
              title: "Weekly Summary",
              sub: "Sent every Monday morning",
            },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                setEmailFrequency(
                  option.id as "immediate" | "daily" | "weekly"
                )
              }
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                emailFrequency === option.id
                  ? "bg-primary-light/60 border-primary-border shadow-xs ring-1 ring-primary/20"
                  : "bg-card border-border hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-semibold ${
                    emailFrequency === option.id
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {option.title}
                </span>
                {emailFrequency === option.id && (
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{option.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          className="shadow-sm gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Notification Preferences</span>
        </Button>
      </div>
    </form>
  );
}
