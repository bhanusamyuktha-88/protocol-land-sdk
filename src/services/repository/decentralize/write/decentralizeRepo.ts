import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { walletSignerType } from "../../../../types";

export async function decentralizeRepo(repoId: string, wallet: walletSignerType) {
  const msgId = await sendMessage({
    tags: getTags({
      Action: "Decentralize-Repo",
      Id: repoId,
    }),
    signer: wallet,
  });
  return msgId;
}
