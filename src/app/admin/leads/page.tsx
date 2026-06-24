'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { crmApi } from '@/api/crm.api';
import { DataTable } from '@/components/data/data-table';
import { useState } from 'react';

const stages = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

export default function AdminLeadsPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);

  const { data: leadsData, isLoading } = useQuery({
    queryKey: ['crm-leads'],
    queryFn: () => crmApi.getLeads().then(r => r.data),
  });

  const { data: pipeline } = useQuery({
    queryKey: ['crm-pipeline'],
    queryFn: () => crmApi.getPipeline().then(r => r.data.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => crmApi.updateLead(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['crm-leads'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: crmApi.deleteLead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['crm-leads'] }),
  });

  const getStatusClass = (status: string) => {
    if (status === 'won') return 'px-2 py-1 rounded text-xs capitalize bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';
    if (status === 'lost') return 'px-2 py-1 rounded text-xs capitalize bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
    return 'px-2 py-1 rounded text-xs capitalize bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Leads CRM</h1>
      
      {pipeline && (
        <div className="grid grid-cols-7 gap-4 mb-8 overflow-x-auto">
          {stages.map(stage => (
            <div key={stage} className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-3 min-w-[130px]">
              <h3 className="text-sm font-semibold capitalize mb-2 dark:text-white">{stage}</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pipeline[stage] || 0}</p>
            </div>
          ))}
        </div>
      )}

      <DataTable
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'company', header: 'Company' },
          { 
            key: 'status', 
            header: 'Status',
            render: (item: any) => (
              <span className={getStatusClass(item.status)}>{item.status}</span>
            )
          },
          { key: 'value', header: 'Value', render: (item: any) => item.value ? '$' + item.value : '-' },
        ]}
        data={leadsData?.data || []}
        isLoading={isLoading}
        onEdit={(item) => setEditing(item)}
        onDelete={(id) => { if (confirm('Delete this item?')) deleteMutation.mutate(id); }}
      />

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditing(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Edit Lead: {editing.name}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              updateMutation.mutate({ id: editing.id, data: Object.fromEntries(fd) });
              setEditing(null);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Status</label>
                <select name="status" defaultValue={editing.status} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white">
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Value ($)</label>
                <input name="value" type="number" defaultValue={editing.value} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Notes</label>
                <textarea name="notes" defaultValue={editing.notes} className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" rows={3} />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}