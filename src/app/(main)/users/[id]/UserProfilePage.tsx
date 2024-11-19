import { UpdateProfileValues } from '@/lib/validations';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getUserProfile, updateUserProfile } from '../actions';
import { UserData } from '../types';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function UserProfilePage({ params }: PageProps) {
  const userData: UserData = await getUserProfile(params.id);

  const sanitizedData = {
    ...userData,
    addressLine2: userData?.addressLine2 ?? undefined,
  };

  const handleSubmit = async (formData: FormData) => {
    const values: UpdateProfileValues = {
      id: formData.get('id') as string,
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phoneNumber: Number(formData.get('phoneNumber')),
      vatNumber: formData.get('vatNumber') as string,
      streetAddress: formData.get('streetAddress') as string,
      addressLine2: formData.get('addressLine2') as string,
      suburb: formData.get('suburb') as string,
      townCity: formData.get('townCity') as string,
      postcode: formData.get('postcode') as string,
      country: formData.get('country') as string,
    };

    try {
      await updateUserProfile(params.id, values);
      // Optionally, refresh or redirect the page
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div >
      <Card >
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              handleSubmit(formData);
            }}
            
          >
            <div >
              <div >
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" defaultValue={sanitizedData.firstName} />
              </div>
              <div >
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" defaultValue={sanitizedData.lastName} />
              </div>
              <div >
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" defaultValue={sanitizedData.username} />
              </div>
              <div >
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" defaultValue={sanitizedData.email} />
              </div>
              <div >
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" defaultValue={sanitizedData.phoneNumber} />
              </div>
              <div >
                <Label htmlFor="vatNumber">VAT Number</Label>
                <Input id="vatNumber" name="vatNumber" defaultValue={sanitizedData.vatNumber} />
              </div>
              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input id="streetAddress" name="streetAddress" defaultValue={sanitizedData.streetAddress} />
              </div>
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input id="addressLine2" name="addressLine2" defaultValue={sanitizedData.addressLine2} />
              </div>
              <div>
                <Label htmlFor="suburb">Suburb</Label>
                <Input id="suburb" name="suburb" defaultValue={sanitizedData.suburb} />
              </div>
              <div>
                <Label htmlFor="townCity">Town or City</Label>
                <Input id="townCity" name="townCity" defaultValue={sanitizedData.townCity} />
              </div>
              <div>
                <Label htmlFor="postcode">Postal Code</Label>
                <Input id="postcode" name="postcode" defaultValue={sanitizedData.postcode} />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" defaultValue={sanitizedData.country} />
              </div>
            </div>
            <CardFooter>
              <Button type="submit">Update Profile</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
