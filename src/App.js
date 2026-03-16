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
      color: true,
      published: false,
    },
  },
  {
    id: 933372,
    name: "Selfcare sport",
    image: "https://i.pravatar.cc/48?u=933372",
    format: "4:3",
    type: "Animation",
    stages: {
      idea: true,
      shoot: false,
      edit: false,
      color: false,
      published: false,
    },
  },
  {
    id: 499476,
    name: "Life design",
    image: "https://i.pravatar.cc/48?u=499476",
    format: "4:5",
    type: "Timelaps",
    stages: {
      idea: true,
      shoot: true,
      edit: false,
      color: false,
      published: false,
    },
  },
];

export default function App() {
  const [projects, setProjects] = useState(initialProjects);

  return (
    <div className="app">
      <div className="sidebar"></div>
    </div>
  );
}
