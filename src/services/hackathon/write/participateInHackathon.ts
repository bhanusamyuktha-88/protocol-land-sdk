import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";

export async function participate(
  wallet: string,
  hackathonId: string,
  teamId?: string
): Promise<string> {
  const args = {
    signer: wallet,
    tags: {
      Action: "Participate-In-Hackathon",
      Id: hackathonId,
    },
  } as any;

  if (teamId) {
    args.tags["Team-Id"] = teamId;
  }

  args.tags = getTags(args.tags);

  const msgId = await sendMessage(args);
  return msgId
}
