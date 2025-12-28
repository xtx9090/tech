
import React from 'react';
import { Post } from '../types';
import LazyImage from './LazyImage';

interface PostCardProps {
  post: Post;
  layout: 'left' | 'right';
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, layout, onClick }) => {
  const imageSide = (
    <div className="w-full lg:w-1/2 overflow-hidden h-64 lg:h-auto cursor-pointer relative group" onClick={onClick}>
      <LazyImage 
        src={post.cover} 
        alt={post.title} 
        className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {/* HUD 装饰元素 */}
      <div className="absolute top-4 left-4 border-l-2 border-t-2 border-cyan-400 w-4 h-4"></div>
      <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-cyan-400 w-4 h-4"></div>
    </div>
  );

  const contentSide = (
    <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center relative bg-black/40 backdrop-blur-md">
      <div className="flex flex-wrap gap-3 text-[10px] font-cyber text-cyan-400 uppercase tracking-tighter mb-4">
        <span className="flex items-center gap-1"><i className="far fa-calendar-alt"></i> {post.date}</span>
        <span className="text-purple-400"># {post.categories[0]}</span>
      </div>
      
      <h2 
        className="text-2xl font-bold mb-4 hover:text-cyan-300 transition-colors cursor-pointer leading-tight"
        onClick={onClick}
      >
        <span className="mr-2 text-cyan-500 font-cyber opacity-50">/</span>
        {post.title}
      </h2>
      
      <p className="text-zinc-400 line-clamp-2 text-sm leading-relaxed mb-6 border-l border-zinc-700 pl-4">
        {post.content}
      </p>

      <div className="flex items-center text-[10px] font-cyber text-zinc-500 space-x-6">
        <span className="hover:text-cyan-400 transition-colors"><i className="far fa-eye mr-2"></i>{post.views}</span>
        <span className="hover:text-purple-400 transition-colors"><i className="far fa-comments mr-2"></i>{post.comments}</span>
        <span className="text-zinc-300">USER_ID: {post.author.split(' ')[0]}</span>
      </div>
      
      {/* 装饰条 */}
      <div className="absolute top-0 right-0 w-16 h-[2px] bg-gradient-to-l from-cyan-500 to-transparent"></div>
    </div>
  );

  return (
    <div className="hud-border cyber-glow overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto lg:h-72 animate-fade-in mb-8">
      {layout === 'left' ? (
        <>
          {imageSide}
          {contentSide}
        </>
      ) : (
        <>
          <div className="hidden lg:block w-full lg:w-1/2">
            {contentSide}
          </div>
          <div className="lg:hidden">
            {imageSide}
            {contentSide}
          </div>
          <div className="hidden lg:block w-full lg:w-1/2">
            {imageSide}
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
