import { User, walletSignerType } from "../../types";
import { getUsernameAvailable } from "./getUser";
import { saveUserDetails } from "./helper/saveUser";
import { createProfileSchema } from "./schema";

export async function* createProfile(
  details: Partial<User>,
  signer: walletSignerType,
  address: string
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Input Details..." };
    createProfileSchema.parse(details);

    yield { step: "Checking Username availability..." };
    const isAvailable = await getUsernameAvailable(details.username || "");
    if (!isAvailable) {
      throw {
        message: "Username already exists...",
      };
    }

    yield { step: "Saving User details" };
    const { result } = await saveUserDetails(details, address, signer);
    yield { step: "User saved successfully", data: result };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
