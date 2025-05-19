import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { AddReviewersToPROptions, walletSignerType } from "../../../types";
import { getPRById } from "../read";

export async function addReviewersToPR({
  reviewers,
  repoId,
  prId,
  wallet,
}: AddReviewersToPROptions & { wallet: walletSignerType }) {
  await sendMessage({
    tags: getTags({
      Action: "Add-PR-Reviewers",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
      Reviewers: JSON.stringify(reviewers),
    }),
    signer: wallet,
  });

  const PR = getPRById(repoId, prId);

  if (!PR) return;

  return PR;
}
