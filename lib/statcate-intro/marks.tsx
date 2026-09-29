import type { ReactNode } from "react";

type MarkProps = {
  size?: number;
  className?: string;
};

function Svg({ size = 22, className, children }: MarkProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function TempleMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V12l7-6 7 6v9" />
      <path d="M9 21v-4h6v4" />
      <path d="M7 12h10" />
      <path d="M12 6V3" />
      <path d="M9.5 8.5h5" />
    </Svg>
  );
}

export function PeopleMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c.4-3.2 2.6-5 5.5-5s5.1 1.8 5.5 5" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16 20c.3-2.2 1.7-3.6 3.8-4" />
    </Svg>
  );
}

export function BookMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5c2.2-1 4.3-1.2 8 0v13c-3.7-1.2-5.8-1-8 0V5.5Z" />
      <path d="M12 5.5c2.2-1 4.3-1.2 8 0v13c-3.7-1.2-5.8-1-8 0" />
      <path d="M12 5.5v13" />
    </Svg>
  );
}

export function DharmaMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 3.5v4.2M12 16.3v4.2M3.5 12h4.2M16.3 12h4.2" />
      <path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
    </Svg>
  );
}

export function ChurchMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 2v4" />
      <path d="M10 4h4" />
      <path d="M5 21V11l7-5 7 5v10" />
      <path d="M10 21v-5h4v5" />
      <path d="M8 11h8" />
    </Svg>
  );
}

export function MosqueMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 21V11" />
      <path d="M4 8v3" />
      <path d="M4 8c0-1.2.9-2 2-2s2 .8 2 2" />
      <path d="M20 21V11" />
      <path d="M20 8v3" />
      <path d="M20 8c0-1.2-.9-2-2-2s-2 .8-2 2" />
      <path d="M6 21V13c0-3.3 2.7-5.5 6-7 3.3 1.5 6 3.7 6 7v8" />
      <path d="M12 6.2V4" />
      <path d="M10 21v-4h4v4" />
    </Svg>
  );
}

export function OtherMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v8M8.5 12h7" />
    </Svg>
  );
}

export function InsuredMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 19 6.5v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6.5L12 3Z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M8.5 16c.5-1.8 2-2.7 3.5-2.7s3 0.9 3.5 2.7" />
    </Svg>
  );
}

export function PensionerMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="10" cy="7" r="2.4" />
      <path d="M6.5 20c.4-3.2 2.2-5 3.5-5s2.6 1.2 3.2 3" />
      <path d="M14 11.5 16.5 20" />
      <path d="M15.2 16.5h3.3" />
    </Svg>
  );
}

export function CoinMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.2v9.6" />
      <path d="M9.4 9.2c.7-1 2-1.5 2.6-1.5 1.6 0 2.6.8 2.6 2s-1 1.8-2.6 2.2c-1.7.4-2.7 1-2.7 2.2s1.1 2.1 2.8 2.1c.8 0 2-.4 2.6-1.4" />
    </Svg>
  );
}

export function CareMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 19s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6.5 2c0 4.8-6.5 9-6.5 9Z" />
    </Svg>
  );
}

export function SdgMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ChildMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="2.4" />
      <path d="M8 20c.4-3.4 2-5.2 4-5.2s3.6 1.8 4 5.2" />
      <path d="M9 13.5 7.5 17M15 13.5 16.5 17" />
    </Svg>
  );
}

export function ElderMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="10" cy="7.2" r="2.3" />
      <path d="M7 20c.4-3 2-4.8 3-4.8 1.2 0 2.2 1 2.8 2.6" />
      <path d="M14 11 16.2 20" />
      <path d="M15.2 16.2h3.2" />
    </Svg>
  );
}

export function TrendMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 17 9 11l4 4 8-9" />
      <path d="M15 6h6v6" />
    </Svg>
  );
}

export function MapMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </Svg>
  );
}

export function HandcuffsMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="7" cy="8" r="3.2" />
      <circle cx="17" cy="8" r="3.2" />
      <path d="M10 8h4" />
      <path d="M7 11.2V15M17 11.2V15" />
      <path d="M5 15h4v4H5zM15 15h4v4h-4z" />
    </Svg>
  );
}

