import { useState } from "react";
import { initialProjects } from "./data";
import { Button } from "./Button";
import { ProjectList, FormAddProject } from "./Sidebar";
import { ProjectRoadmap } from "./Roadmap";

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

  function handleDeleteProject(projectId) {
    setProjects(projects =>
      projects.filter(project => project.id !== projectId),
    );

    setSelectedProjectId(null);
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
          key={selectedProject.id}
          project={selectedProject}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onDeleteProject={handleDeleteProject}
        />
      )}
    </div>
  );
}
