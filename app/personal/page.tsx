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
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import BackHomeButton from "@/components/BackHomeButton";

const STORAGE_KEY = "datasci-wrapped-profile";

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
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setCachedProfile(profile);
        handleSubmit(profile);
      } catch (e) {
        console.error("Failed to load cached profile", e);
      }
    }
  }, []);

  const handleSubmit = async (profile: UserProfileInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await generatePersonalWrapped(profile);
      setWrappedData(data);
      setCachedProfile(profile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
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
    setWrappedData(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
    setCachedProfile(null);
  };

  if (isLoading && !wrappedData) {
    return <PersonalWrappedLoading />;
  }

  if (wrappedData) {
    return (
      <>
        <PersonalWrapped data={wrappedData} onEdit={() => setIsEditing(true)} />

        {/* Edit Modal Overlay */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsEditing(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border border-primary/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Edit Your Details
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Update your username or ID to regenerate your wrapped
                </p>
              </div>

              <UserProfileForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                initialProfile={cachedProfile}
              />

              {error && (
                <motion.div
                  {...fadeInUp(0.2)}
                  className="mt-4 p-3 bg-red-500/20 border border-red-400 rounded-lg"
                >
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="w-full mt-4"
              >
                Cancel
              </Button>
            </motion.div>
          </motion.div>
        )}
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

          <UserProfileForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            initialProfile={cachedProfile}
          />

          {error && (
            <motion.div
              {...fadeInUp(0.4)}
              className="mt-6 p-4 bg-red-500/20 border-2 border-red-400 rounded-lg max-w-md"
            >
              <p className="text-red-200 text-center font-semibold">{error}</p>
              <Button
                onClick={handleReset}
                className="mt-4 w-full bg-red-600 hover:bg-red-500"
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
