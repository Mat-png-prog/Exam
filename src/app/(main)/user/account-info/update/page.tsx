// src/app/(main)/user/account-info/update/page.tsx

import UserProfilePage from './UserProfilePage'; // Adjust import path as needed
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "UPDATE-ACCOUNT",
};

export default async function ProfilePage() {
  return <UserProfilePage />;
}