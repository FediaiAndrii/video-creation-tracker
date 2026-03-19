import { useState } from "react";

const initialProjects = [
  {
    id: 118836,
    name: "Art Hiking",
    image: "https://picsum.photos/id/981/200",
    resolution: "16:9",
    type: "Vlog",
    stages: {
      idea: {
        tasks: [
          { id: 1, text: "Film sketchbook in mountains", done: true },
          { id: 2, text: "Record nature sounds", done: true },
          { id: 3, text: "Record my speach", done: true },
        ],
      },
      shoot: {
        tasks: [
          { id: 4, text: "Film sketchbook opening", done: true },
          { id: 5, text: "Film B roll", done: true },
          { id: 6, text: "Film forest and mountains", done: true },
        ],
      },
      edit: {
        tasks: [
          { id: 7, text: "Video cutting", done: true },
          { id: 8, text: "Sounds added", done: false },
          { id: 9, text: "Video rendered", done: false },
        ],
      },
      publish: {
        tasks: [
          { id: 10, text: "Choose social media", done: false },
          { id: 11, text: "Write description", done: false },
          { id: 12, text: "cklickbait?", done: false },
        ],
      },
    },
  },
  {
    id: 933372,
    name: "Selfcare sport",
    image: "https://picsum.photos/id/655/200",
    resolution: "4:3",
    type: "Timelaps",
    stages: {
      idea: {
        tasks: [
          { id: 1, text: "Film sketchbook in mountains", done: true },
          { id: 2, text: "Record nature sounds", done: true },
          { id: 3, text: "Record my speach", done: true },
        ],
      },
      shoot: {
        tasks: [
          { id: 4, text: "Film sketchbook opening", done: true },
          { id: 5, text: "Film B roll", done: true },
          { id: 6, text: "Film forest and mountains", done: true },
        ],
      },
      edit: {
        tasks: [
          { id: 7, text: "Video cutting", done: true },
          { id: 8, text: "Sounds added", done: true },
          { id: 9, text: "Video rendered", done: true },
        ],
      },
      publish: {
        tasks: [
          { id: 10, text: "Choose social media", done: true },
          { id: 11, text: "Write description", done: false },
          { id: 12, text: "cklickbait?", done: false },
        ],
      },
    },
  },
  {
    id: 499476,
    name: "Life design",
    image: "https://picsum.photos/id/686/200",
    resolution: "4:5",
    type: "Vlog",
    stages: {
      idea: {
        tasks: [
          { id: 1, text: "Film sketchbook in mountains", done: true },
          { id: 2, text: "Record nature sounds", done: true },
          { id: 3, text: "Record my speach", done: true },
        ],
      },
      shoot: {
        tasks: [
          { id: 4, text: "Film sketchbook opening", done: true },
          { id: 5, text: "Film B roll", done: true },
          { id: 6, text: "Film forest and mountains", done: false },
        ],
      },
      edit: {
        tasks: [
          { id: 7, text: "Video cutting", done: false },
          { id: 8, text: "Sounds added", done: false },
          { id: 9, text: "Video rendered", done: false },
        ],
      },
      publish: {
        tasks: [
          { id: 10, text: "Choose social media", done: false },
          { id: 11, text: "Write description", done: false },
          { id: 12, text: "cklickbait?", done: false },
        ],
      },
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
    ([_, stage]) => !checkIsStageCompleted(stage),
  );
  return activeStageEntry ? stageLabels[activeStageEntry[0]] : "Done";
}

function checkIsStageCompleted(stageObj) {
  if (stageObj.tasks.length === 0) return false;
  return stageObj.tasks.every(task => task.done === true);
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

function ProjectList({ projects, selectedProjectId, onSelection }) {
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

function ProjectRoadmap({ project, onAddTask, onToggleTask, onDeleteTask }) {
  return (
    <div className="project-roadmap">
      <RoadmapHeader project={project} />
      <RoadmapProgress stages={project.stages} />
      <RoadmapStages
        project={project}
        onAddTask={onAddTask}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
      />
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
      {stagesArray.map(([stageKey, stageObj]) => {
        const isCompleted = checkIsStageCompleted(stageObj);
        return (
          <div
            key={stageKey}
            className={`stage-segment ${isCompleted ? "completed" : ""}`}
          >
            {stageLabels[stageKey]}
          </div>
        );
      })}
    </div>
  );
}

function RoadmapStages({ project, onAddTask, onToggleTask, onDeleteTask }) {
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
