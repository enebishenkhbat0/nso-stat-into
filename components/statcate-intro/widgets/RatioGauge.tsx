"use client";

import { nationalValue, yearOrLatest, listYears } from "@/lib/statcate-intro/query";
import { loc } from "@/lib/statcate-intro/format";
import type { RatioGaugeWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: RatioGaugeWidget;
  dash: IntroDashboardState;
};

export default function RatioGauge({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  if (!config || !year) return null;

  const table = tablesById[widget.table];
  if (!table) return null;

  const min = widget.min ?? 0;
  const max = widget.max ?? 2;
  const balance = widget.balancePoint ?? 1;

  const usedYear = yearOrLatest(table.rows, config, year);
  const value = nationalValue(table.rows, config, usedYear);
  const clamped = Math.max(min, Math.min(max, value));
  const percent = ((clamped - min) / (max - min)) * 100;
  const balancePercent = ((balance - min) / (max - min)) * 100;

  const allYears = listYears(table.rows, config.dimensions.time);
  const prevYear = allYears.find((y) => Number(y) < Number(usedYear));
  const prevValue = prevYear ? nationalValue(table.rows, config, prevYear) : null;
  const delta = prevValue !== null ? value - prevValue : null;

  const lowLabel = widget.lowLabel
    ? loc(lng, widget.lowLabel)
    : lng === "en"
      ? "More men"
      : "Эрэгтэй давамгай";
  const highLabel = widget.highLabel
    ? loc(lng, widget.highLabel)
    : lng === "en"
      ? "More women"
      : "Эмэгтэй давамгай";

  const skew = value - balance;
  const isEven = Math.abs(skew) < 0.02;
  const isHigh = skew > 0.02;
  const skewLabel = isEven ? (lng === "en" ? "Balanced" : "Тэнцвэртэй") : isHigh ? highLabel : lowLabel;

  const skewPct = Math.abs(skew / balance) * 100;
  const skewText =
    !isEven &&
    (lng === "en"
      ? `${skewPct.toFixed(0)}% above balance`
      : `тэнцвэрээс ${skewPct.toFixed(0)}%-иар хазайсан`);

  const deltaText =
    delta !== null && Math.abs(delta) >= 0.01
      ? `${delta > 0 ? "▲" : "▼"} ${Math.abs(delta).toFixed(2)} ${
          lng === "en" ? `vs ${prevYear}` : `${prevYear} онтой харьцуулахад`
        }`
      : null;

  return (
    <div className="ratio-gauge-panel">
      <div className="ratio-gauge-top">
        <div className="ratio-gauge-value-block">
          <div className="ratio-gauge-value-row">
            <strong className={`ratio-gauge-value ${isHigh ? "high" : isEven ? "even" : "low"}`}>
              {value.toFixed(2)}
            </strong>
            <span className={`ratio-gauge-badge ${isHigh ? "high" : isEven ? "even" : "low"}`}>
              {skewLabel}
            </span>
            {deltaText && (
              <span className={`ratio-gauge-delta ${delta! > 0 ? "up" : "down"}`}>{deltaText}</span>
            )}
          </div>
          <p className="ratio-gauge-note">
            {lng === "en" ? "National average" : "Улсын дундаж"}
            {skewText ? ` · ${skewText}` : ""}
          </p>
        </div>
      </div>

      <div className="ratio-gauge-track-wrap">
        <div className="ratio-gauge-track">
          <div className="ratio-gauge-balance-line" style={{ left: `${balancePercent}%` }} />
          <div
            className={`ratio-gauge-marker ${isHigh ? "high" : isEven ? "even" : "low"}`}
            style={{ left: `${percent}%` }}
          >
            <span className="ratio-gauge-marker-dot" />
          </div>
        </div>
        <div className="ratio-gauge-scale">
          <span>{min.toFixed(1)}</span>
          <span className="ratio-gauge-scale-mid">{balance.toFixed(1)}</span>
          <span>{max.toFixed(1)}</span>
        </div>
      </div>

      <div className="ratio-gauge-legend">
        <span className="ratio-gauge-legend-item low">
          <span className="ratio-gauge-dot" />
          {lowLabel}
        </span>
        <span className="ratio-gauge-legend-item high">
          <span className="ratio-gauge-dot" />
          {highLabel}
        </span>
      </div>
    </div>
  );
}