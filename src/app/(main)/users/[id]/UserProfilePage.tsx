// src/app/(main)/users/[id]/UserProfilePage.tsx
import { getUserProfile, updateUserProfile } from '../actions';
import { UserData } from '../types';
import UserProfileForm from './UserProfileForm';
import { redirect } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function UserProfilePage({ params }: PageProps) {
  console.log('UserProfilePage params:', params);

  try {
    const userData = await getUserProfile(params.id);
    console.log('UserProfilePage userData:', userData);

    return (
      <div className="container mx-auto py-8">
        <UserProfileForm 
          userData={userData}
          updateUserProfile={updateUserProfile}
        />
      </div>
    );
  } catch (error) {
    console.error('UserProfilePage Error:', error);
    
    // More informative error handling
    if (error instanceof Error) {
      if (error.message === 'User not authenticated') {
        redirect('/login');
      } else if (error.message === 'User not found') {
        return <div>User not found</div>;
      } else if (error.message === 'Unauthorized') {
        return <div>You are not authorized to view this profile</div>;
      }
    }

    // Generic error handling
    return <div>An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
}