import { z } from "zod";

export const PRSideSchema = z.object({
  repoName: z.string().min(3),
  repoId: z.string().uuid({ message: "Invalid repo ID" }),
});

export const createPullRequestSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  repoId: z.string().uuid({ message: "Invalid repo ID" }),
  address: z.string().regex(/^[a-z0-9-_]{43}$/i, "Invalid address"),
  baseRepo: PRSideSchema,
  compareRepo: PRSideSchema,
  baseBranch: z.string().min(3),
  linkedIssueId: z.number().optional(),
});

export const MergePullRequestSchema = z.object({
  fs: z.any(),
  dir: z.string(),
  base: z.string(),
  compare: z.string(),
  author: z.string().regex(/^[a-z0-9-_]{43}$/i, "Invalid address"),
  dryRun: z.boolean().optional(),
  repoId: z.string().uuid({ message: "Invalid repo ID" }),
  prId: z.number(),
  fork: z.boolean(),
  isPrivate: z.boolean(),
  privateStateTxId: z.string().optional(),
});
