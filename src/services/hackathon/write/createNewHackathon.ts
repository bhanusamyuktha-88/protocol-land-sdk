import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { NewHackatonItem, walletSignerType } from "../../../types";

export async function createNewHackathon(
  wallet: walletSignerType,
  hackathon: NewHackatonItem
): Promise<string> {
  const args = {
    signer: wallet,
    tags: getTags({
      Action: "Create-Hackathon",
    }),
    data: JSON.stringify(hackathon),
  } as any;

  const msgId = await sendMessage(args);
  return msgId;
}
