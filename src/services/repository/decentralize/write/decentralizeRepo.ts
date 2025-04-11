import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";

export async function decentralizeRepo(repoId: string, wallet: string) {
  const msgId = await sendMessage({
    tags: getTags({
      Action: "Decentralize-Repo",
      Id: repoId,
    }),
    signer: wallet,
  });
  return msgId;
}
