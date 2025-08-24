'use client';

import { FC } from 'react';

const ArchitectureTable: FC = () => {
  const layers = [
    {
      emoji: "🎨",
      name: "體驗與產品層",
      responsibility: "UX設計、Prompt工程、Context管理",
      tools: "自建UI、Prompt版本管理",
      focus: "本課程主要焦點",
      isHighlight: true
    },
    {
      emoji: "🚀", 
      name: "行業平台層",
      responsibility: "業務邏輯、工作流程編排",
      tools: "Unleash、Gemini Agent Builder",
      focus: "工作流設計、業務整合",
      isHighlight: false
    },
    {
      emoji: "🔗",
      name: "應用編排層", 
      responsibility: "Agent協作、複雜任務編排",
      tools: "LangGraph、Semantic Kernel、AutoGen",
      focus: "多步驟任務、Agent設計",
      isHighlight: false
    },
    {
      emoji: "💾",
      name: "數據層",
      responsibility: "向量搜尋、長期記憶、資料處理", 
      tools: "LangChain、LlamaIndex、Pinecone",
      focus: "RAG實現、數據管道",
      isHighlight: false
    }
  ];

  return (
    <div className="my-8">
      {/* 桌面版表格 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">架構層級</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">核心職責</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">代表性工具/平台</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">應用工程師關注重點</th>
            </tr>
          </thead>
          <tbody>
            {layers.map((layer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">
                  <strong>{layer.emoji} {layer.name}</strong>
                </td>
                <td className="border border-gray-300 px-4 py-3">{layer.responsibility}</td>
                <td className="border border-gray-300 px-4 py-3">{layer.tools}</td>
                <td className="border border-gray-300 px-4 py-3">
                  {layer.isHighlight ? (
                    <strong className="text-orange-600">{layer.focus}</strong>
                  ) : (
                    layer.focus
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 手機版卡片 */}
      <div className="md:hidden space-y-4">
        {layers.map((layer, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">{layer.emoji}</span>
              <h3 className="text-lg font-semibold text-gray-800">{layer.name}</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-600">核心職責：</span>
                <span className="text-gray-800">{layer.responsibility}</span>
              </div>
              
              <div>
                <span className="font-medium text-gray-600">代表工具：</span>
                <span className="text-gray-800">{layer.tools}</span>
              </div>
              
              <div>
                <span className="font-medium text-gray-600">關注重點：</span>
                <span className={layer.isHighlight ? "text-orange-600 font-semibold" : "text-gray-800"}>
                  {layer.focus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureTable;