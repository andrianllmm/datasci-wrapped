/**
 * GitHub Public API Service
 * Fetches user data without authentication
 */

import { handleAPIError, NotFoundError } from "./errors";

export interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  description: string | null;
  topics: string[];
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string | null;
}

export interface GitHubLanguageStats {
  [language: string]: number;
}

export interface GitHubContribution {
  date: string;
  count: number;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.status === 404) {
      throw new NotFoundError(`GitHub user '${username}'`, "GitHub");
    }

    if (!response.ok) {
      throw response;
    }

    return response.json();
  } catch (error) {
    handleAPIError(error, "GitHub");
  }
}

export async function fetchGitHubRepos(
  username: string,
): Promise<GitHubRepo[]> {
  try {
    const repos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
      );

      if (!response.ok) {
        throw response;
      }

      const data = await response.json();
      if (data.length === 0) break;

      repos.push(...data);
      if (data.length < perPage) break;
      page++;

      // Limit to prevent excessive API calls
      if (page > 10) break; // Max 1000 repos
    }

    return repos;
  } catch (error) {
    handleAPIError(error, "GitHub");
  }
}

export async function getLanguageStats(
  username: string,
): Promise<GitHubLanguageStats> {
  const repos = await fetchGitHubRepos(username);
  const languageBytes: { [key: string]: number } = {};

  for (const repo of repos) {
    if (repo.language) {
      // Use repo size as a proxy for language usage
      languageBytes[repo.language] =
        (languageBytes[repo.language] || 0) + repo.size;
    }
  }

  // Calculate percentages
  const total = Object.values(languageBytes).reduce(
    (sum, bytes) => sum + bytes,
    0,
  );
  const percentages: GitHubLanguageStats = {};

  Object.entries(languageBytes).forEach(([lang, bytes]) => {
    percentages[lang] = Math.round((bytes / total) * 100);
  });

  return percentages;
}

export async function getTopTools(
  username: string,
): Promise<{ [tool: string]: number }> {
  const repos = await fetchGitHubRepos(username);
  const toolCount: { [tool: string]: number } = {};

  repos.forEach((repo) => {
    // Count topics as tools
    repo.topics?.forEach((topic) => {
      const normalized = topic.toLowerCase();
      toolCount[normalized] = (toolCount[normalized] || 0) + 1;
    });

    // Parse common tools from description
    const description = (repo.description || "").toLowerCase();
    const commonTools = [
      "pandas",
      "numpy",
      "scikit-learn",
      "tensorflow",
      "pytorch",
      "keras",
      "jupyter",
      "matplotlib",
      "seaborn",
      "spark",
      "docker",
      "kubernetes",
      "airflow",
      "dbt",
      "polars",
    ];

    commonTools.forEach((tool) => {
      if (description.includes(tool)) {
        toolCount[tool] = (toolCount[tool] || 0) + 1;
      }
    });
  });

  return toolCount;
}

export async function getYearlyRepoCount(
  username: string,
): Promise<{ year: number; count: number }[]> {
  const repos = await fetchGitHubRepos(username);
  const yearCount: { [year: number]: number } = {};

  repos.forEach((repo) => {
    const year = new Date(repo.created_at).getFullYear();
    yearCount[year] = (yearCount[year] || 0) + 1;
  });

  return Object.entries(yearCount)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year);
}

export async function getMonthlyRepoCount(
  username: string,
): Promise<{ month: string; count: number }[]> {
  const repos = await fetchGitHubRepos(username);
  const monthCount: { [month: string]: number } = {};

  repos.forEach((repo) => {
    const date = new Date(repo.created_at);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthCount[month] = (monthCount[month] || 0) + 1;
  });

  return Object.entries(monthCount)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export async function getTotalStars(username: string): Promise<number> {
  const repos = await fetchGitHubRepos(username);
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}
