import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { Issue } from "../../../types";

export async function getIssueById(repoId: string, issueId: number) {
  let issue: Issue | null = null;
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({
      Action: "Get-Issue-By-Id",
      "Repo-Id": repoId,
      "Issue-Id": issueId.toString(),
    }),
  });

  if (Messages[0]?.Data) {
    issue = JSON.parse(Messages[0]?.Data)?.result as Issue;
  }
  return issue;
}
