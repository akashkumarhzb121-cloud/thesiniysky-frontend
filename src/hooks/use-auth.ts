import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data.data;
      login(user, accessToken, refreshToken);
      const dashboardPath = ['super_admin', 'admin', 'editor'].includes(user.role) ? '/admin' : '/client';
      router.push(dashboardPath);
    },
  });
}

export function useRegister() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data.data;
      // After register, fetch full user profile with role
      try {
        const userResponse = await authApi.getMe();
        login(userResponse.data.data, accessToken, refreshToken);
        router.push('/client');
      } catch {
        // Fallback to response user if /me fails
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
    onSettled: () => {
      logout();
      router.push('/');
    },
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
    onSuccess: (response) => {
      setUser(response.data.data);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
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
    onSuccess: () => {
      logout();
      router.push('/');
    },
  });
}
