"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { EducationRecord, ExperienceRecord, CertificateRecord } from "@/types/instructor";
import { ApplicationStepper } from "@/components/instructor/apply/application-stepper";
import {
  StepPersonalProfile,
  PersonalProfileData,
} from "@/components/instructor/apply/step-personal-profile";
import { StepEducationEvidence } from "@/components/instructor/apply/step-education-evidence";
import { StepWorkExperience } from "@/components/instructor/apply/step-work-experience";
import { StepCertificationsCourse } from "@/components/instructor/apply/step-certifications-course";
import { MOCK_CURRENT_INSTRUCTOR_APPLICATION } from "@/lib/mock-instructor-data";

export default function InstructorApplyPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form states
  const [personalProfile, setPersonalProfile] = useState<PersonalProfileData>({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    password: "",
    headline: "",
    bio: "",
    websiteUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  const [educationList, setEducationList] = useState<EducationRecord[]>([
    {
      id: "edu-1",
      degree: "B.Sc. / Bachelor Degree",
      institution: "",
      fieldOfStudy: "",
      graduationYear: new Date().getFullYear(),
      documentName: "",
    },
  ]);

  const [primarySubject, setPrimarySubject] = useState("");
  const [targetAudience, setTargetAudience] = useState("University Students & Recent Graduates");
  const [experienceList, setExperienceList] = useState<ExperienceRecord[]>([
    {
      id: "exp-1",
      role: "",
      organization: "",
      yearsOfExperience: 3,
      isTeachingRole: false,
      description: "",
    },
  ]);

  const [certificationsList, setCertificationsList] = useState<CertificateRecord[]>([]);
  const [proposedCourseTitle, setProposedCourseTitle] = useState("");
  const [proposedCourseOutline, setProposedCourseOutline] = useState("");
  const [sampleVideoUrl, setSampleVideoUrl] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Step transitions
  const handleNextStep = (stepFinished: number) => {
    setMaxCompletedStep((prev) => Math.max(prev, stepFinished));
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // If user isn't logged in, sign up with role: "instructor"
      if (!session?.user && personalProfile.password) {
        const { error } = await authClient.signUp.email({
          name: personalProfile.fullName,
          email: personalProfile.email,
          password: personalProfile.password,
          role: "instructor",
        });

        if (error) {
          throw new Error(error.message || "Failed to create instructor account.");
        }
      }

      // Populate mock application for session review tracker
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.fullName = personalProfile.fullName;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.email = personalProfile.email;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.phone = personalProfile.phone;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.headline = personalProfile.headline;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.bio = personalProfile.bio;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.websiteUrl = personalProfile.websiteUrl;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.linkedinUrl = personalProfile.linkedinUrl;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.githubUrl = personalProfile.githubUrl;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.education = educationList;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.primarySubject = primarySubject;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.targetAudience = targetAudience;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.experience = experienceList;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.certifications = certificationsList;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.sampleVideoUrl = sampleVideoUrl;
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.status = "under_review";
      MOCK_CURRENT_INSTRUCTOR_APPLICATION.submittedAt = new Date().toISOString();

      // Brief delay for UX satisfaction
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Redirect directly to application review tracker
      router.push("/instructor/application-status");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed. Please check your inputs.";
      setSubmitError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group transition-transform hover:scale-105"
            title="Asquala Home"
          >
            <Image
              src="/images/logo.png"
              alt="Asquala Logo"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
              priority
            />
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Asquala
            </span>
          </Link>
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary-light text-primary border border-primary-border">
            Academic Educator Accreditation
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Apply to Teach on Asquala
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Submit your university degrees, work experience, and technical certifications. Our academic board verifies all instructors to ensure student excellence.
          </p>
        </div>

        {/* Global Error Banner */}
        {submitError && (
          <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-sm font-medium">
            {submitError}
          </div>
        )}

        {/* 4-Step Stepper */}
        <ApplicationStepper
          currentStep={currentStep}
          maxCompletedStep={maxCompletedStep}
          onSelectStep={(step) => {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        {/* Dynamic Step Views */}
        <div className="transition-all duration-200">
          {currentStep === 1 && (
            <StepPersonalProfile
              data={personalProfile}
              onChange={(updates) =>
                setPersonalProfile((prev) => ({ ...prev, ...updates }))
              }
              onNext={() => handleNextStep(1)}
              isExistingUser={Boolean(session?.user)}
            />
          )}

          {currentStep === 2 && (
            <StepEducationEvidence
              educationList={educationList}
              onChange={setEducationList}
              onNext={() => handleNextStep(2)}
              onBack={handlePrevStep}
            />
          )}

          {currentStep === 3 && (
            <StepWorkExperience
              primarySubject={primarySubject}
              targetAudience={targetAudience}
              experienceList={experienceList}
              onSubjectChange={setPrimarySubject}
              onAudienceChange={setTargetAudience}
              onExperienceListChange={setExperienceList}
              onNext={() => handleNextStep(3)}
              onBack={handlePrevStep}
            />
          )}

          {currentStep === 4 && (
            <StepCertificationsCourse
              certificationsList={certificationsList}
              proposedCourseTitle={proposedCourseTitle}
              proposedCourseOutline={proposedCourseOutline}
              sampleVideoUrl={sampleVideoUrl}
              agreedToTerms={agreedToTerms}
              onCertificationsChange={setCertificationsList}
              onProposedTitleChange={setProposedCourseTitle}
              onProposedOutlineChange={setProposedCourseOutline}
              onSampleVideoChange={setSampleVideoUrl}
              onAgreedTermsChange={setAgreedToTerms}
              onSubmit={handleFinalSubmit}
              onBack={handlePrevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Footer Alternative Links */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <div>
            Already accredited as an instructor?{" "}
            <Link
              href="/instructor-login"
              className="font-semibold text-primary hover:underline"
            >
              Sign In to Studio
            </Link>
          </div>
          <div>
            Already submitted an application?{" "}
            <Link
              href="/instructor/application-status"
              className="font-semibold text-primary hover:underline"
            >
              Check Review Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
