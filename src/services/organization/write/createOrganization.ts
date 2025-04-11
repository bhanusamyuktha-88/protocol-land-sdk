import { result } from "@permaweb/aoconnect";
import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { Tag } from "../../../types";

export const createOrganization = async (
  id: string,
  name: string,
  username: string,
  description: string,
  wallet: string
): Promise<string> => {
  const msgId = await sendMessage({
    signer: wallet,
    tags: getTags({
      Action: "Create-Organization",
      Id: id,
      Name: name,
      Username: username,
      Description: description,
    }),
  });

  const { Messages } = await result({
    message: msgId,
    process: PL_PROCESS_ID,
  });

  const organizationId = Messages[0].Tags.find(
    (tag: Tag) => tag.name === "Org-Id"
  );
  return organizationId.value;
};
