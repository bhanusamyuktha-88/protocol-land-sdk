import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { isInvalidInput } from "../../../helpers/isInvalidInput";
import { PullRequest, walletSignerType } from "../../../types";
import { getPRById } from "../read";

export async function updatePRDetails(
  repoId: string,
  prId: number,
  wallet: walletSignerType,
  pullRequest: Partial<PullRequest>
) {
  let tags = {
    Action: "Update-PR-Details",
    "Repo-Id": repoId,
    "PR-Id": prId.toString(),
  } as any;

  let data = "";

  if (!isInvalidInput(pullRequest.title, "string")) {
    tags = { ...tags, Title: pullRequest.title };
  }

  if (!isInvalidInput(pullRequest.description, "string", true)) {
    if (pullRequest.description) {
      data = pullRequest.description;
    } else {
      tags = { ...tags, Description: pullRequest.description };
    }
  }

  await sendMessage({ tags: getTags(tags), data, signer: wallet });

  const PR = getPRById(repoId, prId);

  if (!PR) return;

  return PR;
}
