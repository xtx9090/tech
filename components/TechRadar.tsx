
import React, { useState } from 'react';

const TechRadar: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  const scanGrid = () => {
    setIsScanning(true);
    setTimeout(() => {
      alert("RADAR_ERROR: SENSOR_LINK_DISABLED. 地理位置探测模块已禁用。");
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="bg-black/40 backdrop-blur-md hud-border p-6 mt-8 relative group overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 font-cyber text-[10px] text-emerald-500 uppercase tracking-widest">
          <i className={`fas fa-radar ${isScanning ? 'animate-spin' : ''}`}></i> Global_Tech_Radar
        </div>
        <button 
          onClick={scanGrid} 
          disabled={isScanning}
          className="text-emerald-900 hover:text-emerald-500 transition-colors text-[10px] font-cyber"
        >
          {isScanning ? '[SCANNING...]' : '[INITIATE_SWEEP]'}
        </button>
      </div>

      <div className="relative h-48 mb-8 flex items-center justify-center">
        <div className="absolute w-40 h-40 border border-emerald-500/20 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full animate-spin-slow origin-center"></div>
          <div className="w-20 h-20 border border-emerald-500/10 rounded-full"></div>
          <div className="w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
        </div>
      </div>

      <div className="text-center text-[9px] font-cyber text-zinc-700 italic">SYSTEM_IDLE: AWAITING_SENSOR_TRIGGER (API_OFFLINE)</div>
    </div>
  );
};

export default TechRadar;
