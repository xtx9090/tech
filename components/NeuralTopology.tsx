
import React, { useMemo } from 'react';

const NeuralTopology: React.FC = () => {
  const nodes = useMemo(() => [
    { name: 'AGI', x: 50, y: 30, size: 4 },
    { name: 'LLM', x: 20, y: 60, size: 3 },
    { name: 'NPU', x: 80, y: 70, size: 2 },
    { name: 'CUDA', x: 40, y: 85, size: 2 },
    { name: 'VEO', x: 70, y: 20, size: 3 },
  ], []);

  return (
    <div className="bg-black/40 backdrop-blur-md hud-border p-6 mt-8 overflow-hidden relative group">
      <div className="flex items-center gap-3 font-cyber text-[10px] text-cyan-500 mb-6 uppercase tracking-widest">
        <i className="fas fa-project-diagram"></i> Topology_Link_Graph
      </div>
      
      <div className="h-48 relative">
        <svg className="w-full h-full">
          {/* Lines */}
          {nodes.map((node, i) => 
            nodes.slice(i + 1).map((target, j) => (
              <line 
                key={`${i}-${j}`}
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${target.x}%`} y2={`${target.y}%`}
                stroke="rgba(0, 243, 255, 0.15)"
                strokeWidth="1"
                className="group-hover:stroke-cyan-500/30 transition-all duration-700"
              />
            ))
          )}
          {/* Nodes */}
          {nodes.map((node, i) => (
            <g key={i} className="cursor-help">
              <circle 
                cx={`${node.x}%`} cy={`${node.y}%`} 
                r={node.size} 
                fill="#00f3ff"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              <text 
                x={`${node.x + 2}%`} y={`${node.y + 1}%`} 
                fill="rgba(0, 243, 255, 0.4)" 
                fontSize="8" 
                className="font-cyber group-hover:fill-cyan-400"
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Floating Data Scan */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1 w-full animate-scan pointer-events-none"></div>
      </div>
      
      <div className="mt-4 text-[8px] font-cyber text-zinc-600 flex justify-between uppercase">
        <span>Active_Nodes: 05</span>
        <span>Sync_Status: Nominal</span>
      </div>
    </div>
  );
};

export default NeuralTopology;
