"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { MOCK_CURRENT_INSTRUCTOR_APPLICATION } from "@/lib/mock-instructor-data";

function InstructorLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, route according to role & application status
  React.useEffect(() => {
    if (session?.user) {
      if (session.user.role === "instructor" || MOCK_CURRENT_INSTRUCTOR_APPLICATION.email === session.user.email) {
        if (MOCK_CURRENT_INSTRUCTOR_APPLICATION.status === "approved") {
          router.replace("/instructor/dashboard");
        } else {
          router.replace("/instructor/application-status");
        }
      }
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Invalid credentials. Please verify your email and password.");
      }

      // Check role & accreditation status
      const userRole = data?.user?.role || (session?.user?.role ?? "instructor");

      if (userRole === "instructor" || MOCK_CURRENT_INSTRUCTOR_APPLICATION.email === email) {
        if (MOCK_CURRENT_INSTRUCTOR_APPLICATION.status === "approved") {
          router.push("/instructor/dashboard");
        } else {
          router.push("/instructor/application-status");
        }
      } else {
        // Fallback for demo: route to dashboard or application status
        router.push("/instructor/dashboard");
      }
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to sign in to instructor studio.";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group transition-transform hover:scale-105"
            title="Asquala Home"
          >
            <Image
              src="/images/logo.png"
              alt="Asquala Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              priority
            />
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Asquala
            </span>
          </Link>
          <div className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary-light text-primary border border-primary-border">
            Instructor &amp; Creator Studio
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Educator Sign In
          </h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Manage your courses, review student submissions, track revenue, and interact in the Q&amp;A forum.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" required>
                Instructor Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="instructor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" required>
                  Password
                </Label>
                <span className="text-[11px] text-primary hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full gap-2 shadow-xs mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Studio</span>
            </Button>
          </form>

          {/* Quick Demo Fill Shortcut */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setEmail("yishaq.abreham@asquala.edu");
                setPassword("Asquala2026!");
              }}
              className="w-full text-center text-xs text-muted-foreground hover:text-primary py-1.5 rounded-lg border border-dashed border-border hover:border-primary/40 bg-secondary/30 transition-colors cursor-pointer"
            >
              Fill with Accredited Educator Demo
            </button>
          </div>
        </div>

        {/* Apply CTA Card */}
        <div className="bg-primary-light/40 border border-primary-border rounded-2xl p-5 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary">
            <Sparkles className="w-4 h-4" />
            <span>New to Teaching on Asquala?</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Join our accredited educator network. Submit your university degrees and technical experience for review.
          </p>
          <div className="pt-1">
            <Link
              href="/instructor-apply"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>Submit Educator Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Return to Student Portal */}
        <div className="text-center text-xs text-muted-foreground">
          Looking for courses to learn?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Go to Student Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function InstructorLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-xs text-muted-foreground">
          Loading Studio Sign In...
        </div>
      }
    >
      <InstructorLoginForm />
    </Suspense>
  );
}
