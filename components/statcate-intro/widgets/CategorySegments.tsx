"use client";

import { useState } from "react";
import { dimLabel, listYears } from "@/lib/statcate-intro/query";
import { formatValue, loc, num, trimLabel } from "@/lib/statcate-intro/format";
import type { CategorySegmentsWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: CategorySegmentsWidget;
  dash: IntroDashboardState;
};

const CLASSIC_PALETTE = [
  "#1D4E6B", // deep classic blue
  "#1F8A70", // classic teal-green
  "#3A6EA5", // rich blue
  "#B4863B", // muted gold/bronze
  "#7A4E6D", // muted plum
];
const OTHER_COLOR = "#A8A6A0";

const R = 84;
const CIRCUMFERENCE = 2 * Math.PI * R;
const VISIBLE_SLICES = 4;

function ShieldBadgeIcon() {
  return (
    <svg viewBox="0 0 64 64" width={32} height={32}>
      <defs>
        <linearGradient id="csg-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A6488" />
          <stop offset="100%" stopColor="#1D4E6B" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 54 14v14c0 16-9.5 26.5-22 32C19.5 54.5 10 44 10 28V14L32 4Z"
        fill="url(#csg-shield)"
      />
      <path
        d="M22 32.5 29 39.5 43 24"
        fill="none"
        stroke="#fff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RowIcon({ label, color, isOther }: { label: string; color: string; isOther?: boolean }) {
  const t = label.toLowerCase();
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (isOther)
    return (
      <svg {...common}>
        <circle cx="6" cy="12" r="1.6" fill={color} stroke="none" />
        <circle cx="12" cy="12" r="1.6" fill={color} stroke="none" />
        <circle cx="18" cy="12" r="1.6" fill={color} stroke="none" />
      </svg>
    );
  if (t.includes("өмчлөх") || t.includes("property"))
    return (
      <svg {...common}>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    );
  if (t.includes("залилан") || t.includes("fraud"))
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    );
  if (t.includes("эрүүл") || t.includes("health"))
    return (
      <svg {...common}>
        <path d="M12 21s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6.5 2c0 4.8-6.5 9-6.5 9Z" />
      </svg>
    );
  if (t.includes("хулгай") || t.includes("theft"))
    return (
      <svg {...common}>
        <path d="M6 8h9l3 12H4L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        <path d="M9.5 14h5" />
      </svg>
    );
  if (t.includes("хөрөнгө") || t.includes("embezzl"))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.2" />
        <path d="M12 7.2v9.6" />
        <path d="M4 4l16 16" />
      </svg>
    );
  if (t.includes("дээрэм") || t.includes("robbery"))
    return (
      <svg {...common}>
        <circle cx="12" cy="6" r="2.4" />
        <path d="M8 20v-6.5L5.5 11" />
        <path d="M16 20v-6.5L18.5 11" />
      </svg>
    );
  if (t.includes("золгүй") || t.includes("accident"))
    return (
      <svg {...common}>
        <path d="M12 3 2 20h20L12 3Z" />
        <path d="M12 10v4" />
        <path d="M12 17v.01" />
      </svg>
    );
  if (t.includes("алалт") || t.includes("violent"))
    return (
      <svg {...common}>
        <path d="M4 20 14 10" />
        <path d="M12 4l4 4-2.5 2.5-4-4Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="1.6" fill={color} stroke="none" />
    </svg>
  );
}

