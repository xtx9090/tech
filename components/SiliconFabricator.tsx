
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const SiliconFabricator: React.FC = () => {
  const [target, setTarget] = useState('');
  const [isFabing, setIsFabing] = useState(false);
  const [specSheet, setSpecSheet] = useState<string | null>(null);

  const fabricateChip = async () => {
    if (!target.trim()) return;
    setIsFabing(true);
    setSpecSheet(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `基于应用场景“${target}”，设计一款未来的定制化 AI 芯片 (ASIC)。
        请给出：1. 制程工艺 (如 1.4nm GAA)；2. 核心架构设计；3. 预估算力 (TOPS)；4. 功耗比。
        格式要求：类似工业规格书的排版。`,
      });
      setSpecSheet(response.text || '晶圆刻蚀失败。');
    } catch (error) {
      setSpecSheet('FAB_ERROR: 光刻机离线。请检查核心授权。');
    } finally {
      setIsFabing(false);
    }
  };

  return (
    <div className="my-10 hud-border bg-black/80 p-8 overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-2 h-2 bg-amber-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-amber-500"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="space-y-1">
          <h3 className="font-cyber text-sm text-amber-500 uppercase tracking-[0.3em]">Silicon_Fab_Construct</h3>
          <p className="text-[9px] font-cyber text-zinc-600">STATUS: WAFER_READY</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <input 
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="DESIGN_SCENARIO (e.g. Brain-Computer-Interface)..."
            className="bg-amber-950/10 border border-amber-900/30 px-4 py-2 text-xs font-cyber text-amber-100 outline-none focus:border-amber-500 transition-all flex-1 md:w-64"
          />
          <button 
            onClick={fabricateChip}
            disabled={isFabing}
            className="px-6 py-2 bg-amber-600 text-black font-cyber text-[10px] hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            {isFabing ? '[FABRICATING...]' : '[INIT_LITHOGRAPHY]'}
          </button>
        </div>
      </div>

      <div className="min-h-64 border border-dashed border-amber-900/20 p-6 bg-amber-950/5 relative">
        {isFabing ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
            <span className="text-[10px] font-cyber text-amber-500 mt-4 animate-pulse uppercase tracking-widest">Etching_Silicon_Structure...</span>
          </div>
        ) : specSheet ? (
          <div className="animate-fade-in font-mono text-[11px] text-amber-100 leading-loose whitespace-pre-wrap">
            {specSheet}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 opacity-30">
            <i className="fas fa-microchip text-4xl text-amber-900 mb-4"></i>
            <span className="text-[10px] font-cyber text-amber-900 uppercase">Input_Scenario_To_Begin_Wafer_Computation</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiliconFabricator;
