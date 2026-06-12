'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCurrentUser, useUpdateProfile } from '@/hooks/use-auth';
import { PublicHeader } from '@/components/layout/public-header';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser();
  const updateProfile = useUpdateProfile();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: user ? { name: user.name, email: user.email } : undefined,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
          
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <form onSubmit={handleSubmit((data) => updateProfile.mutate(data))} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input {...register('name')} className="w-full px-4 py-2 border rounded-lg" />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input {...register('email')} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input value={user?.role} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50 capitalize" />
              </div>

              <button
                type="submit"
                disabled={updateProfile.isPending}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
