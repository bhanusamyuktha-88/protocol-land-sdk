import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { Organization, Tag } from "../../../types";

export const updateOrganization = async (
  wallet: string,
  id: string,
  data: Partial<Organization>
): Promise<string> => {
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

  return msgId;
};
