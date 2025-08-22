'use client';

import { FC } from 'react';
import MermaidDiagram from './MermaidDiagram';

const CareerPathDiagram: FC = () => {
  const chart = `
graph LR
    A[初級開發者] --> B[LLM OS 應用工程師]
    B --> C1[產品經理]
    B --> C2[AI 架構師]
    B --> C3[創業/顧問]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style C1 fill:#f3e5f5
    style C2 fill:#e8f5e8
    style C3 fill:#fff8e1
  `;

  return (
    <div className="my-8">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          🚀 LLM OS 應用工程師職業發展路徑
        </h3>
        <p className="text-sm text-gray-600">
          從初級開發者到專業 LLM OS 應用工程師的發展方向
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <MermaidDiagram chart={chart} />
      </div>
    </div>
  );
};

export default CareerPathDiagram;
