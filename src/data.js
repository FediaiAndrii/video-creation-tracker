export const initialProjects = [
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
export const stageLabels = {
  idea: "Planning",
  shoot: "Shooting",
  edit: "Editing",
  publish: "Publishing",
};
