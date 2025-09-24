import useUserStore from '../stores/userStore';
import { Card } from 'antd';

export default function Profile() {
  const { currentUser, isAuthenticated } = useUserStore();

  if (!isAuthenticated || !currentUser) {
    return <div className="container mx-auto px-4 py-8">请先登录。</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="个人中心">
        <p>学号：{currentUser.studentId}</p>
        <p>昵称：{currentUser.displayName}</p>
        <p>积分：{currentUser.points}</p>
        <p>身份：{currentUser.role}</p>
        {currentUser.graduationYear && <p>毕业年份：{currentUser.graduationYear}</p>}
      </Card>
    </div>
  );
}
