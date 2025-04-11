import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";

export const cancelInvite = async (
  id: string,
  address: string,
  wallet: string
): Promise<string> => {
  const msgId = await sendMessage({
    signer: wallet,
    tags: getTags({ Action: "Cancel-Member-Invite", Id: id, Member: address }),
  });

  return msgId
};
