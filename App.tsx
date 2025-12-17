
import React, { useState } from 'react';
import { AppSection } from './types';
import Manifesto from './components/Manifesto';
import BenchmarkDashboard from './components/BenchmarkDashboard';
import Foundation from './components/Foundation';
import AIAgent from './components/AIAgent';
import Roadmap from './components/Roadmap';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.MANIFESTO);

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.MANIFESTO:
        return <Manifesto />;
      case AppSection.BENCHMARKS:
        return <BenchmarkDashboard />;
      case AppSection.FOUNDATION:
        return <Foundation />;
      case AppSection.AI_ASSISTANT:
        return <AIAgent />;
      case AppSection.ROADMAP:
        return <Roadmap />;
      case AppSection.CHALLENGE:
        return (
          <div className="text-center py-20 space-y-6 glass rounded-2xl">
            <i className="fas fa-trophy text-6xl text-yellow-500"></i>
            <h2 className="text-4xl font-bold">Syntropic Challenge #1</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              "Build a better 7-minute regulation track" using our open-source pipeline as the baseline.
            </p>
            <div className="text-sm text-yellow-500/70 uppercase tracking-widest font-bold">Coming in 30 Days</div>
            <button className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-full transition-all">
              Notify Me
            </button>
          </div>
        );
      default:
        return <Manifesto />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30">S</div>
            <h1 className="text-xl font-bold tracking-tight">SHCI <span className="text-indigo-400">HUB</span></h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: AppSection.MANIFESTO, label: 'Manifesto', icon: 'fa-file-alt' },
              { id: AppSection.BENCHMARKS, label: 'Benchmarks', icon: 'fa-chart-line' },
              { id: AppSection.ROADMAP, label: 'Roadmap', icon: 'fa-map-signs' },
              { id: AppSection.FOUNDATION, label: 'Foundation', icon: 'fa-landmark' },
              { id: AppSection.AI_ASSISTANT, label: 'AI Agent', icon: 'fa-robot' },
              { id: AppSection.CHALLENGE, label: 'Challenge', icon: 'fa-bolt' },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveSection(nav.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeSection === nav.id 
                    ? 'bg-white/10 text-white font-medium shadow-inner' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${nav.icon} text-sm`}></i>
                {nav.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              PHASE 1 ACTIVE
            </div>
            <button className="md:hidden text-gray-400 p-2">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {/* Page Hero */}
        <section className="mb-12 text-center md:text-left space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-2">
            Protocol v1.0 • SHCI
          </div>
          <h2 className="text-5xl md:text-6xl font-black shci-text-gradient tracking-tight leading-tight">
            Advancing the Field.
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            Syntropic Human-Computer Interaction is the open, verifiable progress toward nervous-system harmony 
            and decentralized guardianship. Stand on our shoulders.
          </p>
        </section>

        {/* Dynamic Section Content */}
        <div className="min-h-[500px]">
          {renderSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center font-bold">S</div>
              <h1 className="text-xl font-bold tracking-tight">SHCI <span className="text-indigo-400">HUB</span></h1>
            </div>
            <p className="text-gray-500 text-sm">
              An open-source initiative for physiological regulation and child protection tools.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-gray-300">Resources</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">ArXiv Paper</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub Repository</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-gray-300">Community</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
          © 2024 Syntropic Guardians Foundation. All artifacts released under Open Syntropic Protocol.
        </div>
      </footer>
    </div>
  );
};

export default App;
