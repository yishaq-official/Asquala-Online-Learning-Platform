"use client";

import React from "react";
import {
  TrendingUp,
  Coins,
  Percent,
  GraduationCap,
  Award,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { EXECUTIVE_KPI_DATA } from "@/lib/mock-admin-data";

export function AdminKpiGrid() {
  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("ETB", "ETB ");
  };

  const cards = [
    {
      title: "Gross Marketplace Volume (GMV)",
      subtitle: "Total student course purchases",
      value: formatETB(EXECUTIVE_KPI_DATA.grossGmv),
      growth: `+${EXECUTIVE_KPI_DATA.gmvGrowthPercent}%`,
      growthText: "vs last month",
      icon: Coins,
      tag: "Total GMV",
    },
    {
      title: "Platform Take-Rate Revenue (15%)",
      subtitle: "Asquala infrastructure fee",
      value: formatETB(EXECUTIVE_KPI_DATA.platformTakeRateRevenue),
      growth: `+${EXECUTIVE_KPI_DATA.takeRateGrowthPercent}%`,
      growthText: "month-over-month",
      icon: Percent,
      tag: "Asquala 15%",
    },
    {
      title: "Active Enrolled Students",
      subtitle: "AAiT, AASTU, JU & Bahir Dar",
      value: `${EXECUTIVE_KPI_DATA.activeLearners.toLocaleString()} Learners`,
      growth: `+${EXECUTIVE_KPI_DATA.learnersGrowthPercent}%`,
      growthText: "enrollment surge",
      icon: GraduationCap,
      tag: "Higher Ed",
    },
    {
      title: "Accredited Educators",
      subtitle: "MoE & University vetted",
      value: `${EXECUTIVE_KPI_DATA.accreditedTeachers} Verified`,
      growth: `${EXECUTIVE_KPI_DATA.pendingAccreditationsCount} Pending`,
      growthText: "awaiting review",
      icon: Award,
      tag: "Review Desk",
      isPendingTag: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-300 transition-all shadow-2xs hover:shadow-sm group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {card.tag}
                </span>
                <div className="w-8 h-8 rounded-xl bg-secondary group-hover:bg-emerald-50 flex items-center justify-center text-muted-foreground group-hover:text-emerald-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h2 className="text-xs font-semibold text-muted-foreground line-clamp-1">
                {card.title}
              </h2>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
                {card.value}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {card.subtitle}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 font-bold text-emerald-800">
                {!card.isPendingTag && <TrendingUp className="w-3.5 h-3.5" />}
                <span>{card.growth}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                {card.growthText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
