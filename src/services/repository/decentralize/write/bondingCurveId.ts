import { result } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../../constants/constants";
import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { Tag, walletSignerType } from "../../../../types";
import { pollForTxBeingAvailable } from "../../../../helpers/pollForTxBeingAvailable";

export const saveBondingCurveId = async (
  id: string,
  bondingCurveId: string,
  wallet: walletSignerType
) => {
  const msgId = await sendMessage({
    tags: getTags({
      Action: "Save-Repo-Bonding-Curve-Id",
      Id: id,
      "Bonding-Curve-Id": bondingCurveId,
    }),
    pid: PL_PROCESS_ID,
    signer: wallet,
  });

  await pollForTxBeingAvailable({ txId: msgId });

  const { Messages } = await result({
    message: msgId,
    process: PL_PROCESS_ID,
  });

  if (!Messages[0]) {
    throw new Error("Failed to save bonding curve id");
  }

  const action = Messages[0].Tags.find(
    (tag: Tag) =>
      tag.name === "Action" && tag.value === "Repo-Bonding-Curve-Id-Updated"
  );

  if (!action) {
    throw new Error("Failed to save bonding curve id");
  }
  return "Bonding curve id saved successfully";
};
