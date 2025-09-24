import { useState } from 'react';
import { Button, Avatar, Badge, Dropdown, MenuProps, Space } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined, BellOutlined } from '@ant-design/icons';
import AuthModal from './AuthModal';
import useUserStore from '../stores/userStore';
import ThemeToggle from './ThemeToggle'; // 导入主题切换组件
import './Navbar.css';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useUserStore();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人中心',
      icon: <UserOutlined />
    },
    {
      key: 'notifications',
      label: '通知',
      icon: <BellOutlined />
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: logout
    }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className="navbar"
      style={{
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo">
            <span className="logo-icon">💻</span>
            <span className="logo-text" style={{ color: 'var(--color-text-primary)' }}>
              南开极客社区
            </span>
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            style={{ color: 'var(--color-text-primary)' }}
          >
            <MenuOutlined />
          </button>
        </div>

        <nav
          className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}
          style={{ background: 'var(--color-bg-secondary)' }}
        >
          <a href="/" className="nav-link active" style={{ color: 'var(--color-text-primary)' }}>
            首页
          </a>
          <a href="#" className="nav-link" style={{ color: 'var(--color-text-primary)' }}>
            硬件设计
          </a>
          <a href="#" className="nav-link" style={{ color: 'var(--color-text-primary)' }}>
            算法专栏
          </a>
          <a href="#" className="nav-link" style={{ color: 'var(--color-text-primary)' }}>
            就业情报
          </a>
          <a href="#" className="nav-link" style={{ color: 'var(--color-text-primary)' }}>
            AI实验室
          </a>
        </nav>

        <div className="navbar-actions">
          {/* 添加主题切换按钮 */}
          <ThemeToggle />

          {isAuthenticated ? (
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
              <div className="user-profile">
                <Badge count={currentUser?.points} className="points-badge">
                  <Avatar
                    className="user-avatar"
                    icon={<UserOutlined />}
                  />
                </Badge>
                <div className="user-info">
                  <span className="user-name" style={{ color: 'var(--color-text-primary)' }}>
                    {currentUser?.displayName}
                  </span>
                  {currentUser?.role === 'alumni' && (
                    <span className="alumni-badge">校友</span>
                  )}
                </div>
              </div>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              className="login-btn"
              onClick={() => setAuthModalVisible(true)}
            >
              学号登录
            </Button>
          )}
        </div>
      </div>

      <AuthModal
        visible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
      />
    </header>
  );
}