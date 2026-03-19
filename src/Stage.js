import { stageLabels } from "./data";

export function getCurrentStageLabel(project) {
  const activeStageEntry = Object.entries(project.stages).find(
    ([_, stage]) => !checkIsStageCompleted(stage),
  );
  return activeStageEntry ? stageLabels[activeStageEntry[0]] : "Done";
}

export function checkIsStageCompleted(stageObj) {
  if (stageObj.tasks.length === 0) return false;
  return stageObj.tasks.every(task => task.done === true);
}
