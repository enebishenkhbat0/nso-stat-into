"use client";

import { useState } from "react";
import { dimLabel, listYears, queryRows } from "@/lib/statcate-intro/query";
import { formatValue, loc, num, trimLabel } from "@/lib/statcate-intro/format";
import type { RegionDonutGridWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: RegionDonutGridWidget;
  dash: IntroDashboardState;
};

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function lerpColor(low: string, high: string, t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  const a = hexToRgb(low);
  const b = hexToRgb(high);
  const r = Math.round(a.r + (b.r - a.r) * clamped);
  const g = Math.round(a.g + (b.g - a.g) * clamped);
  const bl = Math.round(a.b + (b.b - a.b) * clamped);
  return `rgb(${r},${g},${bl})`;
}

function arcPath(cx: number, cy: number, rOuter: number, rInner: number, startAngle: number, endAngle: number) {
  const toXY = (r: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const p1 = toXY(rOuter, startAngle);
  const p2 = toXY(rOuter, endAngle);
  const p3 = toXY(rInner, endAngle);
  const p4 = toXY(rInner, startAngle);
  return `M ${p1.x} ${p1.y} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y} Z`;
}

function MiniDonut({
  name,
  segments,
  colorLow,
  colorHigh,
  min,
  max,
  format,
  lng,
}: {
  name: string;
  segments: { year: string; value: number | null }[];
  colorLow: string;
  colorHigh: string;
  min: number;
  max: number;
  format?: string;
  lng: string;
}) {
  const [hover, setHover] = useState<{ year: string; value: number; index: number } | null>(null);
  const SIZE = 172;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R_OUT = 74;
  const R_IN = 50;
  const gap = 1.4;
  const step = 360 / segments.length;
  const span = max - min || 1;

  const latest = [...segments].reverse().find((s) => s.value != null);

  return (
    <div className="rdg-cell">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} overflow="visible">
        {segments.map((seg, i) => {
          const start = i * step + gap / 2;
          const end = (i + 1) * step - gap / 2;
          const mid = (start + end) / 2;
          const isHovered = hover?.index === i;
          const color =
            seg.value != null ? lerpColor(colorLow, colorHigh, (seg.value - min) / span) : "#eef1f5";
          const pushOut = isHovered ? 4 : 0;
          const rad = ((mid - 90) * Math.PI) / 180;
          const offsetX = Math.cos(rad) * pushOut;
          const offsetY = Math.sin(rad) * pushOut;
          const outer = isHovered ? R_OUT + 5 : R_OUT;
          const inner = isHovered ? R_IN - 2 : R_IN;

          return (
            <path
              key={seg.year}
              d={arcPath(CX + offsetX, CY + offsetY, outer, inner, start, end)}
              fill={color}
              stroke="#fff"
              strokeWidth={isHovered ? 1.2 : 0.6}
              className={`rdg-segment${isHovered ? " rdg-segment--active" : ""}`}
              style={{ transition: "d 0.12s ease, stroke-width 0.12s ease" }}
              onMouseEnter={() => seg.value != null && setHover({ year: seg.year, value: seg.value, index: i })}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
        <text x={CX} y={CY - 6} textAnchor="middle" className="rdg-cell-name">
          {name}
        </text>
        {latest && (
          <text x={CX} y={CY + 18} textAnchor="middle" className="rdg-cell-value">
            {latest.value?.toFixed(2)}
          </text>
        )}
      </svg>
      {hover && (
        <div className="rdg-tooltip">
          <strong>
            {name} ({hover.year})
          </strong>
          <div className="rdg-tooltip-row">
            <span>{lng === "en" ? "HDI" : "ХХИ"}:</span>
            <b>{formatValue(hover.value, lng, format as never)}</b>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegionDonutGrid({ widget, dash }: Props) {
  const { config, tablesById, lng } = dash;
  if (!config) return null;

  const table = tablesById[widget.table];
  const geoDim = table?.geo ?? config.dimensions.geo;
  if (!table || !geoDim) return null;

  const timeDim = config.dimensions.time;
  const years = listYears(table.rows, timeDim).slice().reverse();

  const nationalRows = queryRows(table.rows, config, { geo: "national" }, table);
  const nationalByYear = new Map(nationalRows.map((r) => [dimLabel(r, timeDim), num(r.value)]));

  const aimagRows = queryRows(table.rows, config, { geo: "aimags" }, table);
  const byRegion = new Map<string, Map<string, number>>();
  for (const row of aimagRows) {
    const name = trimLabel(row[geoDim]);
    if (!name) continue;
    const y = dimLabel(row, timeDim);
    if (!byRegion.has(name)) byRegion.set(name, new Map());
    byRegion.get(name)!.set(y, num(row.value));
  }

  const allValues = [...nationalByYear.values(), ...[...byRegion.values()].flatMap((m) => [...m.values()])].filter(
    (v) => Number.isFinite(v),
  );
  if (!allValues.length) return null;
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  const colorLow = widget.colorLow ?? "#E24B4A";
  const colorHigh = widget.colorHigh ?? "#639922";
  const title = widget.title ? loc(lng, widget.title) : table.label;

  const latestYear = years[years.length - 1];
  const nationalLatest = nationalByYear.get(latestYear);

  const sortedRegions = [...byRegion.entries()].sort((a, b) => {
    const av = a[1].get(latestYear) ?? -Infinity;
    const bv = b[1].get(latestYear) ?? -Infinity;
    return bv - av;
  });

  const cells = [
    {
      name: lng === "en" ? "National" : "Улсын дүн",
      segments: years.map((y) => ({ year: y, value: nationalByYear.get(y) ?? null })),
    },
    ...sortedRegions.map(([name, m]) => ({
      name,
      segments: years.map((y) => ({ year: y, value: m.get(y) ?? null })),
    })),
  ];

  return (
    <div className="rdg-panel">
      <div className="rdg-header">
        <div>
          <span className="rdg-header-label">
            {lng === "en" ? "National average" : "Улсын дундаж"}, {latestYear}
          </span>
          <strong className="rdg-header-value">
            {nationalLatest != null ? formatValue(nationalLatest, lng, table.format) : "—"}
          </strong>
        </div>
        <div className="rdg-legend">
          <span>{min.toFixed(2)}</span>
          <div className="rdg-legend-bar" style={{ background: `linear-gradient(90deg, ${colorLow}, ${colorHigh})` }} />
          <span>{max.toFixed(2)}</span>
        </div>
      </div>

      {widget.subtitle && <p className="rdg-subtitle">{loc(lng, widget.subtitle)}</p>}

      <div className="rdg-grid">
        {cells.map((cell) => (
          <MiniDonut
            key={cell.name}
            name={cell.name}
            segments={cell.segments}
            colorLow={colorLow}
            colorHigh={colorHigh}
            min={min}
            max={max}
            format={table.format}
            lng={lng}
          />
        ))}
      </div>
    </div>
  );
}