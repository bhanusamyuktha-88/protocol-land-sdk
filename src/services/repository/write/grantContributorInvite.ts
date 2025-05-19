import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../types";

export async function grantContributorInvite(
  address: string,
  repoId: string,
  wallet: walletSignerType
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
