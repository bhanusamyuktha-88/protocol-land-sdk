import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";

export const getUsernameAvailable = async (username: string) => {
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
