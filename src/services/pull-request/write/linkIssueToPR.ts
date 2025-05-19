import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getPRById } from "../read";

export async function linkIssueToPR(
  repoId: string,
  prId: number,
  issueId: number,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Link-Issue-PR",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
      "Linked-Issue-Id": issueId.toString(),
    }),
    signer: wallet
  });

  const PR = getPRById(repoId,prId);

  if (!PR) return;

  return PR;
}
