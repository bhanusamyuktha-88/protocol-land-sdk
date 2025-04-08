import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getRepo } from "../read";

export async function inviteContributor(address: string, repoId: string,wallet: string) {
  await sendMessage({
    tags: getTags({
      Action: "Invite-Contributor",
      Id: repoId,
      Contributor: address,
    }),
    signer: wallet,
  });

  const repo = await getRepo(repoId);

  return repo.contributorInvites;
}
