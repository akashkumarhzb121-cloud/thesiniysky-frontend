import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

// Helper: Extract role string from either string or populated object
function getRoleString(role: any): string {
  if (!role) return '';
  if (typeof role === 'string') return role;
  if (typeof role === 'object' && role.name) return role.name;
  return '';
}

// Helper: Check if user has admin-level access
function isAdminRole(role: any): boolean {
  const roleStr = getRoleString(role);
  return ['super_admin', 'admin', 'editor'].includes(roleStr);
}

// Helper: Check if user has strict admin access
function isStrictAdmin(role: any): boolean {
  const roleStr = getRoleString(role);
  return ['super_admin', 'admin'].includes(roleStr);
}

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data.data;
      login(user, accessToken, refreshToken);
      const dashboardPath = isAdminRole(user.role) ? '/admin' : '/client';
      router.push(dashboardPath);
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
      
      return authApi.register({
        firstName,
        lastName,
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data.data;
      try {
        const userResponse = await authApi.getMe();
        const user = userResponse.data.data;
        login(user, accessToken, refreshToken);
        const dashboardPath = isAdminRole(user.role) ? '/admin' : '/client';
        router.push(dashboardPath);
      } catch {
        const user = response.data.data.user;
        login(user, accessToken, refreshToken);
        const dashboardPath = isAdminRole(user?.role) ? '/admin' : '/client';
        router.push(dashboardPath);
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

// Export helpers for use in other files
export { getRoleString, isAdminRole, isStrictAdmin };