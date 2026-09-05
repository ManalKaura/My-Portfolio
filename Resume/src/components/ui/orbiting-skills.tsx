import React, { useEffect, useState, memo } from "react";
import { cn } from "@/lib/utils";
import { Code2, Gamepad2, Smartphone, Binary } from "lucide-react";

// --- Type Definitions ---
export type TechIconType =
  | "cpp"
  | "c"
  | "csharp"
  | "kotlin"
  | "python"
  | "unity"
  | "procedural"
  | "perf3d"
  | "blender"
  | "android"
  | "compose"
  | "material"
  | "react"
  | "tailwind"
  | "typescript"
  | "github";

export type OrbitGlowColor = "orange" | "cyan" | "purple" | "emerald" | "amber" | "blue";

export interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: TechIconType;
  phaseShift: number;
  glowColor: OrbitGlowColor;
  label: string;
  domain: string;
  competency: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
  scaleFactor: number;
  isSelected?: boolean;
  onSelect?: (config: SkillConfig) => void;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: OrbitGlowColor;
  animationDelay?: number;
  domainLabel?: string;
  scaleFactor: number;
}

// --- Tech Stack Vector SVG Icon Components ---
const techIconMap: Record<
  TechIconType,
  { component: () => React.JSX.Element; color: string; bgGlow: string }
