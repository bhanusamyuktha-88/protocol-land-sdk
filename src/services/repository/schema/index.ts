import { z } from "zod";

const repoTitle = z
    .string()
    .min(1, "Name is required")
    .regex(
      /^[A-Za-z0-9._-]+$/,
      "Title can only contain letters, numbers, dots (.), dashes (-), and underscores (_)"
    )

export const createRepoSchema = z.object({
  title: repoTitle,
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
  creator: z.enum(["ORGANIZATION", "USER"]),
  orgId: z.string().optional(),
});

export const forkRepoSchema = z.object({
  name: repoTitle,
  description: z.string().optional(),
  repoId: z.string(),
});