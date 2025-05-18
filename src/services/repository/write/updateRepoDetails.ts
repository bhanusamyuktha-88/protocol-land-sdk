import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";

export async function updateRepoName(
  repoId: string,
  newName: string,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Update-Repo-Details",
      Id: repoId,
      Name: newName,
    }),
    signer: wallet,
  });
}

export async function updateRepoDescription(
  description: string,
  repoId: string,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Update-Repo-Details",
      Id: repoId,
      Description: description,
    }),
    signer: wallet,
  });
}

export async function updateRepoDeploymentBranch(
  deploymentBranch: string,
  repoId: string,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Update-Repo-Details",
      Id: repoId,
      "Deployment-Branch": deploymentBranch,
    }),
    signer: wallet,
  });
}
