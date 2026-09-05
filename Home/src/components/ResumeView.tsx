import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import {
  Gamepad2,
  Smartphone,
  Code2,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Layers,
  Boxes,
  Award,
  UserCheck,
  Flame,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import OrangeNoiseBackground from './ui/background-snippets-noise-effect11';
import CyanGridNoiseBackground from './ui/cyan-grid-noise-background';
import { Card3D } from './ui/card-3d';
import { RandomLetterSwap } from './ui/random-letter-swap';
import { TextDisperse } from './ui/text-disperse';
import OrbitingSkills from './ui/orbiting-skills';
import profilePic from '../assets/profile.jpg';
import { cn } from '@/lib/utils';

// Custom SVG Icons for Brands
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface ResumeViewProps {
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
  onNavigateCubeRunner?: () => void;
  onNavigateSmartNotes?: () => void;
  initialSection?: string;
}

export function ResumeView({ onNavigateHome, onNavigateProjects, onNavigateCubeRunner, onNavigateSmartNotes, initialSection }: ResumeViewProps) {
  const [activeVariant, setActiveVariant] = useState<'orange' | 'cyan'>('orange');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Scroll progress and reveal transforms
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // At top: Intro "Resume" is 100% visible, smoothly fades out on scroll
  const introOpacity = useTransform(scrollY, [0, 260], [1, 0]);
  const introScale = useTransform(scrollY, [0, 260], [1, 0.9]);
  const introY = useTransform(scrollY, [0, 260], [0, -60]);

  // Top navigation bar: hidden at top intro screen, becomes 100% visible when scrolling down to resume
  const headerOpacity = useTransform(scrollY, [120, 320], [0, 1]);
  const headerY = useTransform(scrollY, [120, 320], [-25, 0]);

  // At top: Resume content is completely hidden (opacity: 0), smoothly fades in on scroll
  const resumeOpacity = useTransform(scrollY, [120, 420], [0, 1]);
  const resumeY = useTransform(scrollY, [120, 420], [90, 0]);
  const resumeScale = useTransform(scrollY, [120, 420], [0.96, 1]);

  // Scroll to section if specified
  useEffect(() => {
    if (initialSection) {
      const el = document.getElementById(initialSection.replace('#', ''));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialSection]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToResume = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('resume-content');
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-orange-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1.5 z-50 origin-left ${
          activeVariant === 'orange'
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-[0_0_12px_#f97316]'
            : 'bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 shadow-[0_0_12px_#22d3ee]'
        }`}
        style={{ scaleX }}
      />

      {/* Procedural Canvas Noise Background */}
      {activeVariant === 'orange' ? (
        <OrangeNoiseBackground />
      ) : (
        <CyanGridNoiseBackground />
      )}

      {/* Floating Glass Navigation Bar - hidden on intro, appears smoothly on scroll */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-4 left-0 right-0 z-40 max-w-5xl mx-auto px-4 sm:px-6 pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/75 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-black/60">
          
          {/* Logo with interactive letter swap and back-to-home action */}
          <button
            onClick={() => onNavigateHome ? onNavigateHome() : window.location.assign('#/')}
            className="flex items-center gap-2.5 pl-2 font-bold text-white tracking-tight group cursor-pointer text-left"
            title="Return to Landing Page"
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

          {/* Random Letter Swap Nav Menu */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-8">
            <button
              data-magnetic
              onClick={() => onNavigateHome ? onNavigateHome() : window.location.assign('#/')}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <RandomLetterSwap label="Home" staggerDuration={0.025} />
            </button>
            <button
              data-magnetic
              onClick={() => scrollToSection('resume-content')}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors"
            >
              <RandomLetterSwap label="Resume" staggerDuration={0.025} />
            </button>
            <button
              data-magnetic
              onClick={() => scrollToSection('skills')}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors"
            >
              <RandomLetterSwap label="Skills" staggerDuration={0.025} />
            </button>
            <button
              data-magnetic
              onClick={() => (onNavigateProjects ? onNavigateProjects() : scrollToSection('projects'))}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors"
            >
              <RandomLetterSwap label="Projects" staggerDuration={0.025} />
            </button>
            <button
              data-magnetic
              onClick={() => scrollToSection('experience')}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors"
            >
              <RandomLetterSwap label="Experience" staggerDuration={0.025} />
            </button>
            <button
              data-magnetic
              onClick={() => scrollToSection('education')}
              className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-orange-400 transition-colors"
            >
              <RandomLetterSwap label="Education" staggerDuration={0.025} />
            </button>
          </div>

          {/* Background Variant & Action */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveVariant('orange')}
                title="Orange Spotlight Glow"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  activeVariant === 'orange'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveVariant('cyan')}
                title="Cyan Grid Matrix"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  activeVariant === 'cyan'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition shadow-lg shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <RandomLetterSwap label="Contact" className="text-white hover:text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= INTRO / LANDING SECTION WITH TEXT DISPERSE ================= */}
      <section
        id="intro"
        className="relative min-h-screen h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-20 scroll-mt-24 select-none"
      >
        {/* Ambient Radial Spotlight */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[450px] rounded-full',
            activeVariant === 'orange'
              ? 'bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.22),transparent_70%)]'
              : 'bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.22),transparent_70%)]',
            'blur-[60px]',
          )}
        />

        <motion.div
          style={{ opacity: introOpacity, scale: introScale, y: introY }}
          className="relative flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8"
        >
          {/* Interactive Text Disperse Component - Attractive & Tight Spacing */}
          <div className="w-full py-4 sm:py-8 flex items-center justify-center">
            <TextDisperse
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-tight text-white hover:text-orange-400 transition-all duration-300 drop-shadow-[0_12px_45px_rgba(249,115,22,0.38)] cursor-pointer"
            >
              Resume
            </TextDisperse>
          </div>

          {/* Scroll Down Trigger */}
          <motion.a
            href="#resume-content"
            onClick={handleScrollToResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-4 flex flex-col items-center gap-3 text-xs font-mono text-orange-400 hover:text-orange-300 transition-all cursor-pointer group"
          >
            <span className="tracking-widest uppercase font-semibold text-[11px] bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800 group-hover:border-orange-500/50 shadow-md">
              Scroll down to view resume
            </span>
            <div className="w-7 h-11 rounded-full border-2 border-orange-500/40 group-hover:border-orange-400 flex items-start justify-center p-1.5 transition-colors shadow-lg shadow-orange-500/10">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-2 rounded-full bg-orange-400"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-orange-400 animate-bounce -mt-1" />
          </motion.a>
        </motion.div>
      </section>

      {/* Main Resume Container - starts hidden and smoothly revealed on scroll */}
      <motion.main
        id="resume-content"
        style={{ opacity: resumeOpacity, y: resumeY, scale: resumeScale }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-24 scroll-mt-24"
      >
        {/* ================= HERO / PROFILE CARD ================= */}
        <section id="profile" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
          >
            <Card3D className="p-6 sm:p-10 border-orange-500/30" glowColor="rgba(249, 115, 22, 0.25)">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                
                {/* 3D Multi-Layered Holographic Photo Frame without floating badges */}
                <div className="relative group shrink-0">
                  {/* Outer Glowing Rings */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-400 to-cyan-400 opacity-60 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700 animate-pulse" />
                  
                  {/* Photo Container */}
                  <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-orange-500/50 bg-slate-950 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <img
                      src={profilePic}
                      alt="Manal Kaura"
                      className="w-full h-full object-cover object-top transition duration-700 group-hover:contrast-105"
                    />
                    
                    {/* Glass gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    
                    {/* Badge at bottom of photo */}
                    <div className="absolute bottom-3 left-3 right-3 text-center py-1 px-2 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/60">
                      <span className="text-[11px] font-bold text-orange-300 tracking-wide uppercase font-mono flex items-center justify-center gap-1">
                        <UserCheck className="w-3 h-3" /> Manal Kaura
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Computer Science Student • TIET '29
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
                    Manal <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Kaura</span>
                  </h1>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                    Aspiring Software Engineer specializing in <span className="text-orange-400 font-semibold">Game Development (Unity 3D / C#)</span>, <span className="text-cyan-400 font-semibold">Android App Development (Kotlin &amp; Jetpack Compose)</span>, and <span className="text-amber-300 font-semibold">Data Structures &amp; Algorithms (C++)</span>.
                  </p>

                  {/* Contact Info Pills */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      Punjab, India
                    </div>
                    
                    <button
                      onClick={() => handleCopy('+91 78095-00090', 'phone')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-slate-300 transition cursor-pointer"
                      title="Click to copy phone number"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>+91 78095-00090</span>
                      {copiedField === 'phone' ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500" />
                      )}
                    </button>

                    <button
                      onClick={() => handleCopy('mkaura_be25@thapar.edu', 'email')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-slate-300 transition font-mono cursor-pointer"
                      title="Click to copy email address"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>mkaura_be25@thapar.edu</span>
                      {copiedField === 'email' ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500" />
                      )}
                    </button>
                  </div>

                  {/* Social & Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                    <a
                      href="https://www.linkedin.com/in/manal-kaura-655a23386"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 font-medium text-xs sm:text-sm transition-all shadow-lg hover:scale-105"
                    >
                      <LinkedinIcon className="w-4 h-4 text-blue-400" />
                      LinkedIn Profile
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <a
                      href="https://github.com/ManalKaura"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm transition-all shadow-lg hover:scale-105"
                    >
                      <GithubIcon className="w-4 h-4 text-slate-300" />
                      GitHub Repositories
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>

                </div>
              </div>
            </Card3D>
          </motion.div>
        </section>

        {/* ================= SKILLS & CORE COMPETENCIES (DYNAMIC TECH STACK ORBIT) ================= */}
        <section id="skills" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">
                Technical Expertise &amp; Ecosystem
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Code2 className="w-7 h-7 text-orange-400" />
                Skills &amp; Core Competencies
              </h2>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-4 sm:p-8 border-orange-500/30 shadow-2xl flex flex-col items-center justify-center">
              <OrbitingSkills />
            </div>
          </motion.div>
        </section>

        {/* ================= FEATURED PROJECTS WITH REAL PROJECT SCREENSHOTS ================= */}
        <section id="projects" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">
                  Engineered Creations
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                  <Boxes className="w-7 h-7 text-orange-400" />
                  Featured Projects
                </h2>
              </div>
              {onNavigateProjects && (
                <button
                  onClick={onNavigateProjects}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold transition cursor-pointer shrink-0"
                  title="Open Dedicated Projects Showcase"
                >
                  <span>View all projects</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-8">
              
              {/* Project 1: 3D Cube Runner Game */}
              <Card3D className="p-8 border-orange-500/30" glowColor="rgba(249, 115, 22, 0.25)" depth={15}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold font-mono">
                      <Gamepad2 className="w-3.5 h-3.5" /> UNITY 3D &amp; C#
                    </div>

                    <a
                      href="#/3d-cube-runner"
                      onClick={(e) => {
                        if (onNavigateCubeRunner) {
                          e.preventDefault();
                          onNavigateCubeRunner();
                        }
                      }}
                      className="text-2xl sm:text-3xl font-black text-white tracking-tight hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-2.5 group"
                      title="Click to open 3D Cube Runner webpage"
                    >
                      <span>3D Cube Runner Game</span>
                      <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 text-orange-400 transition-opacity" />
                    </a>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      A fast-paced 3D endless runner game developed in Unity using C#. Features real-time procedural obstacle generation, tight responsive input loops, dynamic score tracking, and smooth physics simulation.
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-1">
                      {[
                        'Built 3D endless runner mechanics from scratch in Unity using C# scripting.',
                        'Implemented procedural obstacle spawning, collision detection, and increasing difficulty scaling.',
                        'Engineered responsive player controls, camera follow damping, and optimized rendering performance for consistent 60 FPS.',
                      ].map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {['Unity 3D', 'C# Scripting', 'Procedural Spawning', 'Collision Physics', 'Performance Optimization'].map((tag) => (
                        <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-orange-300">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href="#/3d-cube-runner"
                        onClick={(e) => {
                          if (onNavigateCubeRunner) {
                            e.preventDefault();
                            onNavigateCubeRunner();
                          }
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition shadow-lg shadow-orange-500/25 hover:scale-105 cursor-pointer ring-2 ring-orange-400/30"
                        title="Explore 3D Cube Runner interactive webpage"
                      >
                        <Gamepad2 className="w-3.5 h-3.5 text-white animate-pulse" />
                        <span>Explore 3D Cube Runner Webpage</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href="http://localhost:5173/#/3d-cube-runner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:text-orange-200 font-semibold text-xs transition hover:scale-105"
                        title="Launch standalone 3D Cube Runner website"
                      >
                        <span>Launch Standalone Site</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>

                      <a
                        href="https://github.com/ManalKaura/3D-Cube-Runner"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition hover:scale-105"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>
                  </div>

                  {/* Unity 3D Cube Runner Game Screenshot (Clickable) */}
                  <div className="lg:col-span-6">
                    <a
                      href="#/3d-cube-runner"
                      onClick={(e) => {
                        if (onNavigateCubeRunner) {
                          e.preventDefault();
                          onNavigateCubeRunner();
                        }
                      }}
                      className="block cursor-pointer group"
                      title="Click to explore 3D Cube Runner webpage"
                    >
                      <div className="relative rounded-2xl overflow-hidden border-2 border-orange-500/40 bg-slate-950 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-orange-500/80 group-hover:shadow-[0_0_35px_rgba(249,115,22,0.3)]">
                        <div className="aspect-video w-full overflow-hidden bg-slate-900">
                          <img
                            src="/cube-runner.png"
                            alt="3D Cube Runner Game Gameplay Screenshot"
                            className="w-full h-full object-cover object-center transition duration-700 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Top Overlay Badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-orange-500/40 text-[10px] font-mono font-bold text-orange-300 flex items-center gap-1.5">
                          <Gamepad2 className="w-3 h-3 text-orange-400" /> Unity Gameplay Engine
                        </div>
                        
                        {/* Bottom Caption Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs text-slate-300">
                          <span className="font-semibold text-white">Procedural Obstacle Track</span>
                          <span className="font-mono text-[10px] text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/40 flex items-center gap-1">
                            Click to Launch Webpage <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>

                </div>
              </Card3D>

              {/* Project 2: Smart Notes Application */}
              <Card3D className="p-8 border-cyan-500/30" glowColor="rgba(34, 211, 238, 0.25)" depth={15}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
                      <Smartphone className="w-3.5 h-3.5" /> KOTLIN &amp; JETPACK COMPOSE
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Smart Notes Application
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      A comprehensive native Android notes and productivity suite engineered with Kotlin and Jetpack Compose adhering strictly to Material Design 3 guidelines.
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-1">
                      {[
                        'Developed reactive UI with Jetpack Compose, handling dynamic notes state, search filtering, and category cards.',
                        'Implemented secure authentication screen with password visibility toggle and real-time form validation.',
                        'Built robust note creation, editing, and deletion with instant local persistence and timestamp tracking.',
                        'Architected modular, reusable UI components following clean Android architecture best practices.',
                      ].map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {['Kotlin', 'Jetpack Compose', 'Material Design 3', 'Compose State', 'Room / SQLite', 'Search Filtering', 'Android Studio'].map((tag) => (
                        <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href="#/smart-notes"
                        onClick={(e) => {
                          if (onNavigateSmartNotes) {
                            e.preventDefault();
                            onNavigateSmartNotes();
                          }
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition shadow-lg shadow-cyan-500/20 cursor-pointer hover:scale-105"
                        title="Explore Smart Notes Webpage"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Explore Notes Webpage</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href="http://localhost:5175"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs transition hover:scale-105"
                        title="Launch standalone Smart Notes website"
                      >
                        <span>Launch Standalone Site</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>

                      <a
                        href="https://github.com/ManalKaura/Smart-Notes-App"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs transition shadow-lg hover:scale-105"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>

                  {/* Smart Notes Application Android UI (Clickable) */}
                  <div className="lg:col-span-6">
                    <a
                      href="#/smart-notes"
                      onClick={(e) => {
                        if (onNavigateSmartNotes) {
                          e.preventDefault();
                          onNavigateSmartNotes();
                        }
                      }}
                      className="block cursor-pointer group"
                      title="Click to launch Smart Notes Application website"
                    >
                      <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-slate-950 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-cyan-500/80 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.3)]">
                        <div className="aspect-video w-full overflow-hidden bg-slate-900">
                          <img
                            src="/notes-list.png"
                            alt="Smart Notes Application Jetpack Compose UI"
                            className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Top Overlay Badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                          <Smartphone className="w-3 h-3 text-cyan-400" /> Jetpack Compose UI
                        </div>
                        
                        {/* Bottom Caption Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs text-slate-300">
                          <span className="font-semibold text-white">Categorized Notes Suite</span>
                          <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1">
                            Click to Launch Webpage <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>

                </div>
              </Card3D>

            </div>
          </motion.div>
        </section>

        {/* ================= EXPERIENCE & SOCIETY LEADERSHIP ================= */}
        <section id="experience" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">
                Societies &amp; Leadership
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Briefcase className="w-7 h-7 text-orange-400" />
                Experience
              </h2>
            </div>

            <Card3D className="p-8 border-slate-700/80" glowColor="rgba(249, 115, 22, 0.2)">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-mono font-semibold">
                    09/2025 — Current
                  </div>
                  <h3 className="text-2xl font-bold text-white">Member</h3>
                  <h4 className="text-base font-semibold text-orange-400">Thapar Mathematical Society</h4>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono self-start">
                  Thapar Institute (TIET)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Content Creation',
                    desc: 'Coordinated and developed high-impact technical and visual content for major society events.',
                    icon: Sparkles,
                  },
                  {
                    title: 'Event Management',
                    desc: 'Collaborated cross-functionally with team members for smooth event planning and execution.',
                    icon: Layers,
                  },
                  {
                    title: 'Student Outreach',
                    desc: 'Designed engaging campaigns that maximized student participation across departments.',
                    icon: Award,
                  },
                ].map((exp) => {
                  const Icon = exp.icon;
                  return (
                    <div
                      key={exp.title}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-2 text-orange-400">
                        <Icon className="w-4 h-4" />
                        <h5 className="text-xs font-bold text-white">{exp.title}</h5>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{exp.desc}</p>
                    </div>
                  );
                })}
              </div>
            </Card3D>
          </motion.div>
        </section>

        {/* ================= EDUCATION & ACADEMIC ACHIEVEMENTS ================= */}
        <section id="education" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">
                Academic Background
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <GraduationCap className="w-7 h-7 text-orange-400" />
                Education
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* College */}
              <Card3D className="p-6 space-y-4 border-orange-500/30" glowColor="rgba(249, 115, 22, 0.25)">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-orange-400">2025 — 2029 (Expected 06/2029)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Active
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">BE Computer Engineering</h3>
                  <p className="text-xs text-slate-300">Thapar Institute of Engineering and Technology</p>
                </div>

                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">Current CGPA</span>
                  <span className="text-base font-black text-orange-400 font-mono">8.0 CGPA</span>
                </div>
              </Card3D>

              {/* Class 12th */}
              <Card3D className="p-6 space-y-4" glowColor="rgba(59, 130, 246, 0.2)">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400">Class 12th: 05/2025</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                    CBSE
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Senior Secondary</h3>
                  <p className="text-xs text-slate-300">Peace Public School – Ludhiana</p>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">CBSE Board Score</span>
                  <span className="text-base font-black text-blue-400 font-mono">90.4%</span>
                </div>
              </Card3D>

              {/* Class 10th */}
              <Card3D className="p-6 space-y-4" glowColor="rgba(16, 185, 129, 0.2)">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">Class 10th: 05/2023</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    CBSE
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Secondary School</h3>
                  <p className="text-xs text-slate-300">Peace Public School – Ludhiana</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">CBSE Board Score</span>
                  <span className="text-base font-black text-emerald-400 font-mono">91.4%</span>
                </div>
              </Card3D>

            </div>
          </motion.div>
        </section>


        {/* ================= CONTACT & REACH OUT ================= */}
        <section id="contact" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
          >
            <Card3D className="p-8 sm:p-12 border-orange-500/30" glowColor="rgba(249, 115, 22, 0.25)">
              <div className="text-center max-w-2xl mx-auto space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <Mail className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Let's Connect &amp; Collaborate
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Always open to discussing game development workflows, Android engineering opportunities, C++ algorithms, or open-source projects.
                  </p>
                </div>

                {/* Direct Action Hub */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <a
                    href="mailto:mkaura_be25@thapar.edu"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-xl shadow-orange-500/30 hover:scale-105"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email Directly
                  </a>

                  <a
                    href="tel:+917809500090"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all hover:scale-105"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    +91 78095-00090
                  </a>
                </div>

                <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-400">
                  <a
                    href="https://www.linkedin.com/in/manal-kaura-655a23386"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-orange-400 transition flex items-center gap-1.5"
                  >
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    linkedin.com/in/manal-kaura
                  </a>
                  <span>•</span>
                  <a
                    href="https://github.com/ManalKaura"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-orange-400 transition flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-300" />
                    github.com/ManalKaura
                  </a>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="text-center text-xs text-slate-500 py-8 border-t border-slate-900/80 space-y-2">
          <p>© {new Date().getFullYear()} Manal Kaura. Built with React, TypeScript, Tailwind CSS &amp; Procedural Noise VFX.</p>
          <p className="font-mono text-[11px] text-slate-600">Thapar Institute of Engineering and Technology</p>
        </footer>

      </motion.main>
    </div>
  );
}

export default ResumeView;
