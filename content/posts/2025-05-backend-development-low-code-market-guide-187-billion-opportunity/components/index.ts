"use client";

// 導出所有圖表組件
export { default as MarketGrowthChart } from './MarketGrowthChart';
export { default as FreelanceOpportunityChart } from './FreelanceOpportunityChart';
export { default as EfficiencyComparisonChart } from './EfficiencyComparisonChart';
export { default as SkillRoadmapChart } from './SkillRoadmapChart';
export { default as EnterpriseAdoptionChart } from './EnterpriseAdoptionChart';
export { default as IncomeComparisonChart } from './IncomeComparisonChart';
export { default as MermaidDiagram } from './MermaidDiagram';
export { default as MarkdownDisplay } from './MarkdownDisplay';

// 導出懶加載組件
export { default as LazySection } from './LazySection';
export { default as LazyMDXSection } from './LazyMDXSection';

// 導出表格組件
export { default as CmsComparisonTable } from './CmsComparisonTable';
export { default as RealtimeProtocolTable } from './RealtimeProtocolTable';
export { default as SecurityModelTable } from './SecurityModelTable';
export { default as SecurityModelComparison } from './SecurityModelComparison';
export { default as BusinessMetricsTable } from './BusinessMetricsTable';

// 導出舊版表格組件（向後兼容）
export { default as DataTable } from './DataTable';
export { default as MarketDataTable } from './MarketDataTable';
export { default as EnterpriseAdoptionTable } from './EnterpriseAdoptionTable';
export { default as PricingStrategyTable } from './PricingStrategyTable';

// 組件使用說明
/**
 * 圖表組件庫 - 2025 後端開發完全攻略
 * 
 * 使用方式：
 * import { MarketGrowthChart, FreelanceOpportunityChart } from './components';
 * 
 * 組件列表：
 * 
 * 1. MarketGrowthChart
 *    - 展示全球低程式碼 vs 傳統軟體開發市場規模對比
 *    - 時間範圍：2019-2030年
 *    - 重點：1870億美元市場機會
 * 
 * 2. FreelanceOpportunityChart
 *    - 六大後端解決方案的自由職業機會分析
 *    - 基於Upwork平台真實數據
 *    - 包含職位數量排名和市場分析
 * 
 * 3. EfficiencyComparisonChart
 *    - 傳統 vs 低程式碼開發效率對比
 *    - 涵蓋開發時間、學習成本、維護複雜度等維度
 *    - 展示10x效率提升數據
 * 
 * 4. SkillRoadmapChart
 *    - 24個月技能發展路線圖
 *    - 展示技能等級、收入潛力、客戶數量增長曲線
 *    - 包含8個關鍵里程碑
 * 
 * 5. EnterpriseAdoptionChart
 *    - 企業低程式碼採用現況與效益分析
 *    - 雙餅圖展示採用率和效益分佈
 *    - 包含關鍵統計數據摘要
 * 
 * 6. IncomeComparisonChart
 *    - 不同發展階段收入潛力對比
 *    - 包含收費標準參考表格
 *    - 展示成功案例收入數據
 * 
 * 技術要求：
 * - React 18+
 * - Chart.js 4+
 * - react-chartjs-2
 * - TailwindCSS (用於樣式)
 * 
 * 安裝依賴：
 * npm install chart.js react-chartjs-2
 * 
 * 使用範例：
 * ```tsx
 * import { MarketGrowthChart } from './components';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <MarketGrowthChart />
 *     </div>
 *   );
 * }
 * ```
 */