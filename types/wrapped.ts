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

export interface UserMetadata {
  name?: string;
  username?: string;
  avatarUrl?: string;
}

export interface RepoEntry {
  month: string; // Format: "YYYY-MM"
  count: number;
}

export interface ReputationEntry {
  month: string; // Format: "YYYY-MM"
  reputation: number;
}

export interface AchievementEntry {
  label: string;
  value: number;
}

export interface WrappedData {
  year: number;
  dataVolume: DataVolumeEntry[];
  marketSize: MarketSizeEntry[];
  roles: RoleEntry[];
  tools: DataToolEntry[];
  languages: LanguageEntry[];
  userMetadata?: UserMetadata;
}

export interface PersonalWrappedData {
  year: number;
  repo: RepoEntry[];
  reputation: ReputationEntry[];
  achievements: AchievementEntry[];
  tools: DataToolEntry[];
  languages: LanguageEntry[];
  userMetadata?: UserMetadata;
}

export type WrappedDataCatalog = {
  [key: number]: WrappedData | null;
};
