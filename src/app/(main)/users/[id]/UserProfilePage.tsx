'use client';

import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../actions';
import UserProfileForm from './UserProfileForm';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { UpdateProfileValues, ApiResponse } from '../types';

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [userData, setUserData] = useState<UpdateProfileValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) {
      setError('No user ID provided');
      setIsLoading(false);
      return;
    }

    async function fetchUserProfile() {
      try {
        setIsLoading(true);
        const result = await getUserProfile(params.id);
        if ('error' in result) {
          throw new Error(result.error);
        }
        setUserData(result.data!);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [params.id]);

  const handleProfileUpdate = async (userId: string, updatedUserData: UpdateProfileValues) => {
    try {
      if (!updatedUserData || !userId) {
        throw new Error('Invalid profile data or missing user ID');
      }

      const result = await updateUserProfile(userId, updatedUserData);
      if (!result.success) {
        throw new Error(result.message || 'Failed to update profile');
      }

      setUserData(updatedUserData);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to update profile';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4 p-4">
        <h1 className="text-2xl font-bold text-red-600">
          {error ? 'Error Loading Profile' : 'User Not Found'}
        </h1>
        <p className="text-center text-gray-700">
          {error || 'The requested user profile could not be found. To sell through us, contact us below'}
        </p>
        <Button
          onClick={() => window.location.href = '/contact'}
          variant="outline"
        >
          Return to Contact
        </Button>
      </div>
    );
  }

  return (
    <UserProfileForm
      userData={userData}
      updateUserProfile={handleProfileUpdate}
    />
  );
}