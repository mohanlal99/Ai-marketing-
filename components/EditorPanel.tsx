import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface EditorPanelProps {
  onGenerate: (prompt: string) => void;
  isProcessing: boolean;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ onGenerate, isProcessing }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const suggestions = [
    "Make it cyberpunk style",
    "Turn it into a pencil sketch",
    "Add a sunset background",
    "Make the object gold"
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white mb-2">Magic Editor</h3>
        <p className="text-sm text-slate-400">
          Describe how you want to transform your image. Be specific about style, lighting, and composition.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
            <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'Add a vintage film grain effect' or 'Place this object on a wooden table'"
            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
            disabled={isProcessing}
            />
            <div className="absolute bottom-3 right-3">
                <Sparkles className={`w-4 h-4 ${prompt ? 'text-blue-400' : 'text-slate-600'}`} />
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => setPrompt(s)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-slate-700"
                >
                    {s}
                </button>
            ))}
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
        >
            {isProcessing ? 'Processing...' : (
                <>
                    <span>Generate Edit</span>
                    <Send className="w-4 h-4" />
                </>
            )}
        </button>
      </form>
    </div>
  );
};