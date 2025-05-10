import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { Organization, Tag } from "../../../types";
import { getOrganizationById } from "../read";
import { getOrganizationNameAvailability } from "../read/getOrganizationNameAvailability";

export async function* updateOrganization(
  wallet: string,
  id: string,
  data: Partial<Organization>
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    if (data.username) {
      yield { step: "Checking Organization username Availability..." };
      const isAvailable = await getOrganizationNameAvailability(data.username);
      if (!isAvailable) {
        throw new Error("Organization username already exists.");
      }
    }

    if (data.id) {
      yield { step: "Checking Organization ID Availability..." };
      const existingById = await getOrganizationById(data.id);
      if (existingById?.id) {
        throw new Error("Organization ID already exists.");
      }
    }

    const tags = getTags({ Action: "Update-Organization-Details", Id: id });
    Object.keys(data).forEach((key) => {
      const val = data[key as keyof Organization] as string;
      tags.push({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: val.charAt(0).toUpperCase() + val.slice(1),
      } as Tag);
    });

    const msgId = await sendMessage({
      signer: wallet,
      tags,
    });

    yield { step: "Organization Updated Successfully", data: msgId };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
