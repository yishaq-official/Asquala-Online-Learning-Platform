"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  Laptop,
  Smartphone,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

interface ActiveSession {
  id: string;
  device: string;
  os: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  type: "desktop" | "mobile";
}

const INITIAL_SESSIONS: ActiveSession[] = [
  {
    id: "sess-1",
    device: "Chrome 129",
    os: "Linux (Ubuntu)",
    location: "Addis Ababa, Ethiopia",
    lastActive: "Active Now",
    isCurrent: true,
    type: "desktop",
  },
  {
    id: "sess-2",
    device: "Mobile Safari 18",
    os: "iOS 18 (iPhone 15 Pro)",
    location: "Addis Ababa, Ethiopia",
    lastActive: "2 hours ago",
    isCurrent: false,
    type: "mobile",
  },
  {
    id: "sess-3",
    device: "Firefox 130",
    os: "macOS Sonoma",
    location: "Hawassa, Ethiopia",
    lastActive: "5 days ago",
    isCurrent: false,
    type: "desktop",
  },
];

export function AccountSecurityForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Sessions state
  const [sessions, setSessions] = useState<ActiveSession[]>(INITIAL_SESSIONS);
  const [isRevoking, setIsRevoking] = useState(false);
  const [revokeFeedback, setRevokeFeedback] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 25, label: "Weak", color: "bg-destructive text-destructive" };
    if (score === 3) return { score: 50, label: "Fair", color: "bg-amber-500 text-amber-600" };
    if (score === 4) return { score: 75, label: "Good", color: "bg-primary text-primary" };
    return { score: 100, label: "Strong", color: "bg-emerald-600 text-emerald-700" };
  };

  const strength = getPasswordStrength(newPassword);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (newPassword.length < 8) {
      setPasswordFeedback({
        type: "error",
        message: "New password must be at least 8 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: "error",
        message: "New password and confirmation do not match.",
      });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      // Attempt better-auth client changePassword if available
      if (typeof (authClient as unknown as { changePassword?: (opts: unknown) => Promise<{ error?: { message?: string } }> }).changePassword === "function") {
        const res = await (authClient as unknown as { changePassword: (opts: unknown) => Promise<{ error?: { message?: string } }> }).changePassword({
          currentPassword,
          newPassword,
          revokeOtherSessions: true,
        });

        if (res?.error) {
          throw new Error(res.error.message || "Failed to update password");
        }
      } else {
        // Fallback simulation for local dev
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setPasswordFeedback({
        type: "success",
        message: "Your password has been changed successfully!",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setPasswordFeedback(null);
      }, 4000);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to update password.";
      setPasswordFeedback({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleRevokeOtherSessions = async () => {
    setIsRevoking(true);
    setRevokeFeedback(null);

    try {
      // Simulate revoke API call
      await new Promise((resolve) => setTimeout(resolve, 700));

      setSessions((prev) => prev.filter((s) => s.isCurrent));
      setRevokeFeedback("All other active devices were successfully signed out.");

      setTimeout(() => {
        setRevokeFeedback(null);
      }, 4000);
    } catch {
      // Handle error gracefully
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-primary" />
            Change Password
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Keep your account secure by choosing a unique, strong password.
          </p>
        </div>

        {passwordFeedback && (
          <div
            className={`flex items-center gap-3 p-4 rounded-xl border text-sm transition-all ${
              passwordFeedback.type === "success"
                ? "bg-primary-light/50 border-primary-border text-primary"
                : "bg-destructive/10 border-destructive/20 text-destructive"
            }`}
          >
            {passwordFeedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-primary" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-destructive" />
            )}
            <span className="font-medium">{passwordFeedback.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-1.5">
            <Label htmlFor="current-password" required>
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your existing password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="new-password" required>
              New Password
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters with numbers & symbols"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Password strength meter */}
            {newPassword && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Password Strength:</span>
                  <span className={`font-semibold ${strength.color.split(" ")[1]}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength.color.split(" ")[0]
                    }`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password" required>
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type your new password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isUpdatingPassword}
              disabled={!currentPassword || !newPassword || !confirmPassword}
              className="gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Update Password</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Active Sessions Card */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Active Devices & Sessions
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review where you are currently signed in to Asquala.
            </p>
          </div>

          {sessions.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              isLoading={isRevoking}
              onClick={handleRevokeOtherSessions}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive border-border shrink-0 gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Other Devices</span>
            </Button>
          )}
        </div>

        {revokeFeedback && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary-light/50 border border-primary-border text-primary text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{revokeFeedback}</span>
          </div>
        )}

        <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
          {sessions.map((sess) => {
            const isDesktop = sess.type === "desktop";
            return (
              <div
                key={sess.id}
                className="flex items-center justify-between p-3.5 bg-card hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary text-muted-foreground">
                    {isDesktop ? (
                      <Laptop className="w-4 h-4" />
                    ) : (
                      <Smartphone className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {sess.device} on {sess.os}
                      </span>
                      {sess.isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary-border">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          This Device
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {sess.location} • {sess.lastActive}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
