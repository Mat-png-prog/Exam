//src/lib/validations.ts
import { z } from "zod";

const requiredString = z
  .string()
  .trim()
  .min(1, "At least one character Required");

// Signup Form Validation

export const signUpSchema = z.object({
  email: requiredString.email("Invalid Email"),
  username: requiredString
    .min(1, "Username must be at least 5 characters")
    .max(15, "Username can't be more than 15 charcters"),
  password: requiredString.min(8, "Password must be 8 characters or more"),
  firstName: requiredString.max(
    57,
    "First name cannot be more than 57 charcters",
  ), // Add these fields
  lastName: requiredString.max(
    57,
    "First name cannot be more than 57 charcters",
  ), // to your schema
  vatNumber: requiredString,
  phoneNumber: z.number().int().positive().min(10, "Phone number must be 10 characters or more"),
  streetAddress: z.string(),
  addressLine2: z.string(),
  suburb: z.string(),
  townCity: z.string(),
  postcode: requiredString
    .min(4, "Postal Code must be at least 4 characters")
    .max(10, "Postal Code must be no longer than 10 characters")
    .regex(/^[0-9-]+$/, "Only numbers and dashes allowed"),
  country: z.string(),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

// Login Form Validation

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

// create Book Schema

export type BookValues = z.infer<typeof bookSchema>;
export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(3, "Author is required to be more than 3 characters"),
  description: z.string().min(10, "Must be more than 10 charcters and UNIQUE"),
  publishYear: z
    .number()
    .int("Year must be a whole number")
    .min(1800, "Year must be 1800 or later")
    .max(new Date().getFullYear() + 10, "Year cannot be too far in the future"),
  price: z.preprocess((val) => Number(val), z.number().nonnegative()),
  available: z.boolean(),
});

//Profile-----------------------------------------------------

export const updateProfileSchema = z.object({
  id: requiredString,
   email: requiredString.email("Invalid Email"),
  username: requiredString
    .min(1, "Username must be at least 5 characters")
    .max(15, "Username can't be more than 15 charcters"),
  firstName: requiredString.max(
    57,
    "First name cannot be more than 57 charcters",
  ), // Add these fields
  lastName: requiredString.max(
    57,
    "First name cannot be more than 57 charcters",
  ), // to your schema
  phoneNumber: z.number().int().positive().min(10, "Phone number must be 10 characters or more"),
  vatNumber: requiredString,
  streetAddress: requiredString,
  addressLine2: requiredString,
  suburb: requiredString,
  townCity: requiredString,
  postcode: requiredString
    .min(4, "Postal Code must be at least 4 characters")
    .max(10, "Postal Code must be no longer than 10 characters")
    .regex(/^[0-9-]+$/, "Only numbers and dashes allowed"),
  country: requiredString,
  /* theme: z.string(), */
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
