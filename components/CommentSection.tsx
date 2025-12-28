
import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  userName: string;
  content: string;
  timestamp: string;
  userId: string;
}

interface CommentSectionProps {
  storageKey: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ storageKey }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`comments_${storageKey}`);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsUploading(true);

    // 模拟网络延迟
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        userName: userName.trim() || 'Anonymous_User',
        content: content.trim(),
        timestamp: new Date().toLocaleString(),
        userId: Math.random().toString(36).substring(2, 8).toUpperCase(),
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      localStorage.setItem(`comments_${storageKey}`, JSON.stringify(updated));
      setContent('');
      setIsUploading(false);
    }, 800);
  };

  return (
    <div className="mt-16 space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 font-cyber text-[10px] text-cyan-500 uppercase tracking-[0.2em]">
        <i className="fas fa-comments"></i> [COM_LINK_ESTABLISHED] / {comments.length} MESSAGES
      </div>

      {/* 发表评论表单 */}
      <form onSubmit={handleSubmit} className="hud-border bg-black/40 p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2 text-[8px] font-cyber text-cyan-900 uppercase">IDENTIFIER</span>
            <input
              type="text"
              placeholder="YOUR_ID..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-cyan-950/20 border border-cyan-900/30 p-4 pt-6 font-cyber text-sm text-cyan-100 outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-2 text-[8px] font-cyber text-cyan-900 uppercase">TRANSMISSION_DATA</span>
          <textarea
            rows={3}
            placeholder="ENTER_MESSAGE..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-cyan-950/20 border border-cyan-900/30 p-4 pt-6 font-cyber text-sm text-cyan-100 outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUploading}
            className={`px-8 py-2 hud-border font-cyber text-xs uppercase tracking-widest transition-all ${
              isUploading 
                ? 'text-zinc-600 border-zinc-800' 
                : 'text-cyan-500 hover:bg-cyan-500 hover:text-black'
            }`}
          >
            {isUploading ? 'UPLOADING...' : 'SEND_MESSAGE'}
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-cyan-900/20 text-cyan-900/50 font-cyber text-[10px] tracking-widest">
            NO_DATA_LOGS_FOUND_IN_THIS_SECTOR
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="relative group p-4 border-l border-cyan-900/30 hover:border-cyan-500 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-900/20 border border-cyan-500/30 flex items-center justify-center font-cyber text-[10px] text-cyan-500">
                    {comment.userName.charAt(0)}
                  </div>
                  <div>
                    <span className="font-cyber text-xs text-cyan-100 block">{comment.userName}</span>
                    <span className="text-[8px] font-cyber text-cyan-900 uppercase tracking-tighter">NODE_ID: {comment.userId}</span>
                  </div>
                </div>
                <span className="text-[8px] font-cyber text-zinc-600 uppercase">{comment.timestamp}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed pl-11">
                {comment.content}
              </p>
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-10 transition-opacity">
                <i className="fas fa-terminal text-cyan-500"></i>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
