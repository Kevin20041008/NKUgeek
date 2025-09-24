import { useEffect, useMemo, useState } from 'react';
import { Tabs, Button, Card, List, Empty, Tag, Space } from 'antd';
import { PlusOutlined, FireOutlined, StarOutlined } from '@ant-design/icons';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import { api } from '../api';
import useUserStore from '../stores/userStore';
import type { Post, PostType } from '../Types/types';
import './Home.css'; // 新增的CSS文件

const { TabPane } = Tabs;

const typeLabels: Record<PostType | 'all' | 'featured', string> = {
  all: '全部',
  circuit: '硬件设计',
  algorithm: '算法专栏',
  career: '就业情报',
  ai: 'AI实验室',
  featured: '精选内容'
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<PostType | 'all' | 'featured'>('all');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await api.getPosts();
        setPosts(data);
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeTab === 'all') return posts;
    if (activeTab === 'featured') return posts.filter(post => post.upvotes > 10);
    return posts.filter(post => post.type === activeTab);
  }, [posts, activeTab]);

  const handleCreateSuccess = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setCreateModalVisible(false);
  };

  return (
    <div className="home-container">
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>南开极客社区</h1>
          <p>分享技术创意，交流学术思想，连接南开学子</p>
          {isAuthenticated ? (
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              发布新内容
            </Button>
          ) : (
            <Space>
              <Button type="primary" size="large">
                立即加入
              </Button>
              <Button size="large">
                了解更多
              </Button>
            </Space>
          )}
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <FireOutlined />
            <span>热门讨论</span>
          </div>
          <div className="floating-card card-2">
            <StarOutlined />
            <span>优质内容</span>
          </div>
          <div className="hero-image">
            💻
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="content-section">
        <div className="section-header">
          <h2>社区内容</h2>
          <p>探索南开学子的创意与成果</p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab as any}
          className="content-tabs"
          tabBarExtraContent={
            isAuthenticated && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateModalVisible(true)}
                className="create-btn"
              >
                发布新内容
              </Button>
            )
          }
        >
          {Object.entries(typeLabels).map(([key, label]) => (
            <TabPane tab={label} key={key} />
          ))}
        </Tabs>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>加载中...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <Empty
            description="暂无内容，成为第一个发布者吧！"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            {isAuthenticated && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateModalVisible(true)}
              >
                发布新内容
              </Button>
            )}
          </Empty>
        ) : (
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {isAuthenticated && (
        <CreatePostModal
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </div>
  );
}