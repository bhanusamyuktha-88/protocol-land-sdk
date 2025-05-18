import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getPRById } from "../read";

export async function closePR({
  repoId,
  prId,
  wallet,
}: {
  repoId: string;
  prId: number;
  wallet: walletSignerType;
}) {
  await sendMessage({
    tags: getTags({
      Action: "Update-PR-Status",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
      Status: "CLOSED",
    }),
    signer: wallet,
  });

  const PR = getPRById(repoId, prId);

  if (!PR) return;

  return PR;
}
