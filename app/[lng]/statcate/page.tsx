import { redirect } from "next/navigation";
import { DEFAULT_SECTOR, DEFAULT_SUBSECTOR, statcateHref } from "@/lib/statcate-shell/catalog";

export default async function StatcateIndex({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  redirect(statcateHref(lng || "mn", "indicator", DEFAULT_SECTOR, DEFAULT_SUBSECTOR));
}
