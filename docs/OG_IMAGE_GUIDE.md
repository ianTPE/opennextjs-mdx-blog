# Open Graph Image 功能指南

## 📖 概述

本項目已完整實現 Open Graph (OG) image 功能，支援在社交媒體平台（Facebook、Twitter、LinkedIn 等）分享時顯示精美的預覽圖片。

## 🎯 功能特色

- ✅ **全站統一設定**: 根布局提供默認 OG image
- ✅ **頁面專用設定**: 每個頁面可自定義 OG image
- ✅ **文章封面圖**: 支援文章專用封面圖，自動回退到默認圖片
- ✅ **工具函數庫**: 統一的 OG metadata 生成工具
- ✅ **SEO 優化**: 包含 sitemap.xml 和 robots.txt
- ✅ **多平台支援**: 支援 Facebook、Twitter、LinkedIn 等平台

## 📁 文件結構

```
├── app/
│   ├── layout.tsx              # 根布局 OG 設定
│   ├── page.tsx                # 首頁 OG 設定
│   ├── blog/
│   │   ├── page.tsx            # 部落格列表頁 OG 設定
│   │   └── [slug]/page.tsx     # 個別文章 OG 設定
│   ├── about/page.tsx          # 關於頁面 OG 設定
│   ├── sitemap.ts              # 網站地圖
│   └── robots.ts               # 搜索引擎設定
├── lib/
│   └── og-image.ts             # OG image 工具函數
├── public/images/
│   ├── default-og-image.webp   # 默認 OG 圖片
│   └── posts/                  # 文章封面圖片
└── docs/
    └── OG_IMAGE_GUIDE.md       # 本指南
```

## 🚀 使用方法

### 1. 基本使用

```typescript
import { generateOGMetadata } from "@/lib/og-image";

export const metadata = generateOGMetadata({
  title: "頁面標題",
  description: "頁面描述",
  url: "https://citrine.top/your-page",
  type: "website", // 或 "article"
});
```

### 2. 文章頁面使用

```typescript
import { generateOGMetadata, getPostOGImage } from "@/lib/og-image";

const ogImage = getPostOGImage(post.coverImage);

export const metadata = generateOGMetadata({
  title: post.title,
  description: post.summary,
  url: `https://citrine.top/blog/${slug}`,
  type: "article",
  image: ogImage,
  publishedTime: post.date,
  authors: [post.author],
  tags: post.tags,
});
```

### 3. 自定義 OG 圖片

在文章的 `metadata.ts` 文件中添加 `coverImage` 字段：

```typescript
const metadata: PostMeta = {
  slug: "your-post-slug",
  title: "文章標題",
  // ... 其他字段
  coverImage: "/images/posts/your-custom-image.webp",
};
```

## 🖼️ 圖片規格建議

### OG Image 最佳規格
- **尺寸**: 1200 x 630 像素
- **格式**: WebP（推薦）或 PNG/JPEG
- **檔案大小**: < 1MB
- **長寬比**: 1.91:1

### 設計建議
- 使用清晰、高對比度的文字
- 避免過小的字體（最小 24px）
- 保持品牌一致性
- 考慮在不同平台的顯示效果

## 🔧 配置選項

### generateOGMetadata 參數

```typescript
interface OGImageConfig {
  title: string;           // 必填：頁面標題
  description: string;     // 必填：頁面描述
  url?: string;           // 可選：頁面 URL
  type?: 'website' | 'article'; // 可選：內容類型
  image?: string;         // 可選：自定義圖片路徑
  alt?: string;           // 可選：圖片替代文字
  publishedTime?: string; // 可選：發布時間（文章用）
  authors?: string[];     // 可選：作者列表
  tags?: string[];        // 可選：標籤列表
  twitterCreator?: string; // 可選：Twitter 創作者
}
```

## 🧪 測試方法

### 1. 在線測試工具

- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. 本地測試

訪問測試頁面：`https://citrine.top/og-test`

### 3. HTML 檢查

查看頁面原始碼，確認以下 meta 標籤：

```html
<!-- Open Graph -->
<meta property="og:title" content="頁面標題" />
<meta property="og:description" content="頁面描述" />
<meta property="og:image" content="https://citrine.top/images/default-og-image.webp" />
<meta property="og:url" content="https://citrine.top/page-url" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="頁面標題" />
<meta name="twitter:description" content="頁面描述" />
<meta name="twitter:image" content="https://citrine.top/images/default-og-image.webp" />
```

## 🔍 故障排除

### 常見問題

1. **圖片不顯示**
   - 檢查圖片路徑是否正確
   - 確認圖片檔案存在於 `public/images/` 目錄
   - 驗證圖片格式和大小

2. **快取問題**
   - 使用 Facebook Debugger 的「Scrape Again」功能
   - 清除瀏覽器快取
   - 等待社交平台更新快取（可能需要幾小時）

3. **metadata 不生效**
   - 檢查 Next.js 版本是否支援 App Router
   - 確認 `generateMetadata` 函數正確導出
   - 驗證 metadata 物件結構

## 📈 SEO 優化

本項目還包含以下 SEO 優化功能：

- **Sitemap**: 自動生成 `/sitemap.xml`
- **Robots**: 配置 `/robots.txt`
- **結構化資料**: 支援 JSON-LD 格式
- **多語言**: 支援 `zh_TW` locale

## 🔄 更新和維護

### 添加新頁面

1. 在頁面組件中導入 OG 工具函數
2. 使用 `generateOGMetadata` 生成 metadata
3. 可選：添加自定義 OG 圖片

### 更新默認圖片

替換 `public/images/default-og-image.webp` 文件，保持相同的檔名和規格。

### 批量更新

使用 `lib/og-image.ts` 中的工具函數可以輕鬆批量更新所有頁面的 OG 設定。
