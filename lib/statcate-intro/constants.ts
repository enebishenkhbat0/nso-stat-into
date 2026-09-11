export const INTRO_COLORS = [
  "#1A5CAD",
  "#0E7C7B",
  "#3D8BDA",
  "#5B6B80",
];

export const INTRO_FONT = "'sf-pro-text', roboto";

/** Side-by-side intro chart cards share this plot height so axes line up. */
export const INTRO_HALF_CHART_HEIGHT = 280;

/** All intro region maps share this canvas height. */
export const INTRO_MAP_HEIGHT = 380;

/** Shared ECharts map inset so Mongolia renders the same size on every dashboard. */
export const INTRO_MAP_SERIES = {
  /** Mongolia is much wider than tall — keep this low so the map is not squeezed sideways. */
  aspectScale: 0.55,
  layoutCenter: ["50%", "46%"] as [string, string],
  layoutSize: "118%",
  horizontal: { left: 8, right: 8, top: 12, bottom: 44 },
  vertical: { left: 88, right: 12, top: 14, bottom: 14 },
} as const;

export const DEFAULT_TOTAL_LABELS = ["Бүгд", "Total", "All"];

export const DEFAULT_NATIONAL_CODE = "0";

/** PX бүсийн нийт + 5 бүс. Аймаг/нийслэлийн кодыг үлдээнэ. */
export const DEFAULT_GEO_GROUP_CODES = ["0", "1", "2", "3", "4", "5"];

export const COPY = {
  year: { mn: "Он", en: "Year" },
  month: { mn: "Сар", en: "Month" },
  trend: { mn: "Жилийн явц", en: "Trend" },
  byRegion: { mn: "Аймаг, нийслэлээр", en: "By region" },
  loadError: { mn: "Өгөгдөл татахад алдаа гарлаа.", en: "Could not load data." },
} as const;

export const INTRO_SECTION_IMAGES = {
  trend: "/icons/religion/trend.png",
  map: "/icons/religion/map.png",
} as const;
