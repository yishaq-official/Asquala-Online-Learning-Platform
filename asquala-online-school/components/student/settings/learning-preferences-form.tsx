"use client";

import React, { useState } from "react";
import {
  Target,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  Flame,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MOCK_LEARNING_PREFERENCES } from "@/lib/mock-student-data";

const DAYS_OF_WEEK = [
  { key: "Mon", label: "Monday", short: "M" },
  { key: "Tue", label: "Tuesday", short: "T" },
  { key: "Wed", label: "Wednesday", short: "W" },
  { key: "Thu", label: "Thursday", short: "T" },
  { key: "Fri", label: "Friday", short: "F" },
  { key: "Sat", label: "Saturday", short: "S" },
  { key: "Sun", label: "Sunday", short: "S" },
];

const PRESET_HOURS = [2, 5, 8, 12, 16];

const TIME_PRESETS = [
  { label: "Morning (08:00 AM)", value: "08:00" },
  { label: "Midday (12:30 PM)", value: "12:30" },
  { label: "Evening (07:00 PM)", value: "19:00" },
  { label: "Night (09:30 PM)", value: "21:30" },
];

export function LearningPreferencesForm() {
  const [weeklyHoursGoal, setWeeklyHoursGoal] = useState<number>(
    MOCK_LEARNING_PREFERENCES.weeklyHoursGoal
  );
  const [reminderDays, setReminderDays] = useState<string[]>(
    MOCK_LEARNING_PREFERENCES.reminderDays
  );
  const [reminderTime, setReminderTime] = useState<string>(
    MOCK_LEARNING_PREFERENCES.reminderTime
  );

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const toggleDay = (dayKey: string) => {
    setReminderDays((prev) => {
      if (prev.includes(dayKey)) {
        // Prevent deselecting all days
        if (prev.length === 1) return prev;
        return prev.filter((d) => d !== dayKey);
      } else {
        return [...prev, dayKey];
      }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    try {
      // Simulate save delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      setFeedback({
        type: "success",
        message: "Learning goals and study schedule updated successfully!",
      });

      setTimeout(() => {
        setFeedback(null);
      }, 4000);
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to update learning goals. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate approximate daily minutes
  const activeDaysCount = Math.max(reminderDays.length, 1);
  const dailyMinutes = Math.round((weeklyHoursGoal * 60) / activeDaysCount);

  const getPaceLabel = (hours: number) => {
    if (hours <= 3) return { label: "Casual Pace", color: "text-muted-foreground" };
    if (hours <= 7) return { label: "Consistent Learner", color: "text-primary" };
    if (hours <= 12) return { label: "Accelerated Mastery", color: "text-emerald-700 font-semibold" };
    return { label: "Full-Time Intensive", color: "text-emerald-800 font-bold" };
  };

  const pace = getPaceLabel(weeklyHoursGoal);

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Feedback Alert */}
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

      {/* Weekly Hours Goal */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Weekly Study Target
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set how many hours you plan to spend learning each week.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {weeklyHoursGoal}
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              hours / wk
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3">
          <input
            type="range"
            min={1}
            max={25}
            step={1}
            value={weeklyHoursGoal}
            onChange={(e) => setWeeklyHoursGoal(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />

          {/* Quick preset buttons */}
          <div className="flex items-center justify-between gap-1.5 pt-1">
            {PRESET_HOURS.map((hrs) => (
              <button
                key={hrs}
                type="button"
                onClick={() => setWeeklyHoursGoal(hrs)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  weeklyHoursGoal === hrs
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "bg-secondary hover:bg-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {hrs} hrs
              </button>
            ))}
          </div>
        </div>

        {/* Pace and daily breakdown badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-secondary/30 border border-border text-xs">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary shrink-0" />
            <span className="text-foreground">
              Study Rhythm:{" "}
              <span className={pace.color}>{pace.label}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>
              ~{dailyMinutes} mins / day across {activeDaysCount} scheduled days
            </span>
          </div>
        </div>
      </div>

      {/* Study Days Cadence */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Active Study Days
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select the days when you would like to receive study session reminders.
          </p>
        </div>

        {/* Day toggle buttons */}
        <div className="grid grid-cols-7 gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = reminderDays.includes(day.key);
            return (
              <button
                key={day.key}
                type="button"
                onClick={() => toggleDay(day.key)}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs scale-[1.02]"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
                }`}
              >
                <span className="text-xs font-bold sm:hidden">{day.short}</span>
                <span className="text-xs font-bold hidden sm:inline">
                  {day.key}
                </span>
                <span
                  className={`text-[10px] hidden md:inline mt-0.5 ${
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {isSelected ? "Active" : "Off"}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Tip: Studying even 20 minutes across 5 days yields significantly higher retention than cramming.
        </p>
      </div>

      {/* Reminder Time */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Daily Study Reminder Time
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            When during the day would you like to receive your reminder notification?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="reminder-time">Custom Reminder Time</Label>
            <input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Quick Time Presets</Label>
            <div className="grid grid-cols-2 gap-1.5">
              {TIME_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setReminderTime(preset.value)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left truncate transition-colors cursor-pointer border ${
                    reminderTime === preset.value
                      ? "bg-primary-light border-primary-border text-primary font-semibold"
                      : "bg-secondary/40 border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
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
          <span>Update Goals & Schedule</span>
        </Button>
      </div>
    </form>
  );
}
