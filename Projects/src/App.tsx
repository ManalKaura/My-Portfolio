import DemoOne from "./demo";
import { ArrowLeft } from "lucide-react";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative">
      {/* Top Floating Return Header for Standalone Sessions */}
      <header className="fixed top-4 left-4 z-50">
        <a
          href="/"
          onClick={(e) => {
            if (window.history.length > 1) {
              e.preventDefault();
              window.history.back();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl text-xs font-semibold text-slate-300 hover:text-white hover:border-white/25 transition-all"
          title="Return to Main Portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </a>
      </header>

      <DemoOne />
    </main>
  );
}
