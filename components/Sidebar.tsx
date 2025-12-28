
import React from 'react';
import { Post } from '../types';
import { AUTHOR_NAME, AUTHOR_BIO, CATEGORIES, POSTS, STATS } from '../constants';
import LazyImage from './LazyImage';
import GridIntel from './GridIntel';
import NeuralTopology from './NeuralTopology';
import TechRadar from './TechRadar';
import SystemLog from './SystemLog';

interface SidebarProps {
  onPostClick: (post: Post) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onPostClick }) => {
  return (
    <div className="space-y-10 sticky top-8">
      {/* Pulse Status Bar */}
      <div className="bg-black/40 hud-border p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
          <span className="font-cyber text-[8px] text-zinc-400 tracking-[0.2em] uppercase">Matrix_Observer_Status: Online</span>
        </div>
        <span className="font-cyber text-[8px] text-cyan-900">v2.5.4_ALPHA</span>
      </div>

      {/* Operator Status */}
      <div className="bg-black/40 backdrop-blur-md hud-border p-8 text-center">
        <div className="relative inline-block mb-6">
          <LazyImage 
            src="https://picsum.photos/seed/avatar/200/200" 
            alt="Avatar" 
            className="w-24 h-24 rounded-full border-2 border-cyan-500 p-1"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#050b15] animate-pulse"></div>
        </div>
        <h3 className="text-xl font-cyber font-bold mb-2 tracking-tighter text-cyan-400 glitch-text" data-text={AUTHOR_NAME}>{AUTHOR_NAME}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-8">{AUTHOR_BIO}</p>
        
        <div className="flex justify-around border-t border-cyan-900/30 pt-6">
          <div>
            <div className="font-cyber text-lg text-white">{STATS.postCount}</div>
            <div className="text-[8px] font-cyber text-cyan-900">ARCHIVES</div>
          </div>
          <div>
            <div className="font-cyber text-lg text-white">{CATEGORIES.length}</div>
            <div className="text-[8px] font-cyber text-cyan-900">SECTORS</div>
          </div>
          <div>
            <div className="font-cyber text-lg text-white">12</div>
            <div className="text-[8px] font-cyber text-cyan-900">MODULES</div>
          </div>
        </div>
      </div>

      <NeuralTopology />
      <TechRadar />
      <GridIntel />

      {/* Database Monitor */}
      <div className="bg-black/40 backdrop-blur-md hud-border p-6">
        <div className="flex items-center gap-3 font-cyber text-[10px] text-purple-500 mb-6 uppercase tracking-widest">
          <i className="fas fa-microchip animate-spin-slow"></i> Database_Index
        </div>
        <div className="space-y-5">
          {POSTS.slice(0, 5).map(post => (
            <div key={post.id} className="flex gap-4 group cursor-pointer" onClick={() => onPostClick(post)}>
              <div className="w-12 h-12 rounded bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800 group-hover:border-purple-500 transition-colors">
                <LazyImage src={post.cover} alt={post.title} className="w-full h-full opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[11px] font-medium line-clamp-2 group-hover:text-purple-400 transition-colors leading-tight">{post.title}</div>
                <div className="text-[8px] font-cyber text-zinc-600 mt-1 uppercase tracking-tighter">{post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 实时的系统内核日志 */}
      <SystemLog />

      {/* System Statistics */}
      <div className="bg-black/40 backdrop-blur-md hud-border p-6 text-[9px] font-cyber tracking-widest uppercase">
        <div className="flex items-center gap-3 text-cyan-500 mb-6">
          <i className="fas fa-tachometer-alt"></i> System_Telemetry
        </div>
        <div className="space-y-4 text-zinc-500">
          <div className="flex justify-between border-b border-cyan-900/10 pb-2">
            <span>Total_Nodes :</span> <span className="text-white">{STATS.postCount}</span>
          </div>
          <div className="flex justify-between border-b border-cyan-900/10 pb-2">
            <span>Uptime_Days :</span> <span className="text-white">{STATS.runtime}</span>
          </div>
          <div className="flex justify-between border-b border-cyan-900/10 pb-2">
            <span>Data_Volume :</span> <span className="text-white">{STATS.wordCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Total_Hits :</span> <span className="text-white">{STATS.totalViews.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-cyan-900/30 text-center text-cyan-900/50">
          SECURE_CONNECTION: AES-256
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
