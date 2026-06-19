'use client';

import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaApi } from '@/api/media.api';
import { Upload, X, Image, FileText } from 'lucide-react';

export default function AdminMediaPage() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const formData = new FormData();
      formData.append('file', file);
      await mediaApi.upload(file);
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const getFullUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    return 'https://thesiniysky-backend.onrender.com' + url;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Media Library</h1>
        <div className="flex gap-3">
          <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload from Device'}
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*,video/*" />
          </label>
          <button onClick={() => fileInputRef.current?.click()} className="border dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Image className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12" key="loading">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" key="spinner"></div>
        </div>
      ) : files && files.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file: any) => {
            const fileKey = file._id || file.id || file.filename;
            const fileUrl = getFullUrl(file.url);
            const isImage = file.mimeType?.startsWith('image/');
            return (
              <div key={fileKey} className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 overflow-hidden group relative hover:shadow-lg transition-shadow">
                {isImage ? (
                  <div className="aspect-square relative">
                    <img src={fileUrl} alt={file.originalName} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="p-2">
                  <p className="text-xs truncate dark:text-gray-300">{file.originalName}</p>
                  <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                  <button onClick={() => navigator.clipboard.writeText(fileUrl)} className="text-xs text-blue-600 hover:underline mt-1">Copy URL</button>
                </div>
                <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(file._id || file.id); }} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700" key="empty">
          <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No files uploaded yet</p>
          <p className="text-sm text-gray-400 mt-1">Click "Upload from Device" to add files</p>
        </div>
      )}
    </div>
  );
}
