'use client';

import { useState } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T extends { id: string }>({ 
  columns, 
  data, 
  isLoading, 
  emptyMessage = 'No data found',
  onEdit,
  onDelete 
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = data.filter(item => 
    Object.values(item as any).some((val: any) => 
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        placeholder="Search..."
        className="w-full max-w-sm px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr key="empty-row">
                {columns.map(col => (
                  <th key={col.key} className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    {col.header}
                  </th>
                ))}
                {(onEdit || onDelete) && <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr key="empty-row">
                  <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map(item => (
                  <tr key={item.id || item._id || Math.random()} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    {columns.map(col => (
                      <td key={col.key} className="py-3 px-4 dark:text-gray-300">
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="py-3 px-4 text-right">
                        {onEdit && <button onClick={() => onEdit(item)} className="text-blue-600 hover:underline mr-3">Edit</button>}
                        {onDelete && <button onClick={() => onDelete(item)} className="text-red-600 hover:underline">Delete</button>}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const isActive = page === i + 1;
            const btnClass = isActive 
              ? 'px-3 py-1 rounded text-sm bg-blue-600 text-white' 
              : 'px-3 py-1 rounded text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700';
            return (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={btnClass}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}