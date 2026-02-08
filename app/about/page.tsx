import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About - DataSci Wrapped",
  description:
    "Learn about DataSci Wrapped, a data-driven web application visualizing data science industry trends and personalized achievements.",
};

export default function AboutPage() {
  return <About />;
}
