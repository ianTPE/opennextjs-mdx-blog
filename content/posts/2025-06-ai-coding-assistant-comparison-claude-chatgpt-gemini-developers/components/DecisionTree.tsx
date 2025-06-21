"use client";

import React from 'react';

interface DecisionNode {
  id: string;
  text: string;
  type: 'question' | 'recommendation' | 'action';
  color?: string;
  children?: DecisionNode[];
}

interface DecisionTreeProps {
  title?: string;
  subtitle?: string;
  tree: DecisionNode;
}

const DecisionTree: React.FC<DecisionTreeProps> = ({ title, subtitle, tree }) => {
  const getNodeStyle = (type: string, color?: string) => {
    const baseStyle = "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm border";
    
    switch (type) {
      case 'question':
        return `${baseStyle} bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100`;
      case 'recommendation':
        return `${baseStyle} bg-green-50 text-green-800 border-green-200 hover:bg-green-100`;
      case 'action':
        return `${baseStyle} bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100`;
      default:
        return `${baseStyle} bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100`;
    }
  };

  const renderNode = (node: DecisionNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node */}
        <div className={`${getNodeStyle(node.type, node.color)} text-center max-w-xs`}>
          {node.text}
        </div>
        
        {/* Arrow and Children */}
        {hasChildren && (
          <>
            {/* Arrow */}
            <div className="flex flex-col items-center my-3">
              <div className="w-0.5 h-4 bg-gray-300"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400"></div>
            </div>
            
            {/* Children Container */}
            <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
              {node.children!.map((child, index) => (
                <div key={child.id} className="flex flex-col items-center">
                  {renderNode(child, level + 1)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
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
      
      <div className="flex justify-center">
        {renderNode(tree)}
      </div>
    </div>
  );
};

export default DecisionTree;
