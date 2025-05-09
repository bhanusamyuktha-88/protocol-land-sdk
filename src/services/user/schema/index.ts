import { z } from "zod";

export const arweaveAddressSchema = z
  .string()
  .regex(/^[a-z0-9-_]{43}$/i, "Invalid Arweave address");

export const usernameSchema = z
  .string()
  .min(1, { message: "Username is required" })
  .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, "Invalid username format");

export const createProfileSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  username: usernameSchema,
  bio: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  location: z.string().optional(),
  twitter: z.string().url("Invalid URL").optional(),
  email: z.string().email("Invalid email address").optional(),
  avatar: z.string().optional(),
  readmeTxId: z.string().optional(),
  isUserNameArNS: z.boolean().optional(),
});

export const updateProfileSchema = createProfileSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
