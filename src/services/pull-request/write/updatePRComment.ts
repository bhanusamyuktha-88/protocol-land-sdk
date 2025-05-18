import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getPRById } from "../read";

export async function updatePRComment(
  repoId: string,
  prId: number,
  wallet: walletSignerType,
  comment: { id: number; description: string }
) {
  await sendMessage({
    tags: getTags({
      Action: "Update-PR-Comment",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
      "Comment-Id": comment.id.toString(),
    }),
    data: comment.description,
    signer: wallet,
  });

  const PR = getPRById(repoId, prId);

  if (!PR) return;

  return PR;
}
