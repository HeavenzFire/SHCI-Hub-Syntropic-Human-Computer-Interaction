
import React, { useState } from 'react';
import { MANIFESTO_SECTIONS } from '../constants';
import { draftPaperSection } from '../services/geminiService';
import { jsPDF } from 'jspdf';

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

  const handleDownloadPDF = (sectionTitle: string, originalContent: string) => {
    const doc = new jsPDF();
    const drafted = draftedContent[sectionTitle] || "";
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = pageWidth - (margin * 2);

    // Title
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Indigo-600 color
    doc.text(`SHCI Manifesto`, margin, 20);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(sectionTitle, margin, 30);

    // Original Content Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Core Principles:", margin, 45);
    doc.setFont("helvetica", "normal");
    const splitOriginal = doc.splitTextToSize(originalContent, textWidth);
    doc.text(splitOriginal, margin, 52);

    // Drafted Content Section (if exists)
    if (drafted) {
      let currentY = 52 + (splitOriginal.length * 7) + 15;
      
      // Add page if needed
      if (currentY > 260) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text("Synthesized Research Extension:", margin, currentY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const splitDrafted = doc.splitTextToSize(drafted, textWidth);
      
      // Handle multi-page drafting if necessary
      doc.text(splitDrafted, margin, currentY + 7);
    }

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated via SHCI Hub - Bryer's Light Institute", margin, footerY);

    doc.save(`SHCI_Manifesto_${sectionTitle.replace(/\s+/g, '_')}.pdf`);
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
                <div className="mt-8 p-6 bg-indigo-950/20 border border-indigo-900/50 rounded-xl font-serif italic text-gray-400 border-l-4 border-l-indigo-500">
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
                <button 
                  onClick={() => handleDownloadPDF(section.title, section.content)}
                  className="px-6 py-2 border border-gray-700 hover:bg-gray-800 rounded-full transition-all flex items-center gap-2"
                >
                  <i className="fas fa-file-pdf text-red-400"></i>
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
