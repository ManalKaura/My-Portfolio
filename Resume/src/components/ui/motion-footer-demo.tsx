"use client";

import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Demo() {
  return (
    <div className="relative w-full bg-slate-950 min-h-screen font-sans selection:bg-orange-500/20 overflow-x-hidden text-slate-100">

      {/* 
        MAIN CONTENT AREA 
        We use a high z-index and minimum height to allow the user 
        to scroll down and reveal the footer securely underneath.
      */}
      <main className="relative z-10 w-full min-h-[120vh] bg-slate-950 flex flex-col items-center justify-center text-white border-b border-orange-500/20 shadow-2xl rounded-b-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(249,115,22,0.06)_0%,transparent_60%)] pointer-events-none" />
        
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-slate-300 mb-8 uppercase text-center px-4">
          Scroll down to reveal Resume Footer
        </h1>
        
        <div className="w-[1px] h-32 bg-gradient-to-b from-orange-400 to-transparent" />
      </main>

      {/* The Cinematic Footer is injected here */}
      <CinematicFooter />
      
    </div>
  );
}
