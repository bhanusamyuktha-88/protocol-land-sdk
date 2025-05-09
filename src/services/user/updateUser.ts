import { User } from "../../types";
import { saveUserDetails } from "./helper/saveUser";
import { updateProfileSchema } from "./schema";
import { getUsernameAvailable } from "./getUser";

export async function* updateProfile(
  details: Partial<User>,
  signer: string,
  address: string
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Input Details..." };
    updateProfileSchema.parse(details);

    if (details.username) {
      yield { step: "Checking Username Availability..." }; 
      const isAvailable = await getUsernameAvailable(details.username);
      if (!isAvailable) {
        throw {
          message: "Username already exists...",
        };
      }
    }
    yield { step: "Saving Updated User Details..." };
    const { result } = await saveUserDetails(details, address, signer);
    yield { step: "User updated successfully", data: result };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
