import { result } from "@permaweb/aoconnect";
import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../../constants/constants";
import { Tag, walletSignerType } from "../../../../types";
import { pollForTxBeingAvailable } from "../../../../helpers/pollForTxBeingAvailable";

export const saveLiquidityPoolId = async (
  id: string,
  liquidityPoolId: string,
  wallet: walletSignerType
) => {
  const msgId = await sendMessage({
    tags: getTags({
      Action: "Save-Repo-Liquidity-Pool-Id",
      Id: id,
      "Liquidity-Pool-Id": liquidityPoolId,
    }),
    signer: wallet,
  });

  await pollForTxBeingAvailable({ txId: msgId });

  const { Messages } = await result({
    message: msgId,
    process: PL_PROCESS_ID,
  });

  if (!Messages[0]) {
    throw new Error("Failed to save liquidity pool id");
  }

  const action = Messages[0].Tags.find(
    (tag: Tag) =>
      tag.name === "Action" &&
      tag.value === "Repo-Token-Liquidity-Pool-Id-Updated"
  );

  if (!action) {
    throw new Error("Failed to save liquidity pool id");
  }

  return "Liquidity pool id saved successfully";
};
