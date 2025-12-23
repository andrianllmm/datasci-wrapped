export interface DataVolumeEntry {
  year: number;
  zettabytes: number;
}

export interface MarketSizeEntry {
  year: number;
  usd: number;
}

export interface RoleEntry {
  role: string;
  salary: number;
}

export interface DataToolEntry {
  tool: string;
  value: number;
}

export interface LanguageEntry {
  language: string;
  value: number;
}

export interface WrappedData {
  year: number;
  dataVolume: DataVolumeEntry[];
  marketSize: MarketSizeEntry[];
  roles: RoleEntry[];
  tools: DataToolEntry[];
  languages: LanguageEntry[];
}

export type WrappedDataCatalog = {
  [key: number]: WrappedData | null;
};
