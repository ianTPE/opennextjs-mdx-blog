"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SolutionData {
  solution: string;
  speed: string;
  complexity: string;
  recommendation: string;
  useCase: string;
}

export default function SolutionComparisonTable() {
  const solutionData: SolutionData[] = [
    {
      solution: "移除文件",
      speed: "⚡⚡⚡",
      complexity: "🟢 簡單",
      recommendation: "⭐⭐⭐⭐⭐",
      useCase: "緊急修復"
    },
    {
      solution: "正確實現",
      speed: "⚡⚡",
      complexity: "🟡 中等",
      recommendation: "⭐⭐⭐",
      useCase: "需要全局 loading"
    },
    {
      solution: "路由層級",
      speed: "⚡",
      complexity: "🔴 複雜",
      recommendation: "⭐⭐⭐⭐⭐",
      useCase: "生產環境"
    }
  ];

  const getComplexityStyle = (complexity: string) => {
    if (complexity.includes("簡單")) {
      return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20";
    } else if (complexity.includes("中等")) {
      return "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20";
    } else if (complexity.includes("複雜")) {
      return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20";
    }
    return "";
  };

  const getRecommendationStyle = (recommendation: string) => {
    const starCount = (recommendation.match(/⭐/g) || []).length;
    if (starCount >= 5) {
      return "text-green-600 font-semibold";
    } else if (starCount >= 4) {
      return "text-blue-600 font-medium";
    } else {
      return "text-gray-600";
    }
  };

  return (
    <div className="not-prose w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
          <span className="mr-2">🆚</span>
          方案比較
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[100px]">
                方案
              </TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[80px]">
                速度
              </TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[100px]">
                複雜度
              </TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[120px]">
                推薦指數
              </TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[120px]">
                適用場景
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solutionData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {row.solution}
                </TableCell>
                <TableCell className="text-2xl">
                  {row.speed}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getComplexityStyle(row.complexity)}`}>
                    {row.complexity}
                  </span>
                </TableCell>
                <TableCell className={getRecommendationStyle(row.recommendation)}>
                  {row.recommendation}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {row.useCase}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>💡 <strong>建議</strong>：緊急情況下優先選擇「移除文件」方案，生產環境建議使用「路由層級」方案。</p>
      </div>
    </div>
  );
}
