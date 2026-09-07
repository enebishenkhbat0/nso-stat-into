export type ShellTab = "table" | "indicator" | "report" | "methodology" | "qualityreport";

export type ShellItem = {
  id: string;
  mn: string;
  en: string;
};

export type ShellSector = ShellItem & {
  children: ShellItem[];
};

function item(id: string, mn: string, en = id): ShellItem {
  return { id, mn, en };
}

function sector(id: string, mn: string, children: ShellItem[]): ShellSector {
  return {
    id,
    mn,
    en: id,
    children: [...children].sort((a, b) => a.id.localeCompare(b.id)),
  };
}

/** data.1212.mn / NSO салбар, дэд салбарын нэр. */
export const SHELL_SECTORS: ShellSector[] = [
  sector("Population, household", "Хүн ам, өрх", [
    item("1_Population, household", "Хүн ам, өрх", "Population, household"),
    item("2_Regular movement of population", "Хүн амын ердийн хөдөлгөөн", "Regular movement of population"),
    item("3_Herdsmen", "Малчид", "Herdsmen"),
    item("3_Infrastructure, housing", "Хүн амын дэд бүтэц, орон сууц", "Infrastructure, housing"),
    item("4_Population projection", "Хүн амын хэтийн тооцоо", "Population projection"),
    item("5_Adminstrative units, territory", "Засаг захиргаа, нутаг дэвсгэр", "Administrative units, territory"),
  ]),
  sector("Society, development", "Нийгэм, хөгжил", [
    item("Gender", "Жендэр"),
    item("Millennium Development Goals Indicators", "Мянганы хөгжлийн зорилтын шалгуур үзүүлэлтүүд"),
    item("Social Insurance and Welfare", "Нийгмийн даатгал, халамж"),
    item("Household income and expenditure", "Өрхийн орлого, зарлага"),
    item("Election", "Сонгууль"),
    item("Monasteries, Temples and Churches", "Сүм хийд"),
    item("Sustainable Development Goals", "Тогтвортой хөгжлийн зорилго"),
    item("Disability", "Хөгжлийн бэрхшээл"),
    item("Law and crime", "Хууль эрх зүй, гэмт хэрэг"),
    item("Human Development Index", "Хүний хөгжлийн индекс"),
    item("Food Security", "Хүнсний аюулгүй байдал"),
    item("Poverty, inequality and minimum subsistence level", "Ядуурал, тэгш бус байдал, АДТ"),
  ]),
  sector("Labour, business", "Хөдөлмөр, бизнес", [
    item("SMEs", "Жижиг дунд үйлдвэр, үйлчилгээ"),
    item("Decent work", "Зохистой хөдөлмөр"),
    item("Statistical Business Register", "Статистикийн бизнес регистр"),
    item("Civil servants", "Төрийн албан хаагчид"),
    item("Labour", "Хөдөлмөр"),
    item("Wages", "Цалин"),
  ]),
  sector("Industry, service", "Үйлдвэрлэл, үйлчилгээ", [
    item("Industry", "Аж үйлдвэр"),
    item("Tourism", "Аялал жуулчлал"),
    item("Construction", "Барилга"),
    item("Agriculture", "Газар тариалан"),
    item("Livestock", "Мал аж ахуй"),
    item("Intellectual property", "Оюуны өмч"),
    item("Culture, cultural creative industry", "Соёл, соёлын бүтээлч үйлдвэрлэл"),
    item("Transportation", "Тээвэр"),
    item("Telecommunication", "Харилцаа холбоо"),
    item("Trade, hotel and restaurant", "Худалдаа, зочид буудал, нийтийн хоол"),
    item("Science", "Шинжлэх ухаан"),
  ]),
  sector("Economy, environment", "Эдийн засаг, байгаль орчин", [
    item("Environment", "Байгаль орчин"),
    item("Environmental-Economic Account", "Байгаль орчин -Эдийн засгийн данс"),
    item("Productivity", "Бүтээмж"),
    item("Foreign Trade", "Гадаад худалдаа"),
    item("Money and Finance", "Мөнгө, санхүү"),
    item("Housing price index", "Орон сууцны үнэ"),
    item("Balance of Payments", "Төлбөрийн тэнцэл"),
    item("Government budget", "Улсын төсөв"),
    item("Producer price index", "Үйлдвэрлэгчийн үнэ"),
    item("National Accounts", "Үндэсний тооцоо"),
    item("Investment", "Хөрөнгө оруулалт"),
    item("Consumer Price Index", "Хэрэглээний үнэ"),
  ]),
  sector("Education, health", "Боловсрол, эрүүл мэнд", [
    item("General indicators for Education", "Боловсролын ерөнхий үзүүлэлт"),
    item("General educational schools", "Ерөнхий боловсролын сургууль"),
    item("Universities, institutes and colleges", "Их дээд сургууль"),
    item("Vocational education", "Мэргэжлийн боловсрол"),
    item("Disease", "Өвчлөл"),
    item("Pre-school education", "Сургуулийн өмнөх боловсрол"),
    item("Births, deaths", "Төрөлт, нас баралт"),
    item("Health insurance", "Эрүүл мэндийн даатгал"),
    item("Main indicators for Health sector", "Эрүүл мэндийн үндсэн үзүүлэлт"),
  ]),
  sector("Regional development", "Бүсчилсэн хөгжлийн үзүүлэлтүүд", [
    item("Construction", "Барилга"),
    item("Education, Science, and Intellectual Property", "Боловсрол, Шинжлэх ухаан, оюуны өмч"),
    item("Agriculture", "Газар тариалан"),
    item("SMEs", "Жижиг дунд үйлдвэрлэл"),
    item("Livestock", "Мал аж ахуй"),
    item("Money and Finance", "Мөнгө, санхүү"),
    item("Territory, administrative units", "Нутаг дэвсгэр, засаг захиргааны нэгж"),
    item("Culture, Tourism, Exercise, and Sports", "Соёл, аялал жуулчлал, биеийн тамир, спорт"),
    item("Election", "Сонгууль"),
    item("Statistical business register", "Статистикийн бизнес регистр"),
    item("Monasteries, Temples and Churches", "Сүм хийд"),
    item("Transportation", "Тээвэр, холбоо"),
    item("Government budget", "Улсын нэгдсэн төсөв"),
    item("National accounts", "Үндэсний тооцоо"),
    item("Price", "Үнэ"),
    item("Disability", "Хөгжлийн бэрхшээл"),
    item("Labour and business", "Хөдөлмөр бизнес"),
    item("Trade", "Худалдаа, үйлчилгээ"),
    item("Justice and crime", "Хууль зүй, гэмт хэрэг"),
    item("Population and household", "Хүн ам, өрх"),
    item("Population livelihood", "Хүн амын амьжиргаа"),
    item("Infrastructure, housing", "Хүн амын дэд бүтэц, орон сууц"),
    item("Human development", "Хүний хөгжил"),
    item("Health", "Эрүүл мэнд"),
  ]),
  sector("Historical data", "Түүхэн Статистик", [
    item("Enterprise", "Аж үйлдвэр"),
    item("Number of employees", "Ажиллагчдын тоо"),
    item("Progress of people's activities", "Ард түмний аж байдлын дээшлэлт"),
    item("Administrative territorial division of the MPR", "БНМАУ-ын нутаг дэвсгэр, засаг захиргааны хуваарь"),
    item("Education, culture and science", "Боловсрол, соёл, шинжлэх ухаан"),
    item("Utilities and services", "Нийтийн аж ахуй, үйлчилгээ"),
    item("Integrated_Indicator", "Нэгдсэн үзүүлэлт", "Integrated Indicator"),
    item("Transport and communication", "Тээвэр, холбоо"),
    item("State budget", "Улсын төсөв"),
    item("Agriculture", "Хөдөө аж ахуй"),
    item("Investment and construction", "Хөрөнгө оруулалт, барилга"),
    item("Trade", "Худалдаа"),
    item("Population", "Хүн ам"),
    item("Health protection", "Эрүүлийг хамгаалах"),
  ]),
];

export const SHELL_TABS: { id: ShellTab; mn: string; en: string }[] = [
  { id: "table", mn: "Хүснэгт", en: "Table" },
  { id: "indicator", mn: "Танилцуулга", en: "Introduction" },
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
