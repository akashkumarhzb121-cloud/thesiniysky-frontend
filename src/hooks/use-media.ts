import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaApi } from '@/api/media.api';

export function useMedia() {
  return useQuery({ queryKey: ['media'], queryFn: () => mediaApi.list().then(r => r.data.data) });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.upload,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['media'] }),
  });
}
