import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getRepo } from "../../repository";

export async function createIssue(
  title: string,
  description: string,
  repoId: string,
  address: string,
  wallet: string
) {
  const args = {
    tags: getTags({
      Action: "Create-Issue",
      Title: title,
      "Repo-Id": repoId,
    }),
    signer: wallet,
  } as any;

  if (description) {
    args.data = description;
  } else {
    args.tags.push({ name: "Description", value: description || "" });
  }

  await sendMessage(args);

  const repo = await getRepo(repoId);

  if (!repo) return;

  const issues = repo.issues;
  const issue = issues[issues.length - 1];

  if (!issue || !issue.id) return;

  // TODO: Uncomment this when the Arweave issue stat data is ready
  //   try {
  //     await postIssueStatDataTxToArweave(address, repo.name, repo.id, issue);
  //   } catch (error) {

  //   }

  return issue;
}
