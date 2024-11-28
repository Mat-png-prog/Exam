//src/app/(main)/users/[id]/page.tsx
import UserProfilePage from './UserProfilePage';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserProfilePage params={{ id }} />;
}
