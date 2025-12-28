
import React, { useState, useEffect } from 'react';

interface RightSideProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleAside: () => void;
}

const RightSide: React.FC<RightSideProps> = ({ isDarkMode, toggleDarkMode, toggleAside }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPercent(Math.round(scrolled));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isCrtEnabled) {
      document.body.classList.add('scanlines');
    } else {
      document.body.classList.remove('scanlines');
    }
  }, [isCrtEnabled]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-10 right-8 z-[1000] flex flex-col space-y-3">
      <div className={`flex flex-col space-y-3 transition-all duration-300 origin-bottom ${showConfig ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <button 
          onClick={() => setIsCrtEnabled(!isCrtEnabled)}
          className={`w-10 h-10 glass rounded-lg shadow-lg flex items-center justify-center transition-all ${isCrtEnabled ? 'bg-cyan-500 text-black' : 'hover:bg-cyan-500 hover:text-white'}`}
          title="CRT 视觉调制"
        >
          <i className="fas fa-tv"></i>
        </button>
        <button 
          onClick={toggleDarkMode}
          className="w-10 h-10 glass rounded-lg shadow-lg hover:bg-cyan-500 hover:text-white transition-all"
          title="明暗模式"
        >
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-adjust'}`}></i>
        </button>
        <button 
          onClick={toggleAside}
          className="w-10 h-10 glass rounded-lg shadow-lg hover:bg-cyan-500 hover:text-white transition-all"
          title="侧边栏切换"
        >
          <i className="fas fa-arrows-alt-h"></i>
        </button>
      </div>
      
      <button 
        onClick={() => setShowConfig(!showConfig)}
        className="w-10 h-10 glass rounded-lg shadow-lg hover:rotate-90 transition-all text-cyan-500 border border-cyan-500/20"
      >
        <i className="fas fa-cog"></i>
      </button>
      
      <button 
        onClick={scrollToTop}
        className="w-10 h-10 glass rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-cyan-500 hover:text-white transition-all border border-cyan-500/20"
      >
        <span className="text-[10px] font-cyber font-bold">{scrollPercent}%</span>
        <i className="fas fa-arrow-up text-xs"></i>
      </button>
    </div>
  );
};

export default RightSide;