export function ViolentCrimeMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 20 14 10" />
      <path d="M12 4l4 4-2.5 2.5-4-4Z" />
      <path d="M17 7l3-3M15 5l3-3" />
    </Svg>
  );
}

export function TheftMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M6 8h9l3 12H4L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M9.5 14h5" />
    </Svg>
  );
}

export function FraudMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 12h.01M18 12h.01" />
    </Svg>
  );
}

export function EmbezzlementMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.2v9.6" />
      <path d="M9.4 9.2c.7-1 2-1.5 2.6-1.5 1.6 0 2.6.8 2.6 2s-1 1.8-2.6 2.2c-1.7.4-2.7 1-2.7 2.2s1.1 2.1 2.8 2.1c.8 0 2-.4 2.6-1.4" />
      <path d="M4 4l16 16" />
    </Svg>
  );
}

export function RobberyMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="6" r="2.4" />
      <path d="M8 20v-6.5L5.5 11" />
      <path d="M16 20v-6.5L18.5 11" />
      <path d="M8 13.5h8v-2a4 4 0 0 0-8 0v2Z" />
    </Svg>
  );
}

export function PropertyCrimeMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M9 20v-5h6v5" />
      <path d="M15 8 19 4" />
      <path d="M17 4h3v3" />
    </Svg>
  );
}

export function HealthCrimeMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6.5 2c0 4.8-6.5 9-6.5 9Z" />
      <path d="M9 12h2v-2h2v2h2v2h-2v2h-2v-2H9z" />
    </Svg>
  );
}

export function RepresentativesMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 21v-8l8-5 8 5v8" />
      <path d="M4 21h16" />
      <path d="M9 21v-6h6v6" />
      <path d="M12 3v3" />
    </Svg>
  );
}

export function MaleMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="10" cy="14" r="6" />
      <path d="M14.5 9.5 20 4" />
      <path d="M15 4h5v5" />
    </Svg>
  );
}

export function FemaleMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7" />
      <path d="M8.5 19h7" />
    </Svg>
  );
}

export function BopMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v18" />
      <path d="M4 7h16" />
      <path d="M4 7 2 12h5L4 7Z" />
      <path d="M20 7l-2 5h5l-3-5Z" />
    </Svg>
  );
}

export function CpiMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 4h9l7 7-9 9-7-7V4Z" />
      <circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function EnvironmentMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M20 4C10 4 4 10 4 18c8 0 14-6 14-14Z" />
      <path d="M6 20c3-6 8-10 14-12" />
    </Svg>
  );
}

export function EnergyMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </Svg>
  );
}

export function TradeMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 8h13M3 8l4-4M3 8l4 4" />
      <path d="M21 16H8M21 16l-4-4M21 16l-4 4" />
    </Svg>
  );
}

export function BudgetMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </Svg>
  );
}

export function InvestmentMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 17 9 11l4 4 8-9" />
      <path d="M15 6h6v6" />
    </Svg>
  );
}

export function MoneyMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 10v4M18 10v4" />
    </Svg>
  );
}

export function GdpMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 20V10M10 20V6M16 20v-8M20 20V4" />
      <path d="M2 20h20" />
    </Svg>
  );
}

export function PpiMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 4h9l7 7-9 9-7-7V4Z" />
      <circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 12l4 4" />
    </Svg>
  );
}

export function ProductivityMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 18a8 8 0 0 1 16 0" />
      <path d="M12 18l4-6" />
      <circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function FxMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="9" r="5.5" />
      <circle cx="15" cy="15" r="5.5" />
    </Svg>
  );
}

export function ForestMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 2 7 10h3l-4 7h4v4h4v-4h4l-4-7h3L12 2Z" />
    </Svg>
  );
}

export function GoodsMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 8 12 4l9 4-9 4-9-4Z" />
      <path d="M3 8v9l9 4 9-4V8" />
      <path d="M12 12v9" />
    </Svg>
  );
}

export function ServicesMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M8 13c-2 1-3 2.5-3 4.5V20h14v-2.5c0-2-1-3.5-3-4.5" />
      <path d="M9 10a3 3 0 0 0 6 0" />
      <path d="M3 21l3-4M21 21l-3-4" />
    </Svg>
  );
}

