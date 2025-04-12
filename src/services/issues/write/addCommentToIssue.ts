import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getIssueById } from "../read";

export async function addCommentToIssue(
  repoId: string,
  issueId: number,
  comment: string,
  wallet: string
) {
  await sendMessage({
    tags: getTags({
      Action: "Add-Issue-Comment",
      "Repo-Id": repoId,
      "Issue-Id": issueId.toString(),
    }),
    data: comment,
    signer: wallet,
  });

  const issue = await getIssueById(repoId, issueId);
  return issue;
}
