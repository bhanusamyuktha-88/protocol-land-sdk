import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";

export const acceptInvite = async (
  id: string,
  wallet: string
): Promise<string> => {
  const msgId = await sendMessage({
    signer: wallet,
    tags: getTags({ Action: "Accept-Member-Invite", Id: id }),
  });

  return msgId
};

