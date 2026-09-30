"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useAuthStore, UserRole } from "@/stores/auth-store";
import { registerSchema } from "@/modules/auth/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const { selectedRole, setSelectedRole, isLoading, setIsLoading } =
    useAuthStore();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {}
  );
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    // Client-side Zod validation
    const result = registerSchema.safeParse({
      ...formData,
      role: selectedRole,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) errors[path.toString()] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      });

      if (error) {
        setServerError(
          error.message || "Failed to create account. Please try again."
        );
        setIsLoading(false);
        return;
      }

      // Successful registration: Redirect to homepage with active session
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Titles */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create an Account
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Join Asquala and begin your structured learning journey today.
        </p>
      </div>

      {/* Role Selection Segmented Control */}
      <div className="mb-6">
        <Label className="mb-2 text-center justify-center">I am joining as a</Label>
        <div className="grid grid-cols-2 p-1 rounded-xl bg-secondary border border-border">
          <button
            type="button"
            onClick={() => setSelectedRole("student")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              selectedRole === "student"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Learner / Student
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("instructor")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              selectedRole === "instructor"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Instructor
          </button>
        </div>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="mb-5 p-3 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeWidth="2" d="M12 8v4m0 4h.01" />
          </svg>
          <span>{serverError}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" required>
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g. Dawit Haile"
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
            disabled={isLoading}
            autoComplete="name"
            required
          />
          {fieldErrors.name && (
            <span className="text-[11px] text-destructive font-medium">
              {fieldErrors.name}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" required>
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            disabled={isLoading}
            autoComplete="email"
            required
          />
          {fieldErrors.email && (
            <span className="text-[11px] text-destructive font-medium">
              {fieldErrors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" required>
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            disabled={isLoading}
            autoComplete="new-password"
            required
          />
          {fieldErrors.password ? (
            <span className="text-[11px] text-destructive font-medium">
              {fieldErrors.password}
            </span>
          ) : (
            <span className="text-[10px] text-muted-foreground">
              Minimum 8 characters with at least one number
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword" required>
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={fieldErrors.confirmPassword}
            disabled={isLoading}
            autoComplete="new-password"
            required
          />
          {fieldErrors.confirmPassword && (
            <span className="text-[11px] text-destructive font-medium">
              {fieldErrors.confirmPassword}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="mt-2 w-full"
        >
          {selectedRole === "instructor"
            ? "Register as Instructor"
            : "Create Student Account"}
        </Button>
      </form>

      {/* Switch to Login */}
      <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border pt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
