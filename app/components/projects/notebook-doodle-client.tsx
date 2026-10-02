"use client";

import dynamic from "next/dynamic";

const NotebookDoodle = dynamic(
  () =>
    import("./notebook-doodle").then(
      (m) => m.NotebookDoodle,
    ),
  { ssr: false },
);

export function NotebookDoodleClient() {
  return <NotebookDoodle />;
}
