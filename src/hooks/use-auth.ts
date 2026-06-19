import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';

function extractRoleName(role: unknown): UserRole {
  if (!role) return 'visitor';
  if (typeof role === 'string') return role as UserRole;
  if (typeof role === 'object' && role !== null && 'name' in role) {
    return (role as { name: string }).name as UserRole;
  }
  return 'visitor';
}

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data.data;
      const roleName = extractRoleName(user.role);
      const normalizedUser = { ...user, role: roleName };
      login(normalizedUser, accessToken, refreshToken);

      // FIX: Redirect admin users to /admin
      if (['super_admin', 'admin', 'editor'].includes(roleName)) {
        router.push('/admin');
      } else {
        router.push('/client');
      }
    },
  });
}

export function useRegister() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) => {
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || data.name;
      const lastName = nameParts.slice(1).join(' ') || 'User';
      return authApi.register({ firstName, lastName, email: data.email, password: data.password });
    },
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data.data;
      try {
        const userResponse = await authApi.getMe();
        const userData = userResponse.data.data;
        const normalizedUser = { ...userData, role: extractRoleName(userData.role) };
        login(normalizedUser, accessToken, refreshToken);
        router.push('/client');
      } catch {
        login(response.data.data.user, accessToken, refreshToken);
        router.push('/client');
      }
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => { logout(); router.push('/'); },
  });
}

export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApi.getMe().then((res) => res.data.data),
    enabled: isAuthenticated,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => { setUser(response.data.data); queryClient.invalidateQueries({ queryKey: ['currentUser'] }); },
  });
}

export function useChangePassword() {
  return useMutation({ mutationFn: authApi.changePassword });
}

export function useDeleteAccount() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.deleteAccount,
    onSuccess: () => { logout(); router.push('/'); },
  });
}