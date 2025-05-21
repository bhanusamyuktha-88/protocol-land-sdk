import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  repoId: z.string().uuid({ message: "Invalid repo ID" }),
  address: z.string().regex(/^[a-z0-9-_]{43}$/i, "Invalid address"),
});