export function ReservesMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 10v.01" />
      <path d="M6 8h.01M18 16h.01" />
    </Svg>
  );
}

export function FoodMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 3v18" />
      <path d="M4 3c0 3 2 4 2 7s-2 4-2 4" />
      <path d="M20 3v18" />
      <path d="M20 8a3 3 0 0 0-6 0v4h6" />
    </Svg>
  );
}

export function MeatMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M14 10a5 5 0 1 0-7 7l6-2 5-5-4-4Z" />
      <path d="M13 4l3 3" />
    </Svg>
  );
}

export function MilkMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M9 2h6v3l2 4v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-4V2Z" />
      <path d="M7 12h10" />
    </Svg>
  );
}

export function PotatoMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M6 12c-1-4 2-8 6-8s7 3 6 7-4 7-8 7-5-3-4-6Z" />
      <path d="M10 10h.01M14 13h.01" />
    </Svg>
  );
}

export function VegetablesMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 8c-4 0-7 3-7 7a5 5 0 0 0 10 0" />
      <path d="M12 8v-.5A3.5 3.5 0 0 1 15.5 4" />
      <path d="M12 8V5" />
    </Svg>
  );
}

export function HousingMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </Svg>
  );
}

export function HousingNewMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M12 13v5M9.5 15.5h5" />
    </Svg>
  );
}

export function HousingOldMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <circle cx="12" cy="15" r="2.6" />
      <path d="M12 13.8V15l1 .8" />
    </Svg>
  );
}

export function HousingPriceMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 14h4M12 12v6" />
    </Svg>
  );
}

export function CalendarMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
    </Svg>
  );
}

export function AgMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 21V9" />
      <path d="M12 9c0-4-3-6-6-6 0 4 3 6 6 6Z" />
      <path d="M12 13c0-4 3-6 6-6 0 4-3 6-6 6Z" />
    </Svg>
  );
}

export function FireMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c1 1 1.5 2.4 1.5 3.5A4.5 4.5 0 0 1 12 22a6 6 0 0 1-6-6c0-5 4-6 6-14Z" />
    </Svg>
  );
}

export function DamageMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17v.01" />
    </Svg>
  );
}

export function ProtectionMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 19 6v5.5c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6L12 3Z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

export function TaxMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8l8 8" />
      <circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ExportMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </Svg>
  );
}

export function ImportMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M17 7 7 17" />
      <path d="M15 17H7V9" />
    </Svg>
  );
}

export function BalanceMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v18" />
      <path d="M4 7h16" />
      <path d="M4 7 2 12h5L4 7Z" />
      <path d="M20 7l-2 5h5l-3-5Z" />
    </Svg>
  );
}

export function ExpenseMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
    </Svg>
  );
}

export function DomesticMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ForeignMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </Svg>
  );
}

export function FdiMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M3 10h13M10 3.5a10 10 0 0 1 0 13M10 3.5a10 10 0 0 0 0 13" />
      <path d="M14.5 14.5 20 20" />
    </Svg>
  );
}

export function LoansMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M6 20c.4-3.4 2.6-5 5-5s4.6 1.6 5 5" />
      <circle cx="11" cy="9" r="3" />
      <circle cx="17" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function NplMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6" />
      <path d="M12 16.5v.01" />
    </Svg>
  );
}

export function GrowthMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 17 9 11l4 4 8-9" />
      <path d="M15 6h6v6" />
    </Svg>
  );
}

export function CapitaMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M6 20c.5-4 2.8-6 6-6s5.5 2 6 6" />
    </Svg>
  );
}

export function MiningMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M4 21 10 9" />
      <path d="M20 21 14 9" />
      <path d="M3 5l6 3 6-3 6 3" />
    </Svg>
  );
}

export function ManufacturingMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M3 21V11l5 3V11l5 3V11l5 3v7H3Z" />
      <path d="M3 21h18" />
    </Svg>
  );
}

export function UtilitiesMark(props: MarkProps) {
  return (
    <Svg {...props}>
      <path d="M9 3v4M15 3v4" />
      <path d="M6 7h12v3a6 6 0 0 1-12 0V7Z" />
      <path d="M12 16v5" />
    </Svg>
  );
}