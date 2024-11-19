export type UserData = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  passwordHash: string;
  vatNumber: string;
  phoneNumber: number;
  streetAddress: string;
  addressLine2?: string | null;
  suburb: string;
  townCity: string;
  postcode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SessionData = {
  id: string;
  userId: string;
  expiresAt: Date;
};
