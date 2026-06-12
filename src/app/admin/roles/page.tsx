'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';

export default function AdminRolesPage() {
  const { data: roles, isLoading } = useQuery({
    queryKey: ['admin-roles'],
    queryFn: () => adminApi.getRoles().then(r => r.data.data),
  });

  const permissions = ['read', 'write', 'update', 'delete', 'publish'];
  const roleList = ['super_admin', 'admin', 'editor', 'client', 'visitor'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Roles & Permissions</h1>
      
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Role</th>
              {permissions.map(p => (
                <th key={p} className="text-center py-3 px-4 capitalize">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roleList.map(role => (
              <tr key={role} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 font-medium capitalize">{role.replace('_', ' ')}</td>
                {permissions.map(perm => (
                  <td key={perm} className="text-center py-3 px-4">
                    <input type="checkbox" defaultChecked={role === 'super_admin' || (role === 'admin' && perm !== 'publish')} className="rounded" />
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
