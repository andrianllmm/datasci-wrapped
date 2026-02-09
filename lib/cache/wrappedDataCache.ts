/**
 * Cache utilities for personal wrapped data
 */

import { PersonalWrappedData } from "@/types/wrapped";

export const PROFILE_STORAGE_KEY = "datasci-wrapped-profile";
export const WRAPPED_DATA_STORAGE_KEY = "datasci-wrapped-data";
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface CachedWrappedData {
  data: PersonalWrappedData;
  timestamp: number;
}

export interface UserProfileInput {
  githubUsername?: string;
  stackoverflowId?: string;
}

/**
 * Generate a cache key based on the user profile
 * This ensures different users don't share cached data
 */
export const generateCacheKey = (profile: UserProfileInput): string => {
  return `${WRAPPED_DATA_STORAGE_KEY}:${profile.githubUsername || ""}:${profile.stackoverflowId || ""}`;
};

/**
 * Check if cached data has expired based on TTL
 */
export const isCacheExpired = (cachedData: CachedWrappedData): boolean => {
  return Date.now() - cachedData.timestamp > CACHE_TTL_MS;
};

/**
 * Validate that cached data has the correct structure
 */
export const isValidCachedData = (data: any): data is CachedWrappedData => {
  return (
    data &&
    typeof data === "object" &&
    data.data &&
    typeof data.data === "object" &&
    typeof data.timestamp === "number" &&
    Array.isArray(data.data.repo) &&
    Array.isArray(data.data.reputation) &&
    Array.isArray(data.data.achievements) &&
    Array.isArray(data.data.tools) &&
    Array.isArray(data.data.languages)
  );
};

/**
 * Save profile to localStorage
 */
export const saveProfile = (profile: UserProfileInput): void => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

/**
 * Load profile from localStorage
 */
export const loadProfile = (): UserProfileInput | null => {
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load cached profile", e);
    return null;
  }
};

/**
 * Save wrapped data to cache
 */
export const saveCachedWrappedData = (
  profile: UserProfileInput,
  data: PersonalWrappedData,
): void => {
  const cacheKey = generateCacheKey(profile);
  const cachedData: CachedWrappedData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(cacheKey, JSON.stringify(cachedData));
};

/**
 * Load wrapped data from cache
 */
export const loadCachedWrappedData = (
  profile: UserProfileInput,
): PersonalWrappedData | null => {
  const cacheKey = generateCacheKey(profile);
  const cachedDataStr = localStorage.getItem(cacheKey);

  if (!cachedDataStr) return null;

  try {
    const cachedData = JSON.parse(cachedDataStr);

    if (!isValidCachedData(cachedData)) {
      console.warn("Invalid cached data structure, clearing cache");
      localStorage.removeItem(cacheKey);
      return null;
    }

    if (isCacheExpired(cachedData)) {
      console.log("Cache expired");
      return null;
    }

    return cachedData.data;
  } catch (e) {
    console.error("Failed to load cached wrapped data", e);
    localStorage.removeItem(cacheKey);
    return null;
  }
};

/**
 * Clear cache for a specific profile
 */
export const clearProfileCache = (profile: UserProfileInput): void => {
  const cacheKey = generateCacheKey(profile);
  localStorage.removeItem(cacheKey);
};

/**
 * Clear all wrapped data (profile and cache)
 */
export const clearAllWrappedData = (profile: UserProfileInput | null): void => {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  if (profile) {
    clearProfileCache(profile);
  }
};
