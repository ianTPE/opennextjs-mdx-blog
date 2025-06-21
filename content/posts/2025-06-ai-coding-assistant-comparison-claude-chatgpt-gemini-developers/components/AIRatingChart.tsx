"use client";

import React from 'react';

interface RatingItem {
  name: string;
  score: number;
  color: string;
}

interface AIRatingChartProps {
  title: string;
  subtitle?: string;
  items: RatingItem[];
  maxScore?: number;
}

const AIRatingChart: React.FC<AIRatingChartProps> = ({ 
  title, 
  subtitle, 
  items, 
  maxScore = 5 
}) => {
  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= maxScore; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
            i <= score 
              ? 'text-yellow-400' 
              : 'text-gray-300'
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const getScoreWidth = (score: number) => {
    return (score / maxScore) * 100;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100 my-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-600 text-sm">
            {subtitle}
          </p>
        )}
      </div>

      {/* Rating Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            {/* AI Name and Score */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-semibold text-gray-800 text-lg">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  {item.score}/{maxScore}
                </span>
                <div className="flex">
                  {renderStars(item.score)}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${getScoreWidth(item.score)}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span>優秀</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-300">★</span>
            <span>待改進</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRatingChart;
