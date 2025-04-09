import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getRepo } from "../read";

export const rejectContributorInvite = async (id: string,wallet:string) => {
  //rotate keys
  await sendMessage({
    tags: getTags({
      Action: "Reject-Contributor-Invite",
      Id: id,
    }),
    signer: wallet,
  });

  const repo = await getRepo(id);

  return {
    contributorInvites: repo.contributorInvites,
    contributors: repo.contributors,
  };
};
