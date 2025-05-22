import git, { Errors } from "isomorphic-git";
import { withAsync } from "../../../helpers/withAsync";
import { JWKInterface, MergePullRequestOptions, Tag } from "../../../types";
import { waitFor } from "../../../helpers/waitFor";
import { postUpdatedRepo } from "../../../helpers/repoHelpers";
import { getUserDetails } from "../../user";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getRepo } from "../../repository";
import { MergePullRequestSchema } from "../schema";
import { getTags } from "../../../helpers/arweave/getTags";

export async function* mergePR(
  data: MergePullRequestOptions,
  wallet: JWKInterface
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating PR..." };
    MergePullRequestSchema.parse(data);
    const {
      fs,
      dir,
      base,
      compare,
      author,
      dryRun,
      repoId,
      prId,
      fork,
      isPrivate,
      privateStateTxId,
    } = data;

    yield { step: "Checking to Merge PR..." };
    const user = (await getUserDetails(author)).result;

    const { error } = await withAsync(() =>
      git.merge({
        fs,
        dir,
        ours: base,
        theirs: compare,
        abortOnConflict: true,
        dryRun,
        author: {
          email: user?.email || author,
          name: user?.fullname || author,
        },
      })
    );

    if (dryRun) {
      if (
        error &&
        (error instanceof Errors.MergeConflictError ||
          error instanceof Errors.MergeNotSupportedError)
      ) {
        throw error;
      }
      return;
    }

    await waitFor(500);

    if (error instanceof Errors.MergeNotSupportedError) {
      throw new Error(
        "Automatic merge failed for the following files: " +
          `${error.data}. ` +
          "Resolve these conflicts and then commit your changes."
      );
    }

    if (!error) {
      if (fork) {
        yield { step: "Deleting Fork Branch..." };
        await withAsync(() =>
          git.deleteBranch({
            fs,
            dir,
            ref: compare,
          })
        );
      }

      yield { step: "Committing Changes..." };
      await postUpdatedRepo(
        {
          fs,
          dir,
          owner: author,
          id: repoId,
          isPrivate,
          privateStateTxId,
        },
        wallet
      );

      await waitFor(1000);

      yield { step: "Sending Merge PR Message..." };
      await sendMessage({
        tags: getTags({
          Action: "Update-PR-Status",
          "Repo-Id": repoId,
          "PR-Id": prId.toString(),
          Status: "MERGED",
        }) as Tag[],
        signer: wallet,
      });

      const repo = await getRepo(repoId);

      const PRs = repo?.pullRequests;

      if (!PRs) {
        throw new Error("Something went wrong while merging PRs");
      }

      const PR = PRs[prId - 1];

      if (!PR) {
        throw new Error("Something went wrong while merging PRs");
      }
      yield {
        step: "Pull Request Merged Successfully",
        data: PR,
      };
    } else {
      throw error;
    }
  } catch (error: any) {
    yield { step: "Error", data: error.message || error };
  }
}
