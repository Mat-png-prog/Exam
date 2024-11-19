"use server";

import prisma from '@/lib/prisma';
import { validateRequest } from '../../auth';
import { UserData } from './types';
import { UpdateProfileValues } from '@/lib/validations';
import { hash } from "@node-rs/argon2";

export async function getUserProfile(userId: string): Promise<UserData> {
  const { user: currentUser } = await validateRequest();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  const data = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!data) {
    throw new Error('User not found');
  }

  // Allow the user to access their own profile
  if (data.id !== currentUser.id) {
    throw new Error('Unauthorized');
  }

  return data as UserData;
}

export async function updateUserProfile(userId: string, userProfileData: UpdateProfileValues): Promise<UserData> {
  const { user: currentUser } = await validateRequest();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  if (userId !== currentUser.id) {
    throw new Error('Unauthorized');
  }

  // Separate password from other profile data
  const { password, ...profileData } = userProfileData;
  
  // Create the base update object
  const updateData: any = { ...profileData };

  // Only hash and update password if it's provided
  if (password) {
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    updateData.hashedPassword = passwordHash; // Assuming your DB field is named hashedPassword
  }

  const data = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return data as UserData;
}