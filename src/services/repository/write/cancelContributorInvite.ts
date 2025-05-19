import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";
import { getRepo } from "../read";

export const cancelContributorInvite = async (
  id: string,
  contributor: string,
  wallet: walletSignerType
) => {
  //rotate keys
  await sendMessage({
    tags: getTags({
      Action: "Cancel-Contributor-Invite",
      Id: id,
      Contributor: contributor,
    }),
    signer: wallet,
  });

  const repo = await getRepo(id);

  return repo.contributorInvites;
};
