import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";

export async function grantContributorInvite(
  address: string,
  repoId: string,
  wallet: string
) {
  await sendMessage({
    tags: getTags({
      Action: "Grant-Contributor-Invite",
      Id: repoId,
      Contributor: address,
    }),
    signer: wallet,
  });
}
