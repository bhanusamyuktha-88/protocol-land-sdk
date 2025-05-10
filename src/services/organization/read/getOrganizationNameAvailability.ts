import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { orgUsernameSchema } from "../schema";

export const getOrganizationNameAvailability = async (
  name: string
): Promise<boolean> => {
  orgUsernameSchema.parse(name);

  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({
      Action: "Get-Organization-Name-Availability",
      Name: name,
    }),
  });

  const { result: isAvailable } = JSON.parse(Messages[0].Data);
  return isAvailable;
};