> = {
  cpp: {
    color: "#00599C",
    bgGlow: "rgba(0, 89, 156, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M22.394 6.744l-2.42-1.398a1.2 1.2 0 00-1.2 0l-2.42 1.398a1.206 1.206 0 00-.603 1.043v2.796c0 .432.23.83.603 1.043l2.42 1.398a1.2 1.2 0 001.2 0l2.42-1.398a1.206 1.206 0 00.603-1.043V7.787a1.206 1.206 0 00-.603-1.043zm-2.02 3.84l-1.003.578-1.002-.578v-1.16l1.002-.578 1.003.578v1.16zm-7.23-7.585L1.583 9.424a2.41 2.41 0 000 4.172l11.56 6.425c1.3.722 2.9-.217 2.9-1.702V4.701c0-1.485-1.6-2.424-2.9-1.702zm.5 14.52l-9.16-5.092a.6.6 0 010-1.043l9.16-5.092v11.227z" fill="#00599C" />
      </svg>
    ),
  },
  c: {
    color: "#A8B9CC",
    bgGlow: "rgba(168, 185, 204, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7 3.6 16.8V7.1L12 2.3zm-1.2 5.4c-2.8 0-4.9 2.1-4.9 4.9s2.1 4.9 4.9 4.9c1.8 0 3.2-.8 4.1-2.1l-1.8-1.3c-.6.8-1.4 1.3-2.3 1.3-1.6 0-2.8-1.2-2.8-2.8s1.2-2.8 2.8-2.8c.9 0 1.7.5 2.3 1.3l1.8-1.3c-.9-1.3-2.3-2.1-4.1-2.1z" fill="#659AD2" />
      </svg>
    ),
  },
  csharp: {
    color: "#9B4993",
    bgGlow: "rgba(155, 73, 147, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7 3.6 16.8V7.1L12 2.3zm-1.8 5.4c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3c1.4 0 2.6-.6 3.4-1.6l-1.5-1.2c-.5.6-1.2 1-1.9 1-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c.7 0 1.4.3 1.9 1l1.5-1.2c-.8-1-2-1.6-3.4-1.6zm6.8 2.3h-1v1.6h1v-1.6zm2 0h-1v1.6h1v-1.6zm-2 2.6h-1v1.6h1v-1.6zm2 0h-1v1.6h1v-1.6z" fill="#9B4993" />
      </svg>
    ),
  },
  kotlin: {
    color: "#7F52FF",
    bgGlow: "rgba(127, 82, 255, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24 24H0V0h24L12 12Z" fill="url(#kotlin-gradient-orbit)" />
        <defs>
          <linearGradient id="kotlin-gradient-orbit" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F52FF" />
            <stop offset="50%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#E44857" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  python: {
    color: "#3776AB",
    bgGlow: "rgba(55, 118, 171, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.9 1.1c-4.4 0-4.1 1.9-4.1 1.9v2h4.2v.6H6.1S3.4 5.3 3.4 9.7c0 4.3 2.4 4.2 2.4 4.2h1.4v-2c0-2.3 2-2.3 2-2.3h4.2c2 0 2-2 2-2V3.7s.4-2.6-3.5-2.6zm-2.3 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm2.4 20.5c4.4 0 4.1-1.9 4.1-1.9v-2h-4.2v-.6h5.9s2.7.3 2.7-4.1c0-4.3-2.4-4.2-2.4-4.2h-1.4v2c0 2.3-2 2.3-2 2.3h-4.2c-2 0-2 2-2 2v3.9s-.4 2.6 3.5 2.6zm2.3-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#3776AB" />
      </svg>
    ),
  },
  unity: {
    color: "#FFFFFF",
    bgGlow: "rgba(255, 255, 255, 0.35)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M10.4 17.5L5.7 20.2c-.3.2-.8 0-.8-.4v-5.4c0-.2.1-.4.3-.5l4.7-2.7c.4-.2.9.1.9.5v5.3c0 .2-.2.4-.4.5zm3.2 0c-.2-.1-.4-.3-.4-.5v-5.3c0-.4.5-.7.9-.5l4.7 2.7c.2.1.3.3.3.5v5.4c0 .4-.5.6-.8.4l-4.7-2.7zm-1.6-7.8L7.3 7c-.2-.1-.3-.3-.3-.5V1.1c0-.4.5-.6.8-.4l4.7 2.7c.4.2.4.8 0 1l-4.7 2.7v2.6zm3.2-1.9l4.7-2.7c.3-.2.8 0 .8.4v5.4c0 .2-.1.4-.3.5l-4.7 2.7c-.4.2-.9-.1-.9-.5V8.3c0-.2.2-.4.4-.5zm-6.4 0c.2.1.4.3.4.5v5.3c0 .4-.5.7-.9.5L3.6 11.2c-.2-.1-.3-.3-.3-.5V5.3c0-.4.5-.6.8-.4l4.7 2.7z" fill="#FFFFFF" />
      </svg>
    ),
  },
  procedural: {
    color: "#F59E0B",
    bgGlow: "rgba(245, 158, 11, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-amber-400">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <circle cx="12" cy="12" r="3" fill="#F59E0B" fillOpacity="0.3" />
      </svg>
    ),
  },
  perf3d: {
    color: "#EC4899",
    bgGlow: "rgba(236, 72, 153, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-pink-400">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  blender: {
    color: "#E87D0D",
    bgGlow: "rgba(232, 125, 13, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.9 8.2a4.4 4.4 0 00-4.3 4.4c0 2.4 2 4.4 4.3 4.4 2.4 0 4.4-2 4.4-4.4s-2-4.4-4.4-4.4zm0 6.6a2.2 2.2 0 110-4.4 2.2 2.2 0 010 4.4zM22.5 10l-7.7-1.4 1.4-4.6c.2-.6-.2-1.2-.8-1.4-.6-.2-1.2.2-1.4.8L12.6 8 8 3.4c-.4-.4-1.1-.4-1.6 0-.4.4-.4 1.1 0 1.6l4.6 4.6L1.5 12c-.6.2-1 .8-.8 1.4.2.6.8 1 1.4.8l9.6-2.4c.5 1.3 1.4 2.4 2.6 3.1l-2.7 7.7c-.2.6.1 1.3.7 1.5.6.2 1.3-.1 1.5-.7l2.8-7.7c1.3.2 2.6 0 3.8-.7 2.1-1.3 3.3-3.6 3.1-6-.1-1.3-.8-2.6-1.8-3.5L22.5 10z" fill="#E87D0D" />
      </svg>
    ),
  },
  android: {
    color: "#3DDC84",
    bgGlow: "rgba(61, 220, 132, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17.5 8.7l1.7-2.9a.6.6 0 00-.2-.8.6.6 0 00-.8.2l-1.8 3c-1.3-.6-2.8-.9-4.4-.9s-3.1.3-4.4.9l-1.8-3a.6.6 0 00-.8-.2.6.6 0 00-.2.8l1.7 2.9C3.7 10.4 2 13 2 16h20c0-3-1.7-5.6-4.5-7.3zM7.5 13.5a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm9 0a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM4 17.5h16v4H4z" fill="#3DDC84" />
      </svg>
    ),
  },
  compose: {
    color: "#4285F4",
    bgGlow: "rgba(66, 133, 244, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M19.5 7.5L12 3 4.5 7.5 12 12l7.5-4.5zm-15 3.5v6l7.5 4.5v-6L4.5 11zm15 0l-7.5 4.5v6l7.5-4.5v-6z" fill="#4285F4" />
      </svg>
    ),
  },
  material: {
    color: "#7C4DFF",
    bgGlow: "rgba(124, 77, 255, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.5 19.5 7 12 10.5zm0 4.5l-8-4v6l8 4 8-4v-6l-8 4z" fill="#7C4DFF" />
      </svg>
    ),
  },
  react: {
    color: "#61DAFB",
    bgGlow: "rgba(97, 218, 251, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  tailwind: {
    color: "#06B6D4",
    bgGlow: "rgba(6, 182, 212, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4" />
      </svg>
    ),
  },
  typescript: {
    color: "#3178C6",
    bgGlow: "rgba(49, 120, 198, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.9 21.6L12 24l-8.6-2.4L1.5 0zm17.1 7.2h-3.4v1.8h3.4v2.7h-3.4v2h3.6v2.7h-6.4V7.2h6.2v-.001zm-7.6 0H5.7V9h2.3v7.4h2.8V9h2.3V7.2h-2.1z" fill="#3178C6" />
      </svg>
    ),
  },
  github: {
    color: "#F05032",
    bgGlow: "rgba(240, 80, 50, 0.4)",
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#FFFFFF" />
      </svg>
    ),
  },
};

