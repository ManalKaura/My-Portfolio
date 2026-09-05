import { useState, useRef } from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { ArrowUp, Gamepad2, ExternalLink, Volume2, VolumeX } from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export function Footer() {
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
    <footer className="relative z-20 w-full bg-slate-950 text-white overflow-hidden rounded-t-3xl border-t border-slate-800/80 shadow-2xl">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Container Scroll Animation Section */}
      <div className="relative z-10 w-full pt-16 pb-8">
        <ContainerScroll
          titleComponent={
            <div className="px-4">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  Gameplay
                </span>
              </h2>
            </div>
          }
        >
          {/* Card Showcase playing the Gameplay video with Mute/Unmute button */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 group">
            <video
              ref={videoRef}
              src="/Gameplay.mp4"
              poster="/cube-runner-gameplay.png"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center"
            />

            {/* Mute / Unmute Floating Action Button */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute gameplay audio" : "Mute gameplay audio"}
              className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white hover:bg-slate-900/95 hover:border-orange-500/50 hover:text-orange-400 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-slate-300" />
                  <span className="text-xs font-medium text-slate-200">Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span className="text-xs font-medium text-orange-300">Mute</span>
                </>
              )}
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-6 md:p-8 pointer-events-none">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-orange-400">
                  <Gamepad2 className="w-3 h-3 text-orange-400" />
                  <span>Unity 3D Physics • 60 FPS</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">Procedural Runner Course Simulation</h3>
                <p className="text-xs text-slate-400 max-w-md hidden sm:block">
                  Live collision feedback, lane switching mechanics, and dynamic speed scaling.
                </p>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* Footer Navigation Bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-orange-400" />
          <span className="font-semibold text-slate-200">3D Cube Runner</span>
          <span>•</span>
          <span>Built with Unity 3D, React &amp; Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ManalKaura/3D-Cube-Runner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="GitHub Repository"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium transition cursor-pointer shadow-lg shadow-orange-600/30 hover:scale-105 active:scale-95"
            title="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Scroll to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export { ContainerScroll } from '@/components/ui/container-scroll-animation';
export default Footer;
