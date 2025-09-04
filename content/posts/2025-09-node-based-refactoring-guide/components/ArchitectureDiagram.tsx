import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LayerProps {
  title: string;
  description?: string;
  color: string;
  textColor?: string;
}

const Layer: React.FC<LayerProps> = ({ title, description, color, textColor = 'text-white' }) => {
  return (
    <Card className={`${color} border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105`}>
      <CardContent className="p-4 text-center">
        <h3 className={`font-semibold text-lg ${textColor}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm mt-1 ${textColor} opacity-90`}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const ArchitectureDiagram: React.FC = () => {
  const layers = [
    {
      title: '應用層 (Application)',
      description: '用戶界面與業務邏輯',
      color: 'bg-gradient-to-r from-blue-600 to-blue-700',
      textColor: 'text-white'
    },
    {
      title: '工作流層 (Workflow Graph)',
      description: '節點編排與流程控制',
      color: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
      textColor: 'text-white'
    },
    {
      title: '節點層 (Node Classes)',
      description: '可重用的功能單元',
      color: 'bg-gradient-to-r from-purple-600 to-purple-700',
      textColor: 'text-white'
    },
    {
      title: '運行時 (Runtime Core)',
      description: '執行引擎與資源管理',
      color: 'bg-gradient-to-r from-violet-600 to-violet-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="my-8 max-w-2xl mx-auto">
      <div className="space-y-3">
        {layers.map((layer, index) => (
          <div key={index} className="relative">
            <Layer {...layer} />
            {index < layers.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-0.5 h-4 bg-gradient-to-b from-gray-300 to-gray-400"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* 架構說明 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h4 className="font-medium text-gray-800 mb-2">架構層級說明</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>應用層</strong>：處理用戶交互和業務邏輯</li>
          <li>• <strong>工作流層</strong>：管理節點間的數據流和執行順序</li>
          <li>• <strong>節點層</strong>：封裝具體功能的可重用組件</li>
          <li>• <strong>運行時</strong>：提供執行環境和資源調度</li>
        </ul>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;