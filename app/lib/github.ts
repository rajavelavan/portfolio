import { execSync } from "child_process";

export async function getLastCommitDate(): Promise<string> {
  const repo = process.env.GITHUB_REPO || "rajavelavan/portfolio";
  const token = process.env.GITHUB_TOKEN;

  // 1. Try GitHub API
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-app",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/repos/${repo}/commits/main`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const dateStr = data.commit?.committer?.date || data.commit?.author?.date;
      if (dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
      }
    }
  } catch (error) {
    console.warn("Failed to fetch commit date from GitHub API, falling back to git/cache:", error);
  }

  // 2. Fallback: Git CLI (useful during local development or build time)
  try {
    const gitDate = execSync(
      'git log -1 --format="%cd" --date=format:"%b %d, %Y" origin/main 2>/dev/null || git log -1 --format="%cd" --date=format:"%b %d, %Y" 2>/dev/null'
    )
      .toString()
      .trim();

    if (gitDate) {
      return gitDate;
    }
  } catch {
    // Ignore git command failure in environments without git
  }

  // 3. Fallback default
  return "Today";
}
