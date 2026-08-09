/**
 * 格式化日期为中文友好格式
 * @example formatDate(new Date("2026-08-06")) => "2026 年 8 月 6 日"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} 年 ${month} 月 ${day} 日`;
}

/**
 * 格式化日期为 ISO 短格式 (用于 RSS)
 * @example formatDateISO(new Date("2026-08-06")) => "2026-08-06"
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * 估算文章阅读时间（基于中文平均阅读速度 ~400 字/分钟）
 */
export function estimateReadingTime(text: string): number {
  // 去除 HTML 标签和 Markdown 标记，提取纯文本
  const cleanText = text
    .replace(/<[^>]*>/g, "")
    .replace(/[#*`~\[\]()>|_-]/g, "")
    .replace(/\s+/g, "");
  const wordCount = cleanText.length;
  const minutes = Math.max(1, Math.ceil(wordCount / 400));
  return minutes;
}

/**
 * 截断文本到指定长度
 */
export function truncate(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

/**
 * 生成页面标题
 */
export function buildTitle(pageTitle?: string): string {
  const siteName = "白日梦的博客";
  return pageTitle ? `${pageTitle} | ${siteName}` : siteName;
}

/**
 * 站点全局配置常量
 */
export const SITE_CONFIG = {
  name: "白日梦的博客",
  shortName: "白日梦",
  description: "一个专注于前端工程、技术探索与开源实践的个人博客。",
  url: "https://your-domain.com",
  language: "zh-CN",
  author: "Hugo-Xuuu",
  copyright: `© ${new Date().getFullYear()} 白日梦的博客.`,
} as const;
