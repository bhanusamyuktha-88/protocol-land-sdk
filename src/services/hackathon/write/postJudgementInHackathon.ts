import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";

export async function selectPrizeWinner(
  wallet: walletSignerType,
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
