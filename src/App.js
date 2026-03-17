import { useState } from "react";

const initialProjects = [
  {
    id: 118836,
    name: "Art Hiking",
    image: "https://picsum.photos/id/981/200",
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
    image: "https://picsum.photos/id/655/200",
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
    image: "https://picsum.photos/id/686/200",
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
    ([_, status]) => status === false,
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

function FormAddProject({ onAddProject }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://picsum.photos/200");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newProject = {
      id,
      name,
      image: `${image}?=${id}`,
      format: "FORMAT",
      type: "TYPE",
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
      <Button>Add</Button>
    </form>
  );
}
