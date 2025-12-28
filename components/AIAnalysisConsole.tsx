
import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

interface AIAnalysisConsoleProps {
  content: string;
  title: string;
}

const AIAnalysisConsole: React.FC<AIAnalysisConsoleProps> = ({ content, title }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [progress, setProgress] = useState(0);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(10);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `为以下科技文章生成一段精炼的、具有洞察力的深度摘要（150字以内）：\n\n标题: ${title}\n内容: ${content}`,
      });
      setProgress(100);
      setAnalysis(response.text || '摘要生成失败。');
    } catch (error) {
      setAnalysis('核心算力链路故障，请稍后重试。');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playVoice = async () => {
    if (!analysis) return;
    setIsSynthesizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `请用专业且富有科技感的语气播报：${analysis}` }] }],
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
        source.start();
        source.onended = () => setIsSynthesizing(false);
      }
    } catch (error) {
      console.error(error);
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="my-8 hud-border bg-cyan-950/10 p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2 opacity-10 text-[40px] font-cyber pointer-events-none">AI_CORE</div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
        <div>
          <h4 className="text-cyan-400 font-cyber text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
            <i className="fas fa-brain animate-pulse"></i> Intelligent_Neural_Summary
          </h4>
          <p className="text-[10px] text-zinc-500 font-cyber uppercase">Model: Gemini_3_Flash / Status: Nominal</p>
        </div>
        
        {!analysis && !isAnalyzing && (
          <button 
            onClick={runAnalysis}
            className="px-6 py-2 bg-cyan-500 text-black font-cyber text-[10px] hover:bg-white transition-all shadow-[0_0_15px_rgba(0,243,255,0.5)]"
          >
            [INITIATE_DECODE]
          </button>
        )}
      </div>

      {isAnalyzing && (
        <div className="space-y-4 animate-pulse">
          <div className="h-[2px] w-full bg-zinc-900 overflow-hidden">
            <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="font-cyber text-[9px] text-cyan-800 flex justify-between">
            <span>SCRAPING_NEURAL_NODES...</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {analysis && (
        <div className="animate-fade-in relative">
          <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 to-transparent"></div>
          <div className="text-zinc-300 text-sm leading-relaxed italic border-l border-cyan-900/50 pl-4 py-2 bg-black/20 mb-4">
            {analysis}
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            <button 
              onClick={playVoice} 
              disabled={isSynthesizing}
              className={`flex items-center gap-2 font-cyber text-[10px] px-3 py-1 hud-border transition-all ${isSynthesizing ? 'text-zinc-600 border-zinc-800' : 'text-purple-400 hover:bg-purple-500 hover:text-black'}`}
            >
              <i className={`fas ${isSynthesizing ? 'fa-spinner fa-spin' : 'fa-volume-up'}`}></i> 
              {isSynthesizing ? 'SYNTHESIZING...' : 'LISTEN_TO_INTEL'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisConsole;
