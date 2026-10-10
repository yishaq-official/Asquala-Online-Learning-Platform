# 💰 Phase 5 Plan: Financial Treasury & Domestic Payout Processing

> **File**: `docs/plan/admin-interface/05-treasury-payouts.md`  
> **Target Route**: `/admin/payouts`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/admin-interface/00-overview.md)  
> **Status**: SPECIFIED & PLANNED  

---

## 1. Objectives & Scope

1. **Treasury Overview Cards (`PayoutSummaryCards`)**:
   - Total Pending Clearance: `ETB 68,400` across active teacher withdrawal requests.
   - Telebirr Mobile Queue: `ETB 33,400` (2 pending instant transfers).
   - Commercial Bank of Ethiopia (CBE) Queue: `ETB 35,000` (1 pending wire transfer).
   - Settled This Month: `ETB 142,000` successfully disbursed to educators.

2. **Payout Transactions Ledger (`PendingPayoutsTable`)**:
   - Filter tabs: *All Ledger*, *Pending*, *Completed*.
   - Search bar filtering by teacher name or email.
   - Detailed rows displaying educator name, royalty amount in ETB, disbursement channel (Telebirr mobile number vs. CBE account number and branch), request timestamp, status, and transaction reference ID.

3. **Disbursement Processing Modal (`ProcessPayoutModal`)**:
   - Modal prompt presenting full payee information.
   - Input field for Bank or Telebirr Reference ID (e.g. `TLB-TX-998201` or `CBE-FT-889104`).
   - "Confirm & Settle Transfer" action that transitions transaction status from `pending` to `completed`, updates the teacher's statement, and records an immutable log entry.

---

## 2. Layout Wireframes

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ‹ Back to Dashboard   •   Treasury & Settlements                            │
│ Treasury & Domestic Royalty Disbursements    [ Telebirr & CBE Direct ]      │
│ Authorize & settle educator course royalties via Ethiopian mobile & bank    │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────┬───────────────────┬───────────────────┬─────────────┐ │
│ │ PENDING CLEARANCE │ TELEBIRR QUEUE    │ CBE BANK QUEUE    │ SETTLED     │ │
│ │ ETB 68,400        │ ETB 33,400        │ ETB 35,000        │ ETB 142,000 │ │
│ │ 3 Withdrawals     │ Instant mobile    │ Branch wires      │ This month  │ │
│ └───────────────────┴───────────────────┴───────────────────┴─────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📋 DOMESTIC PAYOUT LEDGER                                                   │
│ [ Search by instructor name...   ]  [ All (4) ] [ Pending (3) ] [ Settled ] │
│ ─────────────────────────────────────────────────────────────────────────── │
│ Educator       Amount      Channel & Account     Date      Status   Action  │
│ ─────────────────────────────────────────────────────────────────────────── │
│ Yishaq Abreham ETB 24,800  Telebirr (+251 91...) Oct 08    Pending  [Settle]│
│ Dr. Meron      ETB 35,000  CBE (1000293847291)   Oct 09    Pending  [Settle]│
│ Bethlehem H.   ETB 8,600   Telebirr (+251 92...) Oct 09    Pending  [Settle]│
│ Kalkidan A.    ETB 18,400  CBE (1000349811203)   Oct 02    Settled  Ref:CBE │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Deliverables

```text
asquala-online-school/
├── components/admin/payouts/
│   ├── payout-summary-cards.tsx              # 4 KPI cards for treasury balances
│   ├── pending-payouts-table.tsx             # Interactive ledger table with filters
│   └── process-payout-modal.tsx              # Confirmation modal with external ref input
└── app/admin/payouts/
    └── page.tsx                              # Treasury management root
```

---

## 4. Verification Checklist

- [ ] Payout balances for Telebirr and CBE match mock dataset calculations.
- [ ] Clicking "Settle Payout" opens modal with correct instructor name and account details.
- [ ] Entering reference ID and confirming immediately updates transaction status to `Settled` with the reference ID displayed.
