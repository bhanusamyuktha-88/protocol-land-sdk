import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { postIssueStatDataTxToArweave } from "../../../helpers/stats";
import { walletSignerType } from "../../../types";
import { getRepo } from "../../repository";
import { createIssueSchema } from "../schema";

export async function* createIssue(
  data: { title: string; description: string; repoId: string; address: string },
  wallet: walletSignerType
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating input data..." };

    createIssueSchema.parse(data);
    const { title, address, description, repoId } = data;

    let signer: any = wallet;
    if (wallet == "use_wallet") {
      signer = window.arweaveWallet;
    }

    yield { step: "Creating issue..." };

    const args = {
      tags: getTags({
        Action: "Create-Issue",
        Title: title,
        "Repo-Id": repoId,
      }),
      signer: signer,
    } as any;

    if (description) {
      args.data = description;
    } else {
      args.tags.push({ name: "Description", value: description || "" });
    }

    const msgId = await sendMessage(args);

    yield { step: "Confirming issue created...", data: msgId };
    const repo = await getRepo(repoId);

    if (!repo) {
      throw new Error("something went wrong");
    }

    const issues = repo.issues;
    const issue = issues[issues.length - 1];

    if (
      !issue ||
      !issue.id ||
      (issue.title == title && issue.description == description)
    ) {
      throw new Error("failed to create issue");
    }

    yield { step: "Issue Created Successfully! updating issue stats..." };
    let isPosted = false;
    try {
      isPosted = await postIssueStatDataTxToArweave(
        address,
        repo.name,
        repo.id,
        issue,
        signer
      );
    } catch (error) {}
    if (isPosted) {
      yield {
        step: "Issue created successfully and stats updated",
        data: issue,
      };
    } else {
      yield {
        step: "Issue created successfully but stats not updated please use jwk instead use_wallet",
        data: issue,
      };
    }
  } catch (error: any) {
    yield { step: "Error", data: error.message || error };
  }
}
