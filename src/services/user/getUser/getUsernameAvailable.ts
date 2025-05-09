import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { usernameSchema } from "../schema";

export const getUsernameAvailable = async (username: string) => {
  usernameSchema.parse(username);
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({
      Action: "Get-Username-Availability",
      Username: username,
    }),
  });

  const { result: isAvailable } = JSON.parse(Messages[0].Data);
  return isAvailable;
};
