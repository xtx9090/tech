
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface NeuralVisualizerProps {
  title: string;
  description: string;
}

const NeuralVisualizer: React.FC<NeuralVisualizerProps> = ({ title, description }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateConceptImage = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A futuristic, high-tech cybernetic concept art for an article titled "${title}". The theme is ${description.substring(0, 100)}. Neon colors, intricate circuits, deep blue and cyan lighting, hyper-realistic, 8k resolution, minimalist but complex digital structure.` }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      const candidate = response.candidates?.[0];
      const parts = candidate?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Image generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-10 hud-border bg-black/40 p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-cyber text-[10px] text-purple-400 uppercase tracking-widest flex items-center gap-2">
          <i className="fas fa-project-diagram animate-pulse"></i> Neural_Concept_Visualization
        </h4>
        {!imageUrl && !isGenerating && (
          <button 
            onClick={generateConceptImage}
            className="text-[9px] font-cyber text-purple-500 border border-purple-900 px-3 py-1 hover:bg-purple-500 hover:text-black transition-all"
          >
            [VISUALIZE_CORE]
          </button>
        )}
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center justify-center h-64 bg-zinc-900/20 border border-dashed border-purple-900/30">
          <div className="relative w-12 h-12 mb-4">
            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <div className="text-[10px] font-cyber text-purple-900 animate-pulse uppercase">Dreaming_in_Silicon...</div>
        </div>
      )}

      {imageUrl && (
        <div className="relative group animate-fade-in">
          <img src={imageUrl} alt="Neural Concept" className="w-full h-auto rounded border border-purple-500/30 shadow-[0_0_30px_rgba(188,0,255,0.2)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="text-[8px] font-cyber text-purple-400">UUID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <button 
            onClick={() => setImageUrl(null)}
            className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-purple-500 rounded flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all"
          >
            <i className="fas fa-sync-alt text-[10px]"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default NeuralVisualizer;
