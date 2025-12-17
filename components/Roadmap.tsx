
import React, { useState } from 'react';
import { STRATEGIC_ROADMAP } from '../constants';

const Roadmap: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-bold shci-text-gradient">Strategic Roadmap</h2>
          <p className="text-gray-400 mt-2">The 90-day operational plan to scale SHCI globally.</p>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${
              showDetails ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-gray-700 text-gray-400 hover:border-indigo-500'
            }`}
          >
            <i className={`fas ${showDetails ? 'fa-minus-circle' : 'fa-plus-circle'}`}></i>
            {showDetails ? 'Hide Weekly Details' : 'Show Weekly Details'}
          </button>
          <div className="hidden sm:flex items-center gap-4 text-sm">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {STRATEGIC_ROADMAP.map((phase) => (
          <div 
            key={phase.id} 
            className={`glass p-8 rounded-3xl border-t-4 transition-all ${
              phase.status === 'active' 
                ? 'border-t-indigo-500 shadow-2xl shadow-indigo-500/10' 
                : phase.status === 'pending'
                ? 'border-t-pink-500 opacity-90'
                : 'border-t-gray-700 opacity-70'
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
              {!showDetails ? (
                <>
                  <section>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                      <i className="fas fa-bullseye text-indigo-400"></i> Objectives
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
                      <i className="fas fa-tasks text-pink-400"></i> Actions
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
                </>
              ) : (
                <section className="bg-white/5 p-4 rounded-xl border border-white/5 animate-slideDown">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase mb-4 tracking-wider">Weekly Deliverables</h4>
                  <div className="space-y-4">
                    {phase.weeklyDetail.map((detail, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${phase.status === 'active' ? 'bg-indigo-500' : 'bg-gray-600'}`}></div>
                          {idx !== phase.weeklyDetail.length - 1 && <div className="w-[1px] flex-1 bg-white/10 my-1"></div>}
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="pt-6 border-t border-white/5">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Target Outcome</h4>
                <p className="text-sm italic text-indigo-300/80">{phase.outcome}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 glass p-10 rounded-3xl bg-gradient-to-br from-indigo-950/30 to-transparent border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-heart-pulse text-2xl text-pink-500"></i>
            <h3 className="text-3xl font-bold">Operational Command</h3>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg">
            This roadmap is not just a plan; it is a commitment to sustainable, high-impact growth. 
            By breaking our vision into these specific deliverables, we ensure that every ounce of 
            energy directly contributes to the expansion of the SHCI field.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-xl">
            <i className="fas fa-download"></i>
            Export PDF Charter
          </button>
          <button className="px-8 py-4 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-bold rounded-2xl hover:bg-indigo-600/30 transition-all flex items-center justify-center gap-3">
            <i className="fas fa-calendar-check"></i>
            Sync to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
