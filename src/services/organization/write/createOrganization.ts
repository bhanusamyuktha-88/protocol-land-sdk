import { result } from "@permaweb/aoconnect";
import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { Tag } from "../../../types";
import { getOrganizationNameAvailability } from "../read/getOrganizationNameAvailability";
import { createOrganizationSchema } from "../schema";
import { v4 as uuidv4 } from "uuid";

export async function* createOrganization(
  details: {
    name: string;
    username: string;
    description: string;
  },
  wallet: string,
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Input Details..." };
    createOrganizationSchema.parse(details);

    yield { step: "Checking Organization Username Availability..." };
    const isUsernameAvailable = await getOrganizationNameAvailability(details.username);
    if (!isUsernameAvailable) {
      throw new Error("Organization username already exists.");
    }

    const id = uuidv4();

    yield { step: "Creating Organization ..." };
    const msgId = await sendMessage({
      signer: wallet,
      tags: getTags({
        Action: "Create-Organization",
        Id: id,
        Name: details.name,
        Username: details.username,
        Description: details.description,
      }),
    });

    const { Messages } = await result({
      message: msgId,
      process: PL_PROCESS_ID,
    });

    const organizationId = Messages[0].Tags.find(
      (tag: Tag) => tag.name === "Org-Id"
    );

    if (!organizationId?.value) {
      throw new Error("Failed to retrieve Organization ID.");
    }

    yield {
      step: "Organization Created Successfully",
      data: organizationId.value,
    };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