// --- Memoized Tech Icon ---
const SkillIcon = memo(({ type }: { type: TechIconType }) => {
  const IconData = techIconMap[type];
  if (!IconData) return null;
  const Component = IconData.component;
  return <Component />;
});
SkillIcon.displayName = "SkillIcon";

// --- Complete Skills & Core Competencies Configuration ---
export const allSkillsCompetenciesConfig: SkillConfig[] = [
  // ================= 1. INNER ORBIT: Core Languages & Systems (Radius: 105px) =================
  {
    id: "cpp",
    orbitRadius: 105,
    size: 44,
    speed: 0.7,
    iconType: "cpp",
    phaseShift: 0,
    glowColor: "cyan",
    label: "C++",
    domain: "Core Languages",
    competency: "DSA & Algorithms",
  },
  {
    id: "c",
    orbitRadius: 105,
    size: 40,
    speed: 0.7,
    iconType: "c",
    phaseShift: (2 * Math.PI) / 5,
    glowColor: "blue",
    label: "C Language",
    domain: "Core Languages",
    competency: "Procedural & Memory Management",
  },
  {
    id: "csharp",
    orbitRadius: 105,
    size: 42,
    speed: 0.7,
    iconType: "csharp",
    phaseShift: (4 * Math.PI) / 5,
    glowColor: "purple",
    label: "C#",
    domain: "Core Languages",
    competency: "Unity Game Scripts & State Machines",
  },
  {
    id: "python",
    orbitRadius: 105,
    size: 42,
    speed: 0.7,
    iconType: "python",
    phaseShift: (6 * Math.PI) / 5,
    glowColor: "cyan",
    label: "Python",
    domain: "Core Languages",
    competency: "Scripting & AI Tools",
  },
  {
    id: "kotlin",
    orbitRadius: 105,
    size: 42,
    speed: 0.7,
    iconType: "kotlin",
    phaseShift: (8 * Math.PI) / 5,
    glowColor: "purple",
    label: "Kotlin",
    domain: "Core Languages",
    competency: "Android Jetpack & Native Development",
  },

  // ================= 2. MIDDLE ORBIT: Game Development & 3D Engineering (Radius: 190px) =================
  {
    id: "unity",
    orbitRadius: 190,
    size: 48,
    speed: -0.45,
    iconType: "unity",
    phaseShift: 0,
    glowColor: "orange",
    label: "Unity Engine",
    domain: "Game Development",
    competency: "Scene Graph, Physics & Colliders",
  },
  {
    id: "procedural",
    orbitRadius: 190,
    size: 42,
    speed: -0.45,
    iconType: "procedural",
    phaseShift: (2 * Math.PI) / 4,
    glowColor: "amber",
    label: "Procedural Generation",
    domain: "Game Development",
    competency: "Obstacle Spawning Algorithms",
  },
  {
    id: "perf3d",
    orbitRadius: 190,
    size: 42,
    speed: -0.45,
    iconType: "perf3d",
    phaseShift: Math.PI,
    glowColor: "purple",
    label: "3D Optimization",
    domain: "Game Development",
    competency: "Batching, Memory & 60 FPS Tuning",
  },
  {
    id: "blender",
    orbitRadius: 190,
    size: 44,
    speed: -0.45,
    iconType: "blender",
    phaseShift: (6 * Math.PI) / 4,
    glowColor: "orange",
    label: "Blender 3D",
    domain: "Game Development",
    competency: "3D Modeling & Asset Creation",
  },

  // ================= 3. OUTER ORBIT: App & Web Development (Radius: 275px) =================
  {
    id: "android",
    orbitRadius: 275,
    size: 46,
    speed: 0.32,
    iconType: "android",
    phaseShift: 0,
    glowColor: "emerald",
    label: "Android Studio",
    domain: "App & Web Dev",
    competency: "Native App Builds & Emulator Testing",
  },
  {
    id: "compose",
    orbitRadius: 275,
    size: 44,
    speed: 0.32,
    iconType: "compose",
    phaseShift: (2 * Math.PI) / 6,
    glowColor: "blue",
    label: "Jetpack Compose",
    domain: "App & Web Dev",
    competency: "Declarative UI & Compose State",
  },
  {
    id: "material",
    orbitRadius: 275,
    size: 42,
    speed: 0.32,
    iconType: "material",
    phaseShift: (4 * Math.PI) / 6,
    glowColor: "purple",
    label: "Material Design 3",
    domain: "App & Web Dev",
    competency: "Responsive User-Friendly Interfaces",
  },
  {
    id: "react",
    orbitRadius: 275,
    size: 46,
    speed: 0.32,
    iconType: "react",
    phaseShift: Math.PI,
    glowColor: "cyan",
    label: "AI Web & React",
    domain: "App & Web Dev",
    competency: "AI-Powered Web Dev & Next-Gen Interfaces",
  },
  {
    id: "typescript",
    orbitRadius: 275,
    size: 42,
    speed: 0.32,
    iconType: "typescript",
    phaseShift: (8 * Math.PI) / 6,
    glowColor: "blue",
    label: "TypeScript & Tailwind",
    domain: "App & Web Dev",
    competency: "Type Safety & Tailwind Styling",
  },
  {
    id: "github",
    orbitRadius: 275,
    size: 44,
    speed: 0.32,
    iconType: "github",
    phaseShift: (10 * Math.PI) / 6,
    glowColor: "orange",
    label: "Git & GitHub",
    domain: "App & Web Dev",
    competency: "Version Control & Repositories",
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle, scaleFactor, isSelected, onSelect }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label, domain, competency } = config;

  const actualRadius = orbitRadius * scaleFactor;
  const actualSize = size * Math.max(0.8, scaleFactor);

  const x = Math.cos(angle) * actualRadius;
  const y = Math.sin(angle) * actualRadius;

  const iconInfo = techIconMap[iconType];
  const active = isHovered || isSelected;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-transform duration-75 ease-linear pointer-events-auto select-none"
      style={{
        width: `${actualSize}px`,
        height: `${actualSize}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: active ? 40 : 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(config)}
    >
      <div
        className={cn(
          "relative w-full h-full p-2.5 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300",
          "bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-xl",
          active
            ? "scale-135 -translate-y-1 border-orange-400/80 shadow-[0_0_30px_rgba(249,115,22,0.4)] ring-2 ring-orange-400/40"
            : "hover:scale-115 hover:border-slate-500"
        )}
        style={{
          boxShadow: active && iconInfo
            ? `0 0 25px ${iconInfo.bgGlow}, 0 0 50px rgba(249,115,22,0.2)`
            : undefined,
        }}
      >
        <SkillIcon type={iconType} />

        {/* Hover Tooltip Card */}
        {active && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-slate-950/95 border border-orange-500/50 rounded-xl text-center shadow-2xl backdrop-blur-xl pointer-events-none z-50 whitespace-nowrap min-w-[140px]">
            <p className="text-xs font-bold text-white tracking-wide">{label}</p>
            <p className="text-[10px] font-mono text-orange-400 font-medium">{competency}</p>
            <p className="text-[9px] font-mono text-slate-400">{domain}</p>
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = "OrbitingSkill";

// --- Glowing Orbit Path Component ---
const GlowingOrbitPath = memo(
  ({ radius, glowColor = "orange", animationDelay = 0, domainLabel, scaleFactor }: GlowingOrbitPathProps) => {
    const actualRadius = radius * scaleFactor;

    const glowColors: Record<
      OrbitGlowColor,
      { primary: string; secondary: string; border: string }
    > = {
      orange: {
        primary: "rgba(249, 115, 22, 0.35)",
        secondary: "rgba(249, 115, 22, 0.12)",
        border: "rgba(249, 115, 22, 0.3)",
      },
      cyan: {
        primary: "rgba(34, 211, 238, 0.35)",
        secondary: "rgba(34, 211, 238, 0.12)",
        border: "rgba(34, 211, 238, 0.3)",
      },
      purple: {
        primary: "rgba(168, 85, 247, 0.35)",
        secondary: "rgba(168, 85, 247, 0.12)",
        border: "rgba(168, 85, 247, 0.3)",
      },
      emerald: {
        primary: "rgba(16, 185, 129, 0.35)",
        secondary: "rgba(16, 185, 129, 0.12)",
        border: "rgba(16, 185, 129, 0.3)",
      },
      amber: {
        primary: "rgba(245, 158, 11, 0.35)",
        secondary: "rgba(245, 158, 11, 0.12)",
        border: "rgba(245, 158, 11, 0.3)",
      },
      blue: {
        primary: "rgba(59, 130, 246, 0.35)",
        secondary: "rgba(59, 130, 246, 0.12)",
        border: "rgba(59, 130, 246, 0.3)",
      },
    };

    const colors = glowColors[glowColor] || glowColors.orange;

    return (
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300"
        style={{
          width: `${actualRadius * 2}px`,
          height: `${actualRadius * 2}px`,
        }}
      >
        {/* Glowing atmospheric halo */}
        <div
          className="absolute inset-0 rounded-full animate-pulse opacity-40"
          style={{
            background: `radial-gradient(circle, transparent 75%, ${colors.secondary} 90%, ${colors.primary} 100%)`,
            boxShadow: `0 0 30px ${colors.secondary}, inset 0 0 30px ${colors.secondary}`,
            animationDuration: "5s",
            animationDelay: `${animationDelay}s`,
          }}
        />

        {/* Orbit Ring Border */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px dashed ${colors.border}`,
            boxShadow: `inset 0 0 15px ${colors.secondary}`,
          }}
        />

        {/* Orbit Domain Pill Badge at top of ring */}
        {domainLabel && actualRadius > 60 && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-800 text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest backdrop-blur-md">
            {domainLabel}
          </div>
        )}
      </div>
    );
  }
);
GlowingOrbitPath.displayName = "GlowingOrbitPath";

