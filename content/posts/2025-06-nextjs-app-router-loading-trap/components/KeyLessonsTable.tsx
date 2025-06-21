"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LessonData {
  key: string;
  description: string;
  action: string;
}

export default function KeyLessonsTable() {
  const lessonData: LessonData[] = [
    {
      key: "全局影響",
      description: "app/loading.tsx 會影響整個應用",
      action: "🚫 避免在根目錄使用"
    },
    {
      key: "隱藏錯誤",
      description: "Loading 狀態可能遮蔽真正問題",
      action: "🔍 優先檢查特殊文件"
    },
    {
      key: "除錯困難",
      description: "錯誤訊息不明確，難以定位",
      action: "📊 系統化除錯流程"
    },
    {
      key: "最佳實踐",
      description: "路由層級 > 組件層級 > 全局",
      action: "✅ 精準控制載入範圍"
    }
  ];

  const getKeyStyle = (key: string) => {
    const styles = {
      "全局影響": "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20",
      "隱藏錯誤": "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20",
      "除錯困難": "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20",
      "最佳實踐": "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20"
    };
    return styles[key as keyof typeof styles] || "";
  };

  return (
    <div className="not-prose w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
          <span className="mr-2">🎯</span>
          核心教訓
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[100px]">
                重點
              </TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[200px]">
                說明
              </TableHead>
              <TableHead className="font-bold text-gray-900 dark:text-gray-100 min-w-[150px]">
                行動建議
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessonData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getKeyStyle(row.key)}`}>
                    {row.key}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {row.description.includes('app/loading.tsx') ? (
                    <>
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                        app/loading.tsx
                      </code>
                      {' 會影響整個應用'}
                    </>
                  ) : (
                    row.description
                  )}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300 font-medium">
                  {row.action}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 關鍵提醒</strong>：這些教訓都是從實際開發經驗中總結出來的，每一個都可能讓你避免數小時的除錯時間。
        </p>
      </div>
    </div>
  );
}
