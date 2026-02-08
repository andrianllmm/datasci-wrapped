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
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
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

  if (isLoading) {
    return <PersonalWrappedLoading />;
  }

  if (wrappedData) {
    return <PersonalWrapped data={wrappedData} />;
  }

  return (
    <div className="min-h-screen w-screen bg-purple-700">
      <Slide>
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
          <motion.div {...fadeInUp()} className="mb-8">
            <Link
              href="/"
              className="flex items-center gap-1 text-purple-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.h2
            {...fadeInUp()}
            className="max-w-md px-6 mx-auto text-2xl md:text-3xl font-bold text-white text-center mb-8"
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
