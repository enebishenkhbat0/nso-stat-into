"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectorIntroDashboard from "@/components/statcate-intro/SectorIntroDashboard";
import { hasIntroDashboard } from "@/lib/statcate-intro/registry";
import {
  DEFAULT_SECTOR,
  DEFAULT_SUBSECTOR,
  SHELL_SECTORS,
  SHELL_TABS,
  findSector,
  findSubsector,
  loc,
  statcateHref,
  type ShellTab,
} from "@/lib/statcate-shell/catalog";
import "./shell.scss";

type Props = {
  lng: string;
  tab: string;
  sector: string;
  subsector: string;
};

const PLACEHOLDER: Record<Exclude<ShellTab, "indicator">, { mn: string; en: string }> = {
  table: {
    mn: "Хүснэгт таб 1212.mn дээр ажиллана. Энэ төсөлд зөвхөн Танилцуулга dashboard хөгжүүлнэ.",
    en: "The Table tab lives on 1212.mn. This project is only for Presentation dashboards.",
  },
  report: {
    mn: "Тайлан таб 1212.mn дээр ажиллана.",
    en: "The Report tab lives on 1212.mn.",
  },
  methodology: {
    mn: "Аргачлал таб 1212.mn дээр ажиллана.",
    en: "The Methodology tab lives on 1212.mn.",
  },
  qualityreport: {
    mn: "Чанарын тайлан таб 1212.mn дээр ажиллана.",
    en: "The Quality Report tab lives on 1212.mn.",
  },
};

function isTab(value: string): value is ShellTab {
  return SHELL_TABS.some((item) => item.id === value);
}

export default function StatcatePage({ lng, tab, sector, subsector }: Props) {
  const sectorId = decodeURIComponent(sector || DEFAULT_SECTOR);
  const subsectorId = decodeURIComponent(subsector || DEFAULT_SUBSECTOR);
  const activeTab: ShellTab = isTab(tab) ? tab : "indicator";
  const sectorItem = findSector(sectorId);
  const subItem = findSubsector(sectorId, subsectorId);
  const title = subItem ? loc(lng, subItem) : loc(lng, sectorItem ?? { mn: sectorId, en: sectorId });
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(sectorId);
  const hasDash = hasIntroDashboard(subsectorId);

  const sectors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SHELL_SECTORS;
    return SHELL_SECTORS.map((item) => ({
      ...item,
      children: item.children.filter(
        (child) =>
          child.mn.toLowerCase().includes(q) ||
          child.en.toLowerCase().includes(q) ||
          item.mn.toLowerCase().includes(q) ||
          item.en.toLowerCase().includes(q),
      ),
    })).filter((item) => item.children.length > 0 || item.mn.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="nso-shell">
      <div className="nso-shell-inner">
        <aside className="nso-shell-sidebar">
          <div className="nso-shell-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={lng === "en" ? "Search..." : "Хайх..."}
            />
          </div>
          <nav className="nso-shell-menu">
            {sectors.map((item) => {
              const open = openId === item.id || Boolean(query);
              const active = item.id === sectorId;
              return (
                <div
                  key={item.id}
                  className={`nso-shell-sector${open ? " is-open" : ""}${active ? " is-active" : ""}`}
                >
                  <button type="button" onClick={() => setOpenId(open && !query ? "" : item.id)}>
                    {loc(lng, item)}
                  </button>
                  <div className="nso-shell-children">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={statcateHref(lng, "indicator", item.id, child.id)}
                        className={item.id === sectorId && child.id === subsectorId ? "is-active" : ""}
                      >
                        {loc(lng, child)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="nso-shell-main">
          <h1 className="nso-shell-title">{title}</h1>
          <nav className="nso-shell-tabs">
            {SHELL_TABS.map((item) => (
              <Link
                key={item.id}
                href={statcateHref(lng, item.id, sectorId, subsectorId)}
                className={item.id === activeTab ? "is-active" : ""}
              >
                {loc(lng, item)}
              </Link>
            ))}
          </nav>

          {activeTab === "indicator" ? (
            hasDash ? (
              <SectorIntroDashboard lng={lng} sector={sectorId} subsector={subsectorId} />
            ) : (
              <div className="nso-shell-placeholder">
                <strong>{title}</strong>
                {lng === "en"
                  ? "No intro dashboard is wired for this menu item yet. Add a config under lib/statcate-intro/configs."
                  : "Энэ цэсний танилцуулга dashboard хараахан холбогдоогүй. lib/statcate-intro/configs дотор config нэмнэ."}
              </div>
            )
          ) : (
            <div className="nso-shell-placeholder">
              {loc(lng, PLACEHOLDER[activeTab])}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
