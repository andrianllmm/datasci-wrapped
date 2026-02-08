/**
 * Transform user data from various APIs into PersonalWrappedData format
 */

import {
  PersonalWrappedData,
  LanguageEntry,
  DataToolEntry,
  RepoEntry,
  ReputationEntry,
  AchievementEntry,
} from "@/types/wrapped";
import {
  getLanguageStats,
  getTopTools,
  getMonthlyRepoCount,
  getTotalStars,
  fetchGitHubUser,
} from "./github";
import { fetchStackOverflowUser, fetchUserTopTags } from "./stackoverflow";

export interface UserProfile {
  githubUsername?: string;
  stackoverflowId?: string;
}

export async function generatePersonalWrapped(
  profile: UserProfile,
): Promise<PersonalWrappedData> {
  const currentYear = new Date().getFullYear();

  // Fetch data from all sources
  const [
    githubLanguages,
    githubTools,
    reposByMonth,
    totalStars,
    githubUser,
    soUser,
    soTags,
  ] = await Promise.all([
    profile.githubUsername
      ? getLanguageStats(profile.githubUsername).catch(() => ({}))
      : Promise.resolve({}),
    profile.githubUsername
      ? getTopTools(profile.githubUsername).catch(() => ({}))
      : Promise.resolve({}),
    profile.githubUsername
      ? getMonthlyRepoCount(profile.githubUsername).catch(() => [])
      : Promise.resolve([]),
    profile.githubUsername
      ? getTotalStars(profile.githubUsername).catch(() => 0)
      : Promise.resolve(0),
    profile.githubUsername
      ? fetchGitHubUser(profile.githubUsername).catch(() => null)
      : Promise.resolve(null),
    profile.stackoverflowId
      ? fetchStackOverflowUser(profile.stackoverflowId).catch(() => null)
      : Promise.resolve(null),
    profile.stackoverflowId
      ? fetchUserTopTags(profile.stackoverflowId).catch(() => [])
      : Promise.resolve([]),
  ]);

  // Transform languages
  const languages: LanguageEntry[] = Object.entries(githubLanguages)
    .map(([language, value]) => ({ language, value: value as number }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Add StackOverflow tags as additional language/tool data
  if (soTags.length > 0) {
    const soLanguages = soTags
      .filter((tag) =>
        [
          "python",
          "r",
          "sql",
          "javascript",
          "typescript",
          "java",
          "julia",
          "scala",
        ].includes(tag.name.toLowerCase()),
      )
      .map((tag) => ({
        language: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
        value: tag.count,
      }));

    // Merge with GitHub data
    soLanguages.forEach((soLang) => {
      const existing = languages.find(
        (l) => l.language.toLowerCase() === soLang.language.toLowerCase(),
      );
      if (existing) {
        existing.value += soLang.value;
      } else if (languages.length < 10) {
        languages.push(soLang);
      }
    });

    languages.sort((a, b) => b.value - a.value);
  }

  // Transform tools
  const tools: DataToolEntry[] = Object.entries(githubTools)
    .map(([tool, value]) => ({
      tool: tool.charAt(0).toUpperCase() + tool.slice(1),
      value: value as number,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Add StackOverflow tools/frameworks from tags
  if (soTags.length > 0) {
    const soTools = soTags
      .filter(
        (tag) =>
          ![
            "python",
            "r",
            "sql",
            "javascript",
            "typescript",
            "java",
            "julia",
            "scala",
          ].includes(tag.name.toLowerCase()),
      )
      .map((tag) => ({
        tool: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
        value: tag.count,
      }))
      .slice(0, 5);

    soTools.forEach((soTool) => {
      const existing = tools.find(
        (t) => t.tool.toLowerCase() === soTool.tool.toLowerCase(),
      );
      if (existing) {
        existing.value += soTool.value;
      } else if (tools.length < 10) {
        tools.push(soTool);
      }
    });

    tools.sort((a, b) => b.value - a.value);
  }

  // Transform activity over time (monthly)
  const repo: RepoEntry[] = reposByMonth.map((item) => ({
    month: item.month,
    count: item.count,
  }));

  // Transform StackOverflow reputation growth over time (monthly)
  const reputation: ReputationEntry[] = [];
  if (soUser) {
    const creationDate = new Date(soUser.creation_date * 1000);
    const currentDate = new Date();
    const accountAgeInMonths =
      (currentDate.getFullYear() - creationDate.getFullYear()) * 12 +
      (currentDate.getMonth() - creationDate.getMonth());
    const repPerMonth = soUser.reputation / (accountAgeInMonths || 1);

    // Generate monthly data
    for (let i = 0; i <= Math.min(accountAgeInMonths, 120); i++) {
      // Cap at 10 years (120 months)
      const date = new Date(creationDate);
      date.setMonth(date.getMonth() + i);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      reputation.push({
        month,
        reputation: Math.round(repPerMonth * i),
      });
    }
  }

  // Create personal achievements based on their profile
  const achievements: AchievementEntry[] = [];

  if (githubUser) {
    achievements.push({
      label: "Public Repositories",
      value: githubUser.public_repos,
    });

    achievements.push({
      label: "Total Stars Earned",
      value: totalStars,
    });

    achievements.push({
      label: "Followers",
      value: githubUser.followers,
    });
  }

  if (soUser) {
    achievements.push({
      label: "StackOverflow Reputation",
      value: soUser.reputation,
    });

    achievements.push({
      label: "Gold Badges",
      value: soUser.badge_counts.gold,
    });

    achievements.push({
      label: "Silver Badges",
      value: soUser.badge_counts.silver,
    });
  }

  return {
    year: currentYear,
    repo: repo.length > 0 ? repo : [{ month: `${currentYear}-01`, count: 0 }],
    reputation:
      reputation.length > 0
        ? reputation
        : [{ month: `${currentYear}-01`, reputation: 0 }],
    achievements:
      achievements.length > 0 ? achievements : [{ label: "No data", value: 0 }],
    tools: tools.length > 0 ? tools : [{ tool: "No data", value: 0 }],
    languages:
      languages.length > 0 ? languages : [{ language: "No data", value: 0 }],
    userMetadata: {
      name: githubUser?.name || soUser?.display_name,
      username:
        githubUser?.login || profile.githubUsername || profile.stackoverflowId,
      avatarUrl: githubUser?.avatar_url || soUser?.profile_image,
    },
  };
}
