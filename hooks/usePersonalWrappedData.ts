/**
 * Custom hook for managing personal wrapped data state and logic
 */

import { useState, useEffect, useCallback } from "react";
import { PersonalWrappedData } from "@/types/wrapped";
import { generatePersonalWrapped } from "@/lib/api/transform";
import {
  UserProfileInput,
  generateCacheKey,
  loadProfile,
  loadCachedWrappedData,
  saveCachedWrappedData,
  saveProfile,
  clearProfileCache,
  clearAllWrappedData,
} from "@/lib/cache/wrappedDataCache";

interface UsePersonalWrappedDataReturn {
  wrappedData: PersonalWrappedData | null;
  isLoading: boolean;
  error: string | null;
  cachedProfile: UserProfileInput | null;
  isEditing: boolean;
  handleSubmit: (profile: UserProfileInput) => Promise<void>;
  handleReset: () => void;
  setIsEditing: (editing: boolean) => void;
}

export const usePersonalWrappedData = (): UsePersonalWrappedDataReturn => {
  const [wrappedData, setWrappedData] = useState<PersonalWrappedData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cachedProfile, setCachedProfile] = useState<UserProfileInput | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = useCallback(async (profile: UserProfileInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // If profile changed, clear old cache
      if (cachedProfile) {
        const oldCacheKey = generateCacheKey(cachedProfile);
        const newCacheKey = generateCacheKey(profile);
        if (oldCacheKey !== newCacheKey) {
          clearProfileCache(cachedProfile);
        }
      }

      const data = await generatePersonalWrapped(profile);

      // Validate that we got proper data
      if (
        !data ||
        !Array.isArray(data.repo) ||
        !Array.isArray(data.reputation)
      ) {
        throw new Error("Received invalid data structure from API");
      }

      setWrappedData(data);
      setCachedProfile(profile);

      // Cache both the profile and wrapped data with timestamp
      saveProfile(profile);
      saveCachedWrappedData(profile, data);

      setIsEditing(false);
    } catch (err) {
      console.error("Error generating wrapped:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate your wrapped. Please check your usernames and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    clearAllWrappedData(cachedProfile);
    setWrappedData(null);
    setError(null);
    setCachedProfile(null);
    setIsEditing(false);
  }, []);

  // Initialize with cached data on mount
  useEffect(() => {
    const profile = loadProfile();
    if (profile) {
      setCachedProfile(profile);

      const cachedData = loadCachedWrappedData(profile);
      if (cachedData) {
        setWrappedData(cachedData);
      } else {
        // No valid cached data, fetch fresh
        handleSubmit(profile);
      }
    }
  }, [handleSubmit]);

  return {
    wrappedData,
    isLoading,
    error,
    cachedProfile,
    isEditing,
    handleSubmit,
    handleReset,
    setIsEditing,
  };
};
