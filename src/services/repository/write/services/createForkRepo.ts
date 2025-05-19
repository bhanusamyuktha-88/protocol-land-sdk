import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { ForkRepositoryOptions, walletSignerType } from "../../../../types";
import { v4 as uuidv4 } from 'uuid';

export async function createForkRepo(data: ForkRepositoryOptions, wallet: walletSignerType) {
  const uuid = uuidv4();

  await sendMessage({
    tags: getTags({
      Action: "Fork-Repo",
      Id: uuid,
      Name: data.name,
      Description: data.description,
      "Data-TxId": data.dataTxId,
      Parent: data.parent,
      "Token-Process-Id": data.tokenProcessId,
    }),
    signer: wallet,
  });

  return uuid;
}
