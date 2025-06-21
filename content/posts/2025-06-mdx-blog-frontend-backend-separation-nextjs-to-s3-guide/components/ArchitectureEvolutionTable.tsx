"use client"

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from '@tanstack/react-table';

interface ArchitectureStage {
  stage: string;
  articleCount: string;
  solution: string;
  useCase: string;
}

const architectureData: ArchitectureStage[] = [
  {
    stage: '第一階段',
    articleCount: '1-1000 篇',
    solution: '文件系統',
    useCase: '個人部落格、小型團隊'
  },
  {
    stage: '第二階段', 
    articleCount: '1000-5000 篇',
    solution: '資料庫驅動',
    useCase: '正規技術團隊'
  },
  {
    stage: '第三階段',
    articleCount: '5000+ 篇', 
    solution: '混合架構 + CI/CD',
    useCase: '大型內容平台'
  }
];

const architectureColumnHelper = createColumnHelper<ArchitectureStage>();

const architectureColumns = [
  architectureColumnHelper.accessor('stage', {
    header: '階段',
    cell: info => (
      <span className="font-semibold text-blue-600">
        {info.getValue()}
      </span>
    ),
  }),
  architectureColumnHelper.accessor('articleCount', {
    header: '文章數量',
    cell: info => (
      <span className="font-mono text-sm">
        {info.getValue()}
      </span>
    ),
  }),
  architectureColumnHelper.accessor('solution', {
    header: '架構方案',
    cell: info => (
      <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">
        {info.getValue()}
      </span>
    ),
  }),
  architectureColumnHelper.accessor('useCase', {
    header: '適用場景',
    cell: info => info.getValue(),
  }),
];

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  title?: string; // Make title optional
  description?: string;
}

function DataTable<T>({ data, columns, title, description }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm not-prose">
      {(title || description) && (
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  index > 0 ? 'border-t border-gray-200' : ''
                }`}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-1.5 text-sm text-gray-900 align-middle"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ArchitectureEvolutionTableProps {
  showTitle?: boolean;
  showDescription?: boolean;
}

function ArchitectureEvolutionTable({
  showTitle = true,
  showDescription = true,
}: ArchitectureEvolutionTableProps) {
  return (
    <DataTable
      data={architectureData}
      columns={architectureColumns}
      title={showTitle ? "三階段架構演進路徑" : undefined}
      description={showDescription ? "根據文章數量和團隊需求選擇合適的架構方案" : undefined}
    />
  );
}

export default ArchitectureEvolutionTable;