"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fill pre-authorized credentials for Dr. Alazar Tadesse
  const handleQuickFill = () => {
    setEmail("alazar.tadesse@asquala.edu");
    setPassword("AcademicGovernance#2026");
    setTwoFactorCode("882-910");
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please provide institutional email and administrative password.");
      return;
    }

    if (!twoFactorCode || twoFactorCode.replace(/\D/g, "").length < 6) {
      setError("A valid 6-digit hardware or authenticator token is required.");
      return;
    }

    setIsLoading(true);

    // Simulated secure validation
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 700);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header info */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Asquala Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            priority
          />
          <div>
            <span className="font-bold text-sm tracking-tight text-foreground block leading-tight">
              Asquala Higher Education
            </span>
            <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
              Academic Governance Portal
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>FIPS 140-3 Hardware Token Auth</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-8">
        <div className="bg-card border border-border shadow-xl rounded-3xl p-6 sm:p-8">
          {/* Logo & Headline */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 border border-emerald-100 mb-2">
              <Building2 className="w-8 h-8 text-emerald-700" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Institutional Sign-In
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Curriculum Review Board, Quality Accreditation & Treasury Settlement Console
            </p>
          </div>

          {/* Security Alert Banner */}
          <div className="mb-6 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-950 leading-relaxed">
              <span className="font-bold block text-amber-950">Restricted Authority Area</span>
              All audit actions, applicant appraisals, and ETB disbursement approvals are permanently cryptographically logged.
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                {error}
              </div>
            )}

            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Credentials verified. Loading Governance Console...</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center justify-between">
                <span>Institutional Email</span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  @asquala.edu domain
                </span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@asquala.edu"
                  className="pl-10 text-xs"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Administrative Passphrase
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••••••"
                  className="pl-10 pr-10 text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-0.5 text-muted-foreground hover:text-foreground cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 2FA Token Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center justify-between">
                <span>Hardware / Authenticator 2FA Token</span>
                <span className="text-[10px] text-emerald-800 font-semibold">
                  Required
                </span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
                <Input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="882-910"
                  className="pl-10 font-mono text-xs tracking-wider"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Quick Demo Credentials Autofill */}
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-xs font-bold text-emerald-900 transition-colors cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 group-hover:rotate-12 transition-transform" />
              <span>Autofill Board Chair (Dr. Alazar Tadesse)</span>
            </button>

            {/* Submit Action */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full font-bold text-xs gap-2 py-3 shadow-md"
              isLoading={isLoading}
            >
              <span>Authenticate & Enter Console</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Switch to Other Portals */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-[11px] text-center text-muted-foreground mb-3 font-medium">
              Looking for instructor or student portals?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/instructor/dashboard"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                <span>Teacher Studio</span>
              </Link>
              <Link
                href="/student/dashboard"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>Student Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Credentials & Institutional Note */}
      <div className="w-full max-w-md mx-auto text-center space-y-1">
        <p className="text-[11px] font-semibold text-muted-foreground">
          Federal Democratic Republic of Ethiopia • Ministry of Education Compliant
        </p>
        <p className="text-[10px] text-muted-foreground/80">
          Asquala Academic Review Board • Addis Ababa, Ethiopia • Encrypted Session TLS 1.3
        </p>
      </div>
    </div>
  );
}
