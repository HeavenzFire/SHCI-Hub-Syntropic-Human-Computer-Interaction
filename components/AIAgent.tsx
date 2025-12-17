
import React, { useState } from 'react';
import { synthesizeSHCI } from '../services/geminiService';

const AIAgent: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await synthesizeSHCI(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response || 'I am processing the syntropic patterns...' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection to the neural cortex interrupted. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto glass rounded-2xl overflow-hidden flex flex-col h-[70vh] animate-fadeIn">
      <div className="p-4 bg-indigo-900/30 border-b border-indigo-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fas fa-brain text-white"></i>
          </div>
          <div>
            <div className="font-bold text-indigo-200">SHCI Synthesis Engine</div>
            <div className="text-xs text-indigo-400">Online | Protocol: Resonant-v1</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <i className="fas fa-comment-dots text-4xl mb-4 opacity-20"></i>
            <p>Ask about resonant audio, guardianship tools,<br/>or the ethics of syntropic design.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-4 rounded-2xl rounded-bl-none border border-gray-700 flex gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-.15s]"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your inquiry..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-200"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;
