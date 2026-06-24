'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsApi } from '@/api/blogs.api';
import { DataTable } from '@/components/data/data-table';
import { useState } from 'react';

export default function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-'],
    queryFn: () => blogsApi.getAll().then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: blogsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-'] }),
  });

  const saveMutation = useMutation({
    mutationFn: (formData: any) => editing ? blogsApi.update(editing._id || editing._id || editing.id, formData) : blogsApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-'] });
      setEditing(null);
      setCreating(false);
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs Management</h1>
        <button onClick={() => setCreating(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New Blogs
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'createdAt', header: 'Date', render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
        ]}
        data={data?.data || []}
        isLoading={isLoading}
        onEdit={(item) => setEditing(item)}
        onDelete={(id) => { if (confirm('Delete this item?')) deleteMutation.mutate(id); }}
      />

      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit' : 'New'} Blogs</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              saveMutation.mutate(Object.fromEntries(fd));
            }} className="space-y-4">
              <div><label className='block text-sm font-medium mb-1 capitalize'>title</label><input name='title' defaultValue={editing?.title} className='w-full px-3 py-2 border rounded-lg' required /></div>
              <div><label className='block text-sm font-medium mb-1 capitalize'>excerpt</label><input name='excerpt' defaultValue={editing?.excerpt} className='w-full px-3 py-2 border rounded-lg' required /></div>
              <div><label className='block text-sm font-medium mb-1 capitalize'>category</label><input name='category' defaultValue={editing?.category} className='w-full px-3 py-2 border rounded-lg' required /></div>
              <div><label className='block text-sm font-medium mb-1'>Status</label><select name='status' defaultValue={editing?.status || 'draft'} className='w-full px-3 py-2 border rounded-lg'><option value='draft'>Draft</option><option value='published'>Published</option></select></div>
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
