import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from '@uiw/react-markdown-preview';
import { Card, Tag } from 'antd';
import { api } from '../api';
import type { Post } from '../Types/types';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;
    api.getPostById(id).then(p => setPost(p ?? null));
  }, [id]);

  if (!post) return <div className="container mx-auto px-4 py-8">加载中或内容不存在。</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card title={post.title}>
        <div className="mb-3">{post.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
        <Markdown source={post.content} />
        <div className="text-xs text-gray-400 mt-4">
          作者：{post.author} · {new Date(post.createdAt).toLocaleString()}
        </div>
      </Card>
    </div>
  );
}
