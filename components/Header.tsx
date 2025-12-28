
import React, { useState, useEffect } from 'react';
import { SITE_NAME, SITE_SUBTITLE } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface HeaderProps {
  onHome: () => void;
  onAbout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome, onAbout }) => {
  const [typedText, setTypedText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [groundingResults, setGroundingResults] = useState<any[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState('');

  const fullText = SITE_SUBTITLE;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i = (i + 1) % (fullText.length + 1);
    }, 150);
    return () => clearInterval(interval);
  }, [fullText]);

  const handleSemanticSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setGroundingResults([]);
    setAiAnalysis('');

    try {
      // Create a new instance directly before use to ensure the latest API key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `针对科技博客，搜索并分析以下主题的最新动态：${searchQuery}`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      setAiAnalysis(response.text || '分析完成。');
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setGroundingResults(chunks);
    } catch (error) {
      setAiAnalysis('搜索连接失败，请检查 API 配置。');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <header className="relative h-[65vh] flex flex-col justify-center items-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920)', filter: 'brightness(0.4)' }}
        ></div>
        <div className="absolute inset-0 tech-grid opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050b15]"></div>

        <div className="relative z-10 text-center space-y-6 px-4">
          <div className="inline-block px-3 py-1 border border-cyan-500 text-cyan-500 text-[10px] font-cyber mb-2 animate-pulse uppercase tracking-widest">
            System_Link: Online
          </div>
          <h1 onClick={onHome} className="text-5xl md:text-7xl font-cyber font-bold tracking-tighter cursor-pointer glitch-text" data-text={SITE_NAME.split(' ')[0]}>
            {SITE_NAME.split(' ')[0]}<span className="text-cyan-500">_</span>
          </h1>
          <div className="text-sm md:text-lg font-cyber h-6 flex items-center justify-center text-cyan-200/70 tracking-widest">
            {typedText}<span className="w-2 h-5 bg-cyan-500 ml-1 animate-pulse"></span>
          </div>
        </div>

        <nav className="absolute top-0 w-full flex justify-between items-center px-10 py-6 z-30">
          <div className="text-xl font-cyber font-bold text-cyan-500 tracking-tighter cursor-pointer" onClick={onHome}>IC_HORIZON v2.5</div>
          <div className="flex space-x-10 items-center">
            <button onClick={() => setIsSearchOpen(true)} className="text-cyan-400 hover:scale-110 transition-transform p-2 bg-cyan-950/20 border border-cyan-900/30 rounded shadow-[0_0_15px_rgba(0,243,255,0.1)]">
              <i className="fas fa-satellite-dish"></i>
            </button>
            <button onClick={onAbout} className="text-xs font-cyber text-zinc-400 hover:text-white transition-colors">ABOUT</button>
          </div>
        </nav>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050b15]/95 backdrop-blur-xl animate-fade-in p-4">
          <div className="hud-border bg-black/80 w-full max-w-2xl shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden">
            <form onSubmit={handleSemanticSearch} className="flex items-center px-8 py-6 border-b border-cyan-900/50">
              <span className="text-cyan-500 font-cyber mr-4 uppercase tracking-tighter">Query:</span>
              <input 
                type="text" 
                placeholder="探索硅基文明脉络..." 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-xl font-cyber text-cyan-100 placeholder-cyan-900"
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="text-cyan-900 hover:text-cyan-400 transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </form>
            
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
              {isSearching ? (
                <div className="text-center font-cyber text-xs text-cyan-400 tracking-widest animate-pulse py-10">
                  [ SEMANTIC_GRID_SCANNING... ]
                </div>
              ) : aiAnalysis ? (
                <div className="animate-fade-in space-y-4">
                   <div className="bg-cyan-950/20 p-4 border-l-2 border-cyan-500">
                     <div className="text-[8px] font-cyber text-cyan-700 uppercase mb-2">Neural_Synthesis</div>
                     <div className="text-sm text-zinc-300 leading-relaxed">{aiAnalysis}</div>
                   </div>
                   {groundingResults.length > 0 && (
                     <div className="space-y-2">
                       <div className="text-[8px] font-cyber text-zinc-600 uppercase">Verification_Sources</div>
                       {groundingResults.map((chunk, idx) => chunk.web && (
                         <a key={idx} href={chunk.web.uri} target="_blank" className="flex justify-between items-center text-[10px] p-3 bg-zinc-900/50 hover:bg-cyan-900/20 border border-zinc-800 transition-all">
                           <span className="truncate">{chunk.web.title}</span>
                           <i className="fas fa-external-link-alt text-cyan-900"></i>
                         </a>
                       ))}
                     </div>
                   )}
                </div>
              ) : (
                <div className="text-center font-cyber text-[10px] text-cyan-900/50 tracking-widest py-10">
                  [ READY_FOR_GLOBAL_DATA_FETCH ]
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
