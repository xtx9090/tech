
import { Post, SiteStats } from './types';

export const SITE_NAME = "智芯视界 (IntelliCore Horizon)";
export const SITE_SUBTITLE = "解析 System 2 慢思考，探索 AGI 终局之战";
export const AUTHOR_NAME = "矩阵观测员 (Matrix Observer)";
export const AUTHOR_BIO = "专注于 AGI 架构与硅基文明进化的深度观测者。致力于在碳基与硅基的碰撞中寻找文明的延续路径。";

export const CATEGORIES = [
  "推理模型 (Reasoning LLMs)",
  "大型行动模型 (LAM/Agents)",
  "世界模拟器 (World Models)",
  "具身智能 (Embodied AI)",
  "量子硅基架构 (Silicon v2.0)"
];

export const POSTS: Post[] = [
  {
    id: 30,
    title: "System 2 觉醒：OpenAI o1 与思维链推理的范式转移",
    date: "2025-01-12",
    updateDate: "2025-01-12",
    categories: ["推理模型"],
    author: "Matrix Observer",
    views: 89400,
    comments: 521,
    content: "解析 AI 如何从‘快思考’的概率预测转向‘慢思考’的逻辑推演。o1 系列模型的出现，标志着 Scaling Law 正从训练端向推理端漂移。",
    fullContent: `## 慢思考：AI 的理性时刻\n\n长期以来，LLM 被诟病为“只会说漂亮话的随机鹦鹉”。但随着 o1 模型的发布，推理时计算 (Inference-time Compute) 正式成为 AGI 的第二引擎。\n\n### 技术演进路径\n1. **思维链强化训练**：通过大规模强化学习，模型学会了在回答前进行自我检索和纠错。\n2. **搜索空间探索**：不再单纯预测下一个词，而是在潜在的逻辑路径中进行启发式搜索。\n\n> “我们不再只是给模型喂知识，而是教它如何利用现有的知识去‘思考’。”\n\n在复杂的数学证明、代码重构和生物合成领域，o1 展现出的“慢思考”能力已经跨越了人类博士级的门槛。这不仅是模型规模的胜利，更是算法哲学的转变。`,
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 29,
    title: "具身智能：让 Transformer 穿上机器人的‘钢铁外衣’",
    date: "2024-12-28",
    updateDate: "2025-01-05",
    categories: ["具身智能"],
    author: "Robotics Arch",
    views: 42100,
    comments: 215,
    content: "VLA（视觉-语言-动作）模型的成熟，让机器人开始真正理解模糊的人类指令。从 Figure 02 到 Tesla Optimus，物理世界正成为 AI 的新试验场。",
    fullContent: `## 物理世界的“母体”接入\n\n如果说 LLM 是没有实体的“缸中之脑”，那么具身智能则是 AI 走出数字荒野的第一步。\n\n### 核心突破点\n- **VLA 多模态融合**：模型能够直接将视觉信号转化为机械臂的扭矩控制指令。\n- **数据飞轮**：通过遥操作和仿真数据，机器人在 Sim2Real 的过程中完成了数亿次的物理交互演练。\n\n> “未来的工厂不再需要流水线，只需要一群具备自适应能力的机器人。它们不被预设程序驱动，而是被语义目标驱动。”\n\n当 AI 拥有了能够感知并改变物理世界的身体，AGI 的定义将从“数字智能”扩展到“物理全才”。`,
    cover: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 28,
    title: "世界模拟器：从 Sora 到 Veo 的物理引擎革命",
    date: "2024-12-15",
    updateDate: "2024-12-15",
    categories: ["世界模拟器"],
    author: "Simulation Expert",
    views: 56300,
    comments: 342,
    content: "视频生成模型不再仅仅是内容生产工具，它们正在进化为对物理世界规律的模拟器。解析扩散模型如何学会‘重力’与‘惯性’。",
    fullContent: `## 模拟：认知的终极手段\n\nSora 的横空出世，让人们意识到视频生成模型本质上是在学习物理世界的 4D 几何与动态演化。Veo 等后续模型则进一步强化了这一能力。\n\n### 关键技术：Spacetime Latent Patches\n通过将空间和时间切片化，模型在潜空间中构建了一个可以自由演化的物理闭环。这不仅仅是像素的堆砌，而是对因果律的数学建模。\n\n> “如果我们能完美地模拟一个世界，我们就拥有了预测未来的权杖。”\n\n这种能力将直接反哺自动驾驶和机器人训练，让 AI 在进入现实世界前，已经在成千上万个平行宇宙中经历过所有的极端长尾场景。`,
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
  }
];

export const STATS: SiteStats = {
  postCount: 30,
  runtime: 245,
  wordCount: "48.2 W",
  totalViews: 1240500
};
