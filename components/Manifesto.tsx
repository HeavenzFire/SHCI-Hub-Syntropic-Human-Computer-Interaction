
import React, { useState } from 'react';
import { MANIFESTO_SECTIONS } from '../constants';
import { draftPaperSection } from '../services/geminiService';

const Manifesto: React.FC = () => {
  const [activeSection, setActiveSection] = useState(MANIFESTO_SECTIONS[0].id);
  const [draftedContent, setDraftedContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDraftExtra = async (sectionTitle: string) => {
    setIsLoading(sectionTitle);
    try {
      const result = await draftPaperSection(sectionTitle);
      setDraftedContent(prev => ({ ...prev, [sectionTitle]: result || '' }));
    } catch (error) {
      console.error("Drafting failed", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-fadeIn">
      <aside className="md:w-64 space-y-2">
        {MANIFESTO_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
              activeSection === section.id 
                ? 'bg-indigo-600/20 border border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10' 
                : 'hover:bg-gray-800 text-gray-400'
            }`}
          >
            {section.title}
          </button>
        ))}
      </aside>
      
      <main className="flex-1 glass p-8 rounded-2xl min-h-[60vh] relative">
        {MANIFESTO_SECTIONS.map((section) => (
          activeSection === section.id && (
            <div key={section.id} className="space-y-6">
              <h2 className="text-3xl font-bold shci-text-gradient">{section.title}</h2>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
                <p>{section.content}</p>
              </div>

              {draftedContent[section.title] && (
                <div className="mt-8 p-6 bg-indigo-950/20 border border-indigo-900/50 rounded-xl font-serif italic text-gray-400">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-2">Extended Draft (AI Synthesized)</h4>
                  <p className="whitespace-pre-wrap">{draftedContent[section.title]}</p>
                </div>
              )}

              <div className="pt-8 border-t border-gray-800 flex flex-wrap gap-4">
                <button 
                  onClick={() => handleDraftExtra(section.title)}
                  disabled={isLoading === section.title}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading === section.title ? (
                    <i className="fas fa-circle-notch animate-spin"></i>
                  ) : (
                    <i className="fas fa-magic"></i>
                  )}
                  Synthesize Extended Draft
                </button>
                <button className="px-6 py-2 border border-gray-700 hover:bg-gray-800 rounded-full transition-all">
                  <i className="fas fa-file-pdf mr-2"></i>
                  Download PDF
                </button>
              </div>
            </div>
          )
        ))}
      </main>
    </div>
  );
};

export default Manifesto;
