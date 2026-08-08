---
title: "2026 年 CSS 新特性实战：`@property`、`@layer` 与容器查询让我的博客发光"
date: 2026-08-06
tags: ["CSS", "前端", "TailwindCSS", "设计系统"]
description: "深入解析我在博客重构中使用的 CSS 新特性：@property 自定义属性实现发光边框动画、@layer 层级管理、容器查询与 CSS 嵌套，含完整代码示例。"
draft: false
---

# 2026 年 CSS 新特性实战：现代 CSS 如何让我的博客发光

## 开场

"白日梦的博客"的一个视觉亮点是卡片 **悬停发光边框** 效果。看似需要 JS + Canvas 才能实现的效果，实际上只用了几行现代 CSS。

让我带你逐个解析这些新特性。

## 1. `@property` — 让 CSS 变量也能动画

### 问题

CSS 中的 `conic-gradient` 依赖一个角度变量，但普通 CSS 变量（`--custom-property`）不能直接在 `@keyframes` 中动画。

### 解决方案

```css
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes border-spin {
  to {
    --angle: 360deg;
  }
}

.glow-border::before {
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent 0%,
    rgba(99, 102, 241, 0.9) 20%,
    rgba(236, 72, 153, 0.9) 40%,
    transparent 60%
  );
  animation: border-spin 5s linear infinite;
}
```

`@property` 最关键的作用是：**告诉浏览器这个 CSS 变量可以插值动画**。`syntax: "<angle>"` 声明它是一个角度值，浏览器就能在 0deg → 360deg 之间做平滑过渡，而不需要 JS 介入。

### 浏览器支持

截至 2026 年，`@property` 已获得所有主流浏览器支持（Chrome 85+、Firefox 128+、Safari 16.4+）。

## 2. `@layer` — 解决样式优先级战争

### 问题

在大型项目中，Tailwind 的 utility class 和自定义组件样式之间经常打架。`!important` 越来越多，代码越来越脆弱。

### 解决方案

```css
@layer base, theme, components, utilities;

@layer base {
  body {
    font-family: system-ui, sans-serif;
  }
}

@layer components {
  .card {
    border-radius: 1rem;
    padding: 1.5rem;
  }
}
```

**`@layer` 的核心价值**：你可以显式定义层的优先级，`base` < `theme` < `components` < `utilities`，后面的层覆盖前面的。这让 Tailwind 的 utility-first 和自定义组件可以和平共处，不再需要 `!important`。

### 实战经验

在我的博客中，我通过 Tailwind v4 的 `@theme` 块来定义设计 token，然后组件层使用这些 token：

```css
@theme {
  --color-primary: #6366f1;
  --font-sans: Inter, system-ui, sans-serif;
}
```

组件中直接引用 token，不会与 Tailwind 的 utility class 冲突。

## 3. 容器查询 — 响应式的"内向外"革命

### 问题

传统媒体查询（`@media`）只能基于**视口宽度**做响应式。但一个组件可能出现在侧边栏（窄）和主要内容区（宽），组件本身无法自适应其容器。

### 解决方案

```css
/* 定义容器 */
.bento-grid {
  container-type: inline-size;
  container-name: grid;
}

/* 容器查询 */
@container grid (max-width: 400px) {
  .card {
    flex-direction: column;
  }
}
```

**容器查询 vs 媒体查询**：

| 特性       | 媒体查询 `@media`  | 容器查询 `@container` |
| ---------- | ------------------ | --------------------- |
| 参考对象   | 视口               | 父容器尺寸            |
| 组件复用性 | 低（依赖布局位置） | 高（独立于布局）      |
| 适用场景   | 页面级布局         | 组件级响应式          |

### 实战：Bento Grid

首页的 Bento Grid 布局使用容器查询确保卡片在不同网格位置都能正确排列：

```astro
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
         style="container-type: inline-size;">
```

不需要额外的 JS 来检测位置变化。

## 4. CSS 嵌套 — 终于不用预处理器了

### 问题

以前写 CSS 需要 SCSS/Less 才能嵌套，或者手写重复的选择器：

```css
.card { ... }
.card .title { ... }
.card .title:hover { ... }
```

### 解决方案

```css
.card {
  border-radius: 1rem;

  & .title {
    font-size: 1.25rem;

    &:hover {
      color: var(--color-primary);
    }
  }
}
```

**CSS 嵌套**（CSS Nesting 1 Module）已被所有主流浏览器支持。它让原生 CSS 的代码组织和 SCSS 一样清晰，不需要预处理步骤。

## 5. 结合 Tailwind v4 的现代工作流

这些新特性和 Tailwind v4 的配合非常流畅。我在 `global.css` 中使用原生 CSS 实现复杂动画和设计 token，在日常组件中继续使用 Tailwind utility：

```css
/* global.css — 底层系统和动画 */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: Inter, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

@property --angle { ... }  /* 高级动画 */
```

```astro
<!-- 组件 — 使用 Tailwind -->
<article class="rounded-3xl border p-7 hover:-translate-y-1">
```

这种分层策略让我同时享受了 **原生 CSS 的表现力** 和 **Tailwind 的开发效率**。

## 总结

2026 年的 CSS 已经足够强大，可以覆盖大部分以前需要 JS 或预处理器的场景：

| 新特性      | 替代了什么        | 为什么更好         |
| ----------- | ----------------- | ------------------ |
| `@property` | JS 动画框架       | 零运行时，GPU 加速 |
| `@layer`    | `!important` 堆叠 | 可预测的优先级     |
| 容器查询    | 媒体查询          | 组件真正可复用     |
| CSS 嵌套    | SCSS/Less         | 零构建步骤         |

**最后想说的**：现代 CSS 的进化方向很明确——**把表现层的事情还给 CSS**，让 JS 专注于真正的交互逻辑。这正好和 Astro 的 Islands 哲学一脉相承。

---

_本博客的完整 CSS 源码在 GitHub 开源，欢迎拿去参考。_
