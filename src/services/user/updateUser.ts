import { User } from "../../types";
import { saveUserDetails } from "./helper/saveUser";
import { updateProfileSchema } from "./schema";

export const updateProfile = async (
    details: Partial<User>,
    signer: string,
    address: string
  ): Promise<{ result: User }> => {
    try {
      updateProfileSchema.parse(details);
      
      const { result } = await saveUserDetails(details, address, signer);
      return { result };
    } catch (error: any) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  };