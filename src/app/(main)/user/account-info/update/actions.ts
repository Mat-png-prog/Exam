'use server';

import prisma from '@/lib/prisma';
import { UpdateProfileValues, ApiResponse } from '../../types';
import { validateRequest } from '../../../../auth';

export async function getUserProfile(): Promise<ApiResponse<UpdateProfileValues>> {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return { error: 'Not authenticated' };
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
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
      },
    });

    if (!userData) {
      return { error: 'User not found' };
    }

    return { 
      success: true,
      data: userData,
    };
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return { error: 'Internal server error' };
  }
}

export async function updateUserProfile(
  userProfileData: UpdateProfileValues
): Promise<ApiResponse<void>> {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return { success: false, message: 'Not authenticated' };
    }

    const { ...profileData } = userProfileData;

    const updateData: any = {
      ...profileData,
      updatedAt: new Date(),
    };

    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile'
    };
  }
}
