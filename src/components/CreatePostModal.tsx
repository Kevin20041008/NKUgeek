import { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import MarkdownEditor from './MarkdownEditor';
import { api } from '../api';
// 如果 api.ts 在 src 目录下，请使用 import { api } from '../../api';
// 或根据你的实际文件结构调整路径
import type { PostType, Post } from '../Types/types';
// 如果 types/types.ts 在 src 目录下，请使用 import type { PostType, Post } from '../../types/types';
// 或根据你的实际文件结构调整路径
import useUserStore from '../stores/userStore';

const { Option } = Select;

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSuccess: (post: Post) => void;
}

export default function CreatePostModal({ visible, onCancel, onSuccess }: Props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { currentUser, addPoints } = useUserStore();

  const postTypes: { value: PostType; label: string }[] = [
    { value: 'circuit', label: '硬件设计' },
    { value: 'algorithm', label: '算法专栏' },
    { value: 'career', label: '就业情报' },
    { value: 'ai', label: 'AI实验室' }
  ];
  const calcPoints = (t: PostType) => 10 + (t === 'circuit' ? 15 : 5);

  const handleSubmit = async (v: { title: string; type: PostType; tags: string; content: string }) => {
    if (!currentUser) return;
    try {
      setSubmitting(true);
      const newPost = await api.createPost({
        title: v.title,
        type: v.type,
        content: v.content,
        tags: v.tags.split(',').map(s => s.trim()).filter(Boolean),
        author: currentUser.studentId
      });
      addPoints(calcPoints(v.type));
      message.success('发布成功！');
      onSuccess(newPost);
    } catch (e) {
      message.error(e instanceof Error ? e.message : '发布失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="发布新内容" open={visible} onCancel={onCancel} width={800} footer={null} destroyOnClose>
      <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ tags: '' }}>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder="请输入内容标题" />
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择内容类型' }]}>
          <Select placeholder="请选择内容类型">
            {postTypes.map(t => <Option key={t.value} value={t.value}>{t.label}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="标签" name="tags" extra="多个标签用逗号分隔，例如：PCB设计,STM32,物联网">
          <Input placeholder="输入相关标签" />
        </Form.Item>
        <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入内容' }]}
          valuePropName="value" getValueFromEvent={(v) => (typeof v === 'string' ? v : '')}>
          <MarkdownEditor />
        </Form.Item>
        <div className="flex justify-end mt-6">
          <Button onClick={onCancel} className="mr-2">取消</Button>
          <Button type="primary" htmlType="submit" loading={submitting}>发布</Button>
        </div>
      </Form>
    </Modal>
  );
}
