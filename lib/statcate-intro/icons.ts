import {
  AgMark,
  BalanceMark,
  BookMark,
  BopMark,
  BudgetMark,
  CalendarMark,
  CapitaMark,
  CareMark,
  ChildMark,
  ChurchMark,
  CoinMark,
  CpiMark,
  DamageMark,
  DharmaMark,
  DomesticMark,
  ElderMark,
  EmbezzlementMark,
  EnergyMark,
  EnvironmentMark,
  ExpenseMark,
  ExportMark,
  FdiMark,
  FemaleMark,
  FireMark,
  FoodMark,
  ForeignMark,
  ForestMark,
  FraudMark,
  FxMark,
  GdpMark,
  GoodsMark,
  GrowthMark,
  HandcuffsMark,
  HealthCrimeMark,
  HousingMark,
  HousingNewMark,
  HousingOldMark,
  HousingPriceMark,
  ImportMark,
  InsuredMark,
  InvestmentMark,
  LoansMark,
  ManufacturingMark,
  MaleMark,
  MapMark,
  MeatMark,
  MilkMark,
  MiningMark,
  MoneyMark,
  MosqueMark,
  NplMark,
  OtherMark,
  PensionerMark,
  PeopleMark,
  PotatoMark,
  PpiMark,
  ProductivityMark,
  PropertyCrimeMark,
  ProtectionMark,
  ReservesMark,
  RepresentativesMark,
  RobberyMark,
  SdgMark,
  ServicesMark,
  TaxMark,
  TempleMark,
  TheftMark,
  TradeMark,
  UtilitiesMark,
  VegetablesMark,
  ViolentCrimeMark,
} from "@/lib/statcate-intro/marks";
import { trimLabel } from "@/lib/statcate-intro/format";
import type { IntroIconName } from "@/lib/statcate-intro/types";

type Mark = typeof TempleMark;

export const INTRO_ICONS: Record<IntroIconName, Mark> = {
  temple: TempleMark,
  people: PeopleMark,
  representatives: RepresentativesMark,
  male: MaleMark,
  female: FemaleMark,
  book: BookMark,
  dharma: DharmaMark,
  church: ChurchMark,
  mosque: MosqueMark,
  other: OtherMark,
  poverty: PeopleMark,
  gini: OtherMark,
  subsistence: BookMark,
  insured: InsuredMark,
  pensioner: PensionerMark,
  avgPension: CoinMark,
  welfare: CareMark,
  sdg: SdgMark,
  child: ChildMark,
  elder: ElderMark,
  handcuffs: HandcuffsMark,
  violentCrime: ViolentCrimeMark,
  theft: TheftMark,
  fraud: FraudMark,
  embezzlement: EmbezzlementMark,
  robbery: RobberyMark,
  propertyCrime: PropertyCrimeMark,
  healthCrime: HealthCrimeMark,
  bop: BopMark,
  cpi: CpiMark,
  environment: EnvironmentMark,
  energy: EnergyMark,
  trade: TradeMark,
  budget: BudgetMark,
  investment: InvestmentMark,
  money: MoneyMark,
  gdp: GdpMark,
  ppi: PpiMark,
  productivity: ProductivityMark,
  fx: FxMark,
  forest: ForestMark,
  goods: GoodsMark,
  services: ServicesMark,
  reserves: ReservesMark,
  food: FoodMark,
  meat: MeatMark,
  milk: MilkMark,
  potato: PotatoMark,
  vegetables: VegetablesMark,
  housing: HousingMark,
  housingNew: HousingNewMark,
  housingOld: HousingOldMark,
  housingPrice: HousingPriceMark,
  calendar: CalendarMark,
  ag: AgMark,
  fire: FireMark,
  damage: DamageMark,
  protection: ProtectionMark,
  tax: TaxMark,
  export: ExportMark,
  import: ImportMark,
  balance: BalanceMark,
  expense: ExpenseMark,
  domestic: DomesticMark,
  foreign: ForeignMark,
  fdi: FdiMark,
  loans: LoansMark,
  npl: NplMark,
  growth: GrowthMark,
  capita: CapitaMark,
  mining: MiningMark,
  manufacturing: ManufacturingMark,
  utilities: UtilitiesMark,
};

const INTRO_ICON_IMAGES: Partial<Record<IntroIconName, string>> = {
  temple: "/icons/religion/temple.png",
  people: "/icons/religion/people.png",
  book: "/icons/religion/book.png",
  dharma: "/icons/religion/buddha.png",
  church: "/icons/religion/church.png",
  mosque: "/icons/religion/mosque.png",
  other: "/icons/religion/other.png",
  poverty: "/icons/poverty/poverty.png",
  gini: "/icons/poverty/gini.png",
  subsistence: "/icons/poverty/adt.png",
};

const INTRO_CLERGY_IMAGES: Partial<Record<IntroIconName, string>> = {
  dharma: "/icons/religion/clergy-monk.png",
  church: "/icons/religion/clergy-priest.png",
  mosque: "/icons/religion/clergy-islam.png",
  other: "/icons/religion/clergy-other.png",
};

export function resolveIconImage(name?: IntroIconName): string | undefined {
  return name ? INTRO_ICON_IMAGES[name] : undefined;
}

export function resolveIcon(name?: IntroIconName): Mark {
  return INTRO_ICONS[name ?? "other"];
}

export function resolveCategoryIconName(
  label: string,
  map?: Record<string, IntroIconName>,
): IntroIconName {
  if (map) {
    const t = trimLabel(label).toLowerCase();
    for (const [key, icon] of Object.entries(map)) {
      if (t.includes(key.toLowerCase())) return icon;
    }
  }
  return "other";
}

export function resolveCategoryIcon(
  label: string,
  map?: Record<string, IntroIconName>,
): Mark {
  return INTRO_ICONS[resolveCategoryIconName(label, map)];
}

export function resolveCategoryImage(
  label: string,
  map?: Record<string, IntroIconName>,
): string | undefined {
  return INTRO_ICON_IMAGES[resolveCategoryIconName(label, map)];
}

export function resolveCategoryClergyImage(
  label: string,
  map?: Record<string, IntroIconName>,
): string | undefined {
  return INTRO_CLERGY_IMAGES[resolveCategoryIconName(label, map)];
}