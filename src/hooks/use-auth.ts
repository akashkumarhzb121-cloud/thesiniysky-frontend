import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';

// FIX 7 helper: _formatUser() returns `role` as the raw populated Mongoose document
// e.g. { name: 'super_admin', displayName: 'Super Admin', ... } — not a plain string.
// .includes(user.role) was comparing an object to strings → always false → admins
// were always redirected to /client instead of /admin.
// This helper safely extracts the string name regardless of what the backend sends.
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

      // FIX 7: normalise role to its string name before storing and comparing
      const roleName = extractRoleName(user.role);
      const normalizedUser = { ...user, role: roleName };

      login(normalizedUser, accessToken, refreshToken);

      const dashboardPath = ['super_admin', 'admin', 'editor'].includes(roleName)
        ? '/admin'
        : '/client';
      router.push(dashboardPath);
    },
  });
}

export function useRegister() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) => {
      // Split name into firstName and lastName for backend
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
      // After register, fetch full user profile with role
      try {
        const userResponse = await authApi.getMe();
        const userData = userResponse.data.data;
        // FIX 7: normalise role from getMe() response too
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