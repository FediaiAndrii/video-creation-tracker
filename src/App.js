import { useState } from "react";

const initialProjects = [
  {
    id: 118836,
    name: "Art Hiking",
    image: "https://i.pravatar.cc/48?u=118836",
    format: "16:9",
    type: "Vlog",
    stages: {
      idea: true,
      shoot: true,
      edit: true,
      publish: false,
    },
  },
  {
    id: 933372,
    name: "Selfcare sport",
    image: "https://i.pravatar.cc/48?u=933372",
    format: "4:3",
    type: "Timelaps",
    stages: {
      idea: true,
      shoot: false,
      edit: false,
      publish: false,
    },
  },
  {
    id: 499476,
    name: "Life design",
    image: "https://i.pravatar.cc/48?u=499476",
    format: "4:5",
    type: "Vlog",
    stages: {
      idea: true,
      shoot: true,
      edit: false,
      publish: false,
    },
  },
];

const stageLabels = {
  idea: "Planning",
  shoot: "Shooting",
  edit: "Editing",
  publish: "Publishing",
};

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);

  function handleSelection(project) {
    setSelectedProject(cur => (cur?.id === project.id ? null : project));
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          onSelection={handleSelection}
        />
      </div>
    </div>
  );
}

function ProjectList({ projects, selectedProject, onSelection }) {
  return (
    <ul>
      {projects.map(project => (
        <Project
          project={project}
          key={project.id}
          selectedProject={selectedProject}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Project({ project, selectedProject, onSelection }) {
  const isSelected = selectedProject?.id === project.id;
  const activeStageEntry = Object.entries(project.stages).find(
    ([key, status]) => status === false,
  );

  const currentStage = activeStageEntry
    ? stageLabels[activeStageEntry[0]]
    : "Done";

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={project.image} alt={project.name}></img>
      <h3>{project.name}</h3>
      <p>{currentStage}</p>
      <Button onClick={() => onSelection(project)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
