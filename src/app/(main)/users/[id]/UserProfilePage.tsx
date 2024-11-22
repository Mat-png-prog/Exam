// src/app/(main)/users/[id]/UserProfilePage.tsx
'use client';

import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../actions';
import UserProfileForm from './UserProfileForm';
import { UserData } from '../types';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setIsLoading(true);
        const user = await getUserProfile(params.id);
        setUserData(user);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      };
    };
    fetchUserProfile();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4 p-4">
        <h1 className="text-2xl font-bold text-red-600">Profile Error</h1>
        <p className="text-center text-gray-700">{error}</p>
        <Button
          onClick={() => window.location.href = '/dashboard'}
          variant="outline"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  };

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4 p-4">
        <h1 className="text-2xl font-bold text-red-600">User Not Found</h1>
        <p className="text-center text-gray-700">The requested user profile could not be found.</p>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
        >
          Return to Home
        </Button>
      </div>
    );
  };

  return (
    <UserProfileForm
      userData={userData}
      updateUserProfile={async (userId, profileData) => {
        try {
          const result = await updateUserProfile(userId, profileData);
          if (result.success) {
            toast({
              title: 'Success',
              description: result.message,
            });
          }
          return result;
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to update profile',
            variant: 'destructive'
          });
          throw error;
        };
      }}
    />
  );
};

