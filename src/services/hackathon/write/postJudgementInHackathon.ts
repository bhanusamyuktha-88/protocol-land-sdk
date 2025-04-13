import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";

export async function selectPrizeWinner(
  wallet: string,
  hackathonId: string,
  prizeId: string,
  participantAddress: string
): Promise<string> {
  const args = {
    signer: wallet,
    tags: getTags({
      Action: "Post-Hackathon-Judgement",
      Id: hackathonId,
      "Prize-Id": prizeId,
      "Participant-Address": participantAddress,
    }),
  } as any;

  const msgId = await sendMessage(args);
  return msgId
}
