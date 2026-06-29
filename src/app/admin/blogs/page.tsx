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
    queryKey: ['admin-blogs'],
    queryFn: () => blogsApi.getAll({ limit: 100 }).then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: blogsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-blogs'] }),
  });

  const saveMutation = useMutation({
    mutationFn: (formData: any) => editing ? blogsApi.update(editing._id || editing.id, formData) : blogsApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      setEditing(null);
      setCreating(false);
    },
  });

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'category', header: 'Category' },
    { key: 'status', header: 'Status', render: (item: any) => <span className={item.status === 'published' ? 'px-2 py-1 rounded text-xs capitalize bg-green-50 text-green-600' : 'px-2 py-1 rounded text-xs capitalize bg-yellow-50 text-yellow-600'}>{item.status}</span> },
    { key: 'comments', header: 'Comments', render: (item: any) => (item.comments?.length || 0) + ' 💬' },\n    { key: 'createdAt', header: 'Date', render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Blogs Management</h1>
        <button onClick={() => setCreating(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ New Blog</button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No blogs found" onEdit={(item) => setEditing(item)} onDelete={(id) => { if (confirm('Delete this blog?')) deleteMutation.mutate(id); }} />
      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => { setEditing(null); setCreating(false); }}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">{editing ? 'Edit Blog' : 'New Blog'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); saveMutation.mutate(Object.fromEntries(fd)); }} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Thumbnail URL (<a href="/admin/media" target="_blank" className="text-blue-600 underline text-xs">Upload Image</a>)</label><input name="thumbnail" defaultValue={editing?.thumbnail} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" placeholder="https://..." /></div>
              <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Title *</label><input name="title" defaultValue={editing?.title} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" required /></div>
              <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Excerpt</label><textarea name="excerpt" defaultValue={editing?.excerpt} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" rows={3} placeholder="Short description" /></div>
              <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Content</label><textarea name="content" defaultValue={editing?.content} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" rows={10} placeholder="Full content with line breaks" /></div>
              <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label><input name="category" defaultValue={editing?.category} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" /></div>
              <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Status</label><select name="status" defaultValue={editing?.status || 'draft'} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"><option value="draft">Draft</option><option value="published">Published</option></select></div>
              <div className="flex gap-3 justify-end pt-2"><button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:text-white">Cancel</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
