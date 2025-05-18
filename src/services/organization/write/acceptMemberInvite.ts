import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";

export const acceptInvite = async (
  id: string,
  wallet: walletSignerType
): Promise<string> => {
  const msgId = await sendMessage({
    signer: wallet,
    tags: getTags({ Action: "Accept-Member-Invite", Id: id }),
  });

  return msgId;
};
