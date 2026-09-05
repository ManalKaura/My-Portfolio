import { forwardRef, useState, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import {
  Smartphone,
  Lock,
  FileText,
  PenTool,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  Home,
  ExternalLink,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

interface SmartNotesViewProps {
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
  onNavigateResume?: () => void;
}

const EnhancedShowcase = forwardRef<HTMLElement>((_props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ReactLenis root>
      <main ref={ref} className="relative">
        <article>
          {/* Section 1: Intro / Call to Action */}
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>KOTLIN &amp; JETPACK COMPOSE</span>
              </div>
              <h1 className="2xl:text-7xl text-6xl px-8 font-semibold tracking-tight leading-[120%]">
                Smarts Notes Application
              </h1>
              <div className="flex items-center gap-2 text-cyan-400 animate-bounce">
                <span className="text-3xl">👇</span>
                <ArrowDown className="w-8 h-8" />
              </div>
            </div>
          </section>

          {/* Section 2: Visual Card Showcase with Real App Screenshots */}
          <section className="bg-slate-100 text-slate-950 min-h-screen sticky top-0 rounded-t-3xl overflow-hidden shadow-2xl border-t border-slate-300">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-20 flex flex-col justify-center min-h-screen">
              <div className="text-center space-y-3 mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Smart Notes Application Visuals</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
                  Feature Snapshots
                </h2>
              </div>

              {/* Cards Grid with the 3 Real App Screenshots */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Login & Auth */}
                <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all flex flex-col">
                  <div className="h-64 sm:h-72 overflow-hidden relative bg-slate-900 flex items-center justify-center p-3">
                    <img 
                      src="/notes-login.png" 
                      alt="Welcome Back Login Screen" 
                      className="h-full w-auto max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-md"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-cyan-400" />
                      <span>Authentication</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">Sign In &amp; Security</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        Intuitive user sign-in screen featuring clean credential inputs, password visibility toggle, and streamlined account access.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Notes Dashboard */}
                <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all flex flex-col">
                  <div className="h-64 sm:h-72 overflow-hidden relative bg-slate-900 flex items-center justify-center p-3">
                    <img 
                      src="/notes-list.png" 
                      alt="My Notes Dashboard Screen" 
                      className="h-full w-auto max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-md"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-amber-400" />
                      <span>Notes Dashboard</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">Categorized Notes &amp; Search</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        Centralized task management with instant title-based search, timestamp tracking, and one-tap edit &amp; delete actions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Note Editor */}
                <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all flex flex-col">
                  <div className="h-64 sm:h-72 overflow-hidden relative bg-slate-900 flex items-center justify-center p-3">
                    <img 
                      src="/notes-create.png" 
                      alt="Add Note Composer Screen" 
                      className="h-full w-auto max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-md"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <PenTool className="w-3 h-3 text-emerald-400" />
                      <span>Note Composer</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">Interactive Note Editor</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        Distraction-free workspace allowing users to add custom titles, detailed task descriptions, and persist notes with a single tap.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GitHub Profile Button */}
              <div className="pt-8 sm:pt-10 flex justify-center">
                <a
                  href="https://github.com/ManalKaura/Smart-Notes-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md hover:shadow-xl border border-slate-700 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
                  title="GitHub Profile - Smart Notes App"
                >
                  <GithubIcon className="w-4 h-4 text-white group-hover:text-indigo-400 transition-colors" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </section>

          {/* Section 3: Footer Walkthrough with ContainerScroll */}
          <footer className="relative z-20 w-full bg-slate-950 text-white overflow-hidden rounded-t-3xl border-t border-slate-800/80 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 w-full pt-16 pb-8">
              <ContainerScroll
                titleComponent={
                  <div className="px-4">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
                      <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-500 bg-clip-text text-transparent">
                        Live Walkthrough
                      </span>
                    </h2>
                  </div>
                }
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 group">
                  <video
                    ref={videoRef}
                    src="/notes-app-demo.mp4"
                    poster="/notes-list.png"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-contain object-center bg-slate-950"
                  />

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute walkthrough audio" : "Mute walkthrough audio"}
                    className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white hover:bg-slate-900/95 hover:border-indigo-500/50 hover:text-indigo-400 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-slate-300" />
                        <span className="text-xs font-medium text-slate-200">Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-indigo-400 animate-pulse" />
                        <span className="text-xs font-medium text-indigo-300">Mute</span>
                      </>
                    )}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-end p-6 md:p-8 pointer-events-none">
                    <div className="space-y-1.5 text-left">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-400">
                        <Smartphone className="w-3 h-3 text-cyan-400" />
                        <span>Smart Notes Demo • Production UI</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white">Full Application Workflow</h3>
                      <p className="text-xs text-slate-400 max-w-md hidden sm:block">
                        Live interaction recording covering user authentication, task organization, search filtering, and note persistence.
                      </p>
                    </div>
                  </div>
                </div>
              </ContainerScroll>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-slate-200">Smart Notes Application</span>
                <span>•</span>
                <span>Engineered with React, Tailwind CSS &amp; Lenis</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/ManalKaura/Smart-Notes-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="GitHub Repository - Smart Notes App"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition cursor-pointer shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95"
                  title="Scroll back to top"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Scroll to Top</span>
                </button>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </ReactLenis>
  );
});

EnhancedShowcase.displayName = 'EnhancedShowcase';

export function SmartNotesView({
  onNavigateHome,
  onNavigateProjects,
}: SmartNotesViewProps) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Floating Navigation Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-auto">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateProjects ? onNavigateProjects : () => (window.location.hash = '/projects')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              title="Return to Projects Showcase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to</span> Projects
            </button>

            <button
              onClick={onNavigateHome ? onNavigateHome : () => (window.location.hash = '/')}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition cursor-pointer"
              title="Return to Home"
            >
              <Home className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold text-cyan-400">
              <Smartphone className="w-4 h-4" />
              <span>SMART NOTES APP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Render showcase view containing Hero, Cards, and Footer */}
      <EnhancedShowcase />
    </div>
  );
}

export default SmartNotesView;
