import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getPRById } from "../read";

export async function addCommentToPR(
  repoId: string,
  prId: number,
  comment: string,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Add-PR-Comment",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
    }),
    data: comment,
    signer: wallet,
  });

  const PR = await getPRById(repoId, prId);

  if (!PR) return;

  return PR;
}
