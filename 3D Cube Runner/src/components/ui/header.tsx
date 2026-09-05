import { ArrowDown } from 'lucide-react';
import { HandWrittenTitle } from '@/components/ui/hand-writing-text';

export function Header() {
  return (
    <section className="text-white min-h-screen w-full bg-slate-950 grid place-content-center sticky top-0 px-4 py-20">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <HandWrittenTitle
          title="3D Cube Runner"
          strokeColor="text-orange-400/90 dark:text-orange-400/90"
        />

        <div className="pt-2 flex flex-col items-center justify-center gap-2 text-orange-400 animate-bounce">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}

export default Header;
