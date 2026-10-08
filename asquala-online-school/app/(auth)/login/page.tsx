"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/stores/auth-store";
import { loginSchema } from "@/modules/auth/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { redirectAfterLogin, isLoading, setIsLoading } = useAuthStore();
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {}
  );
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Auto-redirect if already signed in
  React.useEffect(() => {
    if (session?.user) {
      const requestedRedirect =
        searchParams.get("redirect") || redirectAfterLogin;
      const targetUrl =
        requestedRedirect && requestedRedirect !== "/"
          ? requestedRedirect
          : "/student/dashboard";
      router.replace(targetUrl);
    }
  }, [session, router, searchParams, redirectAfterLogin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const result = loginSchema.safeParse(formData);

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
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setServerError(
          error.message || "Invalid email or password. Please try again."
        );
        setIsLoading(false);
        return;
      }

      // Successful login: Redirect to requested target or Student Dashboard
      const requestedRedirect =
        searchParams.get("redirect") || redirectAfterLogin;
      const targetUrl =
        requestedRedirect && requestedRedirect !== "/"
          ? requestedRedirect
          : "/student/dashboard";

      router.push(targetUrl);
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
          Sign In
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Welcome back! Enter your credentials to continue learning.
        </p>
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

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        {/* Password with Forgot Password link */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" required>
              Password
            </Label>
            <span className="text-[11px] text-primary hover:text-primary-hover hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            disabled={isLoading}
            autoComplete="current-password"
            required
          />
          {fieldErrors.password && (
            <span className="text-[11px] text-destructive font-medium">
              {fieldErrors.password}
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
          Sign In
        </Button>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border pt-4">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-12 text-center text-xs text-muted-foreground">
          Loading sign-in...
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
