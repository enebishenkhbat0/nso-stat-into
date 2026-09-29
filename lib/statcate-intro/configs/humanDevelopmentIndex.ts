import type { IntroDashboardConfig } from "@/lib/statcate-intro/types";

const FILE = "DT_NSO_2700_001V1.px";

export const humanDevelopmentIndex: IntroDashboardConfig = {
  id: "human-development-index",
  subsector: "Human development index",
  title: {
    mn: "Хүний хөгжлийн индекс",
    en: "Human Development Index",
  },
  subtitle: {
    mn: "2000-2025",
    en: "2000-2025",
  },
  palette: ["#10B981", "#E40418", "#1A5CAD", "#5B6B80"],
  mapColors: ["#DC2626", "#F97316", "#FBBF24", "#60A5FA", "#1D4ED8"],
  dimensions: {
    time: "Он",
    geo: "Бүс",
  },
  tables: [
    {
      id: "hdi-main",
      file: FILE,
      label: { mn: "Хүний хөгжлийн индекс", en: "Human Development Index" },
      format: "decimal",
      unit: { mn: "", en: "" },
    },
  ],
  widgets: [
    {
      type: "region-donut-grid",
      span: "full",
      table: "hdi-main",
      title: { mn: "Хүний хөгжлийн индекс", en: "Human Development Index" },
      subtitle: { mn: "2000-2025", en: "2000-2025" },
      colorLow: "#EF4444",
      colorHigh: "#10B981",
    },
  ],
};