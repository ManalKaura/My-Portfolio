'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ExternalLink,
  Gamepad2,
  Smartphone,
  Cpu,
  ArrowUp,
  FileText,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RandomLetterSwap } from './ui/random-letter-swap';

// Custom SVG Icons for Brands
const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

interface ProjectsViewProps {
  onNavigateHome?: () => void;
  onNavigateResume?: () => void;
  onNavigateCubeRunner?: () => void;
  onNavigateSmartNotes?: () => void;
}

export function ProjectsView({ onNavigateHome, onNavigateResume, onNavigateCubeRunner, onNavigateSmartNotes }: ProjectsViewProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Section data powered by real portfolio projects & high performance parallax scroll
  const sections = [
    {
      id: 1,
      tag: 'UNITY 3D & C#',
      icon: Gamepad2,
      accentColor: 'from-orange-500 to-amber-500',
      tagColor: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
      title: '3D Cube Runner',
      subtitle: 'Procedural Endless Runner Game',
      description:
        'A fast-paced 3D endless runner game developed in Unity using C#. Features dynamic procedural obstacle generation, responsive input handling loops, real-time score tracking, and smooth physics simulation running at steady 60 FPS.',
      tech: ['Unity 3D', 'C# Scripting', 'Procedural Generation', 'Collision Physics', '60 FPS'],
      imageUrl: '/cube-runner.png',
      fallbackUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/ManalKaura/3D-Cube-Runner',
      webpageRoute: '/3d-cube-runner',
      standaloneUrl: 'http://localhost:5174',
      reverse: false,
    },
    {
      id: 2,
      tag: 'KOTLIN & JETPACK COMPOSE',
      icon: Smartphone,
      accentColor: 'from-cyan-500 to-blue-500',
      tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      title: 'Smart Notes Application',
      subtitle: 'Native Android Task & Notes Management',
      description:
        'A comprehensive native Android notes and productivity suite engineered with Kotlin and Jetpack Compose adhering strictly to Material Design 3 guidelines. Features secure authentication, real-time search filtering, task categorization, and local persistence.',
      tech: ['Kotlin', 'Jetpack Compose', 'Material Design 3', 'State Management', 'Room DB / SQLite', 'Search Filtering'],
      imageUrl: '/notes-list.png',
      fallbackUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/ManalKaura/Smart-Notes-App',
      webpageRoute: '/smart-notes',
      standaloneUrl: 'http://localhost:5175',
      reverse: true,
    },
    {
      id: 3,
      tag: 'C++ & SYSTEMS',
      icon: Cpu,
      accentColor: 'from-purple-500 to-indigo-500',
      tagColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      title: 'Algorithms & Core Systems',
      subtitle: 'High-Efficiency Computing',
      description:
        'Engineered high-performance Data Structures & Algorithms implementations in C++. Focused on optimal asymptotic complexity, memory management, and rigorous computational problem solving.',
      tech: ['C++', 'Data Structures', 'Algorithms', 'Time Complexity Optimization', 'Memory Management'],
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/ManalKaura',
      reverse: false,
    },
  ];

  // Create refs and animations for each section
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const sectionRefs = [ref1, ref2, ref3];

  const handleNavigateWebpage = (sectionId: number, webpageRoute: string) => {
    if (sectionId === 1 && onNavigateCubeRunner) {
      onNavigateCubeRunner();
    } else if (sectionId === 2 && onNavigateSmartNotes) {
      onNavigateSmartNotes();
    } else {
      window.location.hash = webpageRoute;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollProgress1 = useScroll({
    target: ref1,
    offset: ['start end', 'center start'],
  }).scrollYProgress;

  const scrollProgress2 = useScroll({
    target: ref2,
    offset: ['start end', 'center start'],
  }).scrollYProgress;

  const scrollProgress3 = useScroll({
    target: ref3,
    offset: ['start end', 'center start'],
  }).scrollYProgress;

  // Create animations for each section
  const opacityContents = [
    useTransform(scrollProgress1, [0, 0.7], [0, 1]),
    useTransform(scrollProgress2, [0, 0.7], [0, 1]),
    useTransform(scrollProgress3, [0, 0.7], [0, 1]),
  ];

  const clipProgresses = [
    useTransform(scrollProgress1, [0, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']),
    useTransform(scrollProgress2, [0, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']),
    useTransform(scrollProgress3, [0, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']),
  ];

  const translateContents = [
    useTransform(scrollProgress1, [0, 1], [-50, 0]),
    useTransform(scrollProgress2, [0, 1], [-50, 0]),
    useTransform(scrollProgress3, [0, 1], [-50, 0]),
  ];

  const scrollToFirstSection = () => {
    ref1.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative bg-slate-950 text-white min-h-screen selection:bg-orange-500 selection:text-white font-sans overflow-x-hidden')}>
      {/* Background Subtle Radial Glow & Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(249,115,22,0.06)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Glass Navigation Bar */}
      <header className="fixed top-4 left-0 right-0 z-50 max-w-5xl mx-auto px-4 sm:px-6 pointer-events-auto">
        <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-black/60">
          {/* Logo with return-to-home action */}
          <button
            data-magnetic
            onClick={onNavigateHome ? onNavigateHome : () => (window.location.hash = '/')}
            className="flex items-center gap-2.5 pl-2 font-bold text-white tracking-tight group cursor-pointer text-left"
            title="Return to Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              MK
            </div>
            <RandomLetterSwap
              label="MANAL.KAURA"
              className="hidden sm:inline font-mono text-sm tracking-wider text-slate-200 hover:text-orange-400"
              staggerDuration={0.03}
            />
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              data-magnetic
              onClick={onNavigateHome ? onNavigateHome : () => (window.location.hash = '/')}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              data-magnetic
              onClick={onNavigateResume ? onNavigateResume : () => (window.location.hash = '/resume')}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <div className="px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold text-xs sm:text-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span>Projects</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Landing for Projects Showcase */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-16 select-none relative">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Projects
            </span>
          </h1>
        </div>

        <button
          onClick={scrollToFirstSection}
          className="mt-16 flex flex-col items-center gap-2 text-xs font-mono text-slate-400 hover:text-orange-400 transition-colors cursor-pointer group"
        >
          <span className="tracking-widest uppercase font-semibold">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-5 h-5 animate-bounce group-hover:text-orange-400 transition-colors" />
        </button>
      </section>

      {/* Parallax Scroll Feature Sections */}
      <div className="flex flex-col px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              ref={sectionRefs[index]}
              className={`min-h-screen py-16 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 ${
                section.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content Description with Parallax Translation */}
              <motion.div style={{ y: translateContents[index] }} className="flex-1 max-w-xl space-y-6">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold font-mono ${section.tagColor}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{section.tag}</span>
                </div>

                <div className="space-y-2">
                  {section.webpageRoute ? (
                    <a
                      href={`#${section.webpageRoute}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigateWebpage(section.id, section.webpageRoute!);
                      }}
                      className={cn(
                        "text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight transition-colors cursor-pointer flex items-center gap-3 group",
                        section.id === 1 ? "hover:text-orange-400" : "hover:text-cyan-400"
                      )}
                      title={`Click to explore ${section.title} webpage`}
                    >
                      <span>{section.title}</span>
                      <ExternalLink className={cn(
                        "w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity",
                        section.id === 1 ? "text-orange-400" : "text-cyan-400"
                      )} />
                    </a>
                  ) : (
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                      {section.title}
                    </h2>
                  )}
                  <h3 className="text-base sm:text-lg font-medium text-slate-400">{section.subtitle}</h3>
                </div>

                <motion.p
                  style={{ y: translateContents[index] }}
                  className="text-slate-300 text-sm sm:text-base leading-relaxed"
                >
                  {section.description}
                </motion.p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {section.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {section.webpageRoute && (
                    <a
                      href={`#${section.webpageRoute}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigateWebpage(section.id, section.webpageRoute!);
                      }}
                      className={cn(
                        "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:scale-105 cursor-pointer ring-2",
                        section.id === 1
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/25 ring-orange-400/30"
                          : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-cyan-500/25 ring-cyan-400/30"
                      )}
                      title={`Launch interactive ${section.title} webpage`}
                    >
                      <Icon className="w-4 h-4 text-white animate-pulse" />
                      <span>Explore {section.title} Webpage</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {section.standaloneUrl && (
                    <a
                      href={section.standaloneUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-xs sm:text-sm transition-all hover:scale-105",
                        section.id === 1
                          ? "bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30 text-orange-300 hover:text-orange-200"
                          : "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 text-cyan-300 hover:text-cyan-200"
                      )}
                      title={`Open standalone ${section.title} application`}
                    >
                      <span>Launch Standalone Site</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  )}

                  <a
                    href={section.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg hover:scale-105"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </motion.div>

              {/* Media Container with Parallax Clip Path & Opacity (Clickable for 3D Cube Runner & Smart Notes) */}
              <motion.div
                style={{
                  opacity: opacityContents[index],
                  clipPath: clipProgresses[index],
                }}
                className="flex-1 w-full max-w-lg"
              >
                {section.webpageRoute ? (
                  <a
                    href={`#${section.webpageRoute}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigateWebpage(section.id, section.webpageRoute!);
                    }}
                    className={cn(
                      "block w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/90 group cursor-pointer transition-all",
                      section.id === 1
                        ? "hover:border-orange-500/60 hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]"
                        : "hover:border-cyan-500/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                    )}
                    title={`Click to open ${section.title} webpage`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img
                        src={section.imageUrl}
                        alt={section.title}
                        onError={(e) => {
                          // Fallback to stock unsplash image if local public asset fails
                          (e.currentTarget as HTMLImageElement).src = section.fallbackUrl;
                        }}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      <div className={cn(
                        "absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border flex items-center justify-between text-xs transition-all duration-300 group-hover:bg-slate-950/95",
                        section.id === 1 ? "border-orange-500/40 group-hover:border-orange-500/80" : "border-cyan-500/40 group-hover:border-cyan-500/80"
                      )}>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full animate-ping", section.id === 1 ? "bg-orange-400" : "bg-cyan-400")} />
                          <span className="font-semibold text-white">Click to launch {section.title} webpage</span>
                        </div>
                        <span className={cn(
                          "font-mono text-[10px] px-2.5 py-1 rounded border flex items-center gap-1",
                          section.id === 1 ? "text-orange-400 bg-orange-500/20 border-orange-500/40" : "text-cyan-400 bg-cyan-500/20 border-cyan-500/40"
                        )}>
                          Live Webpage <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/90">
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img
                        src={section.imageUrl}
                        alt={section.title}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = section.fallbackUrl;
                        }}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* "The End" / Showcase Closer & Navigation Hub */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6 space-y-10 select-none border-t border-white/10">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono font-bold uppercase tracking-widest">
            End of Showcase
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white">
            The End
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Thank you for reviewing my featured work. Ready to dive deeper or collaborate?
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onNavigateHome ? onNavigateHome : () => (window.location.hash = '/')}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-xl shadow-orange-500/25 hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </button>

          <button
            onClick={onNavigateResume ? onNavigateResume : () => (window.location.hash = '/resume')}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all hover:scale-105 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-orange-400" />
            Explore Full Resume
          </button>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProjectsView;
