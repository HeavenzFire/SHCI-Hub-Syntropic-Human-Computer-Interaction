
import React from 'react';
import { STRATEGIC_ROADMAP } from '../constants';

const Roadmap: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold shci-text-gradient">Strategic Roadmap</h2>
          <p className="text-gray-400 mt-2">The 90-day operational plan to scale SHCI globally.</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
            <span className="text-gray-400">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-600"></span>
            <span className="text-gray-400">Upcoming</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {STRATEGIC_ROADMAP.map((phase) => (
          <div 
            key={phase.id} 
            className={`glass p-8 rounded-3xl border-t-4 transition-all hover:scale-[1.02] ${
              phase.status === 'active' 
                ? 'border-t-indigo-500 shadow-2xl shadow-indigo-500/10' 
                : phase.status === 'pending'
                ? 'border-t-pink-500 opacity-80'
                : 'border-t-gray-700 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${
                  phase.status === 'active' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-800 text-gray-500'
                }`}>
                  Phase {phase.id}
                </span>
                <div className="text-xl font-bold mt-2 text-white">{phase.weeks}</div>
              </div>
              {phase.status === 'active' && (
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold mb-4 leading-tight">{phase.title}</h3>
            
            <div className="space-y-6">
              <section>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <i className="fas fa-bullseye"></i> Objectives
                </h4>
                <ul className="space-y-2">
                  {phase.objectives.map((obj, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-indigo-500">•</span> {obj}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <i className="fas fa-tasks"></i> Actions
                </h4>
                <ul className="space-y-2">
                  {phase.actions.map((act, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                      <i className={`fas fa-check-circle text-xs mt-1 ${phase.status === 'active' ? 'text-indigo-400' : 'text-gray-700'}`}></i>
                      {act}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="pt-6 border-t border-white/5">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Outcome</h4>
                <p className="text-sm italic text-indigo-300/80">{phase.outcome}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 glass p-8 rounded-3xl bg-gradient-to-br from-indigo-950/20 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold mb-2">Operational Command</h3>
          <p className="text-gray-400">Every day of this 90-day plan contributes directly to establishing SHCI as the first globally recognized syntropic HCI field. Stand with us.</p>
        </div>
        <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-3">
          <i className="fas fa-download"></i>
          Get PDF Roadmap
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
