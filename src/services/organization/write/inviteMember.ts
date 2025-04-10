import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";

export const inviteMember = async (
  id: string,
  address: string,
  role: string,
  wallet: string
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
