'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getUserProfile } from './actions';
import { UpdateProfileValues } from '../types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function UserProfile(): JSX.Element {
  const [userData, setUserData] = useState<UpdateProfileValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setIsLoading(true);
        const result = await getUserProfile();
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
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4 p-4">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Profile</h1>
        <p className="text-center text-gray-700">{error}</p>
      </div>
    );
  }

  return (<>
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Username:</strong> {userData?.username || 'N/A'}</p>
        <p><strong>First Name:</strong> {userData?.firstName || 'N/A'}</p>
        <p><strong>Last Name:</strong> {userData?.lastName || 'N/A'}</p>
        <p><strong>Email:</strong> {userData?.email || 'N/A'}</p>
        <p><strong>Phone Number:</strong> {userData?.phoneNumber || 'N/A'}
        <Button className='ml-32'>
        <Link href={`/user/account-info/update`}>Update Profile</Link>
    </Button></p>
        <p><strong>VAT Number:</strong> {userData?.vatNumber || 'N/A'}</p>
        <p><strong>Street Address:</strong> {userData?.streetAddress || 'N/A'}</p>
        <p><strong>Address Line 2:</strong> {userData?.addressLine2 || 'N/A'}</p>
        <p><strong>Suburb:</strong> {userData?.suburb || 'N/A'}</p>
        <p><strong>Town/City:</strong> {userData?.townCity || 'N/A'}</p>
        <p><strong>Postal Code:</strong> {userData?.postcode || 'N/A'}</p>
        <p><strong>Country:</strong> {userData?.country || 'N/A'}</p>
        <p><strong>Created At:</strong> {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Updated At:</strong> {userData?.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : 'N/A'}</p>

      </CardContent>
    </Card>
    
  </>
  );
}
