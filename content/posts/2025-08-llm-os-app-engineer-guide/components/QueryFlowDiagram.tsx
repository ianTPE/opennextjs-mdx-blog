import React from 'react';

const QueryFlowDiagram: React.FC = () => {
  return (
    <div className="my-8 p-6 bg-gray-50 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
        智能查詢路由系統
      </h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* 使用者查詢 */}
        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
          <div className="text-center font-medium text-blue-800">
            使用者查詢
          </div>
        </div>
        
        {/* 箭頭 */}
        <div className="text-gray-600">↓</div>
        
        {/* 查詢分析器 */}
        <div className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2">
          <div className="text-center font-medium text-purple-800">
            查詢分析器：評估複雜度
          </div>
        </div>
        
        {/* 箭頭 */}
        <div className="text-gray-600">↓</div>
        
        {/* 路由決策 */}
        <div className="flex justify-center w-full max-w-4xl">
          <div className="bg-gray-200 border-2 border-gray-400 rounded-lg px-4 py-2">
            <div className="text-center font-medium text-gray-800">
              智能路由決策
            </div>
          </div>
        </div>
        
        {/* 箭頭 */}
        <div className="text-gray-600">↓</div>
        
        {/* 兩個路徑 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* 精準檢索路徑 */}
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3 text-center">
              精準檢索路徑 (簡單查詢)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>檢索小 Chunks (200-800 tokens)</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Top-k = 3-5</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>傳遞給標準 LLM (低成本)</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>快速回應</span>
              </div>
            </div>
          </div>
          
          {/* 豐富檢索路徑 */}
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-3 text-center">
              豐富檢索路徑 (複雜查詢)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                <span>檢索大 Chunks (1K-4K tokens)</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                <span>Top-k = 10-20</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                <span>傳遞給長上下文 LLM (高成本)</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                <span>深度分析與綜合回答</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>系統根據查詢複雜度自動選擇最適合的檢索和生成策略</p>
      </div>
    </div>
  );
};

export default QueryFlowDiagram;
