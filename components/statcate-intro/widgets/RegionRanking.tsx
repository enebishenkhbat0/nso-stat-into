"use client";

import { queryRows, yearOrLatest } from "@/lib/statcate-intro/query";
import { formatValue, loc, num, trimLabel } from "@/lib/statcate-intro/format";
import type { RegionRankingWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: RegionRankingWidget;
  dash: IntroDashboardState;
};

const DEFAULT_BAND_LABELS = ["Доод", "Дундаж-Доод", "Дундаж", "Дундаж-Дээд", "Өндөр"];
const BAND_COLORS = ["#DC2626", "#F97316", "#FBBF24", "#60A5FA", "#1D4ED8"];

export default function RegionRanking({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  if (!config || !year) return null;

  const table = tablesById[widget.table];
  const geoDim = table?.geo ?? config.dimensions.geo;
  if (!table || !geoDim) return null;

  const usedYear = yearOrLatest(table.rows, config, year);
  const rows = queryRows(
    table.rows,
    config,
    { year: usedYear, category: config.dimensions.category ? "total" : undefined, geo: "aimags" },
    table,
  )
    .map((row) => ({ name: trimLabel(row[geoDim]), value: num(row.value) }))
    .filter((r) => r.name)
    .sort((a, b) => b.value - a.value);

  if (!rows.length) return null;

  const min = Math.min(...rows.map((r) => r.value));
  const max = Math.max(...rows.map((r) => r.value));
  const span = max - min || 1;
  const bandLabels = widget.bandLabels ?? DEFAULT_BAND_LABELS;
  const bandCount = bandLabels.length;

  function bandIndex(value: number) {
    const t = (value - min) / span;
    return Math.min(bandCount - 1, Math.floor(t * bandCount));
  }

  const title = widget.title ? loc(lng, widget.title) : table.label;

  return (
    <div className="region-ranking-panel">
      <h4 className="region-ranking-title">{title}</h4>

      <div className="region-ranking-legend">
        {bandLabels.map((label, i) => {
          const lo = min + (span * i) / bandCount;
          const hi = min + (span * (i + 1)) / bandCount;
          return (
            <span
              key={label}
              className="region-ranking-legend-badge"
              style={{ background: `${BAND_COLORS[i]}18`, color: BAND_COLORS[i] }}
            >
              <b>{label}</b> ({lo.toFixed(2)}–{hi.toFixed(2)})
            </span>
          );
        })}
      </div>

      <ul className="region-ranking-list">
        {rows.map((row, i) => {
          const band = bandIndex(row.value);
          const color = BAND_COLORS[band];
          const barWidth = ((row.value - min) / span) * 100;
          return (
            <li key={row.name} className="region-ranking-row">
              <span className="region-ranking-rank">{i + 1}</span>
              <span className="region-ranking-name">{row.name}</span>
              <div className="region-ranking-track">
                <div className="region-ranking-fill" style={{ width: `${Math.max(barWidth, 4)}%`, background: color }} />
              </div>
              <span className="region-ranking-value" style={{ color }}>
                {formatValue(row.value, lng, table.format)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}