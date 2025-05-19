import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../../types";
import { getRepo } from "../../read";

export const acceptContributorInvite = async (
  id: string,
  visibility: string,
  wallet: walletSignerType,
  privateStateTxId: string | null,
  ghSyncPrivateStateTxId: string | null
) => {
  //rotate keys
  const tags = {
    Action: "Accept-Contributor-Invite",
    Id: id,
    Visibility: visibility,
  } as any;

  if (privateStateTxId) {
    tags["Private-State-TxId"] = privateStateTxId;
  }

  if (ghSyncPrivateStateTxId) {
    tags["GhSync-Private-State-TxId"] = ghSyncPrivateStateTxId;
  }

  await sendMessage({ tags: getTags(tags),signer: wallet });

  const repo = await getRepo(id);

  return {
    contributorInvites: repo.contributorInvites,
    contributors: repo.contributors,
    githubSync: repo.githubSync,
  };
};
