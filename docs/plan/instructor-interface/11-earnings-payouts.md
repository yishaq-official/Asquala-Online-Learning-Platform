# 💰 Teacher Studio — Earnings & Payout Management Plan

> **File**: `docs/plan/instructor-interface/11-earnings-payouts.md`  
> **Target Route**: `/instructor/earnings` via `app/instructor/earnings/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

Fair, transparent, and frictionless payouts are vital for educator retention. The **Earnings & Payout Management** page enables Ethiopian educators to track their revenue, understand platform commission splits, configure domestic payout channels (Telebirr, CBE Birr, Commercial Bank of Ethiopia, Awash Bank), and request withdrawals.

Key features:
1. **Financial Balance Cards**:
   - **Available for Payout**: ETB balance eligible for immediate withdrawal.
   - **Pending Clearance**: Revenue from recent enrollments under 14-day clearance.
   - **Total Lifetime Earnings**: All-time accumulated instructor earnings.
2. **Payout Method Configuration**:
   - **Telebirr**: Phone number, registered account name.
   - **Commercial Bank of Ethiopia (CBE)**: Account number, full legal name, branch.
   - **CBE Birr / Awash Bank**: Alternative domestic options.
3. **Withdrawal Request Action & History**:
   - "Request Payout" modal with minimum withdrawal limit (e.g. 500 ETB).
   - Historical payout ledger with transaction IDs, dates, payment method, and status (`Completed`, `Processing`, `Pending`).

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── earnings/
│           ├── page.tsx                        # Earnings overview page
│           └── loading.tsx                     # Earnings skeleton loader
├── components/
│   └── instructor/
│       └── earnings/
│           ├── earnings-summary-cards.tsx      # Available balance & lifetime earnings
│           ├── payout-methods-manager.tsx      # Telebirr & CBE account settings
│           ├── request-payout-modal.tsx        # Withdrawal request dialog
│           ├── payout-history-table.tsx        # Completed & pending payouts ledger
│           └── revenue-breakdown-chart.tsx     # Monthly revenue vs. commission bar
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `EarningsSummaryCards` with formatted ETB amounts.
- [ ] **Step 2**: Implement `PayoutMethodsManager` supporting Telebirr & CBE details.
- [ ] **Step 3**: Implement `RequestPayoutModal` with validation and success feedback.
- [ ] **Step 4**: Implement `PayoutHistoryTable` with status pills and receipt download.
- [ ] **Step 5**: Validate TypeScript compliance with `tsc --noEmit`.
