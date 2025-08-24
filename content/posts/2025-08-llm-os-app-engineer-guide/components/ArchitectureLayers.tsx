'use client';

import { FC } from 'react';
import MermaidDiagram from './MermaidDiagram';

const ArchitectureLayers: FC = () => {
  const chart = `
flowchart TD
    subgraph UX ["🎨 體驗與產品層"]
        direction TB
        U1["Prompt 工程"]
        U2["Context 管理"]
        U3["UX 設計"]
        U1 --- U2 --- U3
    end
    
    subgraph Platform ["🚀 行業平台層"]
        direction TB
        P1["工作流程編排"]
        P2["業務邏輯"]
        P3["規則引擎"]
        P1 --- P2 --- P3
    end
    
    subgraph Agent ["🔗 應用編排層"]
        direction TB
        A1["Agent 協作"]
        A2["複雜任務編排"]  
        A3["多步驟流程"]
        A1 --- A2 --- A3
    end
    
    subgraph Data ["💾 數據層"]
        direction TB
        D1["向量搜尋"]
        D2["長期記憶"]
        D3["資料處理"]
        D1 --- D2 --- D3
    end
    
    UX ==> Platform
    Platform ==> Agent  
    Agent ==> Data
    
    style UX fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style Platform fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style Agent fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style Data fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
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
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
        <MermaidDiagram 
          chart={chart} 
          config={{
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            flowchart: { 
              useMaxWidth: true,
              htmlLabels: true,
              curve: 'basis'
            },
            themeVariables: {
              fontSize: '16px',
              fontFamily: 'Inter, system-ui, sans-serif'
            }
          }}
        />
      </div>
    </div>
  );
};

export default ArchitectureLayers;