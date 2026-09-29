import type { IntroDashboardConfig } from "@/lib/statcate-intro/types";

const FILE = "DT_NSO_2300_036V2.px";
const SUBTABLE = "RECORDED CRIMES, by classification, year and month";

export const crime: IntroDashboardConfig = {
  id: "crime",
  subsector: "Law and crime",
  title: {
    mn: "Бүртгэгдсэн гэмт хэргийн тоо",
    en: "Registered Crimes",
  },
  subtitle: {
    mn: "Гэмт хэргийн ангиллаар, жилээр",
    en: "By category, yearly",
  },
  palette: [
    "#1D4ED8",
    "#0F766E",
    "#3B82F6",
    "#64748B",
    "#1E3A8A",
    "#0D9488",
    "#60A5FA",
    "#475569",
  ],
  dimensions: {
    time: "Он",
    category: "Гэмт хэргийн төрөл",
  },
  tables: [
    {
      id: "total-crime",
      file: FILE,
      subtables: SUBTABLE,
      label: { mn: "Бүртгэгдсэн гэмт хэрэг", en: "Registered Crimes" },
      icon: "handcuffs",
      format: "decimal",
      unit: { mn: "хэрэг", en: "cases" },
      select: { "Гэмт хэргийн төрөл": ["0"] },
    },
    {
      id: "crime-overview",
      file: FILE,
      subtables: SUBTABLE,
      label: { mn: "Гэмт хэргийн ангиллаар", en: "Crime Overview" },
      icon: "other",
      format: "decimal",
      unit: { mn: "хэрэг", en: "cases" },
      select: {
        "Гэмт хэргийн төрөл": ["15", "18", "8", "16", "19", "17", "11", "6"],
      },
    },
  ],
  widgets: [
    {
      type: "category-segments",
      totalTable: "total-crime",
      partsTable: "crime-overview",
      dimension: "Гэмт хэргийн төрөл",
      title: {
        mn: "Гэмт хэргийн төрлөөр",
        en: "Crimes by Type",
      },
      compareToPrevYear: true,
      labelMap: {
        "Өмчлөх эрхийн эсрэг гэмт хэрэг": "Өмчлөх эрхийн эсрэг ",
        "Залилан": "Залилан",
        "Хүний эрүүл мэндийн халдашгүй байдлын эсрэг гэмт хэрэг": "Эрүүл мэндийн эсрэг",
        "Хулгай": "Хулгай",
        "Хөрөнгө завших": "Хөрөнгө завших",
        "Дээрэм": "Дээрэм",
        "Золгүй явдлаар нас барсан": "Золгүй явдал",
        "Хүнийг санаатай алах": "Санаатай алалт",
      },
    },
  ],
};