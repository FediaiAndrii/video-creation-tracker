import { useState } from "react";
import { initialProjects } from "./data";
import { Button } from "./Button";
import { ProjectList, FormAddProject } from "./Sidebar";
import { ProjectRoadmap } from "./Roadmap";
import { checkIsStageCompleted } from "./Stage";

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);

  const selectedProject = projects.find(
    project => project.id === selectedProjectId,
  );

  function handleSelection(project) {
    setSelectedProjectId(cur => (cur === project.id ? null : project.id));
  }

  function handleShowAddProject() {
    setShowAddProject(show => !show);
  }

  function handleAddProject(project) {
    setProjects(projects => [...projects, project]);
    setShowAddProject(false);
  }

  function handleAddTask(projectId, stageKey, newTask) {
    setProjects(currentProjects =>
      currentProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            stages: {
              ...project.stages,
              [stageKey]: {
                ...project.stages[stageKey],
                tasks: [...project.stages[stageKey].tasks, newTask],
              },
            },
          };
        }
        return project;
      }),
    );
  }

  function handleToggleTask(projectId, stageKey, taskId) {
    setProjects(currentProjects =>
      currentProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            stages: {
              ...project.stages,
              [stageKey]: {
                ...project.stages[stageKey],
                tasks: project.stages[stageKey].tasks.map(task =>
                  task.id === taskId ? { ...task, done: !task.done } : task,
                ),
              },
            },
          };
        }
        return project;
      }),
    );
  }

  function handleDeleteTask(projectId, stageKey, taskId) {
    setProjects(currentProjects =>
      currentProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            stages: {
              ...project.stages,
              [stageKey]: {
                ...project.stages[stageKey],
                tasks: project.stages[stageKey].tasks.filter(
                  task => task.id !== taskId,
                ),
              },
            },
          };
        }
        return project;
      }),
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ProjectList
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelection={handleSelection}
        />

        {showAddProject && <FormAddProject onAddProject={handleAddProject} />}
        <Button onClick={handleShowAddProject}>
          {showAddProject ? "Close" : "Add project"}
        </Button>
      </div>
      {selectedProject && (
        <ProjectRoadmap
          project={selectedProject}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}

export function RoadmapStages({
  project,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) {
  const stagesArray = Object.entries(project.stages);
  return (
    <div className="roadmap-stages">
      {stagesArray.map(stage => (
        <Stage
          key={stage[0]}
          stage={stage}
          onAddTask={onAddTask}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          projectId={project.id}
        />
      ))}
    </div>
  );
}

function Stage({ stage, onAddTask, onToggleTask, onDeleteTask, projectId }) {
  const [stageKey, stageObj] = stage;
  const [isOpen, setIsOpen] = useState(false);

  const isCompleted = checkIsStageCompleted(stageObj);

  function handleToggle() {
    setIsOpen(show => !show);
  }

  return (
    <div className="stage-container">
      <div className="roadmap-stage" onClick={handleToggle}>
        <span className="roadmap-stage__name">{stageKey}</span>
        <div className="stage-toggle">
          <span>{isOpen ? "-" : "+"}</span>
        </div>
        <span
          className={`roadmap-stage__status ${isCompleted ? "completed" : ""}`}
        >
          {isCompleted ? "Done" : "In process"}
        </span>
      </div>
      {isOpen && (
        <div className="stage-tasks">
          <StageTasksList
            tasks={stageObj.tasks}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            projectId={projectId}
            stageKey={stageKey}
          />
          <StageTaskForm
            onAddTask={onAddTask}
            projectId={projectId}
            stageKey={stageKey}
          />
        </div>
      )}
    </div>
  );
}

function StageTaskForm({ onAddTask, projectId, stageKey }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;
    const newTask = { id: crypto.randomUUID(), text: task, done: false };

    onAddTask(projectId, stageKey, newTask);

    setTask("");
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Write your task"
      ></input>
      <button className="button">Add</button>
    </form>
  );
}

function StageTasksList({
  tasks,
  projectId,
  onToggleTask,
  onDeleteTask,
  stageKey,
}) {
  return (
    <ul className="tasks-list">
      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggleTask(projectId, stageKey, task.id)}
          />
          <span>{task.text}</span>
          <button onClick={() => onDeleteTask(projectId, stageKey, task.id)}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}
