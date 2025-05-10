import { z } from "zod";

export const organizationIdSchema = z
  .string()
  .min(1, "Organization ID is required");
export const arweaveAddressSchema = z
  .string()
  .regex(/^[a-z0-9-_]{43}$/i, "Invalid Arweave address");

export const orgUsernameSchema = z
  .string()
  .min(1, { message: "Username is required" })
  .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, "Invalid username format");

export const createOrganizationSchema = z.object({
  id: z.string().min(1, { message: "Organization ID is required" }),
  name: z.string().min(1, { message: "Organization name is required" }),
  username: orgUsernameSchema,
  description: z.string().optional(),
});
