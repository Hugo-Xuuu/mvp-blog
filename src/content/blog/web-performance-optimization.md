---
title: "Web 性能优化实战：从 Lighthouse 50 到 98 分的优化历程"
date: 2026-08-05
tags: ["性能优化", "前端", "Web", "最佳实践"]
description: "分享将个人博客从 50 分优化到 98 分的完整过程，包括 Core Web Vitals、图片优化、字体加载、JS 分割等实用技巧。"
draft: false
---

# Web 性能优化实战：从 50 分到 98 分

## 背景

我的博客最初 Lighthouse 评分只有 50 分左右。经过一系列优化后，稳定在 98 分。

## 关键优化

### 1. 图片优化

使用 AVIF/WebP 格式，懒加载。

### 2. 字体加载

`font-display: swap` 避免 FOIT。

### 3. JS 最小化

Astro Islands 默认零 JS。
