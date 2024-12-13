// src/app/(main)/users/types.ts
export interface UpdateProfileValues {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  suburb: string;
  townCity: string;
  postcode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data?: T | null;
  error?: string;
  success?: boolean;
  message?: string;
}