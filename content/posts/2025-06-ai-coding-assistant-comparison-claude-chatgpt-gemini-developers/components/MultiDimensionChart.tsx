"use client";

import React from "react";

interface DimensionData {
  dimension: string;
  rankings: {
    name: string;
    score: number;
    color: string;
  }[];
}

interface MultiDimensionChartProps {
  title: string;
  subtitle?: string;
  dimensions: DimensionData[];
}

const MultiDimensionChart: React.FC<MultiDimensionChartProps> = ({
  title,
  subtitle,
  dimensions,
}) => {
  const renderStars = (score: number, maxScore: number = 5) => {
    const stars = [];
    for (let i = 1; i <= maxScore; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${
            i <= score ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const getBarWidth = (score: number, maxScore: number = 5) => {
    return (score / maxScore) * 100;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border border-purple-100 my-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      </div>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dimensions.map((dimension, dimIndex) => (
          <div
            key={dimIndex}
            className="bg-white rounded-lg p-5 shadow-sm border border-gray-100"
          >
            {/* Dimension Title */}
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              {dimension.dimension}
            </h4>

            {/* Rankings */}
            <div className="space-y-3">
              {dimension.rankings.map((ranking, rankIndex) => (
                <div
                  key={rankIndex}
                  className="flex items-center justify-between"
                >
                  {/* AI Name */}
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ranking.color }}
                    ></div>
                    <span className="font-medium text-gray-700 text-sm truncate">
                      {ranking.name}
                    </span>
                  </div>

                  {/* Score and Stars */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="flex">{renderStars(ranking.score)}</div>
                    <span className="text-xs text-gray-500 w-8 text-right">
                      {ranking.score}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Bar Chart */}
            <div className="mt-4 space-y-2">
              {dimension.rankings.map((ranking, rankIndex) => (
                <div key={rankIndex} className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-16 text-right">
                    {ranking.name}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${getBarWidth(ranking.score)}%`,
                        backgroundColor: ranking.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Get unique AI names and their average scores */}
          {(() => {
            const aiStats = new Map();
            dimensions.forEach((dim) => {
              dim.rankings.forEach((ranking) => {
                if (!aiStats.has(ranking.name)) {
                  aiStats.set(ranking.name, {
                    scores: [],
                    color: ranking.color,
                  });
                }
                aiStats.get(ranking.name).scores.push(ranking.score);
              });
            });

            return Array.from(aiStats.entries()).map(([name, data]) => {
              const avgScore = (
                data.scores.reduce((a: number, b: number) => a + b, 0) /
                data.scores.length
              ).toFixed(1);
              return (
                <div key={name} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: data.color }}
                    ></div>
                    <span className="font-medium text-sm text-gray-700">
                      {name}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {avgScore}/5
                  </div>
                  <div className="text-xs text-gray-500">平均分數</div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default MultiDimensionChart;
