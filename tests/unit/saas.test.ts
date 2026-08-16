import { describe, expect, it } from "vitest";
import {
  createSeedProjects,
  createTask,
  projectStats,
  toggleTask,
} from "../../lib/demo/saas";

describe("saas validation sprint", () => {
  it("seeds deterministic projects", () => {
    const projects = createSeedProjects();
    expect(projects).toEqual(createSeedProjects());
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it("computes project stats", () => {
    const projects = createSeedProjects();
    const stats = projectStats(projects[0]);
    expect(stats.total).toBe(3);
    expect(stats.done).toBe(2);
    expect(stats.pct).toBe(67);
  });

  it("creates and toggles tasks", () => {
    const projects = createSeedProjects();
    const task = createTask(projects[0], "Ship demo");
    expect(task.status).toBe("todo");
    expect(toggleTask(task).status).toBe("done");
    expect(toggleTask(toggleTask(task)).status).toBe("todo");
  });
});