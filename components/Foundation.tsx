
import React from 'react';
import { FOUNDATION_CHARTER } from '../constants';

const Foundation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 rounded-full bg-indigo-600/10 border border-indigo-500/30 mb-4">
          <i className="fas fa-shield-halved text-4xl text-indigo-400"></i>
        </div>
        <h2 className="text-4xl font-bold">{FOUNDATION_CHARTER.name}</h2>
        <p className="text-xl text-gray-400 italic">"{FOUNDATION_CHARTER.mission}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl border-l-4 border-l-indigo-500">
          <h3 className="text-2xl font-bold mb-6">Core Principles</h3>
          <ul className="space-y-4">
            {FOUNDATION_CHARTER.principles.map((principle, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <i className="fas fa-check-circle text-indigo-500 mt-1"></i>
                <span className="text-gray-300 text-lg">{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass p-8 rounded-2xl border-l-4 border-l-pink-500">
          <h3 className="text-2xl font-bold mb-6">Upcoming Milestones</h3>
          <div className="space-y-6">
            <div className="relative pl-6 border-l border-gray-700 space-y-1">
              <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-pink-500"></div>
              <div className="text-sm font-bold text-pink-400">WEEK 1</div>
              <div className="text-gray-300">Open Dataset & Benchmarks Release</div>
            </div>
            <div className="relative pl-6 border-l border-gray-700 space-y-1">
              <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-gray-600"></div>
              <div className="text-sm font-bold text-gray-500">WEEK 2-4</div>
              <div className="text-gray-300">SHCI Manifesto Publication</div>
            </div>
            <div className="relative pl-6 border-l border-gray-700 space-y-1">
              <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-gray-600"></div>
              <div className="text-sm font-bold text-gray-500">MONTH 2</div>
              <div className="text-gray-300">Launch First Syntropic Audio Challenge</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-900/40 to-pink-900/40 p-1 rounded-2xl">
        <div className="bg-gray-950 p-8 rounded-2xl text-center space-y-6">
          <h3 className="text-2xl font-bold">Join the Guardians</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are looking for engineers, artists, and neurologists to stand on our shoulders.
            The field advances when the tools are in others' hands.
          </p>
          <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-all">
            Inquire About Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default Foundation;
