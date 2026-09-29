"use client";

import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import { MapMark } from "@/lib/statcate-intro/marks";
import { COPY, INTRO_FONT } from "@/lib/statcate-intro/constants";
import { AIMAG_ID_TO_NAME, canonicalAimagName, mapColorPieces } from "@/lib/statcate-intro/aimag-map";
import { formatValue, loc, num, trimLabel } from "@/lib/statcate-intro/format";
import { queryRows, yearOrLatest } from "@/lib/statcate-intro/query";
import type { RegionMapLayout, RegionMapWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

const MAP_NAME = "nso-intro-aimag";
const GEO_URL = "/census-dashboard/geo/aimag.geojson";

function mapSeriesLayout(layout?: RegionMapLayout) {
  const aspectScale = layout?.aspectScale ?? 0.75;
  if (layout?.layoutCenter && layout?.layoutSize) {
    return { layoutCenter: layout.layoutCenter, layoutSize: layout.layoutSize, aspectScale };
  }
  return {
    left: layout?.left ?? 8,
    right: layout?.right ?? 8,
    top: layout?.top ?? 12,
    bottom: layout?.bottom ?? 48,
    aspectScale,
  };
}

type Props = {
  widget: RegionMapWidget;
  dash: IntroDashboardState;
};

type GeoCollection = {
  type: "FeatureCollection";
  features: {
    type: "Feature";
    geometry: unknown;
    properties?: { id?: number; aimag_id?: number; name?: string; aimagname1?: string };
  }[];
};

export default function RegionMap({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((json: GeoCollection) => {
        if (cancelled) return;
        const features = (json.features ?? []).map((feature) => {
          const id = feature.properties?.id ?? feature.properties?.aimag_id;
          const name =
            (id != null ? AIMAG_ID_TO_NAME[id] : undefined) ??
            feature.properties?.name ??
            feature.properties?.aimagname1 ??
            "";
          return { ...feature, properties: { ...feature.properties, name } };
        });
        echarts.registerMap(MAP_NAME, { ...json, features } as Parameters<typeof echarts.registerMap>[1]);
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const table = config && year ? tablesById[widget.table] : undefined;
  const mapYear = table && config && year ? yearOrLatest(table.rows, config, year) : year;
  const geoDim = table?.geo ?? config?.dimensions.geo;

  const rows = useMemo(() => {
    if (!config || !mapYear || !geoDim || !table) return [];
    const byName = new Map<string, number>();
    for (const row of queryRows(
      table.rows,
      config,
      {
        year: mapYear,
        category: config.dimensions.category ? "total" : undefined,
        geo: "aimags",
      },
      table,
    )) {
      const name = canonicalAimagName(trimLabel(row[geoDim]));
      if (!name) continue;
      byName.set(name, num(row.value));
    }
    return [...byName.entries()].map(([name, value]) => ({ name, value }));
  }, [config, table, widget.table, mapYear, geoDim]);

  if (!config || !year || !geoDim) return null;

  const values = rows.map((row) => row.value);
  const tableLabel = table?.label ?? "";
  const format = table?.format ?? "count";
  const mapColors = config.mapColors;
  const digits = format === "percent" || format === "decimal" ? 1 : 0;
  const pieces = mapColorPieces(values, mapColors, digits);
  const emptyColor = mapColors?.[0] ?? "#C5D9EE";
  const hoverColor = config.palette?.[1] ?? "#0E7C7B";
  const icon = config.sectionIcons?.map;
  const layout = widget.layout;
  const height = layout?.height ?? 380;

  const badgeLabels = ["Дооод", "Дундаж-Доод", "Дундаж", "Дундаж-Дээд", "Өндөр"];
  const legendBadges = pieces.map((piece, i) => {
    const min = piece.gt;
    const max = piece.lte;
    const label = badgeLabels[i] ?? piece.label;
    const range =
      min != null && max != null
        ? `${min.toFixed(digits)}-${max.toFixed(digits)}`
        : max != null
          ? `≤${max.toFixed(digits)}`
          : min != null
            ? `>${min.toFixed(digits)}`
            : "";
    return { label, range, color: piece.color };
  });

  const option: EChartsOption = {
    textStyle: { fontFamily: INTRO_FONT },
    tooltip: {
      trigger: "item",
      extraCssText: `font-family: ${INTRO_FONT};`,
      textStyle: { fontFamily: INTRO_FONT, fontSize: 13 },
      className: "sector-intro-echart-tooltip",
      formatter: (params) => {
        const item = params as { name?: string; value?: number };
        if (item.value == null || Number.isNaN(Number(item.value))) return `${item.name ?? ""}`;
        return `${item.name}<br/>${tableLabel}: <b>${formatValue(Number(item.value), lng, format)}</b>`;
      },
    },
    visualMap: {
      type: "piecewise",
      pieces,
      show: false,
    },
    series: [
      {
        type: "map",
        map: MAP_NAME,
        roam: false,
        ...mapSeriesLayout(layout),
        data: rows,
        name: tableLabel,
        itemStyle: { borderColor: "#fff", borderWidth: 0.8, areaColor: emptyColor },
        emphasis: {
          label: { show: false },
          itemStyle: { areaColor: hoverColor },
        },
        select: { disabled: true },
      },
    ],
  };

  return (
    <div className="sector-intro-panel">
      <h4>
        {icon ? (
          <img className="sector-intro-panel-icon" src={icon} alt="" width={28} height={28} />
        ) : (
          <MapMark size={16} />
        )}
        {loc(lng, COPY.byRegion)}
        {mapYear && mapYear !== year ? <span> · {mapYear}</span> : null}
      </h4>
      <div className="sector-intro-chart sector-intro-chart--map" style={{ height }}>
        {ready ? (
          rows.length ? (
            <ReactECharts option={option} style={{ height, width: "100%" }} notMerge />
          ) : (
            <p className="sector-intro-map-loading">
              {lng === "en" ? "No regional breakdown for this year." : "Энэ онд аймгийн задаргаа байхгүй."}
            </p>
          )
        ) : (
          <p className="sector-intro-map-loading">{lng === "en" ? "Loading map…" : "Газрын зураг ачаалж байна…"}</p>
        )}
      </div>

      {ready && rows.length > 0 && (
        <div className="hdi-map-legend">
          {legendBadges.map((b) => (
            <span key={b.label} className="hdi-map-legend-badge" style={{ background: `${b.color}22`, color: b.color }}>
              <b>{b.label}</b> ({b.range})
            </span>
          ))}
        </div>
      )}
    </div>
  );
}