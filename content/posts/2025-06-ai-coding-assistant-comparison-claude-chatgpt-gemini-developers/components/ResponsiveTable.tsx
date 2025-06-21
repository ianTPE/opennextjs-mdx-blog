"use client";

import React from 'react';

interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableRow {
  [key: string]: string | number;
}

interface ResponsiveTableProps {
  title?: string;
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ 
  title, 
  columns, 
  data, 
  className = "" 
}) => {
  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  return (
    <div className={`my-6 ${className}`}>
      {title && (
        <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h4>
      )}
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 font-semibold text-gray-700 border-b border-gray-200 ${getAlignClass(column.align)} ${
                    index === 0 ? 'rounded-tl-lg' : ''
                  } ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-gray-700 border-b border-gray-100 ${getAlignClass(column.align)} ${
                      colIndex === 0 ? 'font-medium' : ''
                    }`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            {columns.map((column, colIndex) => (
              <div
                key={column.key}
                className={`flex justify-between items-center ${
                  colIndex < columns.length - 1 ? 'mb-3 pb-3 border-b border-gray-100' : ''
                }`}
              >
                <span className="font-medium text-gray-600 text-sm">
                  {column.header}
                </span>
                <span className={`text-gray-800 ${colIndex === 0 ? 'font-semibold' : ''}`}>
                  {row[column.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable;
