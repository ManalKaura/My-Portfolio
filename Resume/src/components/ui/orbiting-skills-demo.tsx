"use client";

import OrbitingSkills from "@/components/ui/orbiting-skills";

export default function Demo() {
  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-black text-white font-mono mb-2">Interactive Orbiting Tech Stack</h2>
      <p className="text-slate-400 text-xs mb-8 font-mono">Concentric Domains • Hover to pause and inspect</p>
      <OrbitingSkills />
    </div>
  );
}
