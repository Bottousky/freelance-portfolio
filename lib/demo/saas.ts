/**
 * Deterministic mock data and workflow helpers for the SaaS Validation Sprint demo.
 * Pure functions only — no DOM, no network, no randomness.
 */

export type TaskStatus = "todo" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export interface ProjectStats {
  total: number;
  done: number;
  pct: number;
}

export function createSeedProjects(): Project[] {
  return [
    {
      id: "p1",
      name: "Launch checklist",
      tasks: [
        { id: "t1", title: "Write landing copy", status: "done", createdAt: "2026-08-10" },
        { id: "t2", title: "Set up analytics events", status: "done", createdAt: "2026-08-11" },
        { id: "t3", title: "Record demo walkthrough", status: "todo", createdAt: "2026-08-14" },
      ],
    },
    {
      id: "p2",
      name: "Waitlist onboarding",
      tasks: [{ id: "t4", title: "Draft welcome email", status: "todo", createdAt: "2026-08-15" }],
    },
    {
      id: "p3",
      name: "Empty project",
      tasks: [],
    },
  ];
}

export function createTask(project: Project, title: string): Task {
  return {
    id: `t-${project.id}-${project.tasks.length + 1}`,
    title,
    status: "todo",
    createdAt: "2026-08-16",
  };
}

export function toggleTask(task: Task): Task {
  return { ...task, status: task.status === "todo" ? "done" : "todo" };
}

export function projectStats(project: Project): ProjectStats {
  const total = project.tasks.length;
  const done = project.tasks.filter((task) => task.status === "done").length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, pct };
}