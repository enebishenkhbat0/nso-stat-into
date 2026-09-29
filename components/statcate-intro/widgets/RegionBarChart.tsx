"use client";

import { useState } from "react";
import { MapMark } from "@/lib/statcate-intro/marks";
import { COPY } from "@/lib/statcate-intro/constants";
import { loc, num, trimLabel } from "@/lib/statcate-intro/format";
import { geoDimOf, nationalValue, queryRows, yearOrLatest } from "@/lib/statcate-intro/query";
import type { RegionBarsWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: RegionBarsWidget;
  dash: IntroDashboardState;
};

const HIGH_COLOR = "#9F3049";
const LOW_COLOR = "#2E5266";
const COLLAPSED_ROWS = 6;

const NATIONAL_TOTAL_KEYWORDS = [
  "улсын дүн",
  "улсын дун",
  "улсын дундаж",
  "улсын нийт",
  "нийслэл, аймгийн нийт",
  "бүгд",
];

function lerpColor(from: number[], to: number[], t: number) {
  const l = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${l(from[0], to[0])}, ${l(from[1], to[1])}, ${l(from[2], to[2])})`;
}

export default function RegionBarChart({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  const [expanded, setExpanded] = useState(false);

  if (!config || !year) return null;

  const table = tablesById[widget.table];
  const geo = geoDimOf(config, table);
  if (!table || !geo) return null;

  const barYear = yearOrLatest(table.rows, config, year);
  const rows = queryRows(
    table.rows,
    config,
    {
      year: barYear,
      category: config.dimensions.category ? "total" : undefined,
      geo: widget.geoMode === "all" ? "all" : "aimags",
    },
    table,
  )
    .map((row) => ({
      name: trimLabel(row[geo]),
      value: num(row.value),
    }))
    .filter((item) => item.name)
    .filter((item) => {
      const t = item.name.trim().toLowerCase();
      return !NATIONAL_TOTAL_KEYWORDS.some((keyword) => t.includes(keyword));
    })
    .sort((a, b) => b.value - a.value);

  if (!rows.length) return null;

  const avg = nationalValue(table.rows, config, barYear);
  const balance = widget.balancePoint;
  const isDiverging = balance != null;

  const values = rows.map((r) => r.value);
  const maxVal = Math.max(...values, avg);
  const minVal = Math.min(...values, avg);

  const fmt = (v: number) =>
    v.toLocaleString(lng === "en" ? "en-US" : "mn-MN", { maximumFractionDigits: 2 });

  const colorFor = (value: number) => {
    if (isDiverging) {
      if (value >= balance!) {
        const t = maxVal > balance! ? (value - balance!) / (maxVal - balance!) : 0;
        return lerpColor([201, 154, 168], [159, 48, 73], Math.max(0.35, Math.min(1, t)));
      }
      const t = balance! > minVal ? (balance! - value) / (balance! - minVal) : 0;
      return lerpColor([110, 147, 168], [46, 82, 102], Math.max(0.35, Math.min(1, t)));
    }
    if (value === maxVal || value === values[0]) return HIGH_COLOR;
    if (value === minVal) return LOW_COLOR;
    const t = (value - minVal) / (maxVal - minVal || 1);
    return lerpColor([180, 175, 168], [159, 48, 73], t);
  };

  type DisplayRow =
    | { kind: "region"; name: string; value: number }
    | { kind: "average"; value: number };

  const displayAll: DisplayRow[] = [];
  let avgInserted = false;
  rows.forEach((r) => {
    if (!avgInserted && r.value <= avg) {
      displayAll.push({ kind: "average", value: avg });
      avgInserted = true;
    }
    displayAll.push({ kind: "region", name: r.name, value: r.value });
  });
  if (!avgInserted) displayAll.push({ kind: "average", value: avg });

  const visible = expanded ? displayAll : displayAll.slice(0, COLLAPSED_ROWS);
  const hiddenCount = displayAll.length - visible.length;

  const title = widget.title ? loc(lng, widget.title) : loc(lng, COPY.byRegion);
  const avgLabel = lng === "en" ? "National average" : "Улсын дундаж";
  const lowLabel = widget.lowLabel
    ? loc(lng, widget.lowLabel)
    : lng === "en"
      ? "Below balance"
      : "Эрэгтэй давамгай";
  const highLabel = widget.highLabel
    ? loc(lng, widget.highLabel)
    : lng === "en"
      ? "Above balance"
      : "Эмэгтэй давамгай";

  const maxDeviation = isDiverging
    ? Math.max(Math.abs(maxVal - balance!), Math.abs(balance! - minVal), 1e-9)
    : 1;

  function renderBar(value: number, isAvgRow: boolean) {
    if (!isDiverging) {
      const width = (value / maxVal) * 100;
      return (
        <div className="region-bar-track">
          <div
            className={`region-bar-fill ${isAvgRow ? "avg-fill" : ""}`}
            style={{ width: `${width}%`, background: isAvgRow ? undefined : colorFor(value) }}
          />
        </div>
      );
    }

    const dev = value - balance!;
    const pct = (Math.abs(dev) / maxDeviation) * 100;
    const isHigh = dev >= 0;

    return (
      <div className="region-bar-diverge-track">
        <div className="region-bar-diverge-half">
          {!isHigh && (
            <div
              className={`region-bar-diverge-fill low ${isAvgRow ? "avg-fill" : ""}`}
              style={{ width: `${pct}%`, background: isAvgRow ? undefined : colorFor(value) }}
            />
          )}
        </div>
        <div className="region-bar-diverge-mid" />
        <div className="region-bar-diverge-half">
          {isHigh && (
            <div
              className={`region-bar-diverge-fill high ${isAvgRow ? "avg-fill" : ""}`}
              style={{ width: `${pct}%`, background: isAvgRow ? undefined : colorFor(value) }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="region-bar-panel">
      <div className="region-bar-header">
        <h4>
          <MapMark size={16} />
          {title}
          {barYear !== year ? <span> · {barYear}</span> : null}
        </h4>
        <div className="region-bar-legend">
          <span className="region-bar-legend-item">
            <span className="region-bar-dot" style={{ background: HIGH_COLOR }} />
            {isDiverging ? highLabel : lng === "en" ? "Highest" : "Хамгийн өндөр"}
          </span>
          <span className="region-bar-legend-item">
            <span className="region-bar-dot" style={{ background: LOW_COLOR }} />
            {isDiverging ? lowLabel : lng === "en" ? "Lowest" : "Хамгийн бага"}
          </span>
          <span className="region-bar-legend-item">
            <span className="region-bar-dash" />
            {isDiverging ? (lng === "en" ? "Balance point" : "Тэнцвэр") : avgLabel}
          </span>
        </div>
      </div>

      {isDiverging && (
        <div className="region-bar-balance-label">
          {lng === "en" ? "Balance point" : "Тэнцвэр"}: {fmt(balance!)}
        </div>
      )}

      <div className="region-bar-list">
        {visible.map((row) =>
          row.kind === "average" ? (
            <div key="avg" className="region-bar-row avg-row">
              <span className="region-bar-row-name">{avgLabel}</span>
              {renderBar(row.value, true)}
              <span className="region-bar-row-value">{fmt(row.value)}</span>
            </div>
          ) : (
            <div key={row.name} className="region-bar-row">
              <span className="region-bar-row-name">{row.name}</span>
              {renderBar(row.value, false)}
              <span className="region-bar-row-value">{fmt(row.value)}</span>
            </div>
          ),
        )}
      </div>

      {hiddenCount > 0 && (
        <button className="region-bar-toggle" onClick={() => setExpanded(true)}>
          {lng === "en" ? `+ ${hiddenCount} more regions` : `+ ${hiddenCount} бүсийг харах`}
          <span className="region-bar-toggle-chevron">▾</span>
        </button>
      )}
      {expanded && displayAll.length > COLLAPSED_ROWS && (
        <button className="region-bar-toggle" onClick={() => setExpanded(false)}>
          {lng === "en" ? "Show less" : "Хураах"}
          <span className="region-bar-toggle-chevron up">▾</span>
        </button>
      )}
    </div>
  );
}