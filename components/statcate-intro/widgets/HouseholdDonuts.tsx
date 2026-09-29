"use client";

import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { INTRO_FONT, INTRO_COLORS } from "@/lib/statcate-intro/constants";
import { nationalValue, yearOrLatest } from "@/lib/statcate-intro/query";
import { formatValue, loc } from "@/lib/statcate-intro/format";
import type { HouseholdDonutsWidget, IntroValueFormat, LocalizedText } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: HouseholdDonutsWidget;
  dash: IntroDashboardState;
};

type DonutItem = { name: string; value: number; format?: IntroValueFormat };

function buildOption(
  items: DonutItem[],
  colors: string[],
  format: IntroValueFormat | undefined,
  lng: string,
): EChartsOption {
  return {
    textStyle: { fontFamily: INTRO_FONT },
    color: colors,
    tooltip: {
      trigger: "item",
      formatter: (p: any) => `${p.name}: <b>${formatValue(p.value, lng, format)}</b> (${p.percent}%)`,
    },
    legend: {
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontFamily: INTRO_FONT, fontSize: 11, color: "#5b6b80" },
    },
    series: [
      {
        type: "pie",
        radius: ["45%", "72%"],
        center: ["50%", "42%"],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: "#fff", borderWidth: 2 },
        label: { show: false },
        data: items,
      },
    ],
  };
}

export default function HouseholdDonuts({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  if (!config || !year) return null;

  function collect(parts: { table: string; label?: LocalizedText }[]): DonutItem[] {
    const mapped: (DonutItem | null)[] = parts.map((p) => {
      const t = tablesById[p.table];
      if (!t) return null;
      const usedYear = yearOrLatest(t.rows, config, year);
      const value = nationalValue(t.rows, config, usedYear);
      const name = p.label ? loc(lng, p.label) : t.label;
      const item: DonutItem = { name, value, format: t.format };
      return item;
    });

    const result: DonutItem[] = [];
    for (const item of mapped) {
      if (item !== null && item.value > 0) {
        result.push(item);
      }
    }
    return result;
  }

  const incomeItems = collect(widget.incomeParts);
  const expenseItems = collect(widget.expenseParts);
  if (!incomeItems.length && !expenseItems.length) return null;

  const incomeTitle = widget.incomeTitle ? loc(lng, widget.incomeTitle) : lng === "en" ? "Income Structure" : "Орлогын бүтэц";
  const expenseTitle = widget.expenseTitle ? loc(lng, widget.expenseTitle) : lng === "en" ? "Expense Structure" : "Зарлагын бүтэц";

  return (
    <div className="household-donuts-grid">
      {incomeItems.length > 0 && (
        <div className="household-donut-panel">
          <h4 className="household-donut-title">{incomeTitle}</h4>
          <ReactECharts
            option={buildOption(incomeItems, INTRO_COLORS, incomeItems[0]?.format, lng)}
            style={{ height: 260, width: "100%" }}
            notMerge
          />
        </div>
      )}
      {expenseItems.length > 0 && (
        <div className="household-donut-panel">
          <h4 className="household-donut-title">{expenseTitle}</h4>
          <ReactECharts
            option={buildOption(expenseItems, ["#F97316", "#FB923C", "#FDBA74", "#FED7AA", "#FFEDD5"], expenseItems[0]?.format, lng)}
            style={{ height: 260, width: "100%" }}
            notMerge
          />
        </div>
      )}
    </div>
  );
}