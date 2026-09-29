"use client";

import { useState } from "react";
import { nationalValue } from "@/lib/statcate-intro/query";
import type { HouseholdFlowWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: HouseholdFlowWidget;
  dash: IntroDashboardState;
};

const INCOME_COLOR = "#10B981";
const INCOME_BG = "#ECFDF5";
const EXPENSE_COLOR = "#F97316";
const EXPENSE_BG = "#FFF7ED";
const HOUSE_COLOR = "#2563EB";

function MiniIcon({ name, color, size = 34 }: { name?: string; color: string; size?: number }) {
  const s = size;
  const common = {
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  switch (name) {
    case "wallet":
      return (
        <svg width={s} height={s} viewBox="0 0 48 48">
          <rect x="4" y="12" width="40" height="28" rx="4" {...common} />
          <path d="M4 20h40" {...common} />
          <circle cx="34" cy="28" r="2.6" fill={color} stroke="none" />
        </svg>
      );
    case "elderly":
      return (
        <svg width={s} height={s} viewBox="0 0 48 48">
          <circle cx="17" cy="12" r="5" {...common} />
          <circle cx="33" cy="12" r="5" {...common} />
          <path d="M8 40c0-7 4-11 9-11s9 4 9 11" {...common} />
          <path d="M22 40c0-7 4-11 9-11s9 4 9 11" {...common} />
          <path d="M40 22l-3 12" {...common} />
        </svg>
      );
    case "sewing":
      return (
        <svg width={s} height={s} viewBox="0 0 48 48">
          <rect x="6" y="24" width="34" height="10" rx="3" {...common} />
          <path d="M20 24c0-8 6-14 16-14" {...common} />
          <circle cx="36" cy="10" r="3" {...common} />
          <path d="M10 34v6M34 34v6" {...common} />
        </svg>
      );
    case "food":
      return (
        <svg width={s} height={s} viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="15" {...common} />
          <circle cx="24" cy="24" r="7" {...common} />
          <path d="M6 10v10M6 10c-3 0-3 6 0 6M10 8v14" {...common} />
          <path d="M42 8c0 6-4 8-4 8v16" {...common} />
        </svg>
      );
    case "goods":
      return (
        <svg width={s} height={s} viewBox="0 0 48 48">
          <rect x="4" y="26" width="18" height="10" rx="2" {...common} />
          <circle cx="9" cy="40" r="2.4" fill={color} stroke="none" />
          <circle cx="19" cy="40" r="2.4" fill={color} stroke="none" />
          <path d="M22 30h6l4 6v4h-10" {...common} />
          <rect x="26" y="6" width="18" height="14" rx="2" {...common} />
          <path d="M31 24h8" {...common} />
        </svg>
      );
    case "gift":
      return (
        <svg width={s} height={s} viewBox="0 0 48 48">
          <path d="M24 40l-13-13a8 8 0 1111-11l2 2 2-2a8 8 0 1111 11z" {...common} />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" {...common} />
          <circle cx="16" cy="24" r="2.4" fill={color} stroke="none" />
          <circle cx="24" cy="24" r="2.4" fill={color} stroke="none" />
          <circle cx="32" cy="24" r="2.4" fill={color} stroke="none" />
        </svg>
      );
  }
}

function HouseIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path
        d="M6 22L24 8l18 14"
        fill="none"
        stroke={HOUSE_COLOR}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="10" y="20" width="28" height="20" rx="1.5" fill={HOUSE_COLOR} />
      <rect x="20" y="28" width="7" height="7" fill="white" />
    </svg>
  );
}

function formatMoney(value: number, lng: string, unit?: string) {
  const locale = lng === "mn" ? "mn-MN" : "en-US";
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value || 0);
  return unit ? `${unit} ${formatted}` : formatted;
}

