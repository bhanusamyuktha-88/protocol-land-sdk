import { arweaveMainNode } from "../../helpers/arweave/config/arweaveInstance";
import { User } from "../../types";
import { getUserDetails } from "./getUser";
import { saveUserDetails } from "./helper/saveUser";
import { createProfileSchema } from "./schema";

export const createProfile = async (
  details: Partial<User>,
  signer: string,
  address: string
): Promise<{ result: User }> => {
  try {
    createProfileSchema.parse(details);

    const { result } = await saveUserDetails(details, address, signer);
    return { result };
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};
