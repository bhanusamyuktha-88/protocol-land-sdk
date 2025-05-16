import { result } from "@permaweb/aoconnect";
import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getOrganizationNameAvailability } from "../read/getOrganizationNameAvailability";
import { getOrganizationById } from "../read/getOrganizationById";
import { updateOrganizationSchema } from "../schema";

export async function* updateOrganization(
  id: string,
  updates: {
    name?: string;
    username?: string;
    description?: string;
  },
  wallet: string
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Update Payload..." };
    updateOrganizationSchema.parse(updates);

    yield { step: "Fetching Existing Organization..." };
    const org = await getOrganizationById(id);
    if (!org) {
      throw new Error("Organization not found.");
    }

    if (updates.username && updates.username !== org.username) {
      yield { step: "Checking Username Availability..." };
      const isAvailable = await getOrganizationNameAvailability(
        updates.username
      );
      if (!isAvailable) {
        throw new Error("Username is already taken.");
      }
    }

    yield { step: "Sending Update Message..." };
    const Tags = getTags({
      Action: "Update-Organization",
      Id: id,
    });

    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() !== "") {
        Tags.push({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: value,
        });
      }
    });

    const msgId = await sendMessage({
      signer: wallet,
      tags: Tags,
    });

    const { Messages } = await result({
      message: msgId,
      process: PL_PROCESS_ID,
    });

    yield { step: "Organization Updated Successfully", data: Messages };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
