import http from './http';
import type { Post, User, AuthData } from '../Types/types';

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';
const now = () => new Date().toISOString();

// mock 数据
const mockUsers: User[] = [
  { studentId: '2020123456', displayName: '张三', points: 100, role: 'student', createdAt: now() }
];
const mockPosts: Post[] = [
  {
    id: '1',
    title: '基于STM32的智能家居控制器设计',
    content: '这是我设计的智能家居控制器...',
    author: '2020123456',
    type: 'circuit',
    tags: ['STM32', '物联网', 'PCB设计'],
    upvotes: 300,
    createdAt: now()
  }
];
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const api = {
  async login(authData: AuthData): Promise<User> {
    if (USE_MOCK) {
      const user = mockUsers.find(u => u.studentId === authData.studentId);
      if (!user) throw new Error('用户不存在');
      localStorage.setItem('token', 'mock-token');
      return user;
    }
    const { data } = await http.post<User>('/auth/login', authData);
    // 真实后端返回 token 时： localStorage.setItem('token', (data as any).token);
    return data;
  },

  async getPosts(): Promise<Post[]> {
    if (USE_MOCK) { await sleep(200); return [...mockPosts]; }
    const { data } = await http.get<Post[]>('/posts'); return data;
  },

  async getPostById(id: string): Promise<Post | undefined> {
    if (USE_MOCK) { await sleep(120); return mockPosts.find(p => p.id === id); }
    const { data } = await http.get<Post>(`/posts/${id}`); return data;
  },

  async createPost(post: Omit<Post, 'id' | 'createdAt' | 'upvotes'>): Promise<Post> {
    if (USE_MOCK) {
      const p: Post = { ...post, id: Math.random().toString(36).slice(2, 11), createdAt: now(), upvotes: 0 };
      mockPosts.unshift(p); return p;
    }
    const { data } = await http.post<Post>('/posts', post); return data;
  }
};
