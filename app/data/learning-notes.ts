export interface LearningNote {
  date: string;
  body: string;
}

export const learningNotes: LearningNote[] = [
  {
    date: "2026-08-28",
    body: "RAG quality is an eval problem, not a prompt problem. Build the eval set before touching the retriever.",
  },
  {
    date: "2026-08-19",
    body: "Agent tools should fail loudly and return structured errors — the model recovers far better than from a stack trace.",
  },
  {
    date: "2026-08-05",
    body: "Prompt caching changes how you structure a long system prompt: stable prefix, volatile suffix.",
  },
  {
    date: "2026-07-22",
    body: "Streaming isn't a UI nicety. It resets the perceived latency budget for the whole request.",
  },
  {
    date: "2026-07-10",
    body: "Trace every model call. You cannot debug what you cannot replay.",
  },
];
