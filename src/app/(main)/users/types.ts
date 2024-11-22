// src/app/(main)/users/types.ts
export interface UpdateProfileValues {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash?: string;
  phoneNumber: number;
  vatNumber: string;
  streetAddress: string;
  addressLine2?: string | null;
  suburb: string;
  townCity: string;
  postcode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T | null;
  error?: string;
  success?: boolean;
  message?: string;
}