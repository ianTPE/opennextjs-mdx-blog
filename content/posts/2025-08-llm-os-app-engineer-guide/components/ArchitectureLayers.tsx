'use client';

import { FC } from 'react';
import MermaidDiagram from './MermaidDiagram';

const ArchitectureLayers: FC = () => {
  const chart = `
flowchart TB
    subgraph Layer1 ["🎨 體驗與產品層"]
        UX["Prompt 工程<br/>Context 管理<br/>UX 設計"]
    end
    
    subgraph Layer2 ["🚀 行業平台層"]
        Platform["工作流程編排<br/>業務邏輯<br/>規則引擎"]
    end
    
    subgraph Layer3 ["🔗 應用編排層"]
        Agent["Agent 協作<br/>複雜任務編排<br/>多步驟流程"]
    end
    
    subgraph Layer4 ["💾 數據層"]
        Data["向量搜尋<br/>長期記憶<br/>資料處理"]
    end
    
    Layer1 --> Layer2
    Layer2 --> Layer3
    Layer3 --> Layer4
    
    style Layer1 fill:#e3f2fd
    style Layer2 fill:#fff3e0
    style Layer3 fill:#f3e5f5
    style Layer4 fill:#e8f5e8
    style UX fill:#ffffff
    style Platform fill:#ffffff
    style Agent fill:#ffffff
    style Data fill:#ffffff
  `;

  return (
    <div className="my-8">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          🏗 LLM OS 分層架構
        </h3>
        <p className="text-sm text-gray-600">
          從上到下：體驗層 → 平台層 → 編排層 → 數據層
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <MermaidDiagram chart={chart} />
      </div>
    </div>
  );
};

export default ArchitectureLayers;