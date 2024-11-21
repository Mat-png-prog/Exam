// src/app/(main)/users/actions.ts
"use server";

import prisma from '@/lib/prisma';
import { validateRequest } from '../../auth';
import { UserData } from './types';
import { UpdateProfileValues } from '@/lib/validations';
import { hash } from "@node-rs/argon2";
import { revalidatePath } from 'next/cache';

export async function getUserProfile(userId: string): Promise<UserData> {
  console.log('Fetching user profile for userId:', userId);

  // Log the current authentication state
  const authResult = await validateRequest();
  console.log('Auth Result:', JSON.stringify(authResult, null, 2));

  // Validate authentication
  if (!authResult.user) {
    console.error('No authenticated user');
    throw new Error('User not authenticated');
  }

  // Fetch user from database
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  console.log('Database User:', JSON.stringify(user, null, 2));

  // Additional checks
  if (!user) {
    console.error(`User with ID ${userId} not found`);
    throw new Error('User not found');
  }

  // Optional: Check if the authenticated user matches the requested user
  if (user.id !== authResult.user.id) {
    console.error('User ID mismatch');
    throw new Error('Unauthorized');
  }

  return user as UserData;
}

// Rest of the file remains the same

export async function updateUserProfile(
  userId: string, 
  userProfileData: UpdateProfileValues
): Promise<{ success: boolean; message: string }> {
  const { user: currentUser } = await validateRequest();
  
  if (!currentUser) {
    return { success: false, message: 'User not authenticated' };
  }
  
  if (userId !== currentUser.id) {
    return { success: false, message: 'Unauthorized' };
  }
  
  const { password, ...profileData } = userProfileData;
  
  const updateData: any = {
    ...profileData,
    updatedAt: new Date(),
  };
  
  if (password) {
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    updateData.passwordHash = passwordHash;
  }
  
  try {
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    
    revalidatePath(`/users/${userId}`);
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to update profile' };
  }
}