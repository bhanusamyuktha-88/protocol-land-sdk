import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";

export const inviteMember = async (
  id: string,
  address: string,
  role: string,
  wallet: walletSignerType
): Promise<string> => {
  const msgId = await sendMessage({
    signer: wallet,
    tags: getTags({
      Action: "Invite-Member",
      Id: id,
      Member: address,
      Role: role,
    }),
  });

  return msgId
};
