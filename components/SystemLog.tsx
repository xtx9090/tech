
import React, { useState, useEffect, useRef } from 'react';

const SystemLog: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const fakeLogs = [
    "LINK_ESTABLISHED: NODE_SYD_01",
    "DECODING_PACKET: 0x88F2A... [OK]",
    "SATELLITE_SWEEP: 12% COMPLETE",
    "NEURAL_SYNC: NOMINAL",
    "LATENCY: 42MS [GLOBAL_LINK]",
    "SECURITY_CHECK: AES_256_ACTIVE",
    "DATA_INGESTION: VEO_BUFFER_LOADED",
    "CORE_TEMP: 32C [OPTIMAL]",
    "UPLINK_STRENGTH: 98%",
    "BYPASSING_FIREWALL... [SUCCESS]",
    "SIGNAL_STRENGTH: CARRIER_DETECTED",
    "INDEX_REFRESH: ARCHIVE_S01"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = fakeLogs[Math.floor(Math.random() * fakeLogs.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-15), `[${timestamp}] ${newLog}`]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-black/60 border border-cyan-900/30 p-4 font-mono text-[8px] h-48 overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#050b15]/40"></div>
      <div className="text-cyan-900 mb-2 uppercase tracking-widest flex items-center gap-2 border-b border-cyan-900/20 pb-1">
        <i className="fas fa-microchip animate-pulse"></i> Realtime_Kernel_Log
      </div>
      <div className="space-y-1 opacity-50 group-hover:opacity-100 transition-opacity">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-cyan-500/50">{'>'}</span>
            <span className={log.includes('[OK]') || log.includes('SUCCESS') ? 'text-emerald-500' : 'text-cyan-400'}>
              {log}
            </span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default SystemLog;
