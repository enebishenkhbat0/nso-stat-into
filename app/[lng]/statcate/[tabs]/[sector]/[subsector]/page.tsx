import StatcatePage from "@/components/statcate-shell/StatcatePage";
import { DEFAULT_SECTOR, DEFAULT_SUBSECTOR } from "@/lib/statcate-shell/catalog";

type Params = {
  lng: string;
  tabs: string;
  sector: string;
  subsector: string;
};

export default async function StatcateRoutePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lng, tabs, sector, subsector } = await params;
  return (
    <StatcatePage
      lng={lng}
      tab={tabs}
      sector={sector || DEFAULT_SECTOR}
      subsector={subsector || DEFAULT_SUBSECTOR}
    />
  );
}
