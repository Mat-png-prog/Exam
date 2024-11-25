// src/app/(main)/users/[id]/UserProfilePage.tsx
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
    async function fetchUserProfile() {
      try {
        setIsLoading(true);
        const result = await getUserProfile(params.id);
        if (result.error) {
          throw new Error(result.error);
        }
        if (result.data) {
          setUserData(result.data);
          setError(null);
        } else {
          throw new Error('No user data returned');
        }
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

  const handleProfileUpdate = async (updatedUserData: UpdateProfileValues): Promise<ApiResponse<void>> => {
    try {
      if (!updatedUserData || !params.id) {
        throw new Error('Invalid profile data or missing user ID');
      }
      const result = await updateUserProfile(params.id, updatedUserData);
      if (result.success) {
        setUserData(updatedUserData);
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });
      } else {
        throw new Error(result.message || 'Failed to update profile');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to update profile';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return {
        success: false,
        message: errorMessage
      };
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
          Error Loading Profile
        </h1>
        <p className="text-center text-gray-700">
          {error || 'Failed to load user profile. Please try again.'}
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
      updateUserProfile={(userId, userProfileData) => handleProfileUpdate(userProfileData)}
    />
  );
}