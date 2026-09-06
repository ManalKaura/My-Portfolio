import { useState, useEffect } from 'react';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { ResumeView } from '@/components/ResumeView';
import { ProjectsView } from '@/components/ProjectsView';
import { CubeRunnerView } from '@/components/CubeRunnerView';
import { SmartNotesView } from '@/components/SmartNotesView';

type Route = 'home' | 'resume' | 'projects' | 'cube-runner' | 'smart-notes';

const parseRouteFromLocation = (): { route: Route; section: string } => {
  if (typeof window === 'undefined') return { route: 'home', section: '' };
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  // If navigated to dedicated 3D Cube Runner webpage
  if (
    hash === '#cube-runner' ||
    hash === '#/cube-runner' ||
    hash === '#3d-cube-runner' ||
    hash === '#/3d-cube-runner' ||
    hash.includes('cube-runner') ||
    path === '/cube-runner' ||
    path === '/3d-cube-runner'
  ) {
    return { route: 'cube-runner', section: '' };
  }

  // If navigated to dedicated Smart Notes Application webpage
  if (
    hash === '#smart-notes' ||
    hash === '#/smart-notes' ||
    hash === '#notes-app' ||
    hash === '#/notes-app' ||
    hash === '#notes' ||
    hash === '#/notes' ||
    hash.includes('smart-notes') ||
    path === '/smart-notes' ||
    path === '/notes'
  ) {
    return { route: 'smart-notes', section: '' };
  }

  // If navigated to dedicated projects showcase: #/projects or #projects or /projects
  if (
    hash === '#projects' ||
    hash === '#/projects' ||
    hash.startsWith('#/projects') ||
    path === '/projects'
  ) {
    return { route: 'projects', section: '' };
  }

  // If navigated to resume or specific resume sections
  if (
    hash.includes('resume') ||
    hash.includes('skills') ||
    hash.includes('education') ||
    hash.includes('experience') ||
    path === '/resume'
  ) {
    let section = '';
    if (hash.includes('#projects')) {
      section = 'projects';
    } else if (hash.includes('#skills') || hash === '#skills') {
      section = 'skills';
    } else if (hash.includes('#education') || hash === '#education') {
      section = 'education';
    } else if (hash.includes('#experience') || hash === '#experience') {
      section = 'experience';
    } else if (hash.includes('#contact') || hash === '#contact') {
      section = 'contact';
    }
    return { route: 'resume', section };
  }

  return { route: 'home', section: '' };
};

export function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => parseRouteFromLocation().route);
  const [targetSection, setTargetSection] = useState<string>(() => parseRouteFromLocation().section);

  useEffect(() => {
    const handleHashOrPopState = () => {
      const { route, section } = parseRouteFromLocation();
      setCurrentRoute(route);
      setTargetSection(section);
    };

    window.addEventListener('hashchange', handleHashOrPopState);
    window.addEventListener('popstate', handleHashOrPopState);
    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('popstate', handleHashOrPopState);
    };
  }, []);

  const navigateToResume = (section?: string) => {
    setCurrentRoute('resume');
    setTargetSection(section || '');
    if (section) {
      window.location.hash = `/resume#${section}`;
    } else {
      window.location.hash = '/resume';
    }
  };

  const navigateToProjects = () => {
    setCurrentRoute('projects');
    setTargetSection('');
    window.location.hash = '/projects';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentRoute('home');
    setTargetSection('');
    window.location.hash = '/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCubeRunner = () => {
    setCurrentRoute('cube-runner');
    setTargetSection('');
    window.location.hash = '/3d-cube-runner';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSmartNotes = () => {
    setCurrentRoute('smart-notes');
    setTargetSection('');
    window.location.hash = '/smart-notes';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (currentRoute === 'cube-runner') {
      return (
        <CubeRunnerView
          onNavigateHome={navigateToHome}
          onNavigateProjects={navigateToProjects}
          onNavigateResume={navigateToResume}
        />
      );
    }

    if (currentRoute === 'smart-notes') {
      return (
        <SmartNotesView
          onNavigateHome={navigateToHome}
          onNavigateProjects={navigateToProjects}
          onNavigateResume={navigateToResume}
        />
      );
    }

    if (currentRoute === 'projects') {
      return (
        <ProjectsView
          onNavigateHome={navigateToHome}
          onNavigateResume={navigateToResume}
          onNavigateCubeRunner={navigateToCubeRunner}
          onNavigateSmartNotes={navigateToSmartNotes}
        />
      );
    }

    if (currentRoute === 'resume') {
      return (
        <ResumeView
          onNavigateHome={navigateToHome}
          onNavigateProjects={navigateToProjects}
          onNavigateCubeRunner={navigateToCubeRunner}
          onNavigateSmartNotes={navigateToSmartNotes}
          initialSection={targetSection}
        />
      );
    }

    return (
      <div className="relative w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-white/20 overflow-x-hidden">
        {/* Background Subtle Radial Glow */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        </div>

        {/* Static Top-Left Logo with Defined Glassmorphic Boundary */}
        <header className="fixed top-6 left-6 z-50 pointer-events-auto">
          <button
            data-magnetic
            onClick={navigateToHome}
            className="flex items-center justify-center px-3.5 py-2.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-2xl shadow-black/60 hover:border-white/35 hover:bg-slate-900/95 transition-all duration-300 group cursor-pointer"
            aria-label="Manal Kaura Logo"
          >
            <img
              src="/logo-white.png"
              alt="MK Logo"
              className="h-6 sm:h-7.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
            />
          </button>
        </header>

        {/* 
          MAIN CONTENT AREA (Curtain Reveal)
          High z-index and minimum height to allow the user 
          to scroll down and reveal the footer securely underneath.
        */}
        <main className="relative z-10 w-full min-h-[120vh] bg-slate-950 flex flex-col items-center justify-center px-6 text-center border-b border-white/10 shadow-2xl rounded-b-3xl">
          <div className="max-w-5xl mx-auto space-y-6 w-full">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase text-neutral-100 whitespace-nowrap leading-tight">
              Hi, I'm Manal Kaura
            </h1>

            <p className="text-sm sm:text-lg md:text-xl font-light tracking-[0.15em] uppercase text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Computer Engineering student at Thapar Institute of Engineering &amp; Technology
            </p>
          </div>

          {/* Minimalist Editorial Scroll Indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center select-none">
            <p className="text-xs sm:text-sm font-light tracking-[0.25em] text-neutral-400 mb-6 uppercase text-center">
              Scroll down to reveal
            </p>
            <div className="w-[1px] h-24 bg-gradient-to-b from-neutral-400 via-neutral-500 to-transparent" />
          </div>
        </main>

        {/* The Cinematic Footer is injected here */}
        <CinematicFooter
          onNavigateResume={() => navigateToResume()}
          onNavigateProjects={navigateToProjects}
        />
      </div>
    );
  };

  return renderContent();
}

export default App;
