import { result } from "@permaweb/aoconnect";
import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../../constants/constants";
import { BondingCurve, RepoToken, SaveRepoTokenDetailsOptions, walletSignerType } from "../../../../types";
import { pollForTxBeingAvailable } from "../../../../helpers/pollForTxBeingAvailable";

export const saveTokenSettings = async (
  id: string,
  repoToken: Partial<SaveRepoTokenDetailsOptions>,
  wallet: walletSignerType
): Promise<{
  token: RepoToken;
  bondingCurve: BondingCurve;
}> => {
  const msgId = await sendMessage({
    tags: getTags({
      Action: "Save-Token-Settings",
      Id: id,
    }),
    data: JSON.stringify(repoToken),
    signer: wallet,
  });

  await pollForTxBeingAvailable({ txId: msgId });

  const { Messages } = await result({
    message: msgId,
    process: PL_PROCESS_ID,
  });

  if (!Messages[0]) {
    throw new Error("Failed to save token settings");
  }

  const data = JSON.parse(Messages[0].Data);

  return { token: data.token, bondingCurve: data.bondingCurve };
};
