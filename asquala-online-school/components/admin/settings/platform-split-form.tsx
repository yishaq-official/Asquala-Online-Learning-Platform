"use client";

import React, { useState } from "react";
import {
  Coins,
  ShieldCheck,
  CheckCircle2,
  Percent,
  Sliders,
  Sparkles,
  Smartphone,
  Landmark,
  Save,
} from "lucide-react";
import { useAdminUiStore } from "@/stores/admin-ui-store";

export function PlatformSplitForm() {
  const { revenuePolicy, updateRevenuePolicy, addSecurityAuditLog, activeAuditor } =
    useAdminUiStore();

  const [royalty, setRoyalty] = useState(revenuePolicy.instructorRoyaltyPercent);
  const [minWithdrawal, setMinWithdrawal] = useState(revenuePolicy.minimumWithdrawalETB);
  const [schedule, setSchedule] = useState(revenuePolicy.payoutSchedule);
  const [feeCovered, setFeeCovered] = useState(revenuePolicy.telebirrFeeCoveredByPlatform);
  const [isSaved, setIsSaved] = useState(false);

  // Platform take-rate dynamically calculates as 100 - royalty
  const platformTake = 100 - royalty;

  // Example calculations for an ETB 1,800 course
  const examplePrice = 1800;
  const exampleInstructorRoyalty = Math.round((examplePrice * royalty) / 100);
  const examplePlatformTake = examplePrice - exampleInstructorRoyalty;

  const handleRoyaltyChange = (value: number) => {
    const clamped = Math.min(95, Math.max(60, value));
    setRoyalty(clamped);
    setIsSaved(false);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();

    updateRevenuePolicy({
      instructorRoyaltyPercent: royalty,
      platformTakeRatePercent: platformTake,
      minimumWithdrawalETB: minWithdrawal,
      payoutSchedule: schedule,
      telebirrFeeCoveredByPlatform: feeCovered,
    });

    addSecurityAuditLog({
      actorName: activeAuditor.name,
      actorRole: activeAuditor.roleTitle,
      actorAvatar: activeAuditor.avatarUrl || "",
      actionType: "policy_updated",
      targetEntity: "Platform Revenue Governance",
      targetId: "POL-ROYALTY-ADJUST",
      summary: `Updated domestic royalty split: ${royalty}% instructor net / ${platformTake}% platform share with ETB ${minWithdrawal} minimum withdrawal.`,
      ipAddress: "197.156.104.22 (Addis Ababa, Ethio Telecom)",
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-800" />
            Platform Revenue Split & Domestic Settlement Rules
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure institutional creator royalty percentages, take-rate, and minimum Telebirr / CBE disbursements
          </p>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-200 self-start sm:self-auto">
          Policy: Active & Enforced
        </span>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between animate-in fade-in text-xs">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Governance policy ratified and recorded in the audit ledger.</span>
          </div>
          <span className="text-[11px] text-emerald-800">
            Last updated by {revenuePolicy.updatedBy}
          </span>
        </div>
      )}

      <form onSubmit={handleSavePolicy} className="space-y-6">
        {/* Split Slider & Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-foreground flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-emerald-800" />
                  Educator Net Royalty Split
                </label>
                <span className="font-bold font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {royalty}%
                </span>
              </div>

              <input
                type="range"
                min={60}
                max={95}
                step={1}
                value={royalty}
                onChange={(e) => handleRoyaltyChange(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>60% (Institutional Floor)</span>
                <span className="font-bold text-foreground">85% (National Default)</span>
                <span>95% (Ceiling)</span>
              </div>
            </div>

            {/* Minimum Withdrawal Threshold */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground text-xs block">
                Minimum Withdrawal Clearance (ETB)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                  ETB
                </span>
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={minWithdrawal}
                  onChange={(e) => {
                    setMinWithdrawal(Number(e.target.value));
                    setIsSaved(false);
                  }}
                  className="w-full pl-12 pr-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-mono font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Withdrawal requests below this threshold require board review.
              </p>
            </div>

            {/* Payout Schedule Options */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground text-xs block">
                Disbursement Execution Schedule
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: "instant", label: "Instant & On-Demand" },
                  { id: "weekly", label: "Weekly Batch" },
                  { id: "monthly", label: "Monthly Clearing" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSchedule(opt.id as any);
                      setIsSaved(false);
                    }}
                    className={`py-2 px-3 rounded-xl border font-bold text-center transition-all ${
                      schedule === opt.id
                        ? "bg-emerald-50 text-emerald-950 border-emerald-300 shadow-2xs"
                        : "bg-muted/30 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Visual Calculator Preview */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider block mb-1">
                Real-Time Tuition Allocation Simulation
              </span>
              <p className="text-xs text-emerald-800/90">
                Calculated on an average accredited course priced at <strong>ETB {examplePrice.toLocaleString()}</strong>:
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3.5 rounded-xl bg-card border border-emerald-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-muted-foreground block uppercase">
                    Educator Payout ({royalty}%)
                  </span>
                  <p className="text-xl font-black text-emerald-950 mt-1 font-mono">
                    ETB {exampleInstructorRoyalty.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-emerald-800 font-semibold mt-1 block">
                    Direct to Telebirr / CBE
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-card border border-emerald-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-muted-foreground block uppercase">
                    Asquala Take-Rate ({platformTake}%)
                  </span>
                  <p className="text-xl font-black text-emerald-950 mt-1 font-mono">
                    ETB {examplePlatformTake.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-emerald-800 font-semibold mt-1 block">
                    Hosting & Cloud Infra
                  </span>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="pt-3 border-t border-emerald-200/60">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-950">
                <input
                  type="checkbox"
                  checked={feeCovered}
                  onChange={(e) => {
                    setFeeCovered(e.target.checked);
                    setIsSaved(false);
                  }}
                  className="rounded border-emerald-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span>
                  Asquala platform absorbs all Telebirr merchant & CBE transfer transaction fees
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border text-xs">
          <span className="text-muted-foreground">
            Last policy ratification: {revenuePolicy.lastUpdated} by {revenuePolicy.updatedBy}
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Governance Policy</span>
          </button>
        </div>
      </form>
    </div>
  );
}
