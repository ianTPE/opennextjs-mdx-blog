"use client";

import React from 'react';

interface ScoreData {
  platform: string;
  scores: {
    [dimension: string]: number;
  };
  color: string;
}

interface AIScoreTableProps {
  title?: string;
  subtitle?: string;
  dimensions: string[];
  data: ScoreData[];
  maxScore?: number;
}

const AIScoreTable: React.FC<AIScoreTableProps> = ({ 
  title, 
  subtitle,
  dimensions, 
  data, 
  maxScore = 10 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-50';
    if (score >= 7) return 'text-blue-600 bg-blue-50';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreWidth = (score: number) => {
    return (score / maxScore) * 100;
  };

  return (
    <div className="my-8">
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

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <th className="px-4 py-4 font-semibold text-gray-700 border-b border-gray-200 text-left rounded-tl-lg">
                AI 平台
              </th>
              {dimensions.map((dimension, index) => (
                <th
                  key={dimension}
                  className={`px-4 py-4 font-semibold text-gray-700 border-b border-gray-200 text-center ${
                    index === dimensions.length - 1 ? 'rounded-tr-lg' : ''
                  }`}
                >
                  {dimension}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={item.platform}
                className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
              >
                <td className="px-4 py-4 font-semibold text-gray-800 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.platform}</span>
                  </div>
                </td>
                {dimensions.map((dimension) => (
                  <td key={dimension} className="px-4 py-4 border-b border-gray-100 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(item.scores[dimension])}`}>
                        {item.scores[dimension]}/{maxScore}
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${getScoreWidth(item.scores[dimension])}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet View */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-1 gap-6">
          {data.map((item) => (
            <div key={item.platform} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <h5 className="text-lg font-semibold text-gray-800">{item.platform}</h5>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {dimensions.map((dimension) => (
                  <div key={dimension} className="text-center">
                    <div className="text-sm text-gray-600 mb-2">{dimension}</div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(item.scores[dimension])}`}>
                      {item.scores[dimension]}/{maxScore}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getScoreWidth(item.scores[dimension])}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div key={item.platform} className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <h5 className="font-semibold text-gray-800">{item.platform}</h5>
            </div>
            <div className="space-y-3">
              {dimensions.map((dimension) => (
                <div key={dimension} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{dimension}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getScoreColor(item.scores[dimension])}`}>
                      {item.scores[dimension]}/{maxScore}
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getScoreWidth(item.scores[dimension])}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIScoreTable;
