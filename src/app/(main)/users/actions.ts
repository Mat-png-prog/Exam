// src/app/(main)/users/actions.ts
'use server'

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { hash } from '@node-rs/argon2';
import { revalidatePath } from 'next/cache';
import { UpdateProfileValues, ApiResponse } from "./types";

export async function getUserProfile(userId: string): Promise<ApiResponse<UpdateProfileValues>> {
  try {
    if (!userId) {
      return { error: 'No userId provided' };
    }

    const session = getSessionData();
    if (!session?.user) {
      return { error: 'Not authenticated' };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        passwordHash: true,
        vatNumber: true,
        phoneNumber: true,
        streetAddress: true,
        addressLine2: true,
        suburb: true,
        townCity: true,
        postcode: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      return { error: 'User not found' };
    }

    if (user.id !== session.user.id) {
      return { error: 'Unauthorized' };
    }

    const { createdAt, updatedAt, ...userData } = user;
    return { data: userData as UpdateProfileValues };
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return { error: 'Internal server error' };
  }
}

function getSessionData() {
  throw new Error('Function not implemented.');
}



export async function updateUserProfile(
  userId: string, 
  userProfileData: UpdateProfileValues
): Promise<ApiResponse<void>> {
  try {
    const session = getSessionData();
    if (!session?.user) {
      return { success: false, message: 'Not authenticated' };
    }

    if (userId !== session.user.id) {
      return { success: false, message: 'Unauthorized' };
    }

    const { passwordHash, ...profileData } = userProfileData;
    
    const updateData: Partial<UpdateProfileValues> & { updatedAt: Date } = {
      ...profileData,
      updatedAt: new Date(),
    };
    
    if (passwordHash) {
      updateData.passwordHash = await hash(passwordHash);
    }
    
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    
    revalidatePath(`/users/${userId}`);
    
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to update profile'
    };
  }
};

