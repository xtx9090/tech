
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface VeoGeneratorProps {
  title: string;
}

const VeoGenerator: React.FC<VeoGeneratorProps> = ({ title }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressText, setProgressText] = useState('');

  const generateVideo = async () => {
    setIsGenerating(true);
    setProgressText('CONNECTING_TO_VEO_RENDERER...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A high-tech cinematic scene representing the core concept of "${title}", hyper-realistic, 4k, futuristic, neon details.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        setProgressText(`RENDERING_TEMPORAL_BUFFER... (AWAITING_GPU)`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error("Video generation failed", error);
      setProgressText('ERROR: VEO_SYNC_FAILED');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="my-10 hud-border bg-black/60 p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-cyan-950 flex items-center justify-center border border-cyan-500/30">
            <i className="fas fa-video text-cyan-500 text-xs animate-pulse"></i>
          </div>
          <div>
            <h4 className="font-cyber text-[10px] text-white uppercase tracking-widest">Temporal_Visual_Engine</h4>
            <p className="text-[8px] text-cyan-900 font-cyber">Model: VEO_3.1 / Status: Online</p>
          </div>
        </div>
        
        {!videoUrl && !isGenerating && (
          <button 
            onClick={generateVideo}
            className="px-6 py-2 bg-transparent border border-cyan-500 text-cyan-500 font-cyber text-[9px] hover:bg-cyan-500 hover:text-black transition-all"
          >
            [MATERIALIZE_CINEMATIC]
          </button>
        )}
      </div>

      {isGenerating && (
        <div className="h-48 flex flex-col items-center justify-center bg-zinc-950/50 border border-dashed border-cyan-900/30">
          <div className="w-3/4 h-1 bg-zinc-900 mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-cyan-500 animate-loading-bar"></div>
          </div>
          <span className="text-[10px] font-cyber text-cyan-500 animate-pulse">{progressText}</span>
        </div>
      )}

      {videoUrl && (
        <div className="animate-fade-in group relative">
          <video src={videoUrl} autoPlay loop muted controls className="w-full aspect-video object-cover rounded shadow-[0_0_30px_rgba(0,243,255,0.2)]" />
          <button onClick={() => setVideoUrl(null)} className="absolute top-2 right-2 p-2 bg-black/60 text-white hover:text-cyan-500 transition-colors">
             <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default VeoGenerator;
