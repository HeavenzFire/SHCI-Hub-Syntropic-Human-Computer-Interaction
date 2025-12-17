
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { INITIAL_BENCHMARK_DATA } from '../constants';

const BenchmarkDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-wave-square text-indigo-400"></i>
            Optimization Trajectory
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={INITIAL_BENCHMARK_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="phase" stroke="#9ca3af" label={{ value: 'Phase', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="coherence" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} name="Coherence (C)" />
                <Line type="monotone" dataKey="kIndex" stroke="#f472b6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} name="k-Index (K)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-heartbeat text-pink-400"></i>
            Regulation Efficiency
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INITIAL_BENCHMARK_DATA}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="phase" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="regulationScore" stroke="#a78bfa" fillOpacity={1} fill="url(#colorReg)" name="Syntropy Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl overflow-hidden">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-table text-emerald-400"></i>
          Raw Dataset Logs (JSON)
        </h3>
        <div className="bg-gray-950 p-4 rounded-lg font-mono text-sm overflow-x-auto text-emerald-400/80 border border-emerald-900/30">
          <pre>
            {JSON.stringify(INITIAL_BENCHMARK_DATA, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkDashboard;
