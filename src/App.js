import { useState } from "react";

const initialProjects = [
  {
    id: 118836,
    name: "Art Hiking",
    image: "https://picsum.photos/id/981/200",
    resolution: "16:9",
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
    image: "https://picsum.photos/id/655/200",
    resolution: "4:3",
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
    image: "https://picsum.photos/id/686/200",
    resolution: "4:5",
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

function getCurrentStageLabel(project) {
  const activeStageEntry = Object.entries(project.stages).find(
    ([_, status]) => status === false,
  );
  return activeStageEntry ? stageLabels[activeStageEntry[0]] : "Done";
}

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
  const [showAddProject, setShowAddProject] = useState(false);

  function handleSelection(project) {
    setSelectedProject(cur => (cur?.id === project.id ? null : project));
  }

  function handleShowAddProject() {
    setShowAddProject(show => !show);
  }

  function handleAddProject(project) {
    setProjects(projects => [...projects, project]);
    setShowAddProject(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          onSelection={handleSelection}
        />

        {showAddProject && <FormAddProject onAddProject={handleAddProject} />}
        <Button onClick={handleShowAddProject}>
          {showAddProject ? "Close" : "Add project"}
        </Button>
      </div>
      {selectedProject && <ProjectRoadmap project={selectedProject} />}
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

  const currentStage = getCurrentStageLabel(project);

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

function FormAddProject({ onAddProject }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://picsum.photos/200");
  const [resolution, setResolution] = useState("16:9");
  const [type, setType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newProject = {
      id,
      name,
      image: `${image}?=${id}`,
      resolution: resolution,
      type: type,
      stages: {
        idea: false,
        shoot: false,
        edit: false,
        publish: false,
      },
    };
    onAddProject(newProject);

    setName("");
    setImage("https://picsum.photos/200");
  }

  return (
    <form className="form-add-project" onSubmit={handleSubmit}>
      <label>📝Project</label>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label>📷Image URL</label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <label>🎞Resolution</label>
      <select value={resolution} onChange={e => setResolution(e.target.value)}>
        <option value="16 : 9">16 : 9</option>
        <option value="4 : 3">4 : 3</option>
        <option value="1 : 1">1 : 1</option>
        <option value="4 : 5">4 : 5</option>
        <option value="9 : 16">9 : 16</option>
      </select>

      <label>🤳Type</label>
      <input
        type="text"
        placeholder="vlog / animation / ..."
        value={type}
        onChange={e => setType(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function ProjectRoadmap({ project }) {
  return (
    <div className="project-roadmap">
      <RoadmapHeader project={project} />
      <RoadmapProgress stages={project.stages} />
      <RoadmapStages project={project} />
    </div>
  );
}

function RoadmapHeader({ project }) {
  const currentStage = getCurrentStageLabel(project);
  return (
    <header className="roadmap-header">
      <div className="roadmap-info">
        <label>Project name</label>
        <h2>{project.name}</h2>

        <label>Resolution</label>
        <p>{project.resolution}</p>

        <label>Type</label>
        <p>{project.type}</p>

        <label>Stage</label>
        <p>{currentStage}</p>
      </div>
      <div className="roadmap-media">
        <img src={project.image} alt={project.name}></img>
      </div>
    </header>
  );
}

function RoadmapProgress({ stages }) {
  const stagesArray = Object.entries(stages);

  return (
    <div className="roadmap-progress-bar">
      {stagesArray.map(([stageKey, isComplited]) => (
        <div
          key={stageKey}
          className={`stage-segment ${isComplited ? "completed" : ""}`}
        >
          {stageLabels[stageKey]}
        </div>
      ))}
    </div>
  );
}

function RoadmapStages({ project }) {
  const stagesArray = Object.entries(project.stages);
  return (
    <div className="roadmap-stages">
      {stagesArray.map(stage => (
        <Stage key={stage[0]} stage={stage} />
      ))}
    </div>
  );
}

function Stage({ stage }) {
  const [stageKey, stageValue] = stage;
  return (
    <div className="roadmap-stage">
      <h3 className="roadmap-stage__name">{stageKey}</h3>
      <span
        className={`roadmap-stage__status ${stageValue ? "completed" : ""}`}
      >
        {stageValue ? "Done" : "In process"}
      </span>
    </div>
  );
}
