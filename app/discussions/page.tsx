import type { Metadata } from "next";
import Discussions from "@/components/Discussions";

export const metadata: Metadata = {
  title: "Discussions - DataSci Wrapped",
  description:
    "Join the DataSci Wrapped community discussions. Share your thoughts, ask questions, and learn from others.",
};

export default function DiscussionsPage() {
  return <Discussions />;
}
