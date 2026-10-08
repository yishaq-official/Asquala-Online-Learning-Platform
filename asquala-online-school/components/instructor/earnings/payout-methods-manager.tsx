"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Landmark,
  Plus,
  CheckCircle2,
  Trash2,
  Star,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  InstructorPayoutMethod,
  PayoutMethodType,
} from "@/lib/mock-instructor-data";
import { Button } from "@/components/ui/button";

interface PayoutMethodsManagerProps {
  methods: InstructorPayoutMethod[];
  onSetDefault: (id: string) => void;
  onAddMethod: (method: Omit<InstructorPayoutMethod, "id" | "isDefault">) => void;
  onDeleteMethod: (id: string) => void;
}

export function PayoutMethodsManager({
  methods,
  onSetDefault,
  onAddMethod,
  onDeleteMethod,
}: PayoutMethodsManagerProps) {
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [methodType, setMethodType] = useState<PayoutMethodType>("telebirr");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber.trim() || !accountName.trim()) return;

    onAddMethod({
      type: methodType,
      title:
        methodType === "telebirr"
          ? "Telebirr Mobile Wallet"
          : methodType === "cbe_bank"
          ? "Commercial Bank of Ethiopia (CBE)"
          : methodType === "cbe_birr"
          ? "CBE Birr Wallet"
          : "Awash Bank Account",
      accountIdentifier: accountNumber.trim(),
      accountHolderName: accountName.trim(),
    });

    setAccountNumber("");
    setAccountName("");
    setIsAddingOpen(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
        <div>
          <h3 className="text-base font-bold text-foreground">
            Domestic Payout Destinations
          </h3>
          <p className="text-xs text-muted-foreground">
            Configure where your monthly course earnings and withdrawal payouts are wired
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsAddingOpen(true)}
          className="gap-1.5 text-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Payout Method</span>
        </Button>
      </div>

      {/* Methods Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {methods.map((method) => {
          const isTelebirr = method.type === "telebirr" || method.type === "cbe_birr";

          return (
            <div
              key={method.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                method.isDefault
                  ? "border-primary bg-primary-light/30 shadow-2xs"
                  : "border-border bg-card hover:bg-secondary/30"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                        isTelebirr
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {isTelebirr ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Landmark className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">
                        {method.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {method.accountHolderName}
                      </p>
                    </div>
                  </div>

                  {method.isDefault ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground uppercase tracking-wider">
                      Default
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSetDefault(method.id)}
                      className="text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-card border border-border/70 font-mono text-xs text-foreground flex items-center justify-between">
                  <span>{method.accountIdentifier}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>

              {!method.isDefault && methods.length > 1 && (
                <div className="pt-3 border-t border-border/60 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onDeleteMethod(method.id)}
                    className="p-1 text-muted-foreground hover:text-rose-600 transition-colors"
                    title="Remove method"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Payout Method Dialog */}
      {isAddingOpen && (
        <div className="p-4 rounded-xl border border-primary/40 bg-primary-light/20 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-primary">
              Connect Domestic Payout Channel
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-foreground mb-1">
                  Channel
                </label>
                <select
                  value={methodType}
                  onChange={(e) => setMethodType(e.target.value as PayoutMethodType)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-card text-foreground focus:outline-hidden"
                >
                  <option value="telebirr">Telebirr Mobile Wallet</option>
                  <option value="cbe_bank">Commercial Bank of Ethiopia (CBE)</option>
                  <option value="cbe_birr">CBE Birr Wallet</option>
                  <option value="awash_bank">Awash Bank Account</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground mb-1">
                  {methodType === "telebirr" || methodType === "cbe_birr"
                    ? "Phone Number"
                    : "Bank Account Number"}
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={
                    methodType === "telebirr" ? "+251 9..." : "1000..."
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-card text-foreground focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground mb-1">
                  Registered Account Holder Name
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g. Yishaq Abreham"
                  className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-card text-foreground focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddingOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="text-xs shadow-xs"
              >
                Save Payout Method
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
