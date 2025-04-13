import { arweaveSearchNode } from "./helpers/arweave/config/arweaveInstance";
import * as org from "./services/organization";
import * as repo from "./services/repository";
import * as user from "./services/user";
import * as issue from "./services/issues";
import * as hackathon from "./services/hackathon";
import * as pr from "./services/pull-request";

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
      getRepoHierarchy: repo.getRepoHierarchy,
      saveBondingCurveId: repo.saveBondingCurveId,
      saveRepoBondingCurve: repo.saveRepoBondingCurve,
      decentralizeRepo: repo.decentralizeRepo,
      saveForkedImportTokenSettings: repo.saveForkedImportTokenSettings,
      saveImportedTokenId: repo.saveImportedTokenId,
      saveLiquidityPoolId: repo.saveLiquidityPoolId,
      saveTokenSettings: repo.saveTokenSettings,
    };
  }

  Organization() {
    return {
      getOrganizationById: org.getOrganizationById,
      getOrganizationNameAvailability: org.getOrganizationNameAvailability,
      getUserOrganizations: org.getUserOrganizations,
      createOrganization: org.createOrganization,
      acceptInvite: org.acceptInvite,
      cancelInvite: org.cancelInvite,
      inviteMember: org.inviteMember,
      rejectInvite: org.rejectInvite,
      updateOrganization: org.updateOrganization,
    };
  }

  Issues() {
    return {
      getIssueById: issue.getIssueById,
      addAssigneeToIssue: issue.addAssigneeToIssue,
      addCommentToIssue: issue.addCommentToIssue,
      closeIssue: issue.closeIssue,
      createIssue: issue.createIssue,
      reopenIssue: issue.reopenIssue,
      updateIssueComment: issue.updateIssueComment,
      updateIssueDetails: issue.updateIssueDetails,
    };
  }

  Hackathon() {
    return {
      getHackathonById: hackathon.getHackathonById,
      getAllHackathons: hackathon.getAllHackathons,
      createHackathonTeam: hackathon.createHackathonTeam,
      createNewHackathon: hackathon.createNewHackathon,
      participate: hackathon.participate,
      postUpdatedHackathon: hackathon.postUpdatedHackathon,
      selectPrizeWinner: hackathon.selectPrizeWinner,
    };
  }

  pullRequest() {
    return {
      createPullRequest: pr.createPR,
      getPullRequestById: pr.getPRById,
      mergePullRequest: pr.mergePR,
      addCommentToPullRequest: pr.addCommentToPR,
      updateCommentOnPullRequest: pr.updatePRComment,
      approvePullRequest: pr.approvePR,
      addReviewersToPullRequest: pr.addReviewersToPR,
      closePullRequest: pr.closePR,
      linkIssueToPullRequest: pr.linkIssueToPR,
      reopenPullRequest: pr.reopenPR,
      updatePullRequestDetails: pr.updatePRDetails,
    };
  }
}
