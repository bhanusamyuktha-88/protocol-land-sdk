import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { Hackathon } from "../../../types";

export async function postUpdatedHackathon(
  wallet: string,
  hackathon: Partial<Hackathon>
): Promise<string> {
  const args = {
    signer: wallet,
    tags: getTags({
      Action: "Update-Hackathon",
    }),
    data: JSON.stringify(hackathon),
  } as any;

  const msgId = await sendMessage(args);
  return msgId
}
