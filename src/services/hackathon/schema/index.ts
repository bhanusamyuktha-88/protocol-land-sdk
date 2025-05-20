import { z } from "zod";

export const PrizeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  base: z.string(),
  winningParticipantsCount: z.number(),
});

export const createHackathonSchema = z.object({
  hackathonLogo: z.string().url(),
  title: z.string().min(3),
  shortDescription: z.string().min(10),
  descriptionTxId: z.string(),
  prizes: z.record(PrizeSchema),
  totalRewardsBase: z.string(),
  totalRewards: z.number(),
  startsAt: z.number(),
  endsAt: z.number(),
  hostLogo: z.string().url(),
  hostedBy: z.string().min(3),
  location: z.string().min(3),
  tags: z.array(z.string()),
});

export const idSchema = z.string().uuid({ message: "Invalid Hackathon ID" })

export const createHackathonTeamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters long"),
  hackathonId: z.string().min(1, "Hackathon ID is required"),
  members: z
    .array(z.string().min(1, "Member ID cannot be empty"))
    .min(1, "At least one team member is required"),
});

