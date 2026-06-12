'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaApi } from '@/api/media.api';

export default function AdminMediaPage() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: files, isLoading } = useQuery({
    queryKey: ['media-files'],
    queryFn: () => mediaApi.list().then(r => r.data.data),
  });

  const deleteMutation = useMutation({
    mutationFn: mediaApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['media-files'] }),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await mediaApi.upload(file);
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files?.map((file: any) => (
            <div key={file.id} className="bg-white rounded-lg border overflow-hidden group relative">
              {file.mimeType?.startsWith('image/') ? (
                <img src={file.url} alt={file.originalName} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                  FILE
                </div>
              )}
              <div className="p-2">
                <p className="text-xs truncate">{file.originalName}</p>
                <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Delete this file?')) {
                    deleteMutation.mutate(file.filename);
                  }
                }}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
