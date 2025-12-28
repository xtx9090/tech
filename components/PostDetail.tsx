
import React from 'react';
import { Post } from '../types';
import LazyImage from './LazyImage';
import CommentSection from './CommentSection';
import AIAnalysisConsole from './AIAnalysisConsole';
import VeoGenerator from './VeoGenerator';
import DeepIntel from './DeepIntel';
import NeuralPodcast from './NeuralPodcast';

interface PostDetailProps { post: Post; onBack: () => void; }

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\$.*?\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="text-cyan-300 font-bold">{part.slice(2, -2)}</strong>;
      if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="bg-cyan-950/50 text-cyan-400 px-2 py-0.5 rounded font-mono text-sm border border-cyan-900/30">{part.slice(1, -1)}</code>;
      return part;
    });
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const originalLine = lines[i];
      const line = originalLine.trim();
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${i}`} className="my-8 relative group">
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-cyan-900 text-[10px] font-cyber text-cyan-100 uppercase rounded">SOURCE_CODE</div>
              <pre className="bg-black/60 border border-cyan-900/50 p-6 pt-8 rounded-lg overflow-x-auto text-cyan-100 font-mono text-sm shadow-inner"><code>{codeBuffer.join('\n')}</code></pre>
            </div>
          );
          codeBuffer = []; inCodeBlock = false;
        } else inCodeBlock = true;
        continue;
      }
      if (inCodeBlock) { codeBuffer.push(originalLine); continue; }
      if (line === '') continue;
      if (line.startsWith('## ')) elements.push(<h2 key={i} className="text-3xl font-cyber font-bold mt-12 mb-8 text-cyan-400 flex items-center gap-4"><span className="text-xs opacity-30">01_</span> {parseInline(line.replace('## ', ''))}</h2>);
      else if (line.startsWith('### ')) elements.push(<h3 key={i} className="text-xl font-cyber font-bold mt-10 mb-6 text-purple-400 flex items-center gap-3"><span className="w-4 h-[1px] bg-purple-900"></span>{parseInline(line.replace('### ', ''))}</h3>);
      else if (line.startsWith('> ')) elements.push(<blockquote key={i} className="border-l-2 border-cyan-500 bg-cyan-950/10 p-6 my-8 italic text-zinc-400 relative"><i className="fas fa-terminal absolute top-2 right-4 text-cyan-900/30"></i>{parseInline(line.replace('> ', ''))}</blockquote>);
      else elements.push(<p key={i} className="text-zinc-400 leading-relaxed mb-6 text-base tracking-wide">{parseInline(line)}</p>);
    }
    return elements;
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto relative">
      <button onClick={onBack} className="font-cyber text-[10px] text-cyan-500 hover:text-cyan-400 transition-all mb-8 flex items-center gap-2 group">
        <span className="group-hover:-translate-x-1 transition-transform">{'<<'}</span> [RETURN_TO_ARCHIVE]
      </button>

      <article className="bg-black/40 backdrop-blur-xl hud-border shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        <div className="h-[40vh] w-full overflow-hidden relative">
          <LazyImage src={post.cover} alt={post.title} className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <div className="text-[10px] font-cyber text-cyan-500 mb-4 tracking-[0.3em] uppercase">Project_{post.id} / {post.categories[0]}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>

        <div className="p-10 md:p-16">
          <div className="flex flex-wrap items-center gap-8 text-[10px] font-cyber text-zinc-500 border-b border-cyan-900/30 pb-10 mb-10">
            <div className="flex items-center gap-2"><i className="fas fa-clock text-cyan-500"></i> TIMESTAMP: {post.date}</div>
            <div className="flex items-center gap-2"><i className="fas fa-satellite text-purple-500"></i> VIEW_COUNT: {post.views}</div>
            <div className="flex items-center gap-2"><i className="fas fa-id-badge text-emerald-500"></i> OPERATOR: {post.author.split(' ')[0]}</div>
          </div>

          <AIAnalysisConsole content={post.fullContent} title={post.title} />
          
          {/* 智能对谈播客引擎 */}
          <NeuralPodcast postTitle={post.title} postContent={post.fullContent} />

          <VeoGenerator title={post.title} />
          <div className="prose prose-invert max-w-none">{renderContent(post.fullContent)}</div>
          <DeepIntel title={post.title} />

          <div className="mt-20 pt-10 border-t border-cyan-900/30 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-5">
              <LazyImage src="https://picsum.photos/seed/matrix/100/100" className="w-14 h-14 rounded-full border border-cyan-500/50" alt="avatar" />
              <div>
                <div className="text-lg font-bold text-white">{post.author}</div>
                <div className="text-[10px] font-cyber text-cyan-900 uppercase">Lead_Analyst @ IntelliCore</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 hud-border font-cyber text-[10px] text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all border-cyan-900">FOLLOW_STREAM</button>
              <button className="px-6 py-2 hud-border font-cyber text-[10px] text-purple-500 hover:bg-purple-500 hover:text-black transition-all">LINK_INTEL</button>
            </div>
          </div>
          <CommentSection storageKey={`post_${post.id}`} />
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
