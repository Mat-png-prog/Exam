// src/app/(main)/users/[id]/page.tsx
import UserProfilePage from './UserProfilePage';

export default function ProfilePage({ params }
  :
  { params: { id: string } }) {
  return <UserProfilePage params={params} />;
};
