import { arweaveSearchNode } from "./helpers/arweave/config/arweaveInstance";
import * as repo from "./services/repository";
import * as user from "./services/user";
import { User } from "./types";

export class ProtocolLandSDK {
  constructor(host?: string) {
    if (host) {
      arweaveSearchNode.api.config.host = host;
    }
  }

  getVersion() {
    return "0.0.1";
  }

  User() {
    return {
      createProfile: user.createProfile,
      updateProfile: user.updateProfile,
      getUserDetails: user.getUserDetails,
      getUsers: user.getUsers,
      getUsernameAvailable: user.getUsernameAvailable,
    };
  }

  Repository() {
    return {
      getRepo: repo.getRepo,
      getRepoAvailability: repo.getRepoAvailability,
      getUserOwnedContributedRepos: repo.getUserOwnedContributedRepos,
      getRepoByName: repo.getRepoByName,
      acceptContributorInvite: repo.acceptContributorInvite,
      addDomain: repo.addDomain,
      cancelContributorInvite: repo.cancelContributorInvite,
      forkRepo: repo.forkRepo,
      grantContributorInvite: repo.grantContributorInvite,
      createRepo: repo.initialize,
      inviteContributor: repo.inviteContributor,
      rejectContributorInvite: repo.rejectContributorInvite,
      updateDomain: repo.updateDomain,
      updateGithubSync: repo.updateGithubSync,
      updateRepoName: repo.updateRepoName,
      updateRepoDescription: repo.updateRepoDescription,
      updateRepoDeploymentBranch: repo.updateRepoDeploymentBranch,
      updateRepoPrivateStateTxId: repo.updateRepoPrivateStateTxId,
      updateRepoTxId: repo.updateRepoTxId,
    }
  }
}
