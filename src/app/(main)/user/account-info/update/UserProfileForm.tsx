// src/app/(main)/users/[id]/UserProfileForm.tsx
'use client';

import React, { useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { UpdateProfileValues, ApiResponse } from '../../types';
import LoadingButton from '@/components/LoadingButton';

interface UserProfileFormProps {
  userData: UpdateProfileValues;
  updateUserProfile: (userProfileData: UpdateProfileValues) => Promise<ApiResponse<void>>;
}

export default function UserProfileForm({ userData, updateUserProfile }: UserProfileFormProps): JSX.Element {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const userProfileData: UpdateProfileValues = {
        id: userData.id,
        username: formData.get('username') as string,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phoneNumber: Number(formData.get('phoneNumber')),
        vatNumber: formData.get('vatNumber') as string,
        streetAddress: formData.get('streetAddress') as string,
        addressLine2: (formData.get('addressLine2') as string) || null,
        suburb: formData.get('suburb') as string,
        townCity: formData.get('townCity') as string,
        postcode: formData.get('postcode') as string,
        country: formData.get('country') as string,
        createdAt: userData.createdAt,
        updatedAt: new Date(),
      };

      try {
        const result = await updateUserProfile(userProfileData);
        if (result.success) {
          toast({
            title: "Success",
            description: "Profile updated successfully",
          });
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to update profile",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                name="username" 
                defaultValue={userData.username}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                defaultValue={userData.firstName}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                defaultValue={userData.lastName}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                defaultValue={userData.email}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                name="phoneNumber" 
                type="tel"
                defaultValue={userData.phoneNumber}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatNumber">VAT Number</Label>
              <Input 
                id="vatNumber" 
                name="vatNumber" 
                defaultValue={userData.vatNumber}
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input 
                id="streetAddress" 
                name="streetAddress" 
                defaultValue={userData.streetAddress}
                required 
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input 
                id="addressLine2" 
                name="addressLine2" 
                defaultValue={userData.addressLine2 || ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suburb">Suburb</Label>
              <Input 
                id="suburb" 
                name="suburb" 
                defaultValue={userData.suburb}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="townCity">Town/City</Label>
              <Input 
                id="townCity" 
                name="townCity" 
                defaultValue={userData.townCity}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postcode">Postal Code</Label>
              <Input 
                id="postcode" 
                name="postcode" 
                defaultValue={userData.postcode}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                name="country" 
                defaultValue={userData.country}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label>Created at: {new Date(userData.createdAt).toLocaleDateString()}</Label>
            </div>

            <div className="space-y-2">
              <Label>Updated at: {new Date(userData.updatedAt).toLocaleDateString()}</Label>
            </div>
          </div>

          <CardFooter className="px-0 pb-0">
            <LoadingButton
              type="submit"
              disabled={isPending}
              className="w-full" loading={false}            >
              {isPending ? 'Updating...' : 'Update Profile'}
            </LoadingButton>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
