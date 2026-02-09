"use client";

import UserProfileForm, {
  UserProfileInput,
} from "@/components/UserProfileForm";
import Slide from "@/components/Slide";
import BackHomeButton from "@/components/BackHomeButton";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

interface WrappedInitialFormProps {
  onSubmit: (profile: UserProfileInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
  initialProfile: UserProfileInput | null;
}

export default function WrappedInitialForm({
  onSubmit,
  isLoading,
  error,
  onReset,
  initialProfile,
}: WrappedInitialFormProps) {
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
              onSubmit={onSubmit}
              isLoading={isLoading}
              initialProfile={initialProfile}
            />
          </div>

          {error && (
            <motion.div {...fadeInUp(0.4)} className="mt-4 p-2 max-w-md">
              <p className="text-destructive text-center font-semibold">
                error
              </p>
              <Button
                onClick={onReset}
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
