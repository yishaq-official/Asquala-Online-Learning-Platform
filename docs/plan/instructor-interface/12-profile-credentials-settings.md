# 👤 Teacher Studio — Profile & Teaching Credentials Plan

> **File**: `docs/plan/instructor-interface/12-profile-credentials-settings.md`  
> **Target Route**: `/instructor/settings` via `app/instructor/settings/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

The **Profile & Teaching Credentials** page manages the instructor's public biography, verified academic accreditations, and studio notification preferences.

Key features:
1. **Public Instructor Profile**:
   - Photo / Headshot uploader.
   - Full Name, Professional Headline (e.g. "Lead Cloud Architect @ AAU | Certified AWS Instructor").
   - Detailed Instructor Bio, Social links (LinkedIn, GitHub, Website, X).
2. **Verified Credentials Showcase**:
   - Displays degrees, institutions, and professional certifications approved by the academic board with the official **"Verified Asquala Educator"** accreditation badge.
   - Option to submit additional certifications or degrees for review.
3. **Notification Preferences**:
   - Alerts for new course enrollments, new student Q&A questions, course reviews, and monthly payout disbursements.

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── settings/
│           ├── page.tsx                        # Instructor settings container
│           └── loading.tsx                     # Settings skeleton loader
├── components/
│   └── instructor/
│       └── settings/
│           ├── instructor-profile-form.tsx     # Photo, headline, bio, links
│           ├── verified-credentials-card.tsx   # Verified degrees & certificates badge list
│           ├── submit-new-credential-modal.tsx # Add new certificate/degree modal
│           └── studio-notifications-form.tsx   # Enrollment & Q&A alert switches
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `InstructorProfileForm` with live preview.
- [ ] **Step 2**: Implement `VerifiedCredentialsCard` with verified badge styling.
- [ ] **Step 3**: Implement `SubmitNewCredentialModal` with file upload.
- [ ] **Step 4**: Implement `StudioNotificationsForm` with accessible switch toggles.
- [ ] **Step 5**: Validate TypeScript compliance with `tsc --noEmit`.
