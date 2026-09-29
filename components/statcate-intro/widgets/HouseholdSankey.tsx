"use client";

import type { ReactElement } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { INTRO_FONT } from "@/lib/statcate-intro/constants";
import { nationalValue, yearOrLatest } from "@/lib/statcate-intro/query";
import { formatValue } from "@/lib/statcate-intro/format";
import type { HouseholdSankeyWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: HouseholdSankeyWidget;
  dash: IntroDashboardState;
};

const INCOME_COLOR = "#10B981";
const EXPENSE_COLOR = "#F97316";
const CENTER_COLOR = "#1D4ED8";

const ICONS: Record<string, ReactElement> = {
  wallet: (
    <svg viewBox="0 0 48 48" width={22} height={22} fill="none">
      <rect x="4" y="12" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="34" cy="26" r="3" fill="currentColor" />
      <path d="M4 20h40" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  elderly: (
    <svg viewBox="0 0 48 48" width={22} height={22} fill="none">
      <circle cx="16" cy="12" r="5" fill="currentColor" />
      <circle cx="32" cy="12" r="5" fill="currentColor" />
      <path d="M8 40c0-8 6-14 8-14s5 3 8 3 6-3 8-3 8 6 8 14" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  ),
  sewing: (
    <svg viewBox="0 0 48 48" width={22} height={22} fill="none">
      <rect x="6" y="18" width="36" height="16" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 18v-4a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="18" cy="26" r="2" fill="currentColor" />
    </svg>
  ),
  other: (
    <svg viewBox="0 0 48 48" width={22} height={22} fill="none">
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <circle cx="14" cy="24" r="4" fill="currentColor" />
      <circle cx="34" cy="24" r="4" fill="currentColor" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 48 48" width={22} height={22} fill="none">
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M10 12v14M10 12c-2 0-3 1-3 3s1 3 3 3M14 12v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 12v24M38 12c2 0 3 2 3 5s-1 5-3 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  goods: (
    <svg viewBox="0 0 48 48" width={22} height={22} fill="none">
      <rect x="4" y="14" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="8" cy="30" r="2.5" fill="currentColor" />
      <circle cx="18" cy="30" r="2.5" fill="currentColor" />
      <rect x="26" y="16" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 48 48" width={22} height={22} fill="none">
      <path
        d="M24 40s-14-8.5-14-18a8 8 0 0114-5 8 8 0 0114 5c0 9.5-14 18-14 18z"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  ),
  house: (
    <svg viewBox="0 0 48 48" width={24} height={24} fill="none">
      <path d="M24 6 42 20h-6v18H12V20H6Z" fill="currentColor" />
      <rect x="20" y="26" width="8" height="8" fill="#fff" />
    </svg>
  ),
};

const INCOME_ICON_MAP: Record<string, string> = {
  salary: "wallet",
  pension: "elderly",
  "business-income": "sewing",
  "other-income": "other",
};

const EXPENSE_ICON_MAP: Record<string, string> = {
  "food-expense": "food",
  "non-food-expense": "goods",
  "gift-expense": "gift",
};

export default function HouseholdSankey({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  if (!config || !year) return null;

  const totalIncome = tablesById[widget.totalIncomeTable];
  const totalExpense = tablesById[widget.totalExpenseTable];
  if (!totalIncome || !totalExpense) return null;

  const incomeItems = widget.incomeTables
    .map((id) => {
      const t = tablesById[id];
      if (!t) return null;
      const usedYear = yearOrLatest(t.rows, config, year);
      return { id, name: t.label, value: nationalValue(t.rows, config, usedYear) };
    })
    .filter((i): i is { id: string; name: string; value: number } => i !== null && i.value > 0);

  const expenseItems = widget.expenseTables
    .map((id) => {
      const t = tablesById[id];
      if (!t) return null;
      const usedYear = yearOrLatest(t.rows, config, year);
      return { id, name: t.label, value: nationalValue(t.rows, config, usedYear) };
    })
    .filter((i): i is { id: string; name: string; value: number } => i !== null && i.value > 0);

  if (!incomeItems.length || !expenseItems.length) return null;

  const centerName = lng === "en" ? "Household" : "Өрх";

  const nodes = [
    ...incomeItems.map((i) => ({ name: i.name, itemStyle: { color: INCOME_COLOR } })),
    { name: centerName, itemStyle: { color: CENTER_COLOR } },
    ...expenseItems.map((i) => ({ name: i.name, itemStyle: { color: EXPENSE_COLOR } })),
  ];

  const links = [
    ...incomeItems.map((i) => ({
      source: i.name,
      target: centerName,
      value: i.value,
      lineStyle: { color: "source" as const, opacity: 0.35 },
    })),
    ...expenseItems.map((i) => ({
      source: centerName,
      target: i.name,
      value: i.value,
      lineStyle: { color: "source" as const, opacity: 0.35 },
    })),
  ];

  const option: EChartsOption = {
    textStyle: { fontFamily: INTRO_FONT },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      formatter: (params: any) => {
        if (params.dataType === "edge") {
          return `${params.data.source} → ${params.data.target}<br/><b>${formatValue(
            params.data.value,
            lng,
            totalIncome.format,
          )}</b>`;
        }
        return params.name;
      },
    },
    series: [
      {
        type: "sankey",
        data: nodes,
        links,
        emphasis: { focus: "adjacency" },
        lineStyle: { curveness: 0.5 },
        label: {
          fontFamily: INTRO_FONT,
          fontSize: 12,
          color: "#334155",
          position: "left",
        },
        nodeWidth: 16,
        nodeGap: 14,
        left: 90,
        right: 90,
      },
    ],
  };

  // Icon-уудыг node-уудын байрлалын дагуу (баруун/зүүн захад, y тэнхлэгээр тэнцүү зайтай) байрлуулна
  const incomeIconRows = incomeItems.length;
  const expenseIconRows = expenseItems.length;

  return (
    <div className="household-sankey-panel">
      <div className="household-sankey-chart-wrap">
        <ReactECharts option={option} style={{ height: 380, width: "100%" }} notMerge />

        <div className="hs-icons hs-icons--left">
          {incomeItems.map((item, i) => (
            <span
              key={item.id}
              className="hs-icon hs-icon--income"
              style={{ top: `${((i + 0.5) / incomeIconRows) * 100}%` }}
            >
              {ICONS[INCOME_ICON_MAP[item.id] ?? "other"]}
            </span>
          ))}
        </div>

        <div className="hs-icons hs-icons--center">
          <span className="hs-icon hs-icon--center">{ICONS.house}</span>
        </div>

        <div className="hs-icons hs-icons--right">
          {expenseItems.map((item, i) => (
            <span
              key={item.id}
              className="hs-icon hs-icon--expense"
              style={{ top: `${((i + 0.5) / expenseIconRows) * 100}%` }}
            >
              {ICONS[EXPENSE_ICON_MAP[item.id] ?? "other"]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}