# Blog 單頁設計文檔

## 概述

我已經為你的 MDX blog 創建了一個全新的、現代化的單頁設計。這個設計包含了多個增強用戶體驗的功能，並且完全響應式。

## 新增功能

### 1. 主要組件

#### `BlogPostContent.tsx`

- **位置**: `components/blog/BlogPostContent.tsx`
- **功能**: 主要的 blog 文章展示組件
- **特色**:
  - 漸變背景設計
  - 粘性導航欄
  - 響應式布局
  - 側邊欄（桌面版）
  - 分享功能
  - 作者信息展示

#### `ReadingProgress.tsx`

- **位置**: `components/blog/ReadingProgress.tsx`
- **功能**: 閱讀進度指示器
- **特色**:
  - 頂部進度條
  - 實時更新
  - 漸變色彩

#### `TableOfContents.tsx`

- **位置**: `components/blog/TableOfContents.tsx`
- **功能**: 自動生成的目錄
- **特色**:
  - 自動檢測標題
  - 平滑滾動
  - 當前位置高亮
  - 層級縮進

#### `BackToTop.tsx`

- **位置**: `components/blog/BackToTop.tsx`
- **功能**: 回到頂部按鈕
- **特色**:
  - 滾動時自動顯示/隱藏
  - 平滑動畫
  - 懸浮效果

#### `Prose.tsx`

- **位置**: `components/ui/prose.tsx`
- **功能**: 增強的文章內容樣式組件
- **特色**:
  - 多種變體（default, blog, documentation）
  - 多種尺寸（sm, base, lg, xl）
  - 完整的 TypeScript 支持

### 2. 設計特色

#### 視覺設計

- **背景**: 漸變背景（淺色/深色模式）
- **卡片設計**: 圓角、陰影、毛玻璃效果
- **色彩**: 基於 Slate 和 Blue 的配色方案
- **字體**: 使用 Geist Sans 和 Geist Mono

#### 響應式設計

- **移動優先**: 完全響應式設計
- **斷點**:
  - 移動設備: 單欄布局
  - 桌面設備: 雙欄布局（內容 + 側邊欄）
- **觸控友好**: 適當的按鈕大小和間距

#### 用戶體驗

- **導航**: 粘性頂部導航欄
- **進度**: 實時閱讀進度指示
- **目錄**: 自動生成的文章目錄
- **分享**: 原生分享 API 支持
- **無障礙**: 適當的 ARIA 標籤和鍵盤導航

### 3. 技術實現

#### 依賴項

```json
{
  "@heroicons/react": "^2.0.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "class-variance-authority": "^0.7.0"
}
```

#### 文件結構

```
components/
├── blog/
│   ├── BlogPostContent.tsx     # 主要文章組件
│   ├── ReadingProgress.tsx     # 閱讀進度
│   ├── TableOfContents.tsx     # 目錄
│   └── BackToTop.tsx          # 回到頂部
└── ui/
    └── prose.tsx              # 文章樣式組件
```

#### 集成方式

- 更新了 `app/blog/[slug]/page.tsx` 使用新的 `BlogPostContent` 組件
- 保持了原有的 Smart Component Loader 系統
- 完全兼容現有的 MDX 和 metadata 系統

### 4. 功能說明

#### 分享功能

- 支持原生 Web Share API
- 降級到剪貼板複製
- 移動設備友好

#### 目錄功能

- 自動檢測 H1-H6 標題
- 使用 Intersection Observer 追蹤當前位置
- 平滑滾動到指定標題

#### 進度指示

- 基於滾動位置計算進度
- 平滑的動畫效果
- 漸變色彩設計

### 5. 自定義選項

#### 顏色主題

可以通過修改 Tailwind 類名來調整顏色：

- 主色調: `blue-*` 系列
- 背景: `slate-*` 系列
- 文字: `slate-*` 系列

#### 布局調整

- 最大寬度: `max-w-4xl` (可調整)
- 側邊欄寬度: `lg:w-64` (可調整)
- 間距: 使用 Tailwind spacing scale

## 使用方法

### 基本使用

1. 確保所有依賴項已安裝
2. 新的設計會自動應用到所有 blog 文章
3. 所有現有功能（Smart Component Loader、MDX 渲染等）保持不變
4. 可以通過修改組件來進一步自定義設計

### Cover Image 功能

#### 添加 Cover Image

在文章的 `metadata.ts` 文件中添加 `coverImage` 屬性：

```typescript
// content/posts/your-post-slug/metadata.ts
import type { PostMeta } from "../../../types/post";

const metadata: PostMeta = {
  slug: "your-post-slug",
  title: "Your Post Title",
  date: "2025-06-19",
  summary: "Your post summary...",
  tags: ["Tag1", "Tag2"],
  published: true,
  author: "Your Name",
  coverImage: "/images/posts/your-post-slug.webp", // 添加這行
  readingTime: "5 min read", // 可選
};

export default metadata;
```

#### Cover Image 規格建議

- **尺寸**: 1200x630px (適合社交媒體分享)
- **格式**: WebP (最佳壓縮) 或 JPEG/PNG
- **位置**: `public/images/posts/` 目錄
- **命名**: 使用文章 slug 作為文件名

#### 視覺效果

當添加 cover image 後，文章頁面會顯示：

1. **全寬 Hero 圖片**: 高度 384px (h-96)
2. **漸變遮罩**: 從底部黑色漸變到透明
3. **浮動內容卡片**: 覆蓋在圖片上，帶有毛玻璃效果
4. **響應式設計**: 在移動設備上自動調整

#### 沒有 Cover Image 的情況

如果不設置 `coverImage`，文章會使用：

- 純色背景的標準布局
- 正常的頂部間距
- 標準的白色/深色背景卡片

## 瀏覽器支持

- 現代瀏覽器（Chrome, Firefox, Safari, Edge）
- 移動瀏覽器
- 支持 CSS Grid 和 Flexbox
- 支持 Intersection Observer API

## 未來增強

可以考慮添加的功能：

- 文章評論系統
- 相關文章推薦
- 社交媒體分享按鈕
- 文章收藏功能
- 深色/淺色模式切換器
- 字體大小調整器
