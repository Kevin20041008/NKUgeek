# 南开极客社区 · NKU Geek Community

一个为南开大学同学打造的综合型技术社区：
 **博客系统** × **GitHub 风代码协作** × **EDA（EasyEDA Viewer）** × **AI（Qwen）助手**。

- 前端：Vite + React + TypeScript + Ant Design 5
- 状态：Zustand（本地持久化）
- Markdown：`@uiw/react-md-editor` & `@uiw/react-markdown-preview`
- UI 主题：深/浅主题一键切换
- 目标功能：
  - 📝 博客/论坛（标签、分类、精选、积分体系、审核）
  - 🧩 EDA：支持嵌入 **EasyEDA Viewer**
  - 🌳 GitHub 风：Repo 文件树浏览/编辑、Issue/评论、Label/Assignee、Stars/Forks 排行
  - 🤖 接入 **Qwen API**（建议经服务端代理）

------

## 功能一览

### 1) 博客 / 社区

- 文章类型：`circuit`（硬件设计）、`algorithm`（算法）、`career`（就业）、`ai`（实验室）
- 首页 **Tabs** 快速筛选：`全部 / 精选 / 各专栏`
- **精选**：根据 `upvotes > 10` 自动入选
- 文章详情：Markdown 渲染，标签、作者、时间展示
- 登录后可**发布新内容**（示例中使用本地 store & mock api）

### 2) EDA：EasyEDA Viewer

- 页面：**EDA Viewer**（支持输入分享链接或分享 ID）
- 自动标准化 EasyEDA 链接；能嵌入 iframe 时直接预览，不允许时给出“新标签打开”
- 本地收藏/加星，项目列表管理（示例）

### 3) GitHub 风模块（里程碑）

- **Repo 文件树**浏览/轻量编辑（草稿/本地保存）
- **Issues**：详情、评论、Label、Assignee
- **排行榜**：Stars / Forks 榜（示例数据或后端接口）
- **权限与积分**：
  - 角色：`student` / `alumni` / `admin`（管理员审核帖/PR/Issue）
  - 积分：发帖 +2 / 点赞 +1 / 解答被采纳 +5 / 违规 -X（可在设置里调）

> 说明：本仓库当前已具备前端页面和类型/存储结构；如需对接真实后端（文件树、Issue、权限、积分流水），请按下文 **API 约定** 接口对接或让我继续补后端模板。

### 4) Qwen API（通义千问）

- 在“AI 实验室/助手”中调用 Qwen 模型（**强烈建议**经你的轻量服务端代理，避免把 API Key 暴露到前端）
- 支持对话、上下文、工具调用（可扩展）

------

## 技术栈

- **构建**：Vite
- **UI**：React + Ant Design 5
- **状态**：Zustand（`persist` 到 `localStorage`）
- **Markdown**：`@uiw/react-md-editor` / `@uiw/react-markdown-preview`
- **路由**：React Router
- **HTTP**：Axios
- **样式**：AntD 主题 + `index.css` + 页面级 CSS

------

## 目录结构（示例）

```
src/
├─ App.tsx
├─ main.tsx
├─ index.css
├─ api/                # 前端 API 封装（示例/Mock）
├─ components/
│  ├─ Navbar.tsx
│  ├─ ThemeProvider.tsx
│  ├─ PostCard.tsx
│  ├─ CreatePostModal.tsx
│  └─ EDAViewer.tsx    # EasyEDA 嵌入组件（示例）
├─ pages/
│  ├─ Home.tsx
│  ├─ Profile.tsx
│  ├─ PostDetail.tsx
│  └─ EDA.tsx          # EDA Viewer 页面（示例）
├─ pages/Home.css
├─ stores/
│  ├─ themeStore.ts
│  └─ userStore.ts
├─ Types/
│  └─ types.ts
├─ utils/
│  └─ auth.ts
└─ vite-env.d.ts
```

------

## 启动与构建

> 需要 Node.js **≥ 18**

```
# 安装依赖
npm i
# or pnpm i / yarn

# 开发模式（默认 5173 端口）
npm run dev

# 构建生产包
npm run build

# 本地预览构建产物
npm run preview
```

Vite 服务器配置见 `vite.config.ts`：s：

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: true, port: 5173 }
});
