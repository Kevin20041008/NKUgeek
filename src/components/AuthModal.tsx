import { Modal, Input, Button, Form, message } from 'antd';
import type { AuthData } from '../Types/types';
// Update the import path to the correct relative path if '@/api' does not exist
import { api } from '../api';
// If your api file is in a different location, adjust the path accordingly, e.g.:
// import { api } from '../../api';
// import { api } from './api';
import useUserStore from '../stores/userStore';
import { isNKUId } from '../Utils/auth';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function AuthModal({ visible, onClose }: Props) {
  const [form] = Form.useForm<AuthData>();
  const { login } = useUserStore();

  const handleSubmit = async (values: AuthData) => {
    try {
      if (!isNKUId(values.studentId)) throw new Error('请输入有效的南开大学学号 (7位数字)');
      const user = await api.login(values);
      login(user);
      message.success(`欢迎回来，${user.displayName}！`);
      onClose();
    } catch (e) {
      message.error(e instanceof Error ? e.message : '登录失败');
    }
  };

  return (
    <Modal title="南开大学认证" open={visible} onCancel={onClose} footer={null} centered>
      <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ studentId: '', password: '123456' }}>
        <Form.Item label="学号" name="studentId" rules={[{ required: true, message: '请输入您的学号' }]}>
          <Input placeholder="2020xxxxxx" maxLength={10} />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="初始密码为123456" />
        </Form.Item>
        <div className="text-gray-500 text-xs mb-4">提示：首次登录使用初始密码，登录后可修改</div>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>登录 / 注册</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
