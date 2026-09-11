"use client";

import { formatCount } from "@/lib/statcate-intro/format";
import { resolveCategoryIcon } from "@/lib/statcate-intro/icons";
import { colorFor, listCategories, nationalValue } from "@/lib/statcate-intro/query";
import type { CategoryFlowWidget } from "@/lib/statcate-intro/types";
import type { IntroDashboardState } from "@/components/statcate-intro/useIntroDashboard";

type Props = {
  widget: CategoryFlowWidget;
  dash: IntroDashboardState;
};

export default function CategoryFlow({ widget, dash }: Props) {
  const { config, tablesById, year, lng } = dash;
  if (!config || !year) return null;

  const source = tablesById[widget.source];
  const target = tablesById[widget.target];
  const extra = widget.extra ? tablesById[widget.extra] : undefined;
  if (!source || !target) return null;

  const items = listCategories(source.rows, config).map((label, i) => ({
    label,
    color: colorFor(label, i, widget.colors),
    source: nationalValue(source.rows, config, year, label) ?? 0,
    target: nationalValue(target.rows, config, year, label) ?? 0,
    extra: extra ? (nationalValue(extra.rows, config, year, label) ?? 0) : 0,
  }));

  if (!items.length) return null;

  return (
    <section className="sector-intro-hero">
      <div className={`category-flow${extra ? " has-extra" : ""}`}>
        {items.map((item) => {
          const Icon = resolveCategoryIcon(item.label, widget.categoryIcons);
          return (
            <div key={item.label} className="category-flow-row">
              <div
                className="category-flow-node"
                style={{ ["--accent" as string]: item.color }}
              >
                <span className="category-flow-orb is-mark">
                  <Icon size={18} />
                </span>
                <div className="category-flow-copy">
                  <strong>{formatCount(item.source, lng)}</strong>
                  <p>
                    <span className="category-flow-name">{item.label}</span>
                    <span className="category-flow-meta">{source.label}</span>
                  </p>
                </div>
              </div>

              <article
                className="category-flow-card"
                style={{ ["--accent" as string]: item.color }}
              >
                <span className="category-flow-card-icon is-mark">
                  <Icon size={18} />
                </span>
                <div className="category-flow-metrics">
                  <div className="category-flow-metric">
                    <b>{formatCount(item.target, lng)}</b>
                    <span>{target.label}</span>
                  </div>
                  {extra ? (
                    <div className="category-flow-metric">
                      <b>{formatCount(item.extra, lng)}</b>
                      <span>{extra.label}</span>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
