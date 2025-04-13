import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getPRById } from "../read";

export async function reopenPR({
  repoId,
  prId,
  wallet,
}: {
  repoId: string;
  prId: number;
  wallet: string;
}) {
  await sendMessage({
    tags: getTags({
      Action: "Update-PR-Status",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
      Status: "REOPEN",
    }),
    signer: wallet,
  });

  const PR = getPRById(repoId, prId);

  if (!PR) return;

  return PR;
}
