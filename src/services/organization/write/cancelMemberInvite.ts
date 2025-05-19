import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";

export const cancelInvite = async (
  id: string,
  address: string,
  wallet: walletSignerType
): Promise<string> => {
  const msgId = await sendMessage({
    signer: wallet,
    tags: getTags({ Action: "Cancel-Member-Invite", Id: id, Member: address }),
  });

  return msgId
};
