import { generateOGMetadata } from "@/lib/og-image";

export const metadata = generateOGMetadata({
  title: "OG Image 測試頁面 - Citrine.top",
  description: "測試 Open Graph image 功能是否正常運作",
  url: "https://citrine.top/og-test",
  type: "website",
});

export default function OGTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            🖼️ OG Image 測試頁面
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            這個頁面用來測試 Open Graph image 功能是否正常運作
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            📋 測試清單
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                根布局 (Root Layout) OG image 設定
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                首頁 OG image 設定
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                部落格列表頁 OG image 設定
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                關於頁面 OG image 設定
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                個別文章頁面 OG image 設定
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                OG image 工具函數庫
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                Sitemap.xml 生成
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300">
                Robots.txt 設定
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            🔍 如何測試 OG Image
          </h2>
          
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
              <strong>1. Facebook Sharing Debugger:</strong><br />
              前往 <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                https://developers.facebook.com/tools/debug/
              </a> 輸入頁面 URL 進行測試
            </p>
            
            <p>
              <strong>2. Twitter Card Validator:</strong><br />
              前往 <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                https://cards-dev.twitter.com/validator
              </a> 輸入頁面 URL 進行測試
            </p>
            
            <p>
              <strong>3. LinkedIn Post Inspector:</strong><br />
              前往 <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                https://www.linkedin.com/post-inspector/
              </a> 輸入頁面 URL 進行測試
            </p>
            
            <p>
              <strong>4. 檢查 HTML meta 標籤:</strong><br />
              在瀏覽器中查看頁面原始碼，確認 Open Graph 和 Twitter Card meta 標籤是否正確生成
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
