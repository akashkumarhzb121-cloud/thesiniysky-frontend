'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';
import { useState } from 'react';

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<any>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminApi.getUsers().then(r => r.data.data),
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setEditingUser(null);
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">User Management</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">Total: {users?.length || 0} users</span>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left py-3 px-4 font-medium dark:text-gray-300">Name</th>
                <th className="text-left py-3 px-4 font-medium dark:text-gray-300">Email</th>
                <th className="text-left py-3 px-4 font-medium dark:text-gray-300">Role</th>
                <th className="text-left py-3 px-4 font-medium dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium dark:text-gray-300">Joined</th>
                <th className="text-right py-3 px-4 font-medium dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any) => (
                <tr key={user.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium dark:text-white">{user.name || user.firstName + ' ' + user.lastName}</td>
                  <td className="py-3 px-4 dark:text-gray-300">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs capitalize">
                      {(user.role?.name || user.role || '').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={user.emailVerified ? 'px-2 py-1 rounded text-xs bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'px-2 py-1 rounded text-xs bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'}>
                      {user.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => setEditingUser(user)} className="text-blue-600 hover:underline mr-3 text-sm">
                      Edit
                    </button>
                    <button onClick={() => { if (confirm('Delete this user?')) deleteMutation.mutate(user.id); }} className="text-red-600 hover:underline text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingUser(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Edit User: {editingUser.name || editingUser.firstName}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              updateMutation.mutate({ id: editingUser.id, data: Object.fromEntries(fd) });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
                <input name="name" defaultValue={editingUser.name || editingUser.firstName} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role</label>
                <select name="role" defaultValue={editingUser.role?.name || editingUser.role} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white">
                  <option value="visitor">Visitor</option>
                  <option value="client">Client</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}