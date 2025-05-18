import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getIssueById } from "../read";

export async function reopenIssue(
  repoId: string,
  issueId: number,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Update-Issue-Status",
      "Repo-Id": repoId,
      "Issue-Id": issueId.toString(),
      Status: "REOPEN",
    }),
    signer: wallet,
  });

  const issue = await getIssueById(repoId, issueId);
  return issue;
}
