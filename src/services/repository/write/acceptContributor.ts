import { addActivePubKeyToPrivateState } from "../../../helpers/gitHelpers";
import { JWKInterface } from "../../../types";
import { getRepo } from "../read";
import { acceptContributorInvite } from "./services";

export async function* acceptContributor(
  repoId: string,
  wallet: JWKInterface
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Input Details..." };
    if (!repoId) {
      throw new Error("Repository ID is required");
    }
    yield { step: "Fetching Repository Details..." };
    const repo = await getRepo(repoId);
    if (!repo) {
      throw new Error("Repository not found");
    }
    const visibility = repo.private ? "private" : "public";
    let privateStateTxId: string | null = null;
    let ghSyncPrivateStateTxId: string | null = null;

    yield { step: "Adding Active Public Key to Private State..." };

    if (repo.private && repo.privateStateTxId) {
      const updatedPrivateStateTxId = await addActivePubKeyToPrivateState(
        repo.id,
        repo.privateStateTxId,
        wallet
      );

      privateStateTxId = updatedPrivateStateTxId;
    }

    if (repo.githubSync && repo.githubSync.privateStateTxId) {
      const updatedPrivateStateTxId = await addActivePubKeyToPrivateState(
        repo.id,
        repo.githubSync.privateStateTxId,
        wallet,
        "GITHUB_SYNC"
      );
      ghSyncPrivateStateTxId = updatedPrivateStateTxId;
    }

    yield { step: "Accepting Contributor Invite..." };

    const response = await acceptContributorInvite(
      repo.id,
      visibility,
      wallet,
      privateStateTxId,
      ghSyncPrivateStateTxId
    );
    if (!response) {
      throw new Error("Failed to accept contributor invite");
    }
    yield {
      step: "Contributor Invite Accepted Successfully",
      data: response,
    };
  } catch (error: any) {
    yield {
      step: "Error",
      data: error.message || error,
    };
  }
}
