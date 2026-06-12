'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { crmApi } from '@/api/crm.api';
import { DataTable } from '@/components/data/data-table';
import { useState } from 'react';

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

  const stages = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Leads CRM</h1>
      
      {/* Pipeline View */}
      {pipeline && (
        <div className="grid grid-cols-7 gap-4 mb-8 overflow-x-auto">
          {stages.map(stage => (
            <div key={stage} className="bg-white rounded-lg border p-3 min-w-[150px]">
              <h3 className="text-sm font-semibold capitalize mb-2">{stage}</h3>
              <p className="text-2xl font-bold text-blue-600">{pipeline[stage] || 0}</p>
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
              <span className={px-2 py-1 rounded text-xs capitalize }>{item.status}</span>
            )
          },
          { key: 'value', header: 'Value', render: (item: any) => item.value ? $ : '-' },
        ]}
        data={leadsData?.data || []}
        isLoading={isLoading}
        onEdit={(item) => setEditing(item)}
      />

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Lead: {editing.name}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              updateMutation.mutate({ id: editing.id, data: Object.fromEntries(fd) });
              setEditing(null);
            }} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Status</label><select name="status" defaultValue={editing.status} className="w-full px-3 py-2 border rounded-lg">{stages.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <div><label className="block text-sm font-medium mb-1">Value</label><input name="value" type="number" defaultValue={editing.value} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Notes</label><textarea name="notes" defaultValue={editing.notes} className="w-full px-3 py-2 border rounded-lg" rows={3} /></div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