function pct(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

function safeVal(rows: any, cfg: any, yr: string) {
  try {
    const v = nationalValue(rows, cfg, yr);
    return typeof v === "number" && !isNaN(v) ? v : 0;
  } catch {
    return 0;
  }
}

export default function HouseholdFlow({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  const [active, setActive] = useState<string | null>(null);

  if (!config || !year) return null;

  const totalIncome = tablesById[widget.totalIncomeTable];
  const totalExpense = tablesById[widget.totalExpenseTable];
  if (!totalIncome || !totalExpense) return null;

  const totalIncomeValue = safeVal(totalIncome.rows, config, year);
  const totalExpenseValue = safeVal(totalExpense.rows, config, year);
  const balance = totalIncomeValue - totalExpenseValue;

  const incomeItems = widget.incomeTables
    .map((id) => tablesById[id])
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map((table) => ({
      id: table.id,
      label: table.label,
      unit: table.unit,
      value: safeVal(table.rows, config, year),
      icon: widget.icons?.[table.id],
    }));

  const expenseItems = widget.expenseTables
    .map((id) => tablesById[id])
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map((table) => ({
      id: table.id,
      label: table.label,
      unit: table.unit,
      value: safeVal(table.rows, config, year),
      icon: widget.icons?.[table.id],
    }));

  if (!incomeItems.length && !expenseItems.length) return null;

  const rowH = 100;
  const topPad = 30;
  const iconR = 28;
  const houseR = 42;

  const incomeH = incomeItems.length * rowH;
  const expenseH = expenseItems.length * rowH;
  const bodyH = Math.max(incomeH, expenseH);
  const totalH = topPad * 2 + bodyH;
  const houseY = topPad + bodyH / 2;

  const leftLabelX = 20;
  const leftIconX = 460;
  const houseX = 620;
  const rightIconX = 780;
  const rightLabelX = 830;
  const W = 1200;

  const incomeStartY = topPad + (bodyH - incomeH) / 2;
  const expenseStartY = topPad + (bodyH - expenseH) / 2;

  return (
    <section className="sector-intro-hero household-flow-wrap">
      <div className="hf-summary">
        <div className="hf-summary-card hf-summary-card--income">
          <span className="hf-summary-label">{lng === "mn" ? "Мөнгөн орлого" : "Cash Income"}</span>
          <strong>{formatMoney(totalIncomeValue, lng, totalIncome.unit)}</strong>
        </div>
        <div className="hf-summary-card hf-summary-card--balance">
          <span className="hf-summary-label">{lng === "mn" ? "Тэнцвэр" : "Balance"}</span>
          <strong className={balance >= 0 ? "hf-positive" : "hf-negative"}>
            {balance >= 0 ? "+" : ""}
            {formatMoney(balance, lng, totalIncome.unit)}
          </strong>
        </div>
        <div className="hf-summary-card hf-summary-card--expense">
          <span className="hf-summary-label">{lng === "mn" ? "Мөнгөн зарлага" : "Cash Expenditure"}</span>
          <strong>{formatMoney(totalExpenseValue, lng, totalExpense.unit)}</strong>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${totalH}`} width="100%" style={{ display: "block" }}>
        {incomeItems.map((item, i) => {
          const y = incomeStartY + rowH * i + rowH / 2;
          const midX = (leftIconX + iconR + (houseX - houseR)) / 2;
          return (
            <path
              key={`line-${item.id}`}
              d={`M${leftIconX + iconR},${y} H${midX - 20} Q${midX},${y} ${midX},${y + (houseY - y) * 0.4 * Math.sign(houseY - y || 1)} L${midX},${houseY - (houseY > y ? 10 : -10)} Q${midX},${houseY} ${midX + 20},${houseY}`}
              fill="none"
              stroke={INCOME_COLOR}
              strokeWidth={3}
              opacity={active && active !== item.id ? 0.25 : 1}
            />
          );
        })}

        {expenseItems.map((item, i) => {
          const y = expenseStartY + rowH * i + rowH / 2;
          const midX = (houseX + houseR + (rightIconX - iconR)) / 2;
          return (
            <path
              key={`line-${item.id}`}
              d={`M${houseX + houseR},${houseY} H${midX - 20} Q${midX},${houseY} ${midX},${houseY + (y - houseY) * 0.4 * Math.sign(y - houseY || 1)} L${midX},${y - (y > houseY ? 10 : -10)} Q${midX},${y} ${midX + 20},${y}`}
              fill="none"
              stroke={EXPENSE_COLOR}
              strokeWidth={3}
              opacity={active && active !== item.id ? 0.25 : 1}
            />
          );
        })}

        <g>
          <circle cx={houseX} cy={houseY} r={houseR} fill="#EFF6FF" />
          <g transform={`translate(${houseX - 32}, ${houseY - 32})`}>
            <HouseIcon size={64} />
          </g>
        </g>

        {incomeItems.map((item, i) => {
          const y = incomeStartY + rowH * i + rowH / 2;
          const isActive = active === item.id;
          return (
            <g
              key={item.id}
              onClick={() => setActive(isActive ? null : item.id)}
              style={{ cursor: "pointer" }}
            >
              <rect x={0} y={y - 40} width={leftIconX + iconR + 20} height={80} fill="transparent" />
              <foreignObject x={leftLabelX} y={y - 42} width={leftIconX - iconR - leftLabelX - 20} height={84}>
                <div
                  {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
                  style={{ textAlign: "right", fontFamily: "inherit" }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", lineHeight: 1.3 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 21, fontWeight: 800, color: INCOME_COLOR }}>
                    {formatMoney(item.value, lng, item.unit)}
                  </div>
                  {isActive && (
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#059669", marginTop: 3 }}>
                      {pct(item.value, totalIncomeValue)}{" "}
                      {lng === "mn" ? "орлогын дүнгээс" : "of income"}
                    </div>
                  )}
                </div>
              </foreignObject>
              <circle
                cx={leftIconX}
                cy={y}
                r={iconR}
                fill={INCOME_BG}
                stroke={isActive ? INCOME_COLOR : "transparent"}
                strokeWidth={3}
              />
              <g transform={`translate(${leftIconX - 17}, ${y - 17})`}>
                <MiniIcon name={item.icon} color={INCOME_COLOR} size={34} />
              </g>
            </g>
          );
        })}

        {expenseItems.map((item, i) => {
          const y = expenseStartY + rowH * i + rowH / 2;
          const isActive = active === item.id;
          return (
            <g
              key={item.id}
              onClick={() => setActive(isActive ? null : item.id)}
              style={{ cursor: "pointer" }}
            >
              <rect x={rightIconX - iconR - 20} y={y - 40} width={W - (rightIconX - iconR - 20)} height={80} fill="transparent" />
              <circle
                cx={rightIconX}
                cy={y}
                r={iconR}
                fill={EXPENSE_BG}
                stroke={isActive ? EXPENSE_COLOR : "transparent"}
                strokeWidth={3}
              />
              <g transform={`translate(${rightIconX - 17}, ${y - 17})`}>
                <MiniIcon name={item.icon} color={EXPENSE_COLOR} size={34} />
              </g>
              <foreignObject x={rightLabelX} y={y - 42} width={W - rightLabelX - 10} height={84}>
                <div
                  {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
                  style={{ textAlign: "left", fontFamily: "inherit" }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1F2937", lineHeight: 1.3 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 21, fontWeight: 800, color: EXPENSE_COLOR }}>
                    {formatMoney(item.value, lng, item.unit)}
                  </div>
                  {isActive && (
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#C2410C", marginTop: 3 }}>
                      {pct(item.value, totalExpenseValue)}{" "}
                      {lng === "mn" ? "зарлагын дүнгээс" : "of expenditure"}
                    </div>
                  )}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </section>
  );
}