import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getIssueById } from "../read";

export async function addAssigneeToIssue(
  repoId: string,
  issueId: number,
  assignees: string[],
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Add-Issue-Assignees",
      "Repo-Id": repoId,
      "Issue-Id": issueId.toString(),
      Assignees: JSON.stringify(assignees),
    }),
    signer: wallet,
  });

  const issue = await getIssueById(repoId, issueId);
  return issue;
}
