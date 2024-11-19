'use client';

import UserProfilePage from './UserProfilePage';

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <UserProfilePage params={params} />
    </div>
  );
};

export default ProfilePage;
