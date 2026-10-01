# ⚙️ Student Portal — Profile & Settings Plan

> **File**: `docs/plan/student-interface/10-profile-settings.md`  
> **Target Route**: `/student/settings` via `app/student/settings/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Profile & Settings** page empowers students to manage their personal learning identity, set study goals, update credentials, and configure notifications.
Key goals:
1. **Personal Identity**: Profile photo/avatar initials, full name, headline/bio, and primary target skills.
2. **Learning Cadence & Goals**: Weekly study hours target (e.g., 5 hrs/week) and scheduled study reminder days.
3. **Account & Security**: Integrated with `better-auth` for email verification status, password changes, and active session review.
4. **Notification Controls**: Granular toggles for course announcements, weekly progress digests, and quiz deadline alerts.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚙️ Account & Learning Settings                                              │
│ Manage your profile details, study schedule, security, and notifications    │
├─────────────────────────────────────────────────────────────────────────────┤
│ [ Profile Details ]  [ Learning Goals ]  [ Security ]  [ Notifications ]    │ Section Tabs
├─────────────────────────────────────────────────────────────────────────────┤
│ 👤 PROFILE INFORMATION                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Avatar:  [ (YA) ]  [ Upload New Photo ]  [ Remove ]                     │ │
│ │                                                                         │ │
│ │ Full Name:             [ Yishaq Abreham                              ]  │ │
│ │ Email Address:         [ yishaq@example.com (Verified ✅)             ]  │ │
│ │ Headline / Job Goal:   [ Junior Full-Stack Developer                 ]  │ │
│ │ Bio:                   [ Passionate about Next.js, Postgres & UX     ]  │ │
│ │ Target Technologies:   [ Next.js ✕ ] [ TypeScript ✕ ] [ PostgreSQL ✕]   │ │
│ │                                                                         │ │
│ │                                                [ 💾 Save Changes ]      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎯 LEARNING GOALS                                                           │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Weekly Study Target:   [ 5 Hours / Week ]                               │ │
│ │ Study Reminder Days:   [M] [T] [W] [T] [F] [S] [S]                      │ │
│ │ Daily Reminder Time:   [ 07:00 PM ]                                     │ │
│ │                                                [ 💾 Update Goals ]      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       └── settings/
│           ├── page.tsx                               # Settings page container
│           └── loading.tsx                            # Settings skeleton loader
├── components/
│   └── student/
│       └── settings/
│           ├── settings-nav-tabs.tsx                  # Tab navigation header
│           ├── profile-details-form.tsx               # Name, bio, avatar, skills
│           ├── learning-preferences-form.tsx          # Study hours target, reminder days
│           ├── account-security-form.tsx              # Password update & active sessions
│           └── notification-preferences-form.tsx      # Email and alert toggles
└── types/
    └── student.ts                                     # StudentSettings, LearningPreferences
```

---

## 🧩 Component Breakdown & Props

### 1. `ProfileDetailsForm` (`components/student/settings/profile-details-form.tsx`)
- Populated from current `better-auth` session (`user.name`, `user.email`, `user.image`).
- Fields:
  - Full Name (`Input`).
  - Email Address (Read-only with "Verified" badge).
  - Learning Headline (e.g. "Full-Stack Web Enthusiast").
  - Target Skills tag input (adds/removes tech badges).
- Save action with optimistic toast notification ("Profile updated successfully").

### 2. `LearningPreferencesForm` (`components/student/settings/learning-preferences-form.tsx`)
- Weekly study goal slider or selector (e.g. 2 hrs, 5 hrs, 10 hrs, 15 hrs).
- Study days selector: Toggle buttons for Monday through Sunday.
- Preferred study reminder time picker.

### 3. `AccountSecurityForm` (`components/student/settings/account-security-form.tsx`)
- Password change section:
  - Current Password input.
  - New Password input (with password strength indicator).
  - Confirm New Password input.
  - Submits via `authClient.changePassword` with error handling.
- Active Sessions list showing current browser and IP with "Sign Out All Other Devices" button.

### 4. `NotificationPreferencesForm` (`components/student/settings/notification-preferences-form.tsx`)
- Switch toggles for:
  - "Course Announcements & Updates"
  - "Upcoming Quiz & Assignment Deadlines"
  - "Weekly Learning Streak & Progress Summary"
  - "New Recommended Courses"

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Settings Card Surface | `bg-card border border-border rounded-xl p-6 shadow-sm` |
| Primary Save Button | `bg-primary hover:bg-primary-hover text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors` |
| Day Toggle (Active) | `bg-primary text-white font-semibold w-9 h-9 rounded-lg flex items-center justify-center text-sm` |
| Day Toggle (Inactive) | `bg-secondary text-muted-foreground hover:bg-border/60 w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-colors` |
| Skill Chip | `bg-primary-light text-primary border border-primary-border text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `StudentSettings` and `LearningPreferences` types in `types/student.ts`.
- [ ] **Step 2**: Implement `SettingsNavTabs` to switch active sections smoothly.
- [ ] **Step 3**: Implement `ProfileDetailsForm` with prefilled session data and tag input.
- [ ] **Step 4**: Implement `LearningPreferencesForm` with weekly goal selector and day buttons.
- [ ] **Step 5**: Implement `AccountSecurityForm` hooked up to `better-auth` client functions.
- [ ] **Step 6**: Implement `NotificationPreferencesForm` with clean accessible switch toggles.
- [ ] **Step 7**: Verify form validation, save confirmations, and error handling.
