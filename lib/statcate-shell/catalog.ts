export type ShellTab = "table" | "indicator" | "report" | "methodology" | "qualityreport";

export type ShellItem = {
  id: string;
  mn: string;
  en: string;
};

export type ShellSector = ShellItem & {
  children: ShellItem[];
};

/** 1212.mn statcate цэсний бүтэц — зөвхөн харагдах байдал. API дуудахгүй. */
export const SHELL_SECTORS: ShellSector[] = [
  {
    id: "Population, household",
    mn: "Хүн ам, өрх",
    en: "Population, household",
    children: [
      { id: "Population, household", mn: "Хүн ам, өрх", en: "Population and household" },
      { id: "Vital statistics", mn: "Хүн амын ерөнхий хөдөлгөөн", en: "Vital statistics" },
      { id: "Herders", mn: "Малчин", en: "Herders" },
      {
        id: "Population infrastructure and housing",
        mn: "Хүн амын дэд бүтэц, орон сууц",
        en: "Population infrastructure and housing",
      },
      { id: "Population projections", mn: "Хүн амын төсөөлөл", en: "Population projections" },
      {
        id: "Administrative units and territory",
        mn: "Засаг захиргааны нэгж, нутаг дэвсгэр",
        en: "Administrative units and territory",
      },
    ],
  },
  {
    id: "Society, development",
    mn: "Нийгэм, хөгжил",
    en: "Society, development",
    children: [
      {
        id: "Sustainable Development Goals",
        mn: "Тогтвортой хөгжлийн зорилго",
        en: "Sustainable Development Goals",
      },
      {
        id: "Poverty, inequality and minimum subsistence level",
        mn: "Ядуурал, тэгш бус байдал, АДТ",
        en: "Poverty, inequality and minimum subsistence level",
      },
      {
        id: "Social Insurance and Welfare",
        mn: "Нийгмийн даатгал, халамж",
        en: "Social Insurance and Welfare",
      },
      {
        id: "Monasteries, Temples and Churches",
        mn: "Сүм хийд, лам санваартан",
        en: "Monasteries, Temples and Churches",
      },
    ],
  },
  {
    id: "Labour, business",
    mn: "Хөдөлмөр, бизнес",
    en: "Labour, business",
    children: [
      { id: "Labour force", mn: "Хөдөлмөрийн хүч", en: "Labour force" },
      { id: "Employment", mn: "Хөдөлмөр эрхлэлт", en: "Employment" },
      { id: "Wages and salary", mn: "Цалин хөлс", en: "Wages and salary" },
    ],
  },
  {
    id: "Industry, service",
    mn: "Үйлдвэрлэл, үйлчилгээ",
    en: "Industry, service",
    children: [
      { id: "Industry", mn: "Үйлдвэр", en: "Industry" },
      { id: "Construction", mn: "Барилга", en: "Construction" },
      { id: "Transport", mn: "Тээвэр", en: "Transport" },
    ],
  },
  {
    id: "Economy, environment",
    mn: "Эдийн засаг, орчин",
    en: "Economy, environment",
    children: [
      { id: "National accounts", mn: "Үндэсний тооцоо", en: "National accounts" },
      { id: "Price", mn: "Үнэ", en: "Price" },
      { id: "Environment", mn: "Орчин", en: "Environment" },
    ],
  },
  {
    id: "Education, health",
    mn: "Боловсрол, эрүүл мэнд",
    en: "Education, health",
    children: [
      { id: "Education", mn: "Боловсрол", en: "Education" },
      { id: "Health", mn: "Эрүүл мэнд", en: "Health" },
    ],
  },
];

export const SHELL_TABS: { id: ShellTab; mn: string; en: string }[] = [
  { id: "table", mn: "Хүснэгт", en: "Table" },
  { id: "indicator", mn: "Танилцуулга", en: "Presentation" },
  { id: "report", mn: "Тайлан", en: "Report" },
  { id: "methodology", mn: "Аргачлал", en: "Methodology" },
  { id: "qualityreport", mn: "Чанарын тайлан", en: "Quality Report" },
];

export const DEFAULT_SECTOR = "Society, development";
export const DEFAULT_SUBSECTOR = "Sustainable Development Goals";

export function loc(lng: string, item: { mn: string; en: string }) {
  return lng === "en" ? item.en : item.mn;
}

export function findSector(sectorId: string) {
  const id = decodeURIComponent(sectorId);
  return SHELL_SECTORS.find((item) => item.id === id) ?? null;
}

export function findSubsector(sectorId: string, subsectorId: string) {
  const sector = findSector(sectorId);
  const id = decodeURIComponent(subsectorId);
  return sector?.children.find((item) => item.id === id) ?? null;
}

export function statcateHref(lng: string, tab: string, sector: string, subsector: string) {
  return `/${lng}/statcate/${tab}/${encodeURIComponent(sector)}/${encodeURIComponent(subsector)}`;
}
