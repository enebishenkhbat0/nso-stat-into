"use client";

import { useEffect, useMemo, useState } from "react";
import { COPY } from "@/lib/statcate-intro/constants";
import { loc } from "@/lib/statcate-intro/format";
import { loadIntroTables } from "@/lib/statcate-intro/load";
import { listPeriodOptions } from "@/lib/statcate-intro/query";
import { getIntroDashboardConfig } from "@/lib/statcate-intro/registry";
import type { IntroTableData } from "@/lib/statcate-intro/types";

type Args = {
  lng: string;
  sector: string;
  subsector: string;
};

export function useIntroDashboard({ lng, sector, subsector }: Args) {
  const sectorName = decodeURIComponent(sector);
  const subsectorName = decodeURIComponent(subsector);
  const config = getIntroDashboardConfig(subsectorName);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState("");
  const [years, setYears] = useState<string[]>([]);
  const [monthly, setMonthly] = useState(false);
  const [tables, setTables] = useState<IntroTableData[]>([]);

  useEffect(() => {
    if (!config) return;
    let cancelled = false;

    async function load() {
      if (!config) return;
      setLoading(true);
      setError(null);
      try {
        const packs = await loadIntroTables(lng, sectorName, subsectorName, config);
        if (cancelled) return;
        const options = listPeriodOptions(packs, config);
        setTables(packs);
        setMonthly(options.monthly);
        setYears(options.periods);
        setYear((prev) => (prev && options.periods.includes(prev) ? prev : options.periods[0] ?? ""));
      } catch {
        if (!cancelled) setError(loc(lng, COPY.loadError));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [config, lng, sectorName, subsectorName]);

  const tablesById = useMemo(
    () => Object.fromEntries(tables.map((table) => [table.id, table])),
    [tables],
  );

  return { config, loading, error, year, setYear, years, monthly, tables, tablesById, lng };
}

export type IntroDashboardState = ReturnType<typeof useIntroDashboard>;