export default function CategorySegments({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  if (!config || !year) return null;

  const totalTable = tablesById[widget.totalTable];
  const partsTable = tablesById[widget.partsTable];
  if (!totalTable || !partsTable) return null;

  const timeDim = config.dimensions.time;

  const items = partsTable.rows
    .filter((row) => dimLabel(row, timeDim) === year)
    .map((row) => {
      const raw = trimLabel(row[widget.dimension]);
      return {
        label: widget.labelMap?.[raw] ?? raw,
        value: num(row.value),
      };
    })
    .filter((item) => item.label && item.value > 0)
    .sort((a, b) => b.value - a.value);

  if (!items.length) return null;

  const total = items.reduce((sum, item) => sum + item.value, 0);
  const totalRow = totalTable.rows.find((row) => dimLabel(row, timeDim) === year);
  const totalValue = totalRow ? num(totalRow.value) : total;

  let delta: number | null = null;
  if (widget.compareToPrevYear) {
    const years = listYears(totalTable.rows, timeDim);
    const idx = years.indexOf(year);
    const prevYear = idx >= 0 ? years[idx + 1] : undefined;
    if (prevYear) {
      const prevRow = totalTable.rows.find((row) => dimLabel(row, timeDim) === prevYear);
      if (prevRow) delta = totalValue - num(prevRow.value);
    }
  }

  const withPercent = items.map((item) => ({
    ...item,
    percent: (item.value / total) * 100,
  }));

  const topItems = withPercent.slice(0, VISIBLE_SLICES).map((item, i) => ({
    ...item,
    color: CLASSIC_PALETTE[i % CLASSIC_PALETTE.length],
    isOther: false,
  }));
  const restItems = withPercent.slice(VISIBLE_SLICES);
  const otherValue = restItems.reduce((sum, item) => sum + item.value, 0);
  const otherPercent = (otherValue / total) * 100;
  const hasOther = restItems.length > 0;

  const otherLabel =
    lng === "en" ? `Other ${restItems.length} categories` : `Бусад ${restItems.length} төрөл`;

  const collapsedLegend = hasOther
    ? [
        ...topItems,
        {
          label: otherLabel,
          value: otherValue,
          percent: otherPercent,
          color: OTHER_COLOR,
          isOther: true,
        },
      ]
    : topItems;

  const fullLegend = withPercent.map((item, i) => ({
    ...item,
    color: i < CLASSIC_PALETTE.length ? CLASSIC_PALETTE[i] : OTHER_COLOR,
    isOther: false,
  }));

  const legend = expanded ? fullLegend : collapsedLegend;

  let cursorPos = 0;
  const arcs = legend.map((item) => {
    const len = (item.percent / 100) * CIRCUMFERENCE;
    const dasharray = `${len} ${CIRCUMFERENCE - len}`;
    const dashoffset = -cursorPos;
    cursorPos += len;
    return { ...item, dasharray, dashoffset };
  });

  const title = widget.title ? loc(lng, widget.title) : totalTable.label;
  const hoveredItem = legend.find((item) => item.label === hovered) ?? null;

  return (
    <div className="csg-panel">
      <div className="csg-header">
        <span className="csg-icon-box">
          <ShieldBadgeIcon />
        </span>
        <div>
          <h3 className="csg-title">{title}</h3>
          <div className="csg-total-row">
            <strong className="csg-total">
              {formatValue(totalValue, lng, totalTable.format)}
            </strong>
            {delta !== null && (
              <span className={`csg-delta ${delta >= 0 ? "up" : "down"}`}>
                {delta >= 0 ? "▲" : "▼"} {formatValue(Math.abs(delta), lng, totalTable.format)}
                {" "}
                {lng === "en" ? "vs prior year" : "өмнөх оноос"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="csg-body">
        <div className="csg-donut-wrap">
          <svg width="216" height="216" viewBox="0 0 216 216">
            <circle cx="108" cy="108" r={R} fill="none" stroke="#EEEDE7" strokeWidth="26" />
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx="108"
                cy="108"
                r={R}
                fill="none"
                stroke={arc.color}
                strokeWidth={hovered === arc.label ? 31 : 26}
                strokeDasharray={arc.dasharray}
                strokeDashoffset={arc.dashoffset}
                transform="rotate(-90 108 108)"
                opacity={hovered && hovered !== arc.label ? 0.35 : 1}
                style={{ cursor: "pointer", transition: "opacity 0.15s, stroke-width 0.15s" }}
                onMouseEnter={() => setHovered(arc.label)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
            <text x="108" y="102" textAnchor="middle" className="csg-donut-count">
              {hoveredItem
                ? formatValue(hoveredItem.value, lng, partsTable.format)
                : items.length}
            </text>
            <text x="108" y="126" textAnchor="middle" className="csg-donut-label">
              {hoveredItem ? `${hoveredItem.percent.toFixed(1)}%` : lng === "en" ? "types" : "төрөл"}
            </text>
          </svg>
        </div>

        <div className="csg-legend">
          {legend.map((item) => (
            <div
              key={item.label}
              className={`csg-legend-row ${hovered === item.label ? "hot" : ""}`}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              style={{ opacity: hovered && hovered !== item.label ? 0.5 : 1 }}
            >
              <span className="csg-legend-icon" style={{ background: `${item.color}1F` }}>
                <RowIcon label={item.label} color={item.color} isOther={item.isOther} />
              </span>
              <span className="csg-legend-label">{item.label}</span>
              <span className="csg-legend-value">
                {formatValue(item.value, lng, partsTable.format)}
              </span>
              <span className="csg-legend-percent">{item.percent.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {hasOther && (
        <button className="csg-toggle" onClick={() => setExpanded((e) => !e)}>
          {expanded
            ? lng === "en"
              ? "Show summary"
              : "Хураангуйгаар харах"
            : lng === "en"
              ? `Show all ${items.length} categories`
              : `Дэлгэрэнгүй ${items.length} төрлийг харах`}
          <i className={`csg-toggle-arrow ${expanded ? "up" : ""}`}>→</i>
        </button>
      )}
    </div>
  );
}