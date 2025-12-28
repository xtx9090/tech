
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-10 glass border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <div className="text-gray-600 dark:text-gray-400">
          ©2025 By 智芯视界 (IntelliCore Horizon)
        </div>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
          <span>由 React + Tailwind 强力驱动</span>
          <span className="w-px h-4 bg-gray-300"></span>
          <span>视觉风格：Butterfly Next-Gen</span>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
            <i className="fab fa-weibo"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
