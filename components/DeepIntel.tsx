
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface DeepIntelProps {
  title: string;
}

const DeepIntel: React.FC<DeepIntelProps> = ({ title }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [intelData, setIntelData] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);

  const decryptIntel = async () => {
    setIsDecrypting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `检索并汇总关于“${title}”主题的最新全球深度技术动态和不广为人知的专业细节。`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      
      setIntelData(response.text || "NO_DEEP_INTEL_STREAM_AVAILABLE");
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setSources(chunks.filter(c => c.web));
      setIsUnlocked(true);
    } catch (error: any) {
      const msg = error.message || "";
      if (msg.includes("Requested entity was not found")) {
        window.dispatchEvent(new CustomEvent('API_KEY_ERROR', { detail: { message: msg } }));
      }
      setIntelData("SECURITY_BLOCK: 协议握手失败。");
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="mt-20 hud-border p-8 bg-black/60 relative overflow-hidden group">
      <div className={`absolute inset-0 bg-red-500/5 transition-opacity duration-1000 ${isUnlocked ? 'opacity-0' : 'opacity-100'}`}></div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 flex items-center justify-center rounded border ${isUnlocked ? 'border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-red-500 text-red-500 animate-pulse'}`}>
          <i className={`fas ${isUnlocked ? 'fa-unlock' : 'fa-lock'}`}></i>
        </div>
        <div>
          <h4 className="font-cyber text-xs uppercase tracking-[0.4em] text-white">Encrypted_Deep_Intel_Stream</h4>
          <p className="text-[8px] font-cyber text-zinc-600">CLEARANCE: LEVEL_RED / STATUS: {isUnlocked ? 'BYPASSED' : 'LOCKED'}</p>
        </div>
      </div>

      {!isUnlocked ? (
        <div className="space-y-6">
          <div className="h-24 bg-zinc-900/50 flex items-center justify-center border border-dashed border-red-900/30">
            <span className="text-[10px] font-cyber text-red-900 opacity-50 tracking-widest uppercase">Content_Protected_By_Quantum_Firewall</span>
          </div>
          <button 
            onClick={decryptIntel}
            disabled={isDecrypting}
            className="w-full py-3 hud-border border-red-900 text-red-500 font-cyber text-[10px] hover:bg-red-500 hover:text-black transition-all flex items-center justify-center gap-3 group"
          >
            {isDecrypting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> BRUTE_FORCING_ACCESS_NODE...
              </>
            ) : (
              <>
                <i className="fas fa-skull-crossbones group-hover:animate-bounce"></i> [INITIATE_DECRYPTION_PROTOCOL]
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="animate-fade-in space-y-6">
          <div className="bg-emerald-950/10 border-l-2 border-emerald-500 p-6 font-mono text-sm text-zinc-300 leading-relaxed relative">
            <div className="absolute top-2 right-2 text-[8px] font-cyber text-emerald-500/30 uppercase tracking-tighter">Decrypted_Output_v2.5</div>
            <div className="whitespace-pre-wrap">{intelData}</div>
          </div>
          
          {sources.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sources.map((s, idx) => (
                <a key={idx} href={s.web.uri} target="_blank" className="p-3 bg-zinc-900/50 border border-emerald-900/20 text-[10px] text-emerald-500 font-cyber flex justify-between items-center hover:bg-emerald-500/10 transition-all">
                  <span className="truncate mr-4">{s.web.title}</span>
                  <i className="fas fa-link"></i>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeepIntel;
