import { Card, Tag, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Post } from '../Types/types';
import './PostCard.css'; // 新增的CSS文件

const { Meta } = Card;

const typeMap: Record<Post['type'], string> = {
  circuit: '硬件设计',
  algorithm: '算法专栏',
  career: '就业情报',
  ai: 'AI实验室'
};

const typeColors: Record<Post['type'], string> = {
  circuit: 'blue',
  algorithm: 'green',
  career: 'orange',
  ai: 'purple'
};

export default function PostCard({ post }: { post: Post }) {
  const getPreviewImage = (type: Post['type']) => {
    const images = {
      circuit: '🔌',
      algorithm: '📊',
      career: '💼',
      ai: '🤖'
    };
    return images[type];
  };

  return (
    <Card
      className="post-card"
      cover={
        <div className="post-cover">
          <div className="post-type-icon">
            {getPreviewImage(post.type)}
          </div>
        </div>
      }
      actions={[
        <Button type="text" icon={<LikeOutlined />} key="like">
          {post.upvotes}
        </Button>,
        <Button type="text" icon={<MessageOutlined />} key="comment">
          评论
        </Button>,
        <Button type="text" icon={<EyeOutlined />} key="view">
          查看
        </Button>
      ]}
    >
      <Tag color={typeColors[post.type]} className="post-type-tag">
        {typeMap[post.type]}
      </Tag>

      <Meta
        title={
          <Link to={`/post/${post.id}`} className="post-title">
            {post.title}
          </Link>
        }
        description={
          <div className="post-content">
            <p className="post-excerpt">
              {post.content.slice(0, 120)}
              {post.content.length > 120 ? '...' : ''}
            </p>

            <div className="post-tags">
              {post.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} className="post-tag">
                  #{tag}
                </Tag>
              ))}
              {post.tags.length > 3 && (
                <span className="more-tags">+{post.tags.length - 3}更多</span>
              )}
            </div>

            <div className="post-meta">
              <div className="post-author">
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{post.author}</span>
              </div>
              <div className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        }
      />
    </Card>
  );
}