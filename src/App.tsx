import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import ThemeProvider from './components/ThemeProvider';
import { useThemeStore } from './stores/themeStore';
import './index.css';


export default function App() {
  // 在 App 组件内获取当前主题
  const { theme } = useThemeStore();

  // 根据主题动态配置 Ant Design 的主题
  const antdThemeConfig = {
    token: {
      colorPrimary: '#6C3082',
    },
    algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <ThemeProvider /> {/* 添加这里 */}
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow" style={{ background: 'var(--color-bg-primary)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </main>
          <footer
            className="py-6 text-center"
            style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-border)' }}
          >
            <div className="container mx-auto">
              <p>南开极客社区 &copy; {new Date().getFullYear()}</p>
              <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                计算机与网络空间安全学院 & 人工智能学院 & 软件学院 & 电子信息与光学学院
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}