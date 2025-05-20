import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { NewHackathonItem, walletSignerType } from "../../../types";
import { createHackathonSchema } from "../schema";
import { getHackathonById } from "../read/getHackathonById";

export async function* postUpdatedHackathon(
  id: string,
  wallet: walletSignerType,
  updates: Partial<NewHackathonItem>
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Hackathon Update Payload..." };
    createHackathonSchema.parse({ id, ...updates });

    yield { step: "Fetching Existing Hackathon..." };
    const hackathon = await getHackathonById(id);
    if (!hackathon) {
      throw new Error("Hackathon not found.");
    }

    yield { step: "Building Tags for Update Message..." };
    const tags = getTags({
      Action: "Update-Hackathon",
      Id: id,
    });

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        (typeof value !== "string" || value.trim() !== "")
      ) {
        tags.push({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value:
            typeof value === "object" ? JSON.stringify(value) : String(value),
        });
      }
    });

    yield { step: "Sending Hackathon Update Message..." };
    const msgId = await sendMessage({
      signer: wallet,
      tags,
    });

    yield {
      step: "Hackathon Updated Successfully",
      data: { id, msgId },
    };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
