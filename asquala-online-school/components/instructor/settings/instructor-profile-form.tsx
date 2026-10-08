"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  Camera,
  Link2,
  Globe,
  Sparkles,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface InstructorProfileFormProps {
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  avatarUrl?: string;
  onSave: (data: {
    fullName: string;
    headline: string;
    bio: string;
    websiteUrl: string;
    linkedinUrl: string;
    githubUrl: string;
  }) => void;
}

export function InstructorProfileForm({
  fullName: initialName,
  email,
  phone,
  headline: initialHeadline,
  bio: initialBio,
  websiteUrl: initialWebsite = "",
  linkedinUrl: initialLinkedin = "",
  githubUrl: initialGithub = "",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  onSave,
}: InstructorProfileFormProps) {
  const [fullName, setFullName] = useState(initialName);
  const [headline, setHeadline] = useState(initialHeadline);
  const [bio, setBio] = useState(initialBio);
  const [websiteUrl, setWebsiteUrl] = useState(initialWebsite);
  const [linkedinUrl, setLinkedinUrl] = useState(initialLinkedin);
  const [githubUrl, setGithubUrl] = useState(initialGithub);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      fullName,
      headline,
      bio,
      websiteUrl,
      linkedinUrl,
      githubUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Header & Avatar Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar with Camera Overlay */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xs shrink-0 bg-secondary">
            <Image
              src={avatarUrl}
              alt={fullName}
              fill
              className="object-cover"
            />
            <button
              type="button"
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
              title="Change profile photo"
            >
              <Camera className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold">Change</span>
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h3 className="text-lg font-bold text-foreground">{fullName}</h3>
            <p className="text-xs text-muted-foreground">{email} • {phone}</p>
            <p className="text-xs text-primary font-semibold pt-1">
              {headline}
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 pt-2 border-t border-border/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Instructor Headline <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Senior Cloud & Full-Stack Systems Architect"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                required
              />
            </div>
          </div>

          {/* Biography */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Public Biography
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Highlight your production software engineering background, teaching achievements in Ethiopia, and passion for mentoring students..."
              className="w-full p-3.5 rounded-xl border border-border focus:border-primary text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              Displayed on public course landing pages and student course certificates.
            </p>
          </div>
        </div>
      </div>

      {/* Social & Portfolio Links Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-foreground">
            Professional Web &amp; Social Links
          </h3>
          <p className="text-xs text-muted-foreground">
            Allow university students and engineering teams to explore your open source code and achievements
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Personal Portfolio or Tech Blog URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yishaq-tech.et"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-xs bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <Link2 className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-xs bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                GitHub Organization or Profile URL
              </label>
              <div className="relative">
                <Link2 className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-xs bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-3 border-t border-border/80 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="gap-2 text-xs shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
