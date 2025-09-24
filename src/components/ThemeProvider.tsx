import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

export default function ThemeProvider() {
    const { theme } = useThemeStore();

    useEffect(() => {
        // 将主题状态应用到整个文档
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return null; // 此组件不渲染任何UI
}