import type { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ - DataSci Wrapped",
  description:
    "Frequently asked questions about DataSci Wrapped, data privacy, and how to create your personalized wrapped summary.",
};

export default function FAQPage() {
  return <FAQ />;
}
