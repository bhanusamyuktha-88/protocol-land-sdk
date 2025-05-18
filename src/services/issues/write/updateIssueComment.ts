import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getIssueById } from "../read";

export async function updateIssueComment(
  repoId: string,
  issueId: number,
  wallet: walletSignerType,
  comment: { id: number; description: string }
) {
  await sendMessage({
    tags: getTags({
      Action: "Update-Issue-Comment",
      "Repo-Id": repoId,
      "Issue-Id": issueId.toString(),
      "Comment-Id": comment.id.toString(),
    }),
    data: comment.description,
    signer: wallet,
  });

  const issue = await getIssueById(repoId, issueId);

  if (!issue) return;

  return issue;
}
