import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { Deployment, walletSignerType } from "../../../types";
import { getRepo } from "../read";

export async function addDeployment(
  deployment: Partial<Deployment>,
  repoId: string,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Add-Deployment",
      Id: repoId,
      Deployment: JSON.stringify(deployment),
    }),
    signer: wallet,
  });

  const repo = await getRepo(repoId);

  if (!repo) return;

  const deployments = repo.deployments;
  const latestDeployment = deployments[deployments.length - 1];

  if (!latestDeployment || !latestDeployment.txId) return;

  return latestDeployment;
}
