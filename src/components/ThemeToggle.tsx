import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useThemeStore } from '../stores/themeStore';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <Button
            type="text"
            icon={theme === 'light' ? <BulbOutlined /> : <BulbFilled />}
            onClick={toggleTheme}
            style={{ color: 'var(--color-text-primary)' }}
            title={`切换到${theme === 'light' ? '深色' : '浅色'}模式`}
        >
            {/* 如果需要文字可以取消注释 */}
            {/* {theme === 'light' ? '深色模式' : '浅色模式'} */}
        </Button>
    );
}