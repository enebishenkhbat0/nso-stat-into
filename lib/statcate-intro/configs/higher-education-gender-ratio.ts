import type { IntroDashboardConfig } from "@/lib/statcate-intro/types";

const FILE = "DT_NSO_2800_014V1.px";

export const higherEducationGenderRatio: IntroDashboardConfig = {
  id: "higher-education-gender-ratio",
  subsector: "Millennium Development Goals Indicators",
  title: {
    mn: "Дээд боловсрол эзэмшиж байгаа эмэгтэй, эрэгтэйчүүдийн харьцаа",
    en: "Ratio of Women to Men in Higher Education",
  },
  subtitle: {
    mn: "Аймаг, нийслэлээр",
    en: "By aimag and capital",
  },
  palette: ["#DB2777", "#A78BFA", "#1D4ED8", "#10B981", "#F97316"],
  dimensions: {
    time: "ОН",
    geo: "Аймаг",
  },
  geo: {
    nationalCode: "0",
    groupCodes: ["1", "2", "3", "4", "5"],
  },
  tables: [
    {
      id: "gender-ratio",
      file: FILE,
      label: { mn: "Эмэгтэй, эрэгтэйчүүдийн харьцаа", en: "Women to Men Ratio" },
      icon: "welfare",
      format: "decimal",
      unit: { mn: "", en: "" },
      select: { Аймаг: ["0"] },
    },
    {
      id: "gender-ratio-by-region",
      file: FILE,
      label: { mn: "Бүсээр", en: "By Region" },
      icon: "welfare",
      format: "decimal",
      unit: { mn: "", en: "" },
    },
  ],
  widgets: [
    {
      type: "ratio-gauge",
      span: "full",
      table: "gender-ratio",
      min: 0,
      max: 2,
      balancePoint: 1,
      lowLabel: { mn: "Эрэгтэй давамгай", en: "More men" },
      highLabel: { mn: "Эмэгтэй давамгай", en: "More women" },
    },
    {
      type: "region-bars",
      span: "full",
      table: "gender-ratio-by-region",
      title: {
        mn: "Дээд боловсролын харьцаа, бүс тус бүрээр",
        en: "Higher Education Ratio by Region",
      },
      geoMode: "aimags",
    },
  ],
};