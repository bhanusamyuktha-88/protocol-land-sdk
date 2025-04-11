import { result } from "@permaweb/aoconnect";
import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../../constants/constants";
import { Tag } from "../../../../types";

export const saveImportedTokenId = async (
  id: string,
  importedTokenId: string,
  wallet: string
): Promise<boolean> => {
  const msgId = await sendMessage({
    tags: getTags({
      Action: "Save-Import-Token-Settings",
      Id: id,
      ["Imported-Token-Id"]: importedTokenId,
    }),
    signer: wallet,
  });

  const { Messages } = await result({
    message: msgId,
    process: PL_PROCESS_ID,
  });

  if (!Messages[0]) {
    throw new Error("Failed to save token settings");
  }

  const tag = Messages[0].Tags.find(
    (tag: Tag) => tag.name === "Action" && tag.value === "Repo-Token-Updated"
  );

  if (!tag) {
    throw new Error("Failed to save imported token id");
  }

  return true;
};
