import { learningNotes as fallbackNotes, type LearningNote } from "../data/learning-notes";

export type { LearningNote };

/**
 * Fetches dynamic learning notes from GitHub Issues tagged with `notebook`.
 *
 * Workflow for adding notes without modifying code:
 * 1. Go to your repository on GitHub (or GitHub mobile app).
 * 2. Create a new Issue with label `notebook`.
 * 3. Title or Body will be rendered as the note entry.
 * 4. Next.js automatically caches and revalidates every hour (ISR).
 *
 * Falls back gracefully to `app/data/learning-notes.ts` if offline or unreachable.
 */
export async function getLearningNotes(): Promise<LearningNote[]> {
  const repo = process.env.GITHUB_REPO || "rajavelavan/portfolio";
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-app",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues?labels=notebook&state=open&sort=created&direction=desc&per_page=20`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      const issues = await res.json();
      if (Array.isArray(issues) && issues.length > 0) {
        return issues.map((issue: { created_at?: string; body?: string; title: string }) => {
          const dateStr = issue.created_at;
          const formattedDate = dateStr
            ? new Date(dateStr).toISOString().split("T")[0]
            : "Recent";

          return {
            date: formattedDate,
            body: issue.body?.trim() || issue.title,
          };
        });
      }
    }
  } catch (error) {
    console.warn("Failed to fetch notes from GitHub Issues, using static fallback:", error);
  }

  return fallbackNotes;
}
