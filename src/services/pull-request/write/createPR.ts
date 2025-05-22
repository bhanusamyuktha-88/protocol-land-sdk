import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { fs, usageType } from "../../../helpers/specificImports";
import { postPRStatDataTxToArweave } from "../../../helpers/stats";
import { createPROptions, walletSignerType } from "../../../types";
import { getRepo } from "../../repository";
import git from "isomorphic-git";
import { createPullRequestSchema } from "../schema";

export async function* createPR(
  data: createPROptions,
  wallet: walletSignerType
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating PR data..." };
    createPullRequestSchema.parse(data);
    const {
      address,
      baseBranch,
      baseRepo,
      compareBranch,
      compareRepo,
      description,
      repoId,
      title,
      linkedIssueId,
    } = data;
    let newFs = fs;
    let signer: any = wallet;
    if (usageType == "browser") {
      newFs = new fs(baseRepo.repoId);
      signer = window.arweaveWallet;
    }
    const baseDir = `/${baseRepo.repoId}`;

    yield { step: "Resolving base branch..." };
    const oid = await git.resolveRef({
      fs: newFs,
      dir: baseDir,
      ref: baseBranch,
    });

    const args = {
      tags: getTags({
        Action: "Create-PR",
        Title: title,
        "Repo-Id": repoId,
        "Base-Branch": baseBranch,
        "Compare-Branch": compareBranch,
        "Base-Branch-Oid": oid,
        "Linked-Issue-Id":
          typeof linkedIssueId === "number" ? linkedIssueId.toString() : "",
        "Base-Repo": JSON.stringify(baseRepo),
        "Compare-Repo": JSON.stringify(compareRepo),
      }),
      signer: signer,
    } as any;

    if (description) {
      args.data = description;
    } else {
      args.tags.push({ name: "Description", value: description || "" });
    }

    yield { step: "Creating PR..." };

    await sendMessage(args);

    const repo = await getRepo(repoId);

    if (!repo) {
      throw new Error("Something went wrong while creating PR");
    }

    const PRs = repo.pullRequests;
    const PR = PRs[PRs.length - 1];

    if (!PR || !PR.id || (PR.title != title && PR.description != description)) {
      throw new Error("Something went wrong while creating PR");
    }
    yield {
      step: "PR created successfully. Updating PR stats...",
      data: PR,
    };
    if (address) {
      const response = await postPRStatDataTxToArweave(
        address,
        baseRepo.repoName,
        baseRepo.repoId,
        PR,
        signer
      );
      if (response) {
        yield {
          step: "PR created and stats updated successfully",
          data: PR,
        };
      } else {
        yield {
          step: "PR created but failed to update stats",
          data: PR,
        };
      }
    }
  } catch (error: any) {
    yield {
      step: "Error",
      data: error.message || error,
    };
  }
}
