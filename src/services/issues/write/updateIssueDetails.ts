import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { isInvalidInput } from "../../../helpers/isInvalidInput";
import { Issue, walletSignerType } from "../../../types";

export async function updateIssueDetails(
  repoId: string,
  issueId: number,
  wallet: walletSignerType,
  issue: Partial<Issue>
) {
  let tags = {
    Action: "Update-Issue-Details",
    "Repo-Id": repoId,
    "Issue-Id": issueId.toString(),
  } as any;

  let data = "";

  if (!isInvalidInput(issue.title, "string")) {
    tags = { ...tags, Title: issue.title };
  }

  if (!isInvalidInput(issue.description, "string", true)) {
    if (issue.description) {
      data = issue.description as string;
    } else {
      tags = { ...tags, Description: issue.description };
    }
  }

  const msgId = await sendMessage({
    tags: getTags(tags),
    data,
    signer: wallet,
  });
  return msgId;
}
