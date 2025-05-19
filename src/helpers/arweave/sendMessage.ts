import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../constants/constants";
import { extractMessage } from "../extractMessage";
import { SendMessageArgs } from "../../types";
import { isBrowser } from "../usageFinder";

export async function sendMessage({
  tags,
  data,
  pid,
  signer,
}: SendMessageArgs) {
  
  if (!tags || !tags.length) {
    throw new Error("Tags are required");
  }

  let wallet: any = signer;

  if(isBrowser()){
    wallet = window?.arweaveWallet;
  }

  const args = {
    process: pid || PL_PROCESS_ID,
    tags,
    signer: createDataItemSigner(wallet),
  } as any;

  if (data) args.data = data;

  const messageId = await message(args);

  const { Output } = await result({
    message: messageId,
    process: pid || PL_PROCESS_ID,
  });

  if (Output?.data?.output) {
    throw new Error(extractMessage(Output?.data?.output));
  }

  return messageId;
}
