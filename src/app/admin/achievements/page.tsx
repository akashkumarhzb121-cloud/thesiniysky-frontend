'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { achievementsApi } from '@/api/achievements.api';
import { DataTable } from '@/components/data/data-table';
import { useState } from 'react';

export default function AdminAchievementsPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-achievements'],
    queryFn: () => achievementsApi.getAll({ limit: 100 }).then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: achievementsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-achievements'] }),
  });

  const saveMutation = useMutation({
    mutationFn: (formData: any) => editing ? achievementsApi.update(editing._id || editing.id, formData) : achievementsApi.create(formData),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-achievements'] }); setEditing(null); setCreating(false); },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Achievements Management</h1>
        <button onClick={() => setCreating(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ New Achievements</button>
      </div>
      <DataTable columns={[{ key: 'title', header: 'Title' },{ key: 'createdAt', header: 'Date', render: (item: any) => new Date(item.createdAt).toLocaleDateString() }]} data={data?.data || []} isLoading={isLoading} emptyMessage="No items found" onEdit={(item) => setEditing(item)} onDelete={(id) => { if (confirm('Delete?')) deleteMutation.mutate(id); }} />
      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => { setEditing(null); setCreating(false); }}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">{editing ? 'Edit' : 'New'} Achievements</h2>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); saveMutation.mutate(Object.fromEntries(fd)); }} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Title *</label><input name="title" defaultValue={editing?.title} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" required /></div><div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Value</label><input name="value" defaultValue={editing?.value} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" placeholder="150+" /></div><div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label><textarea name="description" defaultValue={editing?.description} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" rows={3} /></div>
              <div className="flex gap-3 justify-end pt-2"><button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:text-white">Cancel</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}