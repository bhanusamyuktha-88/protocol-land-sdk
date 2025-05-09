import { dryrun } from "@permaweb/aoconnect";
import { User } from "../../../types";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { arweaveAddressSchema } from "../schema";

export const getUserDetails = async (
  address: string
): Promise<{ result: User }> => {
  arweaveAddressSchema.parse(address);
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({ Action: "Get-User-Details" }),
    Owner: address,
  });

  return JSON.parse(Messages[0].Data || "{}");
};
