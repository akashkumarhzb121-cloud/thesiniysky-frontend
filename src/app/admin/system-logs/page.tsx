'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';
import { LoadingState, EmptyState } from '@/components/forms/form-components';

export default function AdminSystemLogsPage() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['system-logs'],
    queryFn: () => adminApi.getSystemLogs().then(r => r.data.data),
  });

  if (isLoading) return <LoadingState message="Loading system logs..." />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">System Logs</h1>
      
      {logs && logs.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 dark:text-gray-300">Timestamp</th>
                  <th className="text-left py-3 px-4 dark:text-gray-300">Level</th>
                  <th className="text-left py-3 px-4 dark:text-gray-300">Message</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log: any, i: number) => (
                  <tr key={i} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                      {new Date(log.timestamp || log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={'px-2 py-1 rounded text-xs capitalize ' + (
                        log.level === 'error' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                        log.level === 'warn' ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      )}>
                        {log.level || 'info'}
                      </span>
                    </td>
                    <td className="py-3 px-4 dark:text-gray-300">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState title="No logs found" description="System logs will appear here." />
      )}
    </div>
  );
}
