import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { PullRequest } from "../../../types";

export async function getPRById(repoId: string, prId: number) {
  let pullRequest: PullRequest | null = null;
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({
      Action: "Get-PR-By-Id",
      "Repo-Id": repoId,
      "PR-Id": prId.toString(),
    }),
  });

  if (Messages[0]?.Data) {
    pullRequest = JSON.parse(Messages[0]?.Data)?.result as PullRequest;
  }
  return pullRequest;
}
