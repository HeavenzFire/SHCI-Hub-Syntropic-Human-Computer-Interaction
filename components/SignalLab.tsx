
import React, { useState, useEffect, useRef } from 'react';

const SignalLab: React.FC = () => {
  const [kIndex, setKIndex] = useState(0.75);
  const [coherence, setCoherence] = useState(0.95);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Visualization logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
      }
      ctx.stroke();

      // Draw Waveform
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(129, 140, 248, ${coherence})`;
      ctx.lineJoin = 'round';

      const centerY = canvas.height / 2;
      const amplitude = 50 * kIndex;
      const frequency = 0.02 * (1 + (1 - coherence));

      for (let x = 0; x < canvas.width; x++) {
        // Syntropic modulation formula simulation
        const modulation = Math.sin(x * frequency * 0.5 + offset * 0.5) * (1 - coherence) * 20;
        const y = centerY + Math.sin(x * frequency + offset) * amplitude + modulation;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      
      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(129, 140, 248, 0.5)';
      
      offset += 0.1 * (kIndex + 0.1);
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [kIndex, coherence]);

  const toggleAudio = () => {
    if (isPlaying) {
      oscillatorRef.current?.stop();
      setIsPlaying(false);
    } else {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Map kIndex and coherence to frequency
      osc.frequency.setValueAtTime(110 + (kIndex * 220), ctx.currentTime);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    }
  };

  // Update audio params in real-time
  useEffect(() => {
    if (isPlaying && oscillatorRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      oscillatorRef.current.frequency.setTargetAtTime(110 + (kIndex * 220), ctx.currentTime, 0.1);
      gainNodeRef.current?.gain.setTargetAtTime(0.05 + (coherence * 0.1), ctx.currentTime, 0.1);
    }
  }, [kIndex, coherence, isPlaying]);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold shci-text-gradient">Resonant Signal Lab</h2>
          <p className="text-gray-400 mt-2">Real-time simulation of 100-phase modulation parameters.</p>
        </div>
        <button 
          onClick={toggleAudio}
          className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 ${
            isPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
          }`}
        >
          <i className={`fas ${isPlaying ? 'fa-stop-circle' : 'fa-play-circle'}`}></i>
          {isPlaying ? 'Disable Audio Pulse' : 'Generate Resonant Tone'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-3xl overflow-hidden relative border-indigo-500/20">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={400} 
            className="w-full h-full min-h-[400px]"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono border border-indigo-500/30">
              SIGNAL: ACTIVE
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/30">
              COHERENCE: {Math.round(coherence * 100)}%
            </span>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">k-Index (Amplitude)</label>
              <span className="text-2xl font-mono text-indigo-400">{kIndex.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={kIndex} 
              onChange={(e) => setKIndex(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-gray-800 rounded-lg h-2"
            />
            <p className="text-xs text-gray-500 italic">Governs the modulation depth of the nervous-system entrainment signal.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Coherence (Order)</label>
              <span className="text-2xl font-mono text-pink-400">{coherence.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="1" 
              step="0.01" 
              value={coherence} 
              onChange={(e) => setCoherence(parseFloat(e.target.value))}
              className="w-full accent-pink-500 bg-gray-800 rounded-lg h-2"
            />
            <p className="text-xs text-gray-500 italic">Reduces interference patterns. Higher values increase signal stability.</p>
          </div>

          <div className="pt-8 border-t border-white/5 space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Current Pulse Analytics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="text-xs text-gray-500 mb-1">Entrainment Rate</div>
                <div className="text-xl font-bold font-mono">{(kIndex * 15).toFixed(1)} Hz</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="text-xs text-gray-500 mb-1">Syntropy Flow</div>
                <div className="text-xl font-bold font-mono">{(coherence * 9.8).toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalLab;
