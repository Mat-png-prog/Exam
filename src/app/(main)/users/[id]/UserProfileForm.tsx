// src/app/(main)/users/[id]/UserProfileForm.tsx
/* 'use client';

import { useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { UserData } from '../types';

type UserProfileFormProps = {
  userData: UserData;
  updateUserProfile: (formData: FormData) => Promise<{ success: boolean; message: string }>;
};

export default function UserProfileForm({ userData, updateUserProfile }: UserProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      formData.append('id', userData.id);
      
      const result = await updateUserProfile(formData);
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateUserProfile} className="space-y-6">
 
          <CardFooter className="px-0 pb-0">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
} */

'use client';

import { useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { UserData } from '../types';
import { UpdateProfileValues } from '@/lib/validations'; // Assuming you have this type

type UserProfileFormProps = {
  userData: UserData;
  updateUserProfile: (userId: string, userProfileData: UpdateProfileValues) => Promise<{ success: boolean; message: string }>;
};

export default function UserProfileForm({ userData, updateUserProfile }: UserProfileFormProps) {
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
        addressLine2: formData.get('addressLine2') as string,
        suburb: formData.get('suburb') as string,
        townCity: formData.get('townCity') as string,
        postcode: formData.get('postcode') as string,
        country: formData.get('country') as string,
        password: formData.get('password') as string ,
      };
      
      try {
        const result = await updateUserProfile(userData.id, userProfileData);
        
        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
          });
        } else {
          toast({
            title: "Error",
            description: result.message,
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
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password"
                placeholder="Leave blank to keep current password"
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
                defaultValue={userData.addressLine2 ?? ''}
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
          </div>

          {/* Rest of the form remains the same as in your original code */}
          <CardFooter className="px-0 pb-0">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}