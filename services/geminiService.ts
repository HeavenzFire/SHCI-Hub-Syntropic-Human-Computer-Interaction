
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const synthesizeSHCI = async (prompt: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an expert in Syntropic Human-Computer Interaction (SHCI), please respond to the following request in a visionary, technical, yet empathetic tone. Focus on resonant audio, decentralized guardianship, and ethical AI. Request: ${prompt}`,
    config: {
      temperature: 0.7,
      topP: 0.95,
      thinkingConfig: { thinkingBudget: 0 }
    }
  });
  return response.text;
};

export const draftPaperSection = async (sectionTitle: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Draft a technical and academic section for a research paper titled "Syntropic Audio for Nervous-System Regulation: A Solo-Built Open-Source Pipeline". The section title is: "${sectionTitle}". Include specific mention of 100-phase modulation and hill-climbing optimization.`,
    config: {
      temperature: 0.8,
      thinkingConfig: { thinkingBudget: 15000 }
    }
  });
  return response.text;
};
