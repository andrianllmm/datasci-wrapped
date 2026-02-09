"use client";

import { PersonalWrappedData } from "@/types/wrapped";
import PersonalWrapped from "@/components/PersonalWrapped";

interface WrappedDataDisplayProps {
  data: PersonalWrappedData;
  onEdit: () => void;
}

export default function WrappedDataDisplay({
  data,
  onEdit,
}: WrappedDataDisplayProps) {
  return <PersonalWrapped data={data} onEdit={onEdit} />;
}
