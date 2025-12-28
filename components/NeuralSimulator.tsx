
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const NeuralSimulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runSimulation = async () => {
    if (!input.trim()) return;
    setIsSimulating(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `作为一个高级 AI 架构师，根据以下关键词推演并描述一个未来的神经网络架构拓扑：${input}。
        要求：使用技术化的术语，包括层级结构、数据流向、功耗预估，并以 Markdown 格式返回。`,
      });
      setResult(response.text || '模拟失败，节点同步超时。');
    } catch (error) {
      setResult('SIMULATION_ERROR: 神经链路断开。请检查 API 访问权限。');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="my-12 hud-border bg-[#050b15]/80 p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h3 className="font-cyber text-sm text-cyan-400 uppercase tracking-[0.3em]">Neural_Arch_Simulator</h3>
          <p className="text-[9px] font-cyber text-zinc-600">STATUS: INTERACTIVE_MODE_ACTIVE</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER_TECH_CONCEPT (e.g. Liquid_MoE)..."
            className="bg-cyan-950/20 border border-cyan-900/50 px-4 py-2 text-xs font-cyber text-cyan-100 outline-none focus:border-cyan-500 transition-all flex-1 md:w-64"
          />
          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="px-6 py-2 bg-cyan-500 text-black font-cyber text-[10px] hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
          >
            {isSimulating ? '[CALCULATING...]' : '[SIMULATE_PROJECTION]'}
          </button>
        </div>
      </div>

      <div className="min-h-64 border border-dashed border-cyan-900/20 p-6 bg-black/40">
        {isSimulating ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-[10px] font-cyber text-cyan-500 animate-pulse">SYNTHESIZING_TOPOLOGY...</span>
          </div>
        ) : result ? (
          <div className="prose prose-invert prose-xs animate-fade-in text-zinc-300 font-mono text-[11px] leading-relaxed">
            {result.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48">
            <span className="text-[10px] font-cyber text-cyan-900/50 uppercase">Awaiting_Neural_Input_For_Profound_Analysis</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeuralSimulator;
