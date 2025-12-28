
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import RightSide from './components/RightSide';
import PostDetail from './components/PostDetail';
import About from './components/About';
import AITerminal from './components/AITerminal';
import NeuralSimulator from './components/NeuralSimulator';
import SiliconFabricator from './components/SiliconFabricator';
import { POSTS } from './constants';
import { Post } from './types';

// 定义全局类型以解决 TypeScript 编译错误
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

type View = 'list' | 'post' | 'about';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAsideHidden, setIsAsideHidden] = useState(false);
  const [view, setView] = useState<View>('list');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isKeySelected, setIsKeySelected] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        try {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setIsKeySelected(hasKey);
        } catch (e) {
          console.error("Failed to check API key status", e);
        }
      } else {
        // @ts-ignore
        const key = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
        setIsKeySelected(!!key);
      }
    };
    checkApiKey();

    // 监听全局 API 错误事件，用于处理指令要求的 Key 重置逻辑
    const handleApiKeyError = (e: Event) => {
      const errorMsg = (e as CustomEvent).detail?.message || '';
      if (errorMsg.includes("Requested entity was not found")) {
        setIsKeySelected(false);
        if (window.aistudio) {
          window.aistudio.openSelectKey().then(() => setIsKeySelected(true));
        }
      }
    };

    window.addEventListener('API_KEY_ERROR', handleApiKeyError);
    return () => window.removeEventListener('API_KEY_ERROR', handleApiKeyError);
  }, []);

  const handleConnectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        setIsKeySelected(true);
      } catch (e) {
        console.error("Failed to open API key selection", e);
      }
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setView('post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setView('list');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoAbout = () => {
    setView('about');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = POSTS.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(POSTS.length / postsPerPage);

  return (
    <div className={`min-h-screen relative z-10 ${isDarkMode ? 'dark bg-[#050b15] text-zinc-100' : 'bg-gray-50 text-gray-800'}`}>
      {!isKeySelected && window.aistudio && (
        <div className="fixed inset-0 z-[2000] bg-[#050b15]/95 backdrop-blur-3xl flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-8 hud-border p-10 bg-black/60 shadow-[0_0_100px_rgba(0,243,255,0.2)]">
            <div className="w-20 h-20 bg-cyan-950 rounded-full flex items-center justify-center mx-auto border border-cyan-500/30 animate-pulse">
              <i className="fas fa-key text-cyan-500 text-3xl"></i>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-cyber font-bold text-white tracking-tighter">API_ACCESS_REQUIRED</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                为了体验全功能的视频生成与 AGI 模拟器，请连接您的 Google AI Studio 结算项目 API Key。
              </p>
            </div>
            <button 
              onClick={handleConnectKey}
              className="w-full py-4 bg-cyan-500 text-black font-cyber font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]"
            >
              [ CONNECT_NEURAL_LINK ]
            </button>
            <p className="text-[10px] text-zinc-600">
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 underline">查看计费文档</a>
            </p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 -z-10 bg-[#050b15] tech-grid opacity-20"></div>
      <Header onHome={handleGoHome} onAbout={handleGoAbout} />
      
      <main className="max-w-7xl mx-auto px-6 py-10 lg:flex gap-12 min-h-[60vh]">
        <div className={`flex-1 transition-all duration-700 ${isAsideHidden ? 'w-full' : ''}`}>
          {view === 'post' && selectedPost ? (
            <PostDetail post={selectedPost} onBack={handleGoHome} />
          ) : view === 'about' ? (
            <About />
          ) : (
            <div className="space-y-12">
              <div className="hud-border bg-black/40 p-4 border-l-4 border-cyan-500 font-mono text-[10px] text-cyan-400 mb-8 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <span className="opacity-50 tracking-widest uppercase">/ CONNECTION_ESTABLISHED /</span>
                  <span className="text-zinc-600">IP: {Math.floor(Math.random()*255)}.XXX.XXX.1</span>
                </div>
                <div className="space-y-1">
                  <p>{">"} LOADING_CORE_DATABASE... [SUCCESS]</p>
                  <p>{">"} SCANNING_NEURAL_TOPOLOGY... [OK]</p>
                  <p>{">"} WELCOME_OPERATOR: GUEST_ID_{Math.floor(Math.random()*10000)}</p>
                  <p className="animate-pulse">{">"} READY_FOR_DEEP_DIVE_...</p>
                </div>
              </div>

              <NeuralSimulator />
              <SiliconFabricator />
              
              <div className="border-b border-cyan-900/20 pb-4 mb-8 flex justify-between items-end">
                <h2 className="font-cyber text-lg text-white flex items-center gap-3">
                  <i className="fas fa-stream text-cyan-500"></i> PRIMARY_DATA_FEED
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {currentPosts.map((post, index) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    layout={index % 2 === 0 ? 'left' : 'right'} 
                    onClick={() => handlePostClick(post)}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <nav className="flex justify-center mt-20">
                  <div className="flex space-x-3 items-center">
                    <button 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 hud-border flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'text-cyan-500 hover:bg-cyan-500 hover:text-black'}`}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`w-10 h-10 hud-border font-cyber text-xs transition-all ${
                          currentPage === num 
                            ? 'bg-cyan-500 text-black border-cyan-500' 
                            : 'text-zinc-500 hover:text-cyan-500 border-zinc-900'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 hud-border flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'text-cyan-500 hover:bg-cyan-500 hover:text-black'}`}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </nav>
              )}
            </div>
          )}
        </div>

        {!isAsideHidden && (
          <aside className="hidden lg:block w-80 shrink-0">
            <Sidebar onPostClick={handlePostClick} />
          </aside>
        )}
      </main>

      <Footer />
      <RightSide 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        toggleAside={() => setIsAsideHidden(!isAsideHidden)}
      />
      
      <AITerminal />
    </div>
  );
};

export default App;
