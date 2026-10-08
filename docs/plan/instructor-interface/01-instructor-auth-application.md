# 📝 Teacher Studio — Authentication & Application Wizard Plan

> **File**: `docs/plan/instructor-interface/01-instructor-auth-application.md`  
> **Target Routes**: `/instructor/login`, `/instructor/apply`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

1. **Dedicated Instructor Sign-In (`/instructor/login`)**:
   - Creator-focused visual presentation highlighting Asquala's educator community.
   - Credentials sign-in via `authClient.signIn.email`.
   - Intelligent status-aware redirect:
     - If approved instructor ➔ `/instructor/dashboard`
     - If pending review ➔ `/instructor/application-status`
     - If student role ➔ Friendly prompt with direct link to apply as instructor or switch to `/student/dashboard`.
   - "New educator? Apply to Teach on Asquala" CTA.

2. **Evidence-Based Multi-Step Application Wizard (`/instructor/apply`)**:
   - **Step 1: Educator Profile & Contact**
     - Full Name, Phone (+251 format support), Email, Headline (e.g. "Senior Cloud Architect & Lecturer"), Bio, LinkedIn/Portfolio URL.
   - **Step 2: Educational Credentials & Evidence**
     - Degree qualification (e.g. B.Sc., M.Sc., Ph.D., Diploma), Institution, Field of Study, Graduation Year, Document upload (Degree Certificate / Transcript PDF or image).
   - **Step 3: Industry & Teaching Experience**
     - Years of professional experience, Current organization, Past teaching/tutoring experience details, Primary subject domain.
   - **Step 4: Professional Accreditations & Proposed Curriculum**
     - Professional certificates (e.g. AWS, Cisco, CompTIA, Google Cloud, Ministry License), Credential ID, Certificate proof document, Proposed course title and target audience.
   - **Submission & Account Creation**:
     - Automatically registers user via `better-auth` with `role: "instructor"`, saves application state, and redirects to `/instructor/application-status`.

---

## 📐 Layout Wireframes

### Dedicated Instructor Sign-In (`/instructor/login`)
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎓 TEACH ON ASQUALA                                                         │
│ Empower the next generation of African builders and professionals           │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [ Asquala Logo ]                                                        │ │
│ │ Instructor & Creator Studio                                             │ │
│ │ Sign in to manage your courses, students, and payouts                   │ │
│ │                                                                         │ │
│ │ Email Address:    [ instructor@asquala.edu                            ] │ │
│ │ Password:         [ ••••••••••••••••                                  ] │ │
│ │                                                                         │ │
│ │                   [ 🚀 Sign In to Studio ]                             │ │
│ │                                                                         │ │
│ │ Want to teach on Asquala?  [ Submit Educator Application ➔ ]            │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Multi-Step Evidence Application (`/instructor/apply`)
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎓 Apply to Become an Asquala Instructor                                    │
│ Join our accredited educator network. Evidence review required.             │
├─────────────────────────────────────────────────────────────────────────────┤
│ [1. Profile & Bio] ── [2. Education] ── [3. Experience] ── [4. Credentials] │ Stepper
├─────────────────────────────────────────────────────────────────────────────┤
│ 📋 STEP 2 OF 4: HIGHEST EDUCATIONAL CREDENTIALS                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Degree / Award:        [ Bachelor of Science in Computer Science      ] │ │
│ │ University / College:  [ Addis Ababa University                       ] │ │
│ │ Field of Study:        [ Software Engineering                         ] │ │
│ │ Graduation Year:       [ 2021                                         ] │ │
│ │                                                                         │ │
│ │ 📄 Upload Degree / Transcript Document:                                 │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 📎 [ Drag & Drop Degree Certificate PDF or Click to Upload ]        │ │ │
│ │ │     Supported formats: PDF, PNG, JPG (Max 10MB)                     │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                         │ │
│ │ [ ‹ Back ]                                            [ Continue › ]    │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── (auth)/
│       ├── instructor-login/
│       │   └── page.tsx                        # Instructor Sign-In Page
│       └── instructor-apply/
│           ├── page.tsx                        # Application Stepper Wizard
│           └── loading.tsx                     # Wizard Skeleton
├── components/
│   └── instructor/
│       └── apply/
│           ├── application-stepper.tsx         # 4-step progress header
│           ├── step-personal-profile.tsx       # Step 1: Name, Bio, Links
│           ├── step-education-evidence.tsx     # Step 2: Degrees & Document uploads
│           ├── step-work-experience.tsx        # Step 3: Years & Teaching roles
│           ├── step-certifications-course.tsx  # Step 4: Accreditations & Proposal
│           └── document-upload-zone.tsx        # Drag-and-drop document uploader
├── types/
│   └── instructor.ts                           # Instructor domain models
└── lib/
    └── mock-instructor-data.ts                 # Mock applications & studio fixtures
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Define `types/instructor.ts` with `InstructorApplication`, `EducationRecord`, `ExperienceRecord`, `CertificateRecord`.
- [ ] **Step 2**: Create `lib/mock-instructor-data.ts` with comprehensive sample applications in `pending`, `approved`, and `action_required` states.
- [ ] **Step 3**: Implement `DocumentUploadZone` with file preview, size validation, and mock upload simulation.
- [ ] **Step 4**: Implement the 4 application wizard steps with validation.
- [ ] **Step 5**: Build `/instructor/apply` page coordinating stepper state.
- [ ] **Step 6**: Build `/instructor/login` page with role-aware redirection.
- [ ] **Step 7**: Verify zero TypeScript errors with `tsc --noEmit`.
