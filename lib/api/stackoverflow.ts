/**
 * StackOverflow Public API Service
 * Fetches user data without authentication
 */

import { handleAPIError, NotFoundError } from "./errors";

export interface StackOverflowUser {
  user_id: number;
  display_name: string;
  reputation: number;
  badge_counts: {
    bronze: number;
    silver: number;
    gold: number;
  };
  profile_image: string;
  link: string;
  creation_date: number;
}

export interface StackOverflowTag {
  name: string;
  count: number;
}

export interface StackOverflowActivity {
  year: number;
  posts: number;
}

export async function fetchStackOverflowUser(
  userId: string,
): Promise<StackOverflowUser> {
  try {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/users/${userId}?order=desc&sort=reputation&site=stackoverflow`,
    );

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new NotFoundError(
        `StackOverflow user ID '${userId}'`,
        "StackOverflow",
      );
    }

    return data.items[0];
  } catch (error) {
    handleAPIError(error, "StackOverflow");
  }
}

export async function fetchUserTopTags(
  userId: string,
): Promise<StackOverflowTag[]> {
  try {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/users/${userId}/top-tags?pagesize=20&site=stackoverflow`,
    );

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
      name: item.tag_name,
      count: item.answer_count + (item.question_count || 0),
    }));
  } catch (error) {
    handleAPIError(error, "StackOverflow");
  }
}

export async function fetchUserAnswers(userId: string): Promise<number> {
  const response = await fetch(
    `https://api.stackexchange.com/2.3/users/${userId}/answers?pagesize=1&site=stackoverflow`,
  );

  if (!response.ok) {
    return 0;
  }

  const data = await response.json();
  return data.total || 0;
}

export async function fetchUserQuestions(userId: string): Promise<number> {
  const response = await fetch(
    `https://api.stackexchange.com/2.3/users/${userId}/questions?pagesize=1&site=stackoverflow`,
  );

  if (!response.ok) {
    return 0;
  }

  const data = await response.json();
  return data.total || 0;
}

export async function getReputationHistory(
  userId: string,
): Promise<StackOverflowActivity[]> {
  const response = await fetch(
    `https://api.stackexchange.com/2.3/users/${userId}/reputation-history?pagesize=100&site=stackoverflow`,
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const yearlyReputation: { [year: number]: number } = {};

  data.items?.forEach((item: any) => {
    const year = new Date(item.creation_date * 1000).getFullYear();
    yearlyReputation[year] =
      (yearlyReputation[year] || 0) + item.reputation_change;
  });

  return Object.entries(yearlyReputation)
    .map(([year, posts]) => ({ year: parseInt(year), posts }))
    .sort((a, b) => a.year - b.year);
}
