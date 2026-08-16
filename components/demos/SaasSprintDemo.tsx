"use client";

import { useEffect, useState } from "react";
import {
  createSeedProjects,
  createTask,
  projectStats,
  toggleTask,
  type Project,
} from "@/lib/demo/saas";

type Phase = "idle" | "saving" | "saved" | "error";

const SAVE_MS = 600;
const SUCCESS_MS = 2600;

export function SaasSprintDemo() {
  const [projects, setProjects] = useState<Project[]>(() => createSeedProjects());
  const [activeId, setActiveId] = useState(projects[0].id);
  const [newTitle, setNewTitle] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (phase !== "saved") return;
    const timer = window.setTimeout(() => setPhase("idle"), SUCCESS_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const active = projects.find((project) => project.id === activeId) ?? projects[0];
  const stats = projectStats(active);

  function handleAddTask() {
    const title = newTitle.trim();
    if (!title) {
      setErrorMsg("Task title is required.");
      setPhase("error");
      return;
    }
    setErrorMsg("");
    setPhase("saving");
    window.setTimeout(() => {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === activeId
            ? { ...project, tasks: [...project.tasks, createTask(project, title)] }
            : project,
        ),
      );
      setNewTitle("");
      setPhase("saved");
    }, SAVE_MS);
  }

  function handleToggle(taskId: string) {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeId
          ? { ...project, tasks: project.tasks.map((task) => (task.id === taskId ? toggleTask(task) : task)) }
          : project,
      ),
    );
  }

  return (
    <div className="demoResult">
      <section className="demoPanel">
        <p className="kicker">DASHBOARD</p>
        <h3>{active.name}</h3>
        <div className="saasStats">
          <div className="saasStat">
            <strong>{stats.total}</strong>
            <span>Tasks</span>
          </div>
          <div className="saasStat">
            <strong>{stats.done}</strong>
            <span>Done</span>
          </div>
          <div className="saasStat">
            <strong>{stats.pct}%</strong>
            <span>Complete</span>
          </div>
        </div>

        <div className="saasTabs" role="tablist" aria-label="Projects">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={project.id === activeId}
              className={project.id === activeId ? "saasTab active" : "saasTab"}
              onClick={() => setActiveId(project.id)}
            >
              {project.name}
            </button>
          ))}
        </div>

        {active.tasks.length === 0 ? (
          <div className="emptyState">
            <strong>No tasks yet</strong>
            <span>This project is empty. Add the first task below to start the workflow.</span>
          </div>
        ) : (
          <div className="taskList">
            {active.tasks.map((task) => (
              <div key={task.id} className={task.status === "done" ? "taskRow done" : "taskRow"}>
                <input
                  type="checkbox"
                  checked={task.status === "done"}
                  onChange={() => handleToggle(task.id)}
                  aria-label={`Mark "${task.title}" as ${task.status === "done" ? "not done" : "done"}`}
                />
                <span>{task.title}</span>
                <span className={`taskStatus ${task.status}`}>{task.status}</span>
              </div>
            ))}
          </div>
        )}

        <div className="addTaskForm">
          <input
            className="demoInput"
            type="text"
            placeholder="Add a task, e.g. Send onboarding email"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleAddTask();
            }}
            aria-label="New task title"
          />
          <button
            type="button"
            className="button primary"
            onClick={handleAddTask}
            disabled={phase === "saving"}
          >
            {phase === "saving" ? "Saving…" : "Add task"}
          </button>
        </div>

        {phase === "error" && (
          <p className="formError" role="alert">
            {errorMsg}
          </p>
        )}
        {phase === "saved" && (
          <p className="formSuccess" role="status">
            Task added — deterministic demo data, no backend involved.
          </p>
        )}
      </section>
    </div>
  );
}