import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { ApprovePROptions, walletSignerType } from "../../../types";
import { getPRById } from "../read";

export async function approvePR({
  repoId,
  prId,
  wallet,
}: ApprovePROptions & { wallet: walletSignerType }) {
  await sendMessage({
    tags: getTags({
      Action: "Approve-PR",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
    }),
    signer: wallet,
  });

  const PR = getPRById(repoId, prId);

  if (!PR) return;

  return PR;
}
