"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  Mail,
  Phone,
  ArrowUp,
  Sparkles,
  Award,
  Gamepad2,
  Smartphone,
  Code2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables for glowing glass pills */
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.6);
  --pill-highlight: rgba(255, 255, 255, 0.15);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.1);
  
  --pill-bg-1-hover: rgba(249, 115, 22, 0.15);
  --pill-bg-2-hover: rgba(249, 115, 22, 0.05);
  --pill-border-hover: rgba(249, 115, 22, 0.4);
  --pill-shadow-hover: rgba(249, 115, 22, 0.25);
  --pill-highlight-hover: rgba(255, 255, 255, 0.3);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(249, 115, 22, 0.6)); }
  15%, 45% { transform: scale(1.25); filter: drop-shadow(0 0 12px rgba(249, 115, 22, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(249, 115, 22, 0.22) 0%, 
    rgba(217, 119, 6, 0.12) 35%, 
    rgba(34, 211, 238, 0.08) 60%, 
    transparent 75%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(249, 115, 22, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 25px rgba(249, 115, 22, 0.35));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave as EventListener);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave as EventListener);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    const DynamicComponent = Component as any;

    return (
      <DynamicComponent
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node as any);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </DynamicComponent>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// Custom SVG Icons for Brands
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

// -------------------------------------------------------------------------
// 3. RESUME MARQUEE
// -------------------------------------------------------------------------
const ResumeMarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span className="flex items-center gap-2"><Gamepad2 className="w-4 h-4 text-orange-400" /> Unity 3D & C# Game Dev</span>
    <span className="text-orange-400">✦</span>
    <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-cyan-400" /> Android Jetpack Compose</span>
    <span className="text-amber-400">✦</span>
    <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-emerald-400" /> C++ Data Structures & Algorithms</span>
    <span className="text-orange-400">✦</span>
    <span className="flex items-center gap-2"><Award className="w-4 h-4 text-purple-400" /> Computer Science • TIET '29</span>
    <span className="text-cyan-400">✦</span>
    <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-300" /> Procedural Generation & AI Web</span>
    <span className="text-orange-400">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN COMPONENT: CINEMATIC RESUME FOOTER
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax on Giant "RESUME" Text
      gsap.fromTo(
        giantTextRef.current,
        { y: "12vh", scale: 0.82, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow with clip-path, revealing the fixed footer
        underneath as the user scrolls past the main resume body.
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-slate-950 text-slate-100 cinematic-footer-wrapper border-t border-orange-500/20">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text: RESUME */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-mono"
          >
            RESUME
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-8 sm:top-12 left-0 w-full overflow-hidden border-y border-orange-500/20 bg-slate-950/75 backdrop-blur-xl py-3.5 z-10 -rotate-2 scale-110 shadow-2xl shadow-black/80">
            <div className="flex w-max animate-footer-scroll-marquee text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-300 uppercase">
              <ResumeMarqueeItem />
              <ResumeMarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content: Resume & Collaboration Hub */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 sm:mt-20 w-full max-w-5xl mx-auto">
            
            {/* Subtitle badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Manal Kaura • Portfolio & Resume</span>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl font-black footer-text-glow tracking-tight mb-8 text-center max-w-3xl"
            >
              Ready to engineer the next breakthrough?
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              
              {/* Primary Action Pills */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                
                {/* Download Resume Magnetic Pill */}
                <MagneticButton
                  as="a"
                  href="/Manal_Kaura_Resume.pdf"
                  download="Manal_Kaura_Resume.pdf"
                  className="footer-glass-pill px-7 sm:px-9 py-4 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center gap-3 group shadow-xl cursor-pointer"
                  title="Download Updated Resume (PDF)"
                >
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span>Download Resume</span>
                </MagneticButton>

                {/* Contact Email Magnetic Pill */}
                <MagneticButton
                  as="a"
                  href="mailto:mkaura_be25@thapar.edu"
                  className="footer-glass-pill px-7 sm:px-9 py-4 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center gap-3 group shadow-xl"
                >
                  <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>Send Email</span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </MagneticButton>

                {/* Direct Phone / Call Magnetic Pill */}
                <MagneticButton
                  as="a"
                  href="tel:+917809500090"
                  className="footer-glass-pill px-7 sm:px-9 py-4 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center gap-3 group shadow-xl"
                >
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+91 78095-00090</span>
                </MagneticButton>

                {/* LinkedIn Profile Magnetic Pill */}
                <MagneticButton
                  as="a"
                  href="https://www.linkedin.com/in/manal-kaura-655a23386"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-glass-pill px-7 sm:px-9 py-4 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center gap-3 group shadow-xl"
                >
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <span>LinkedIn Profile</span>
                </MagneticButton>

                {/* GitHub Repositories Magnetic Pill */}
                <MagneticButton
                  as="a"
                  href="https://github.com/ManalKaura"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-glass-pill px-7 sm:px-9 py-4 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center gap-3 group shadow-xl"
                >
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <span>GitHub Code</span>
                </MagneticButton>

              </div>

              {/* Secondary Quick Jump Links / Resume Sections */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-2">
                <MagneticButton as="a" href="#hero" className="footer-glass-pill px-5 py-2.5 rounded-xl text-slate-300 font-medium text-xs hover:text-orange-400">
                  Profile Bio
                </MagneticButton>
                <MagneticButton as="a" href="#skills" className="footer-glass-pill px-5 py-2.5 rounded-xl text-slate-300 font-medium text-xs hover:text-orange-400">
                  Core Skills
                </MagneticButton>
                <MagneticButton as="a" href="#projects" className="footer-glass-pill px-5 py-2.5 rounded-xl text-slate-300 font-medium text-xs hover:text-orange-400">
                  Featured Projects
                </MagneticButton>
                <MagneticButton as="a" href="#experience" className="footer-glass-pill px-5 py-2.5 rounded-xl text-slate-300 font-medium text-xs hover:text-orange-400">
                  Experience
                </MagneticButton>
                <MagneticButton as="a" href="#education" className="footer-glass-pill px-5 py-2.5 rounded-xl text-slate-300 font-medium text-xs hover:text-orange-400">
                  Education & Honors
                </MagneticButton>
              </div>

            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-slate-400 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 font-mono">
              © {new Date().getFullYear()} Manal Kaura • TIET '29
            </div>

            {/* "Crafted with Passion" Badge */}
            <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-orange-500/20">
              <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest font-mono">Engineered with</span>
              <span className="animate-footer-heartbeat text-sm text-orange-400">❤</span>
              <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest font-mono">by</span>
              <span className="text-white font-black text-xs tracking-wide ml-0.5">Manal Kaura</span>
            </div>

            {/* Back to top Button */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              title="Back to Top"
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-slate-300 hover:text-orange-400 group order-3 border-orange-500/30 shadow-lg hover:border-orange-500"
            >
              <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300 text-orange-400" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
