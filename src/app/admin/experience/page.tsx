'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceApi } from '@/api/experienceApi';
import { DataTable } from '@/components/data/data-table';
import { useState } from 'react';

export default function AdminExperiencePage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-'],
    queryFn: () => experienceApi.getAll().then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: experienceApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-'] }),
  });

  const saveMutation = useMutation({
    mutationFn: (formData: any) => editing ? experienceApi.update(editing.id, formData) : experienceApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-'] });
      setEditing(null);
      setCreating(false);
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experience Management</h1>
        <button onClick={() => setCreating(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New Experience
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
        onDelete={(item) => { if (confirm('Delete this item?')) deleteMutation.mutate(item.id); }}
      />

      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit' : 'New'} Experience</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              saveMutation.mutate(Object.fromEntries(fd));
            }} className="space-y-4">
              <div><label className='block text-sm font-medium mb-1 capitalize'>company</label><input name='company' defaultValue={editing?.company} className='w-full px-3 py-2 border rounded-lg' required /></div>
              <div><label className='block text-sm font-medium mb-1 capitalize'>position</label><input name='position' defaultValue={editing?.position} className='w-full px-3 py-2 border rounded-lg' required /></div>
              <div><label className='block text-sm font-medium mb-1 capitalize'>location</label><input name='location' defaultValue={editing?.location} className='w-full px-3 py-2 border rounded-lg' required /></div>
              <div><label className='block text-sm font-medium mb-1 capitalize'>type</label><input name='type' defaultValue={editing?.type} className='w-full px-3 py-2 border rounded-lg' required /></div>
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
