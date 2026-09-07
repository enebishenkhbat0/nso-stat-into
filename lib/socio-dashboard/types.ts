export interface PxVariable {
  code: string;
  text: string;
  values: string[];
  valueTexts: string[];
}

export interface PxMetadata {
  title: string;
  variables: PxVariable[];
}

export interface JsonStatCategory {
  index?: Record<string, number> | string[];
  label?: Record<string, string>;
}

export interface JsonStatDimension {
  label?: string;
  category?: JsonStatCategory;
}

export interface JsonStatDataset {
  version?: string;
  class?: string;
  label?: string;
  id?: string[];
  size?: number[];
  value?: (number | null)[] | Record<string, number | null>;
  dimension?: Record<string, JsonStatDimension>;
  updated?: string;
  source?: string;
}

export interface DataRow {
  [dimensionOrValue: string]: string | number | null;
}
