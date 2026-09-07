import { redirect } from "next/navigation";
import { DEFAULT_SECTOR, DEFAULT_SUBSECTOR, statcateHref } from "@/lib/statcate-shell/catalog";

export default function HomePage() {
  redirect(statcateHref("mn", "indicator", DEFAULT_SECTOR, DEFAULT_SUBSECTOR));
}
