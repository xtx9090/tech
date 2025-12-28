
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface IntelItem {
  title: string;
  snippet: string;
  url: string;
}

const GridIntel: React.FC = () => {
  const [intel, setIntel] = useState<IntelItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGlobalIntel = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "提供三条关于 AGI、量子计算或自动驾驶的最新全球科技头条消息，包含简短摘要。",
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const formatted: IntelItem[] = chunks
        .filter(c => c.web && c.web.title && c.web.uri)
        .slice(0, 3)
        .map(c => ({
          title: c.web!.title || "未知情报",
          snippet: "点击查看详细情报流...",
          url: c.web!.uri || "#"
        }));
      
      setIntel(formatted.length > 0 ? formatted : [{ title: "FEED_IDLE", snippet: "当前暂无高优先级情报更新。", url: "#" }]);
    } catch (error) {
      console.error("Intel fetch failed", error);
      setIntel([{ title: "UPLINK_FAILURE", snippet: "情报卫星连接中断。", url: "#" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalIntel();
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-md hud-border p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 font-cyber text-[10px] text-emerald-500 uppercase tracking-widest">
          <i className="fas fa-globe-asia animate-spin-slow"></i> Global_Grid_Feed
        </div>
        <button onClick={fetchGlobalIntel} className="text-emerald-900 hover:text-emerald-500 transition-colors">
          <i className="fas fa-sync-alt text-[10px]"></i>
        </button>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-2 w-2/3 bg-emerald-900/30 rounded"></div>
                <div className="h-2 w-full bg-emerald-900/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          intel.map((item, idx) => (
            <div key={idx} className="group relative border-l border-emerald-900/20 pl-4 py-1 hover:border-emerald-500 transition-colors">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                <h5 className="text-[11px] font-bold text-emerald-100 group-hover:text-emerald-400 transition-colors mb-1 uppercase tracking-tighter">
                  {item.title}
                </h5>
                <p className="text-[10px] text-zinc-600 line-clamp-2 leading-tight">
                  {item.snippet}
                </p>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GridIntel;
