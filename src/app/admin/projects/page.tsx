'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';
import { DataTable } from '@/components/data/data-table';
import { useState } from 'react';

export default function AdminProjectsPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => projectsApi.getAll({ limit: 100 }).then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  const saveMutation = useMutation({
    mutationFn: (formData: any) => editing ? projectsApi.update(editing.id, formData) : projectsApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setEditing(null);
      setCreating(false);
    },
  });

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'category', header: 'Category' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: any) => (
        <span className={px-2 py-1 rounded text-xs capitalize }>{item.status}</span>
      )
    },
    { key: 'createdAt', header: 'Date', render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <button onClick={() => setCreating(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New Project
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        emptyMessage="No projects found"
        onEdit={(item) => setEditing(item)}
        onDelete={(item) => { if (confirm('Delete this project?')) deleteMutation.mutate(item.id); }}
      />

      {/* Create/Edit Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              saveMutation.mutate(Object.fromEntries(fd));
            }} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Title</label><input name="title" defaultValue={editing?.title} className="w-full px-3 py-2 border rounded-lg" required /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea name="description" defaultValue={editing?.description} className="w-full px-3 py-2 border rounded-lg" rows={3} required /></div>
              <div><label className="block text-sm font-medium mb-1">Category</label><input name="category" defaultValue={editing?.category} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Status</label><select name="status" defaultValue={editing?.status || 'draft'} className="w-full px-3 py-2 border rounded-lg"><option value="draft">Draft</option><option value="published">Published</option></select></div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
