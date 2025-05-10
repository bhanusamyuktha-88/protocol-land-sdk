import { result } from "@permaweb/aoconnect";
import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { Tag } from "../../../types";
import { getOrganizationNameAvailability } from "../read/getOrganizationNameAvailability";
import { getOrganizationById } from "../read/getOrganizationById"; 
import { createOrganizationSchema } from "../schema";

export async function* createOrganization(
  details: {
    id: string;
    name: string;
    username: string;
    description: string;
  },
  wallet: string,
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Input Details..." };
    createOrganizationSchema.parse(details);

    yield { step: "Checking Organization userName Availability..." };
    const isuserNameAvailable = await getOrganizationNameAvailability(details.username);
    if (!isuserNameAvailable) {
      throw new Error("Organization username already exists.");
    }

    yield { step: "Checking Organization ID Availability..." };
    const existingById = await getOrganizationById(details.id);
    if (existingById?.id) {
      throw new Error("Organization ID already exists.");
    }

    yield { step: "Creating Organization ..." };
    const msgId = await sendMessage({
      signer: wallet,
      tags: getTags({
        Action: "Create-Organization",
        Id: details.id,
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
