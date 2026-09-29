export type LocalizedText = {
  mn: string;
  en: string;
};

export type PxRow = Record<string, string | number | null>;

export type IntroIconName =
  | "temple"
  | "people"
  | "representatives"
  | "male"
  | "female"
  | "book"
  | "dharma"
  | "church"
  | "mosque"
  | "other"
  | "poverty"
  | "gini"
  | "subsistence"
  | "insured"
  | "pensioner"
  | "avgPension"
  | "welfare"
  | "sdg"
  | "child"
  | "elder"
  | "handcuffs"
  | "violentCrime"
  | "theft"
  | "fraud"
  | "embezzlement"
  | "robbery"
  | "propertyCrime"
  | "healthCrime"
  | "bop"
  | "cpi"
  | "environment"
  | "energy"
  | "trade"
  | "budget"
  | "investment"
  | "money"
  | "gdp"
  | "ppi"
  | "productivity"
  | "fx"
  | "forest"
  | "goods"
  | "services"
  | "reserves"
  | "food"
  | "meat"
  | "milk"
  | "potato"
  | "vegetables"
  | "housing"
  | "housingNew"
  | "housingOld"
  | "housingPrice"
  | "calendar"
  | "ag"
  | "fire"
  | "damage"
  | "protection"
  | "tax"
  | "export"
  | "import"
  | "balance"
  | "expense"
  | "domestic"
  | "foreign"
  | "fdi"
  | "loans"
  | "npl"
  | "growth"
  | "capita"
  | "mining"
  | "manufacturing"
  | "utilities";

export type IntroValueFormat = "count" | "percent" | "decimal" | "currency";

export type IntroTableConfig = {
  id: string;
  file: string;
  files?: (string | { file: string; select: Record<string, string[]> })[];
  subtables?: string;
  sourceSector?: string;
  sourceSubsector?: string;
  label: LocalizedText;
  icon?: IntroIconName;
  unit?: LocalizedText;
  format?: IntroValueFormat;
  geo?: string;
  nationalMode?: "code" | "average";
  select?: Record<string, string[]>;
  time?: string;
};

export type IntroDimensions = {
  time: string;
  category?: string;
  geo?: string;
};

export type IntroGeoConfig = {
  nationalCode?: string;
  groupCodes?: string[];
};

export type IntroWidgetSpan = "full" | "half";

export type KpiWidget = {
  type: "kpis";
  span?: IntroWidgetSpan;
  tables?: string[];
};

export type CategoryFlowWidget = {
  type: "category-flow";
  span?: IntroWidgetSpan;
  source: string;
  target: string;
  extra?: string;
  colors?: Record<string, string>;
  categoryIcons?: Record<string, IntroIconName>;
};

export type TrendYAxisMode = "fromZero" | "nice";

export type TrendWidget = {
  type: "trend";
  span?: IntroWidgetSpan;
  tables?: string[];
  title?: LocalizedText;
  yAxis?: TrendYAxisMode;
  height?: number;
};

export type RegionBarsWidget = {
  type: "region-bars";
  span?: IntroWidgetSpan;
  table: string;
  title?: LocalizedText;
  geoMode?: "aimags" | "all";
  /** When set, bars diverge left/right from this value instead of starting at 0
   *  (e.g. 1.0 for a gender ratio where >1 means women outnumber men). */
  balancePoint?: number;
  lowLabel?: LocalizedText;
  highLabel?: LocalizedText;
};

export type RegionMapLayout = {
  fitToContainer?: boolean;
  aspectScale?: number;
  layoutCenter?: [string, string];
  layoutSize?: string;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  legend?: "horizontal" | "vertical";
  height?: number;
};

export type RegionMapWidget = {
  type: "region-map";
  title?: LocalizedText;
  span?: IntroWidgetSpan;
  table: string;
  layout?: RegionMapLayout;
};

export type CategoryStatsWidget = {
  type: "category-stats";
  span?: IntroWidgetSpan;
  table: string;
  dimension: string;
  totals?: string[];
  title?: LocalizedText;
  labelMap?: Record<string, string>;
};

export type CategoryBarsWidget = {
  type: "category-bars";
  categories?: { code?: string; label: LocalizedText }[];
  fallbackYear?: boolean;
  color?: string;
  valueColorBands?: { min?: number; max?: number; color: string }[];
  span?: IntroWidgetSpan;
  table: string;
  dimension: string;
  title?: LocalizedText;
  labelMap?: Record<string, string>;
  height?: number;
  layout?: "vertical" | "horizontal";
  top?: number;
  totals?: string[];
};

export type HouseholdFlowWidget = {
  type: "household-flow";
  span?: IntroWidgetSpan;
  incomeTables: string[];
  expenseTables: string[];
  totalIncomeTable: string;
  totalExpenseTable: string;
  icons?: Record<string, string>;
};

export type RatioGaugeWidget = {
  type: "ratio-gauge";
  span?: IntroWidgetSpan;
  table: string;
  min?: number;
  max?: number;
  balancePoint?: number;
  lowLabel?: LocalizedText;
  highLabel?: LocalizedText;
};

export type CategorySegmentsWidget = {
  type: "category-segments";
  span?: IntroWidgetSpan;
  totalTable: string;
  partsTable: string;
  dimension: string;
  title?: LocalizedText;
  compareToPrevYear?: boolean;
  labelMap?: Record<string, string>;
};

export type HdiKpisWidget = {
  type: "hdi-kpis";
  span?: IntroWidgetSpan;
  scoreTable: string;
  rankTable?: string;
  geoDim?: string;
};

export type RegionRankingWidget = {
  type: "region-ranking";
  span?: IntroWidgetSpan;
  table: string;
  title?: LocalizedText;
  bandLabels?: string[];
};

export type RegionDonutGridWidget = {
  type: "region-donut-grid";
  span?: IntroWidgetSpan;
  table: string;
  title?: LocalizedText;
  subtitle?: LocalizedText;
  colorLow?: string;
  colorHigh?: string;
};

export type HouseholdSankeyWidget = {
  type: "household-sankey";
  span?: IntroWidgetSpan;
  incomeTables: string[];
  expenseTables: string[];
  totalIncomeTable: string;
  totalExpenseTable: string;
};

export type HouseholdDonutsWidget = {
  type: "household-donuts";
  span?: IntroWidgetSpan;
  incomeParts: { table: string; label?: LocalizedText }[];
  expenseParts: { table: string; label?: LocalizedText }[];
  incomeTitle?: LocalizedText;
  expenseTitle?: LocalizedText;
};

export type IntroWidget =
  | KpiWidget
  | CategoryFlowWidget
  | CategoryStatsWidget
  | CategoryBarsWidget
  | TrendWidget
  | RegionBarsWidget
  | RegionMapWidget
  | HouseholdFlowWidget
  | RatioGaugeWidget
  | CategorySegmentsWidget
  | HdiKpisWidget
  | RegionRankingWidget
  | RegionDonutGridWidget
  | HouseholdSankeyWidget
  | HouseholdDonutsWidget;

export type IntroDashboardConfig = {
  id: string;
  subsector: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  dimensions: IntroDimensions;
  geo?: IntroGeoConfig;
  totals?: string[];
  palette?: string[];
  mapColors?: string[];
  sectionIcons?: { trend?: string; map?: string };
  tables: IntroTableConfig[];
  widgets: IntroWidget[];
};

export type IntroTableData = {
  id: string;
  label: string;
  icon?: IntroIconName;
  unit?: string;
  format?: IntroValueFormat;
  geo?: string;
  time?: string;
  nationalMode?: "code" | "average";
  rows: PxRow[];
};