
import React, { useState, useEffect } from 'react';
import { Artifact } from '../types';

const ArtifactVault: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('shci_vault');
    if (saved) {
      setArtifacts(JSON.parse(saved));
    }
  }, []);

  const createSnapshot = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const newArtifact: Artifact = {
        id: `ART-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        type: 'Protocol Snapshot',
        hash: Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        data: {
          session_id: Date.now(),
          status: 'verified'
        }
      };
      
      const updated = [newArtifact, ...artifacts];
      setArtifacts(updated);
      localStorage.setItem('shci_vault', JSON.stringify(updated));
      setIsSyncing(false);
    }, 1200);
  };

  const clearVault = () => {
    if (confirm("Are you sure? This will delete all local verifiable artifacts.")) {
      setArtifacts([]);
      localStorage.removeItem('shci_vault');
    }
  };

  const downloadVault = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(artifacts, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `SHCI_Vault_Artifacts_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold shci-text-gradient">Protocol Artifact Vault</h2>
          <p className="text-gray-400 mt-2">Decentralized local ledger for verifiable SHCI progress.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={createSnapshot}
            disabled={isSyncing}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {isSyncing ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-fingerprint"></i>}
            Snapshot Artifact
          </button>
          <button 
            onClick={downloadVault}
            className="px-6 py-3 bg-gray-800 text-gray-300 font-bold rounded-2xl hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            <i className="fas fa-download"></i>
            Export Vault
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {artifacts.length === 0 ? (
          <div className="glass p-20 rounded-3xl text-center border-dashed border-2 border-gray-800">
            <i className="fas fa-box-open text-6xl text-gray-700 mb-6"></i>
            <h3 className="text-2xl font-bold text-gray-500">The Vault is Empty</h3>
            <p className="text-gray-600 mt-2">Take your first snapshot to secure your verifiable artifacts.</p>
          </div>
        ) : (
          artifacts.map((artifact) => (
            <div key={artifact.id} className="glass p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl">
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <div>
                    <div className="font-mono text-indigo-300 text-sm">{artifact.id}</div>
                    <div className="text-xl font-bold">{artifact.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 text-xs font-mono uppercase tracking-tighter mb-1">Integrity Hash</div>
                  <div className="font-mono text-xs text-emerald-500/70 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10 max-w-[200px] truncate">
                    {artifact.hash}
                  </div>
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(artifact.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {artifacts.length > 0 && (
        <div className="mt-12 text-center">
          <button 
            onClick={clearVault}
            className="text-gray-600 hover:text-red-400 transition-colors text-sm font-bold flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fas fa-trash-alt"></i>
            Clear Local Buffer
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtifactVault;
