// src/app/(main)/users/actions.ts
"use server";

import prisma from '@/lib/prisma';
import { validateRequest } from '../../auth';
import { UserData } from './types';
import { hash } from '@node-rs/argon2';
import { revalidatePath } from 'next/cache';
import { UpdateProfileValues } from '@/lib/validations';

export async function getUserProfile(userId: string): Promise<UserData> {
  try {
    console.log('Fetching user profile for userId:', userId);

    const authResult = await validateRequest();
    if (!authResult.user) {
      console.error('No authenticated user');
      throw new Error('User not authenticated');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error(`User with ID ${userId} not found`);
      throw new Error('User not found');
    }

    if (user.id !== authResult.user.id) {
      console.error('User ID mismatch', {
        requestedUserId: userId,
        authenticatedUserId: authResult.user.id
      });
      throw new Error('Unauthorized');
    }

    const { passwordHash, ...safeUserData } = user;
    return safeUserData as UserData;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
}


export async function updateUserProfile(
  userId: string, 
  userProfileData: UpdateProfileValues
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate authentication
    const { user: currentUser } = await validateRequest();
    
    if (!currentUser) {
      return { success: false, message: 'User not authenticated' };
    }
    
    // Ensure user is updating their own profile
    if (userId !== currentUser.id) {
      return { success: false, message: 'Unauthorized' };
    }
    
    // Separate password from other profile data
    const { password, ...profileData } = userProfileData;
    
    const updateData: any = {
      ...profileData,
      updatedAt: new Date(),
    };
    
    // Hash password if provided
    if (password) {
      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
      updateData.passwordHash = passwordHash;
    }
    
    // Update user in database
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    
    // Revalidate the user's profile page
    revalidatePath(`/users/${userId}`);
    
    return { 
      success: true, 
      message: 'Profile updated successfully' 
    };
  } catch (error) {
    // Log the error for debugging
    console.error('Error updating user profile:', error);
    
    return { 
      success: false, 
      message: error instanceof Error 
        ? error.message 
        : 'Failed to update profile' 
    };
  }
}
