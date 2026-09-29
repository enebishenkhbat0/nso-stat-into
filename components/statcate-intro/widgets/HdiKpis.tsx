"use client";

import { listYears, queryRows, yearOrLatest } from "@/lib/statcate-intro/query";
import { formatValue, num, trimLabel } from "@/lib/statcate-intro/format";
import type { HdiKpisWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: HdiKpisWidget;
  dash: IntroDashboardState;
};

function TrendArrow({ up }: { up: boolean | null }) {
  if (up === null) return null;
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" style={{ marginLeft: 6 }}>
      {up ? (
        <path d="M4 16 10 10 14 14 20 6" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 8 10 14 14 10 20 18" stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function HdiKpis({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  if (!config || !year) return null;

  const scoreTable = tablesById[widget.scoreTable];
  if (!scoreTable) return null;

  const usedYear = yearOrLatest(scoreTable.rows, config, year);
  const geoDim = widget.geoDim ?? config.dimensions.geo;

  const nationalRows = queryRows(scoreTable.rows, config, { year: usedYear, geo: "national" }, scoreTable);
  const score = nationalRows.length ? num(nationalRows[0].value) : 0;

  const years = listYears(scoreTable.rows, config.dimensions.time);
  const idx = years.indexOf(usedYear);
  const prevYear = idx >= 0 ? years[idx + 1] : undefined;
  let delta: number | null = null;
  if (prevYear) {
    const prevRows = queryRows(scoreTable.rows, config, { year: prevYear, geo: "national" }, scoreTable);
    if (prevRows.length) delta = score - num(prevRows[0].value);
  }

  let rank: number | null = null;
  let totalRegions = 0;
  if (geoDim) {
    const regionRows = queryRows(scoreTable.rows, config, { year: usedYear, geo: "aimags" }, scoreTable)
      .map((row) => ({ name: trimLabel(row[geoDim]), value: num(row.value) }))
      .filter((r) => r.name);
    totalRegions = regionRows.length;
    const sorted = [...regionRows].sort((a, b) => b.value - a.value);
    const national = sorted.findIndex((r) => Math.abs(r.value - score) < 1e-6);
    rank = national >= 0 ? national + 1 : null;
  }

  return (
    <div className="hdi-kpis">
      <div className="hdi-kpi-card">
        <div className="hdi-kpi-label">
          {scoreTable.label} <TrendArrow up={delta === null ? null : delta >= 0} />
        </div>
        <strong className="hdi-kpi-value">{formatValue(score, lng, scoreTable.format)}</strong>
      </div>

      {rank !== null && (
        <div className="hdi-kpi-card">
          <div className="hdi-kpi-label">{lng === "en" ? "National rank" : "Улсын чансаа"}</div>
          <strong className="hdi-kpi-value">
            {rank}
            {lng === "en" ? `/${totalRegions}` : `-р байр`}
          </strong>
        </div>
      )}

      {delta !== null && (
        <div className="hdi-kpi-card">
          <div className="hdi-kpi-label">{lng === "en" ? "Change vs. prior year" : "Өнгөрсөн онтой харьцуулсан"}</div>
          <strong className={`hdi-kpi-value ${delta >= 0 ? "hdi-positive" : "hdi-negative"}`}>
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(2)}
          </strong>
        </div>
      )}
    </div>
  );
}