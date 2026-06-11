import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiPython,
  SiPytorch,
  SiMediapipe,
  SiNumpy,
  SiPandas,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiCplusplus,
  SiJavascript,
  SiC,
} from "react-icons/si";
import { TbApi, TbBrandVscode } from "react-icons/tb";

export type SkillNode = {
  name: string;
  icon: IconType;
  /** 0–1, rendered as the ring fill around the node */
  level: number;
  /** percent coordinates on the constellation canvas */
  x: number;
  y: number;
};

export type SkillCluster = {
  category: string;
  /** hub point the cluster's nodes connect to */
  hub: { x: number; y: number };
  color: string;
  nodes: SkillNode[];
};

export const skillClusters: SkillCluster[] = [
  {
    category: "Frontend",
    hub: { x: 16, y: 25 },
    color: "#6C63FF",
    nodes: [
      { name: "HTML/CSS", icon: SiHtml5, level: 0.95, x: 5, y: 13 },
      { name: "React", icon: SiReact, level: 0.9, x: 17, y: 7 },
      { name: "Next.js", icon: SiNextdotjs, level: 0.85, x: 28, y: 14 },
      { name: "TypeScript", icon: SiTypescript, level: 0.8, x: 29, y: 32 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 0.9, x: 9, y: 39 },
    ],
  },
  {
    category: "Backend",
    hub: { x: 49, y: 17 },
    color: "#00D4FF",
    nodes: [
      { name: "Node.js", icon: SiNodedotjs, level: 0.85, x: 39, y: 6 },
      { name: "Express", icon: SiExpress, level: 0.85, x: 57, y: 5 },
      { name: "FastAPI", icon: SiFastapi, level: 0.7, x: 62, y: 22 },
      { name: "REST APIs", icon: TbApi, level: 0.9, x: 41, y: 30 },
    ],
  },
  {
    category: "ML / AI",
    hub: { x: 83, y: 26 },
    color: "#E8A87C",
    nodes: [
      { name: "Python", icon: SiPython, level: 0.9, x: 72, y: 12 },
      { name: "PyTorch", icon: SiPytorch, level: 0.75, x: 87, y: 8 },
      { name: "NumPy", icon: SiNumpy, level: 0.85, x: 96, y: 24 },
      { name: "Pandas", icon: SiPandas, level: 0.85, x: 87, y: 44 },
      { name: "MediaPipe", icon: SiMediapipe, level: 0.7, x: 71, y: 38 },
    ],
  },
  {
    category: "Databases",
    hub: { x: 24, y: 68 },
    color: "#00D4FF",
    nodes: [
      { name: "MongoDB", icon: SiMongodb, level: 0.85, x: 14, y: 57 },
      { name: "MySQL", icon: SiMysql, level: 0.7, x: 31, y: 79 },
    ],
  },
  {
    category: "Languages",
    hub: { x: 54, y: 64 },
    color: "#6C63FF",
    nodes: [
      { name: "C++", icon: SiCplusplus, level: 0.85, x: 45, y: 54 },
      { name: "JavaScript", icon: SiJavascript, level: 0.9, x: 64, y: 55 },
      { name: "C", icon: SiC, level: 0.7, x: 47, y: 77 },
    ],
  },
  {
    category: "DevOps / Tools",
    hub: { x: 82, y: 71 },
    color: "#E8A87C",
    nodes: [
      { name: "Git", icon: SiGit, level: 0.9, x: 74, y: 59 },
      { name: "GitHub", icon: SiGithub, level: 0.9, x: 92, y: 61 },
      { name: "Docker", icon: SiDocker, level: 0.55, x: 93, y: 80 },
      { name: "Linux", icon: SiLinux, level: 0.7, x: 78, y: 88 },
      { name: "VS Code", icon: TbBrandVscode, level: 0.9, x: 65, y: 87 },
    ],
  },
];

/** Faint lines between cluster hubs — the constellation's larger structure */
export const interClusterLinks: [number, number][] = [
  [0, 1], // Frontend ↔ Backend
  [1, 2], // Backend ↔ ML
  [1, 3], // Backend ↔ Databases
  [4, 2], // Languages ↔ ML
  [4, 0], // Languages ↔ Frontend
  [5, 1], // DevOps ↔ Backend
  [4, 5], // Languages ↔ DevOps
];
