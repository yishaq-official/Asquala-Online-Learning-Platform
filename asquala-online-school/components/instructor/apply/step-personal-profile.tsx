"use client";

import React from "react";
import { ArrowRight, User, Mail, Phone, Lock, Globe, Link2, Code2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface PersonalProfileData {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  headline: string;
  bio: string;
  websiteUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

interface StepPersonalProfileProps {
  data: PersonalProfileData;
  onChange: (data: Partial<PersonalProfileData>) => void;
  onNext: () => void;
  isExistingUser?: boolean;
}

export function StepPersonalProfile({
  data,
  onChange,
  onNext,
  isExistingUser = false,
}: StepPersonalProfileProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.fullName.trim()) errs.fullName = "Full name is required.";
    if (!data.email.trim() || !data.email.includes("@")) {
      errs.email = "A valid email address is required.";
    }
    if (!data.phone.trim()) {
      errs.phone = "Phone number is required for verification.";
    }
    if (!isExistingUser && (!data.password || data.password.length < 8)) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (!data.headline.trim()) {
      errs.headline = "Professional headline is required.";
    }
    if (!data.bio.trim() || data.bio.length < 30) {
      errs.bio = "Please provide at least 30 characters about your background and teaching goals.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleNextClick} className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Educator Identity & Contact Information
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Provide your official details as they appear on your identification and academic records.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="fullName" required>
              Full Legal Name
            </Label>
            <Input
              id="fullName"
              placeholder="e.g. Yishaq Abreham"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              error={errors.fullName}
              required
            />
            {errors.fullName && (
              <p className="text-[11px] text-destructive">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="instructor@example.com"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              error={errors.email}
              required
            />
            {errors.email && (
              <p className="text-[11px] text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" required>
              Phone Number (Ethiopia)
            </Label>
            <Input
              id="phone"
              placeholder="+251 91 123 4567"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              error={errors.phone}
              required
            />
            {errors.phone && (
              <p className="text-[11px] text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Password (if registering new account) */}
          {!isExistingUser && (
            <div className="space-y-1.5">
              <Label htmlFor="password" required>
                Studio Account Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={data.password || ""}
                onChange={(e) => onChange({ password: e.target.value })}
                error={errors.password}
                required
              />
              {errors.password && (
                <p className="text-[11px] text-destructive">{errors.password}</p>
              )}
            </div>
          )}
        </div>

        {/* Professional Headline */}
        <div className="space-y-1.5">
          <Label htmlFor="headline" required>
            Professional Headline & Expertise
          </Label>
          <Input
            id="headline"
            placeholder="e.g. Senior Full-Stack Engineer & Visiting Lecturer @ AAU"
            value={data.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            error={errors.headline}
            required
          />
          {errors.headline && (
            <p className="text-[11px] text-destructive">{errors.headline}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio" required>
              Biography & Teaching Motivation
            </Label>
            <span className="text-[11px] text-muted-foreground">
              {data.bio.length}/500
            </span>
          </div>
          <textarea
            id="bio"
            rows={4}
            maxLength={500}
            placeholder="Tell the academic review board about your engineering background, university experience, and why you want to teach on Asquala..."
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            required
          />
          {errors.bio && <p className="text-[11px] text-destructive">{errors.bio}</p>}
        </div>
      </div>

      {/* Professional Links */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            Professional Profiles & Portfolio (Recommended)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Links help the academic board verify your professional track record faster.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="linkedinUrl" className="flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-primary" />
              <span>LinkedIn Profile</span>
            </Label>
            <Input
              id="linkedinUrl"
              placeholder="https://linkedin.com/in/username"
              value={data.linkedinUrl}
              onChange={(e) => onChange({ linkedinUrl: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="githubUrl" className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-primary" />
              <span>GitHub / GitLab</span>
            </Label>
            <Input
              id="githubUrl"
              placeholder="https://github.com/username"
              value={data.githubUrl}
              onChange={(e) => onChange({ githubUrl: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="websiteUrl" className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Personal Website</span>
            </Label>
            <Input
              id="websiteUrl"
              placeholder="https://yoursite.com"
              value={data.websiteUrl}
              onChange={(e) => onChange({ websiteUrl: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex items-center justify-end">
        <Button type="submit" variant="primary" size="md" className="gap-2 shadow-xs">
          <span>Continue to Education Evidence</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
