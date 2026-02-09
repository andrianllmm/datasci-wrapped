"use client";

import { useState, useEffect } from "react";
import Slide from "@/components/Slide";
import UserProfileForm, {
  UserProfileInput,
} from "@/components/UserProfileForm";
import PersonalWrapped from "@/components/PersonalWrapped";
import PersonalWrappedLoading from "@/components/PersonalWrappedLoading";
import { generatePersonalWrapped } from "@/lib/api/transform";
import { PersonalWrappedData } from "@/types/wrapped";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import BackHomeButton from "@/components/BackHomeButton";

const PROFILE_STORAGE_KEY = "datasci-wrapped-profile";
const WRAPPED_DATA_STORAGE_KEY = "datasci-wrapped-data";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedWrappedData {
  data: PersonalWrappedData;
  timestamp: number;
}

/**
 * Generate a cache key based on the user profile
 * This ensures different users don't share cached data
 */
const generateCacheKey = (profile: UserProfileInput) => {
  return `${WRAPPED_DATA_STORAGE_KEY}:${profile.githubUsername || ""}:${profile.stackoverflowId || ""}`;
};

/**
 * Check if cached data has expired based on TTL
 */
const isCacheExpired = (cachedData: CachedWrappedData): boolean => {
  return Date.now() - cachedData.timestamp > CACHE_TTL_MS;
};

/**
 * Validate that cached data has the correct structure
 */
const isValidCachedData = (data: any): data is CachedWrappedData => {
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

export default function PersonalWrappedPage() {
  const [wrappedData, setWrappedData] = useState<PersonalWrappedData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cachedProfile, setCachedProfile] = useState<UserProfileInput | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setCachedProfile(profile);

        // Try to load cached wrapped data first
        const cacheKey = generateCacheKey(profile);
        const cachedDataStr = localStorage.getItem(cacheKey);

        if (cachedDataStr) {
          try {
            const cachedData = JSON.parse(cachedDataStr);

            // Validate cached data structure
            if (!isValidCachedData(cachedData)) {
              console.warn("Invalid cached data structure, clearing cache");
              localStorage.removeItem(cacheKey);
              handleSubmit(profile);
              return;
            }

            // Check if cache has expired
            if (!isCacheExpired(cachedData)) {
              setWrappedData(cachedData.data);
            } else {
              // Cache expired, fetch fresh data
              handleSubmit(profile);
            }
          } catch (e) {
            console.error("Failed to load cached wrapped data", e);
            // If cache is corrupted, remove it and fetch fresh
            localStorage.removeItem(cacheKey);
            handleSubmit(profile);
          }
        } else {
          // No cached data, fetch fresh
          handleSubmit(profile);
        }
      } catch (e) {
        console.error("Failed to load cached profile", e);
      }
    }
  }, []);

  const handleSubmit = async (profile: UserProfileInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // If profile changed, clear old cache
      if (cachedProfile) {
        const oldCacheKey = generateCacheKey(cachedProfile);
        const newCacheKey = generateCacheKey(profile);
        if (oldCacheKey !== newCacheKey) {
          localStorage.removeItem(oldCacheKey);
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
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      const cacheKey = generateCacheKey(profile);
      const cachedData: CachedWrappedData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cachedData));

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
  };

  const handleReset = () => {
    // Clear both profile and any cached wrapped data
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    if (cachedProfile) {
      const cacheKey = generateCacheKey(cachedProfile);
      localStorage.removeItem(cacheKey);
    }

    // Clear all state
    setWrappedData(null);
    setError(null);
    setCachedProfile(null);
    setIsEditing(false);
  };

  if (isLoading && !wrappedData) {
    return <PersonalWrappedLoading />;
  }

  if (wrappedData) {
    return (
      <>
        <PersonalWrapped
          data={wrappedData}
          onEdit={() => {
            // Clear cache when entering edit mode to force fresh data on resubmit
            if (cachedProfile) {
              const cacheKey = generateCacheKey(cachedProfile);
              localStorage.removeItem(cacheKey);
            }
            setIsEditing(true);
          }}
        />

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="rounded-2xl border border-primary/20 p-8 shadow-2xl">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Edit Your Details
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm mt-2">
                Update your username or ID to regenerate your wrapped
              </DialogDescription>
            </DialogHeader>

            {error && (
              <motion.div {...fadeInUp(0.2)} className="mb-6">
                <p className="text-destructive text-sm text-center">
                  {error}
                </p>
              </motion.div>
            )}

            <UserProfileForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              initialProfile={cachedProfile}
            />

            <div className="flex flex-col gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="w-full rounded-xl"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReset}
                className="w-full rounded-xl"
              >
                Clear Details
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-background">
      <BackHomeButton />
      <Slide>
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
          <motion.h2
            {...fadeInUp()}
            className="max-w-md px-6 mx-auto text-2xl md:text-3xl font-bold text-foreground text-center mb-8"
          >
            Unwrap Your
            <br />
            Year in Data Science
          </motion.h2>

          <div className="w-full max-w-md mx-auto px-6">
            <UserProfileForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              initialProfile={cachedProfile}
            />
          </div>

          {error && (
            <motion.div {...fadeInUp(0.4)} className="mt-4 p-2 max-w-md">
              <p className="text-destructive text-center font-semibold">
                error
              </p>
              <Button
                onClick={handleReset}
                variant="destructive"
                size="sm"
                className="mt-2"
              >
                Try Again
              </Button>
            </motion.div>
          )}
        </div>
      </Slide>
    </div>
  );
}
