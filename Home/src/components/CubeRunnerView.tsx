import { forwardRef } from 'react';
import { ReactLenis } from 'lenis/react';
import {
  Gamepad2,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowLeft,
  Home,
  ExternalLink,
} from 'lucide-react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

interface CubeRunnerViewProps {
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
  onNavigateResume?: () => void;
}

const EnhancedShowcase = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <ReactLenis root>
      <main ref={ref} className="relative">
        <article>
          {/* Section 1: Intro Hero Header with HandWrittenTitle Animation */}
          <Header />

          {/* Section 2: Visual Card Showcase with Unsplash Stock Images */}
          <section className="bg-slate-100 text-slate-950 min-h-screen sticky top-0 rounded-t-3xl overflow-hidden shadow-2xl border-t border-slate-300">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center min-h-screen">
              <div className="text-center space-y-3 mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold">
                  <Gamepad2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>3D Cube Runner Visuals</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
                  Snapshots
                </h2>
              </div>

              {/* Cards Grid with Real 3D Cube Runner Screenshots */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden relative bg-slate-950">
                    <img
                      src="/cube-runner-start.png"
                      alt="Tap to Start Game Screen"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      <span>Start Screen &amp; Setup</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-lg text-slate-900">Start Screen &amp; Track Init</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unity 3D start interface initializing the procedural endless track, obstacle placement, and camera alignment.
                    </p>
                  </div>
                </div>

                <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden relative bg-slate-950">
                    <img
                      src="/cube-runner-gameplay.png"
                      alt="Active Runner Gameplay with Score Tracking"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Live Gameplay</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-lg text-slate-900">Endless Course &amp; Scoring</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      High-speed runner mechanics with responsive lane dodging, dynamic cube obstacles, and real-time score tracking.
                    </p>
                  </div>
                </div>

                <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden relative bg-slate-950">
                    <img
                      src="/cube-runner-gameover.png"
                      alt="Game Over Screen with Collision Detection"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Collision &amp; Results</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-lg text-slate-900">Collision &amp; Game Over</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      RigidBody collision detection triggering instant Game Over modal overlay with final score, restart, and quit loops.
                    </p>
                  </div>
                </div>
              </div>

              {/* GitHub Profile Button */}
              <div className="pt-8 flex justify-center">
                <a
                  href="https://github.com/ManalKaura/3D-Cube-Runner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md hover:shadow-lg border border-slate-700 transition-all hover:scale-105 group cursor-pointer"
                  title="GitHub Profile - 3D Cube Runner"
                >
                  <GithubIcon className="w-4 h-4 text-white group-hover:text-orange-400 transition-colors" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </section>

          {/* Section 3: Unleash the Power of Scroll Animations */}
          <Footer />
        </article>
      </main>
    </ReactLenis>
  );
});

EnhancedShowcase.displayName = 'EnhancedShowcase';

export function CubeRunnerView({
  onNavigateHome,
  onNavigateProjects,
}: CubeRunnerViewProps) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Floating Navigation Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-auto">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80">
          {/* Back & Breadcrumb navigation */}
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

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold text-orange-400">
              <Gamepad2 className="w-4 h-4" />
              <span>3D CUBE RUNNER</span>
            </div>
          </div>
        </div>
      </header>

      {/* Render showcase view containing Hero, Cards, and Footer ContainerScroll */}
      <EnhancedShowcase />
    </div>
  );
}

export default CubeRunnerView;
