"use client";

import PersonalWrappedLoading from "@/components/PersonalWrappedLoading";
import WrappedDataDisplay from "@/components/WrappedDataDisplay";
import WrappedInitialForm from "@/components/WrappedInitialForm";
import EditDetailsDialog from "@/components/EditDetailsDialog";
import { usePersonalWrappedData } from "@/hooks/usePersonalWrappedData";
import { clearProfileCache } from "@/lib/cache/wrappedDataCache";

export default function PersonalWrappedPage() {
  const {
    wrappedData,
    isLoading,
    error,
    cachedProfile,
    isEditing,
    handleSubmit,
    handleReset,
    setIsEditing,
  } = usePersonalWrappedData();

  // Show loading state when fetching new data
  if (isLoading && !wrappedData) {
    return <PersonalWrappedLoading />;
  }

  // Show wrapped data with edit dialog
  if (wrappedData) {
    return (
      <>
        <WrappedDataDisplay
          data={wrappedData}
          onEdit={() => {
            // Clear cache when entering edit mode to force fresh data on resubmit
            if (cachedProfile) {
              clearProfileCache(cachedProfile);
            }
            setIsEditing(true);
          }}
        />

        <EditDetailsDialog
          isOpen={isEditing}
          onOpenChange={setIsEditing}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isLoading={isLoading}
          error={error}
          initialProfile={cachedProfile}
        />
      </>
    );
  }

  // Show initial form
  return (
    <WrappedInitialForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      onReset={handleReset}
      initialProfile={cachedProfile}
    />
  );
}
