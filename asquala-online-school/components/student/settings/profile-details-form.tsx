"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Camera,
  Trash2,
  CheckCircle2,
  Plus,
  X,
  AlertCircle,
  Sparkles,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { MOCK_STUDENT_PROFILE } from "@/lib/mock-student-data";

const SUGGESTED_SKILLS = [
  "Next.js 16",
  "TypeScript",
  "PostgreSQL",
  "Drizzle ORM",
  "Tailwind CSS",
  "Docker",
  "Python",
  "GraphQL",
  "REST APIs",
  "System Design",
];

export function ProfileDetailsForm() {
  const { data: session } = authClient.useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState(MOCK_STUDENT_PROFILE.name);
  const [email, setEmail] = useState(MOCK_STUDENT_PROFILE.email);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    MOCK_STUDENT_PROFILE.avatarUrl || null
  );
  const [headline, setHeadline] = useState(MOCK_STUDENT_PROFILE.headline);
  const [bio, setBio] = useState(MOCK_STUDENT_PROFILE.bio);
  const [targetSkills, setTargetSkills] = useState<string[]>(
    MOCK_STUDENT_PROFILE.targetSkills
  );
  const [newSkillInput, setNewSkillInput] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Initialize with session user if logged in
  useEffect(() => {
    if (session?.user) {
      if (session.user.name) setName(session.user.name);
      if (session.user.email) setEmail(session.user.email);
      if (session.user.image) setAvatarUrl(session.user.image);
    }
  }, [session]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setAvatarUrl(tempUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (targetSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      return;
    }
    setTargetSkills((prev) => [...prev, trimmed]);
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setTargetSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFeedback({
        type: "error",
        message: "Full name cannot be empty.",
      });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      // Simulate save delay / server update
      await new Promise((resolve) => setTimeout(resolve, 800));

      setFeedback({
        type: "success",
        message: "Your profile details have been saved successfully!",
      });

      // Clear alert after 4s
      setTimeout(() => {
        setFeedback(null);
      }, 4000);
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Avatar Section */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs">
        <h2 className="text-base font-semibold text-foreground mb-1">
          Profile Photo
        </h2>
        <p className="text-xs text-muted-foreground mb-5">
          This image will be displayed on your certificates, forum discussions,
          and public student profile.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="relative w-20 h-20 rounded-full border-2 border-border overflow-hidden bg-secondary shrink-0 shadow-xs flex items-center justify-center">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="text-xl font-bold text-primary">{initials}</span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Camera className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Upload New Photo</span>
              </Button>

              {avatarUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended: Square JPG, PNG, or WebP. Max size: 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-5">
        <h2 className="text-base font-semibold text-foreground">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full-name" required>
              Full Name
            </Label>
            <Input
              id="full-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              required
            />
            <p className="text-xs text-muted-foreground">
              Official name printed on verified course certificates.
            </p>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email Address</Label>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary-border">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="bg-secondary/40 text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Used for account sign-in, order receipts, and urgent alerts.
            </p>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <Label htmlFor="headline">Professional Headline / Learning Goal</Label>
          <Input
            id="headline"
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Aspiring Full-Stack Engineer | Computer Science Student"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio">About Me (Bio)</Label>
            <span className="text-xs text-muted-foreground">
              {bio.length}/350
            </span>
          </div>
          <textarea
            id="bio"
            rows={3}
            maxLength={350}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell instructors and fellow peers about your learning journey..."
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      {/* Target Skills & Technologies */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Target Skills & Technologies
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add technologies you want to master. We use this to tailor course
            recommendations and career pathways.
          </p>
        </div>

        {/* Active Skills Badges */}
        <div className="flex flex-wrap items-center gap-2 min-h-[38px] p-2.5 rounded-lg border border-border bg-secondary/20">
          {targetSkills.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">
              No skills added yet. Select or type below to add.
            </span>
          ) : (
            targetSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-light text-primary border border-primary-border shadow-2xs"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="p-0.5 rounded-full hover:bg-primary/15 transition-colors cursor-pointer"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Add Skill Input */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill(newSkillInput);
              }
            }}
            placeholder="Type a skill (e.g. Next.js, Rust, Docker) and press Enter"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => handleAddSkill(newSkillInput)}
            disabled={!newSkillInput.trim()}
            className="shrink-0 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-xs font-medium text-muted-foreground block mb-2">
            Popular suggestions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_SKILLS.filter(
              (skill) =>
                !targetSkills.some(
                  (s) => s.toLowerCase() === skill.toLowerCase()
                )
            ).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSkill(skill)}
                className="text-xs px-2.5 py-1 rounded-md bg-secondary hover:bg-border/60 text-muted-foreground hover:text-foreground border border-border/70 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-muted-foreground" />
                {skill}
              </button>
            ))}
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
          <span>Save Profile Changes</span>
        </Button>
      </div>
    </form>
  );
}
