'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';

const permissions = ['read', 'write', 'update', 'delete', 'publish'];
const roleList = ['super_admin', 'admin', 'editor', 'client', 'visitor'];

export default function AdminRolesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-roles'],
    queryFn: () => adminApi.getRoles().then(r => r.data),
  });

  const rolesData = data?.data?.roles || data?.data || [];

  if (isLoading) return <div className="p-6 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Roles & Permissions</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left py-3 px-4 dark:text-gray-300">Role</th>
              {permissions.map(p => <th key={p} className="text-center py-3 px-4 capitalize dark:text-gray-300">{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {roleList.map(roleName => {
              const role = Array.isArray(rolesData) ? rolesData.find((r: any) => r.name === roleName) : null;
              const rolePerms = role?.permissions?.map((p: any) => p?.name || p) || [];
              return (
                <tr key={roleName} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium capitalize dark:text-white">{roleName.replace('_', ' ')}</td>
                  {permissions.map(perm => (
                    <td key={perm} className="text-center py-3 px-4">
                      <input type="checkbox" checked={rolePerms.includes(perm)} readOnly className="rounded" />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}