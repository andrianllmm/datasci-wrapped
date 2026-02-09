"use client";

import UserProfileForm, {
  UserProfileInput,
} from "@/components/UserProfileForm";
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

interface EditDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (profile: UserProfileInput) => Promise<void>;
  onReset: () => void;
  isLoading: boolean;
  error: string | null;
  initialProfile: UserProfileInput | null;
}

export default function EditDetailsDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  onReset,
  isLoading,
  error,
  initialProfile,
}: EditDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            <p className="text-destructive text-sm text-center">{error}</p>
          </motion.div>
        )}

        <UserProfileForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          initialProfile={initialProfile}
        />

        <div className="flex flex-col gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onReset}
            className="w-full rounded-xl"
          >
            Clear Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
