---
title: "Tailwind CSS v4 迁移指南：从 v3 到 v4 的实战经验"
date: 2026-08-04
tags: ["TailwindCSS", "CSS", "前端", "教程"]
description: "记录将博客从 Tailwind v3 迁移到 v4 的全过程，包括 @theme 配置、CSS-first 配置方式、移除 CDN 等关键变更。"
draft: false
---

# Tailwind CSS v4 迁移指南

## 主要变化

- CSS-first 配置：用 `@theme` 替代 `tailwind.config.js`
- Vite 插件：用 `@tailwindcss/vite` 替代 PostCSS
- 移除 CDN：全量使用 Vite 构建
