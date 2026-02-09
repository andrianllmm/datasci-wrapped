"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LockOpen, StarsIcon } from "lucide-react";
import { SiGithub, SiStackoverflow } from "@icons-pack/react-simple-icons";

export interface UserProfileInput {
  githubUsername?: string;
  stackoverflowId?: string;
}

interface UserProfileFormProps {
  onSubmit: (profile: UserProfileInput) => void;
  isLoading?: boolean;
  initialProfile?: UserProfileInput | null;
}

export default function UserProfileForm({
  onSubmit,
  isLoading,
  initialProfile,
}: UserProfileFormProps) {
  const [githubUsername, setGithubUsername] = useState(
    initialProfile?.githubUsername || "",
  );
  const [stackoverflowId, setStackoverflowId] = useState(
    initialProfile?.stackoverflowId || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: UserProfileInput = {};

    if (githubUsername.trim()) {
      profile.githubUsername = githubUsername.trim();
    }

    if (stackoverflowId.trim()) {
      profile.stackoverflowId = stackoverflowId.trim();
    }

    if (profile.githubUsername || profile.stackoverflowId) {
      onSubmit(profile);
    }
  };

  return (
    <motion.div {...fadeInUp(0.1)}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="github" className="text-foreground font-semibold">
            <SiGithub className="size-4" />
            GitHub Username
          </Label>
          <Input
            id="github"
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="octocat"
            autoFocus
            className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground/70"
          />
          <p className="text-xs text-muted-foreground/70">
            We&apos;ll analyze your public repositories and contributions
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="stackoverflow"
            className="text-foreground font-semibold"
          >
            <SiStackoverflow className="size-4" />
            StackOverflow User ID
          </Label>
          <Input
            id="stackoverflow"
            type="text"
            value={stackoverflowId}
            onChange={(e) => setStackoverflowId(e.target.value)}
            placeholder="123456 (optional)"
            className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground/70"
          />
          <p className="text-xs text-muted-foreground/70">
            Find it in your StackOverflow profile URL
          </p>
        </div>

        <motion.div {...fadeInUp(0.2)}>
          <Button
            type="submit"
            disabled={
              isLoading || (!githubUsername.trim() && !stackoverflowId.trim())
            }
            className="
                group
                flex bg-primary/40 items-center gap-2 w-full text-lg font-bold rounded-lg
                transition-all
              "
          >
            <StarsIcon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
            {isLoading ? "Unwrapping Your Wrapped..." : "Unwrap My Wrapped"}
          </Button>
        </motion.div>

        <motion.p
          {...fadeInUp(0.3)}
          className="flex justify-center items-center gap-1 text-sm text-muted-foreground/70 text-start"
        >
          <LockOpen className="w-4 h-4" />
          We only use public APIs. No login required!{" "}
        </motion.p>
      </form>
    </motion.div>
  );
}
