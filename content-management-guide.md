# 白日梦的博客 — 内容管理指南

## 目录

1. [快速开始](#1-快速开始)
2. [撰写新文章](#2-撰写新文章)
3. [编辑与删除文章](#3-编辑与删除文章)
4. [标签管理](#4-标签管理)
5. [主题与黑暗模式](#5-主题与黑暗模式)
6. [构建与部署](#6-构建与部署)
7. [项目文件结构](#7-项目文件结构)
8. [常见问题](#8-常见问题)

---

## 1. 快速开始

### 启动开发服务器

```bash
cd my-blog
pnpm dev
# 浏览器访问 http://localhost:4321
```

### 构建生产版本

```bash
pnpm build
# 构建产物输出到 dist/ 目录
```

### 预览构建结果

```bash
pnpm preview
```

---

## 2. 撰写新文章

### 2.1 创建 Markdown 文件

在 [`src/content/blog/`](my-blog/src/content/blog/) 目录下创建 `.md` 文件，文件名将成为 URL slug。

**命名规范**：

- 使用英文小写 + 连字符：`my-new-post.md`
- 避免中文文件名
- 保持简短且有描述性

**推荐做法**：复制项目根目录的 [`post-template.md`](my-blog/post-template.md) 到文章目录：

```bash
cp post-template.md src/content/blog/我的新文章.md
```

### 2.2 Frontmatter 字段说明

每篇文章顶部必须包含 `---` 包裹的 YAML frontmatter：

```yaml
---
title: "文章标题" # 必填：文章标题
date: 2026-08-08 # 必填：发布日期 (YYYY-MM-DD)
tags: ["前端", "JavaScript"] # 可选：标签数组，留空为 []
description: "文章描述..." # 可选：用于卡片和 SEO
draft: false # 可选：true 则不会发布
coverImage: "./cover.png" # 可选：封面图片路径
---
```

### 2.3 正文编写

正文使用标准 Markdown 语法，支持：

| 特性          | 语法                  | 说明                             |
| ------------- | --------------------- | -------------------------------- |
| **标题**      | `# ~ ######`          | 自动生成目录结构                 |
| **代码块**    | ` ```语言 `           | Shiki 语法高亮，支持所有主流语言 |
| **行内代码**  | `` `code` ``          | 灰色圆角背景                     |
| **引用**      | `> text`              | 左侧 indigo 竖线                 |
| **链接**      | `[text](url)`         | 主题色显示                       |
| **图片**      | `![alt](path)`        | 圆角 + 阴影                      |
| **加粗/斜体** | `**text**` / `*text*` | 标准 Markdown                    |
| **列表**      | `-` / `1.`            | 无序/有序列表                    |
| **分割线**    | `---`                 | 水平分割线                       |

### 2.4 示例文章

````markdown
---
title: "Astro 框架入门指南"
date: 2026-08-08
tags: ["Astro", "前端", "教程"]
description: "一文带你快速上手 Astro 框架的核心概念与使用技巧。"
draft: false
---

# Astro 框架入门指南

Astro 是一个现代化的静态网站生成器...

## 核心概念

### Island 架构

Astro 的 Island 架构意味着...

```javascript
// 示例代码
const message = "Hello Astro!";
console.log(message);
```
````

````

---

## 3. 编辑与删除文章

### 3.1 编辑文章

直接编辑 [`src/content/blog/`](my-blog/src/content/blog/) 下的 `.md` 文件：

- 修改 **标题/日期/标签**：更新 frontmatter
- 修改 **正文**：直接编辑 Markdown
- 保存后开发服务器会自动热更新（几秒内生效）

### 3.2 删除文章

直接删除对应的 `.md` 文件即可：

```bash
rm src/content/blog/要删除的文章.md
````

> 删除后重新构建 (`pnpm build`)，该文章会从所有页面和 RSS 中移除。

### 3.3 草稿管理

将 `draft` 设为 `true`，文章不会出现在任何页面（首页/列表/标签/归档/RSS），但文件保留在目录中：

```yaml
draft: true # 草稿模式，不发布
```

发布时改为 `draft: false` 即可。

---

## 4. 标签管理

### 4.1 标签添加

在文章的 frontmatter 中设置 `tags` 数组：

```yaml
tags: ["前端", "React", "TypeScript"]
```

### 4.2 自动聚合

标签**完全自动管理**：

1. 所有标签自动出现在首页 **标签云** 和 `/tags` 标签页
2. 点击标签进入 `/tags/[标签名]` 查看该标签下所有文章
3. 标签 URL 会自动编码（支持中文标签）

### 4.3 标签命名建议

- 保持一致的命名风格（全部中文或全部英文）
- 使用驼峰或连字符格式：`"BuildInPublic"` 或 `"build-in-public"`
- 避免过于宽泛或过于细碎的标签

---

## 5. 主题与黑暗模式

### 5.1 主题切换

博客支持 **浅色/深色** 两种模式：

- 点击导航栏右侧的 **月亮/太阳图标** 手动切换
- 首次访问自动跟随 **系统偏好** (`prefers-color-scheme`)
- 手动选择后偏好保存在 `localStorage`，后续访问保持不变
- 如果清除了 `localStorage`，重新跟随系统偏好

### 5.2 防闪烁机制

主题初始化脚本在 `<head>` 中**同步执行**，完全消除页面加载时的闪烁（Flash of Unstyled Content）。

### 5.3 自定义品牌信息

所有品牌信息集中在 [`src/lib/utils.ts`](my-blog/src/lib/utils.ts#L42-L49) 的 `SITE_CONFIG` 常量中：

```typescript
export const SITE_CONFIG = {
  name: "白日梦的博客",
  shortName: "白日梦",
  description: "记录白日梦般的前端构思、技术探索与开源实践。",
  url: "https://your-domain.com",
  language: "zh-CN",
  author: "Nova",
};
```

修改此处会自动同步：页面标题、导航、SEO 元数据、JSON-LD、RSS 订阅。

---

## 6. 构建与部署

### 6.1 本地构建

```bash
# 开发模式（热更新）
pnpm dev

# 生产构建
pnpm build

# 预览构建结果
pnpm preview
```

### 6.2 构建产物

静态文件输出到 `dist/` 目录，可直接部署到任何静态托管平台：

| 文件名                     | 说明     |
| -------------------------- | -------- |
| `dist/index.html`          | 首页     |
| `dist/blog/index.html`     | 博客列表 |
| `dist/blog/xxx/index.html` | 文章详情 |
| `dist/tags/xxx/index.html` | 标签页   |
| `dist/archive/index.html`  | 归档     |
| `dist/about/index.html`    | 关于     |
| `dist/rss.xml`             | RSS 订阅 |
| `dist/favicon.svg`         | 站点图标 |

### 6.3 部署平台推荐

- **Vercel**：零配置，连接 Git 仓库自动部署
- **Netlify**：拖拽 `dist/` 目录即可
- **Cloudflare Pages**：连接 Git 仓库
- **GitHub Pages**：使用 Actions 自动部署

### 6.4 部署前配置

修改 [`astro.config.mjs`](my-blog/astro.config.mjs#L7) 中的 `site` 字段为你的实际域名：

```javascript
export default defineConfig({
  site: 'https://你的域名.com',  // 影响 RSS 和 Sitemap
  ...
});
```

---

## 7. 项目文件结构

```
my-blog/
├── src/
│   ├── content.config.ts          # Content Collections 配置
│   ├── content/
│   │   └── blog/                  # ← 文章存放目录（日常操作）
│   │       ├── post-template.md   # 文章模板
│   │       ├── hello-world.md
│   │       └── my-second-post.md
│   ├── layouts/
│   │   └── Layout.astro           # 全局布局
│   ├── components/                # UI 组件
│   │   ├── Header.astro           # 导航栏
│   │   ├── Footer.astro           # 页脚
│   │   ├── ThemeToggle.astro      # 主题切换
│   │   ├── HeroSection.astro      # 首页 Hero
│   │   ├── PostCard.astro         # 文章卡片
│   │   ├── PostMeta.astro         # 文章元信息
│   │   ├── TagBadge.astro         # 标签徽章
│   │   ├── TagCloud.astro         # 标签云
│   │   ├── StatsCard.astro        # 统计卡片
│   │   ├── Pagination.astro       # 分页导航
│   │   ├── ArchiveTimeline.astro  # 归档时间线
│   │   ├── BackToTop.astro        # 回到顶部
│   │   ├── GrainOverlay.astro     # 噪点纹理
│   │   └── SEOHead.astro          # SEO 元信息
│   ├── pages/                     # 页面路由
│   │   ├── index.astro            # 首页
│   │   ├── blog/
│   │   │   ├── index.astro        # 博客列表
│   │   │   ├── [slug].astro       # 文章详情
│   │   │   └── page/
│   │   │       └── [page].astro   # 分页
│   │   ├── tags/
│   │   │   ├── index.astro        # 标签聚合
│   │   │   └── [tag].astro        # 标签筛选
│   │   ├── archive.astro          # 归档
│   │   ├── about.astro            # 关于
│   │   └── rss.xml.ts             # RSS 生成
│   ├── lib/
│   │   ├── content.ts             # 内容查询函数
│   │   └── utils.ts               # 工具函数 + 品牌配置
│   ├── styles/
│   │   └── global.css             # 全局样式
│   └── types/
│       └── blog.ts                # 类型定义
├── astro.config.mjs               # Astro 配置
├── package.json                   # 依赖管理
└── tsconfig.json                  # TypeScript 配置
```

---

## 8. 常见问题

### Q: 如何修改博客名称？

修改 [`src/lib/utils.ts`](my-blog/src/lib/utils.ts#L42-L49) 中的 `SITE_CONFIG.name`，所有页面标题、导航、SEO 和 RSS 会自动同步。

### Q: 如何添加导航链接？

编辑 [`src/components/Header.astro`](my-blog/src/components/Header.astro#L13-L25) 中的导航列表。

### Q: 如何修改页脚版权信息？

编辑 [`src/components/Footer.astro`](my-blog/src/components/Footer.astro#L3)。

### Q: 文章发布时间不对？

检查文章 frontmatter 中的 `date` 字段，格式必须为 `YYYY-MM-DD`。

### Q: 如何添加自定义页面？

在 [`src/pages/`](my-blog/src/pages/) 目录下创建 `.astro` 文件，使用 `Layout` 组件包裹：

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="页面标题">
  <h1>页面内容</h1>
</Layout>
```

### Q: 预览时看不到最新修改？

开发服务器会自动热更新，少数情况需手动刷新浏览器。如果构建后没更新，尝试清除浏览器缓存。

### Q: 如何更新 Favicon？

替换 [`public/favicon.svg`](my-blog/public/favicon.svg) 和 [`public/favicon.ico`](my-blog/public/favicon.ico)。

---

> **最后更新**: 2026-08-08
> **框架版本**: Astro v7 + Tailwind CSS v4
