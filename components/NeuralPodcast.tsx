
import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

interface NeuralPodcastProps {
  postTitle: string;
  postContent: string;
}

const NeuralPodcast: React.FC<NeuralPodcastProps> = ({ postTitle, postContent }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateAndPlay = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Say in a professional, slightly mysterious AI observer voice: 
      Welcome to IntelliCore Horizon Podcast. Today we explore ${postTitle}. 
      Here is a brief insight: ${postContent.substring(0, 200)}... 
      Join the matrix of knowledge. End of transmission.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
        },
      });

      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioData) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const binary = atob(audioData);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        
        setIsPlaying(true);
        source.start();
        source.onended = () => setIsPlaying(false);
      }
    } catch (error) {
      console.error("Podcast generation failed", error);
      alert("SYSTEM_ERROR: Neural Voice Sync failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="my-10 hud-border bg-gradient-to-r from-purple-950/20 to-cyan-950/20 p-8 relative group overflow-hidden">
      <div className="absolute top-2 right-4 text-[8px] font-cyber text-purple-900/40 uppercase tracking-widest">Neural_Podcast_Node_v4</div>
      
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-1 bg-cyan-500 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <div className="flex -space-x-4 relative">
          <div className={`w-16 h-16 rounded-full border-2 ${isPlaying ? 'border-cyan-500 animate-pulse' : 'border-purple-500'} bg-zinc-900 flex items-center justify-center overflow-hidden`}>
             <i className={`fas fa-user-tie text-2xl ${isPlaying ? 'text-cyan-400' : 'text-purple-400'}`}></i>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500 bg-zinc-900 flex items-center justify-center overflow-hidden">
             <i className={`fas ${isPlaying ? 'fa-wave-square animate-bounce' : 'fa-microphone-lines'} text-2xl text-cyan-400`}></i>
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <h4 className="font-cyber text-sm text-white uppercase tracking-[0.2em]">Intel_Dialogue_Stream</h4>
          <p className="text-xs text-zinc-500 leading-relaxed font-light">
            {isPlaying ? "[ TRANSMITTING_NEURAL_PODCAST_DATA ]" : "[ VOX_MODULE_READY_FOR_SYNTHESIS ]"}
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4">
            <button 
              onClick={generateAndPlay}
              disabled={isGenerating || isPlaying}
              className={`px-8 py-2 hud-border ${isPlaying ? 'border-cyan-500 text-cyan-500' : 'border-purple-500 text-purple-500'} font-cyber text-[10px] hover:bg-white hover:text-black transition-all flex items-center gap-2 group`}
            >
              {isGenerating ? (
                <><i className="fas fa-cog fa-spin"></i> SYNCING_NEURAL_VOX...</>
              ) : isPlaying ? (
                <><i className="fas fa-volume-high animate-pulse"></i> TRANSMITTING...</>
              ) : (
                <><i className="fas fa-play"></i> [PLAY_NEURAL_PODCAST]</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralPodcast;
