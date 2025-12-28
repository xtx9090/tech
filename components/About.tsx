
import React from 'react';
import LazyImage from './LazyImage';
import CommentSection from './CommentSection';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-12 pb-20 max-w-5xl mx-auto">
      <section className="bg-black/40 backdrop-blur-xl hud-border overflow-hidden shadow-xl">
        <div className="h-64 relative overflow-hidden">
          <LazyImage 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
            alt="About Banner" 
            className="w-full h-full grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b15] to-transparent flex items-end p-8">
            <h2 className="text-4xl font-cyber font-bold text-white tracking-tighter">OPERATOR_PROFILE</h2>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0 relative">
              <LazyImage 
                src="https://picsum.photos/seed/matrix/200/200" 
                alt="Matrix Observer" 
                className="w-32 h-32 rounded-lg shadow-lg border-2 border-cyan-500"
              />
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-[8px] font-cyber px-2 py-0.5 text-black animate-pulse">LEVEL_L5</div>
            </div>
            <div className="space-y-6 flex-1">
              <p className="text-xl font-cyber font-medium leading-relaxed italic text-cyan-400">
                “代码是逻辑的诗篇，算力是文明的基石。”
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed">
                我是 <strong>矩阵观测员 (Matrix Observer)</strong>，一名深耕于 AGI 架构与高性能计算领域的独立开发者。
                在这个硅基文明加速崛起的时代，我希望通过这个博客，记录和分享那些正在重塑世界的底层技术逻辑。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cyan-950/10 border border-cyan-900/30 p-6 rounded-lg">
                  <h4 className="font-cyber font-bold text-sm mb-3 flex items-center gap-2 text-cyan-500">
                    <i className="fas fa-brain"></i> RESEARCH_FIELDS
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    <li>• 大语言模型 (LLM) 架构优化</li>
                    <li>• 自动驾驶世界模型 (World Models)</li>
                    <li>• 边缘计算中的端侧 NPU 设计</li>
                  </ul>
                </div>
                <div className="bg-purple-950/10 border border-purple-900/30 p-6 rounded-lg">
                  <h4 className="font-cyber font-bold text-sm mb-3 flex items-center gap-2 text-purple-500">
                    <i className="fas fa-code"></i> TECH_STACK
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    <li>• C++ / CUDA / Rust</li>
                    <li>• PyTorch / TensorRT</li>
                    <li>• React / Next.js / TypeScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-black/40 backdrop-blur-xl hud-border p-8 hover:-translate-y-2 transition-transform">
          <div className="w-16 h-16 bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
            <i className="fas fa-eye text-2xl text-cyan-500"></i>
          </div>
          <h3 className="text-xl font-cyber font-bold mb-4 text-cyan-400">深度视角</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">不流于表面，深入探究每一行代码和每一个晶体管背后的科学原理。</p>
        </div>
        <div className="bg-black/40 backdrop-blur-xl hud-border p-8 hover:-translate-y-2 transition-transform">
          <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
            <i className="fas fa-microchip text-2xl text-purple-500"></i>
          </div>
          <h3 className="text-xl font-cyber font-bold mb-4 text-purple-400">前沿硬件</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">关注 2nm 及以下制程、异构计算以及光子计算等突破性硬件技术。</p>
        </div>
        <div className="bg-black/40 backdrop-blur-xl hud-border p-8 hover:-translate-y-2 transition-transform">
          <div className="w-16 h-16 bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <i className="fas fa-hand-holding-heart text-2xl text-emerald-500"></i>
          </div>
          <h3 className="text-xl font-cyber font-bold mb-4 text-emerald-400">伦理治本</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">在追逐算力的同时，从法学与伦理学角度思考人类文明与 AI 的共生之道。</p>
        </div>
      </section>

      {/* 关于页面的通用留言板 */}
      <section className="bg-black/40 backdrop-blur-xl hud-border p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-cyber font-bold text-white tracking-tighter">GUESTBOOK</h2>
          <p className="text-xs text-zinc-500 font-cyber mt-2 uppercase tracking-widest">[ LEAVE_A_MESSAGE_FOR_THE_OBSERVER ]</p>
        </div>
        <CommentSection storageKey="guestbook" />
      </section>
    </div>
  );
};

export default About;
