import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';

export function useAdminUsers() {
  return useQuery({ queryKey: ['admin-users'], queryFn: () => adminApi.getUsers().then(r => r.data.data) });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminApi.updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });
}

export function useAdminRoles() {
  return useQuery({ queryKey: ['admin-roles'], queryFn: () => adminApi.getRoles().then(r => r.data.data) });
}
