"use client";

import React from 'react';

interface FlowStep {
  condition: string;
  recommendation: string;
  color: string;
  icon?: string;
}

interface AISelectionFlowProps {
  title?: string;
  subtitle?: string;
  steps: FlowStep[];
}

const AISelectionFlow: React.FC<AISelectionFlowProps> = ({ title, subtitle, steps }) => {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
      {title && (
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            {title}
          </h4>
          {subtitle && (
            <p className="text-gray-600 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Mobile Flow */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1"
                style={{ backgroundColor: step.color }}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {step.condition}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">推薦：</span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.recommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Flow */}
      <div className="hidden md:block">
        <div className="flex flex-col space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* Step Number */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: step.color }}
              >
                {index + 1}
              </div>
              
              {/* Arrow */}
              <div className="mx-4 flex-1">
                <div className="flex items-center">
                  <div className="flex-1 h-0.5 bg-gray-300"></div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400 ml-2"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {step.condition}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">推薦：</span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.recommendation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            💡 根據您的具體需求選擇最適合的 AI 編程助手
          </p>
        </div>
      </div>
    </div>
  );
};

export default AISelectionFlow;