// --- Main OrbitingSkills Component ---
export interface OrbitingSkillsProps {
  className?: string;
  skills?: SkillConfig[];
}

export default function OrbitingSkills({
  className,
  skills = allSkillsCompetenciesConfig,
}: OrbitingSkillsProps) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState<SkillConfig | null>(null);

  // Responsive scale factor based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 420) {
        setScaleFactor(0.62);
      } else if (width < 640) {
        setScaleFactor(0.78);
      } else if (width < 768) {
        setScaleFactor(0.9);
      } else {
        setScaleFactor(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Request Animation Frame loop for silky smooth 60fps orbit kinematics
  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime((prev) => prev + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Concentric Orbit Paths definition
  const orbitConfigs: Array<{
    radius: number;
    glowColor: OrbitGlowColor;
    delay: number;
    domainLabel: string;
  }> = [
    { radius: 105, glowColor: "purple", delay: 0, domainLabel: "Languages & Core" },
    { radius: 190, glowColor: "orange", delay: 1.2, domainLabel: "Game Dev & 3D" },
    { radius: 275, glowColor: "cyan", delay: 2.4, domainLabel: "App & Web Architecture" },
  ];

  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center overflow-hidden py-8 select-none",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl h-[450px] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12)_0%,rgba(168,85,247,0.06)_40%,transparent_70%)] blur-3xl" />
      </div>

      {/* Orbit Canvas Container */}
      <div
        className="relative flex items-center justify-center my-4"
        style={{
          width: `${620 * scaleFactor}px`,
          height: `${620 * scaleFactor}px`,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Central Core Sphere with Pulsing Energy Glow */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-orange-500/40 flex flex-col items-center justify-center z-30 relative shadow-2xl shadow-orange-500/20 group cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-orange-500/25 blur-xl animate-pulse" />
          <div
            className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase">
              Skills
            </span>
          </div>
        </div>

        {/* Orbit Path Rings */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`orbit-path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
            domainLabel={config.domainLabel}
            scaleFactor={scaleFactor}
          />
        ))}

        {/* Orbiting Skill Nodes */}
        {skills.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
              scaleFactor={scaleFactor}
              isSelected={selectedSkill?.id === config.id}
              onSelect={(item) => setSelectedSkill((prev) => prev?.id === item.id ? null : item)}
            />
          );
        })}
      </div>

      {/* Domain Breakdown Cards detailing Every Core Competency */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Languages & Problem Solving */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-orange-400 border-b border-slate-800 pb-2.5">
            <Binary className="w-4 h-4" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Languages & Systems</h4>
          </div>
          <div className="space-y-2">
            {[
              { name: 'C++', desc: 'DSA & Algorithms' },
              { name: 'C#', desc: 'Unity Game Scripts & State Machines' },
              { name: 'C', desc: 'Procedural & Memory Management' },
              { name: 'Python', desc: 'Scripting & AI Tools' },
              { name: 'Kotlin', desc: 'Android Jetpack & Native' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px]">
                <span className="font-bold text-slate-200">{item.name}</span>
                <span className="font-mono text-slate-400 text-[10px]">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Game Development */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-purple-400 border-b border-slate-800 pb-2.5">
            <Gamepad2 className="w-4 h-4" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Game Development</h4>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Unity Engine', desc: 'Scene Graph, Physics, Colliders' },
              { name: 'C# Scripting', desc: 'Game Loops & State Machines' },
              { name: 'Procedural Gen', desc: 'Obstacle Spawning Algorithms' },
              { name: '3D Optimization', desc: 'Batching, Memory & 60 FPS' },
            ].map((item) => (
              <div key={item.name} className="p-2 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] space-y-0.5">
                <p className="font-bold text-purple-300">{item.name}</p>
                <p className="font-mono text-slate-400 text-[10px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: App & AI Web Development */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-cyan-400 border-b border-slate-800 pb-2.5">
            <Smartphone className="w-4 h-4" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">App & Web Dev</h4>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Android Studio', desc: 'Native Builds & Emulator Testing' },
              { name: 'Jetpack Compose', desc: 'Declarative UI & Compose State' },
              { name: 'Material Design 3', desc: 'Responsive User-Friendly UI' },
              { name: 'AI Web & React 19', desc: 'Next-Gen Interfaces & Web Tools' },
            ].map((item) => (
              <div key={item.name} className="p-2 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] space-y-0.5">
                <p className="font-bold text-cyan-300">{item.name}</p>
                <p className="font-mono text-slate-400 text-[10px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
