import { RoadmapStages } from "./Stage";
import { getCurrentStageLabel } from "./Stage";
import { checkIsStageCompleted } from "./Stage";
import { stageLabels } from "./data";

export function ProjectRoadmap({
  project,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteProject,
}) {
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
      <div style={{ alignSelf: "flex-end" }}>
        <button
          className="button button-delete"
          onClick={() => onDeleteProject(project.id)}
        >
          Delete
        </button>
      </div>
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
