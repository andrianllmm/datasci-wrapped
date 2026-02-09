import { TrendingUp, Sparkles, Users, BarChart2Icon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HowItWorksItem {
  step: string;
  title: string;
  description: string;
}

export const ABOUT_FEATURES: Feature[] = [
  {
    icon: TrendingUp,
    title: "Industry Insights",
    description:
      "Explore real-world data science trends with interactive visualizations",
  },
  {
    icon: Sparkles,
    title: "Personalized Wrapped",
    description:
      "Connect your profiles to generate a personalized summary of your journey",
  },
  {
    icon: Users,
    title: "Community Discussions",
    description:
      "Discuss with fellow contributors and industry experts to learn from their experiences",
  },
  {
    icon: BarChart2Icon,
    title: "Interactive Charts",
    description:
      "Engaging visualizations that bring data to life, revealing trends and insights",
  },
];

export const ABOUT_HOW_IT_WORKS: HowItWorksItem[] = [
  {
    step: "01",
    title: "Explore Industry Data",
    description:
      "Start by viewing the latest data science trends. Browse through visualizations of popular programming languages, in-demand roles, and more!",
  },
  {
    step: "02",
    title: "Connect Your Profiles",
    description:
      "Create a personalized wrapped by authenticating with GitHub and StackOverflow. We analyze your public repositories, contributions, and more!",
  },
  {
    step: "03",
    title: "Discover Your Wrapped",
    description:
      "Get your personalized Wrapped featuring your achievements, top tools, and repos. Share your summary with the community and celebrate your contributions!",
  },
];
