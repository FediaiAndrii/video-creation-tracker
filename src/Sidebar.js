import { useState } from "react";
import { getCurrentStageLabel } from "./Stage";
import { Button } from "./Button";

export function ProjectList({ projects, selectedProjectId, onSelection }) {
  return (
    <ul>
      {projects.map(project => (
        <Project
          project={project}
          key={project.id}
          selectedProjectId={selectedProjectId}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}
function Project({ project, selectedProjectId, onSelection }) {
  const isSelected = selectedProjectId === project.id;

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
export function FormAddProject({ onAddProject }) {
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
        idea: { tasks: [] },
        shoot: { tasks: [] },
        edit: { tasks: [] },
        publish: { tasks: [] },
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
