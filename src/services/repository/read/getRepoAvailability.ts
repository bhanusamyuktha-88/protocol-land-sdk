import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";

export const getRepoAvailability = async (
  name: string,
  address: string,
  orgId?: string
): Promise<boolean> => {
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({
      Action: "Get-Repo-Availability",
      Name: name,
      Creator: orgId ? "ORGANIZATION" : "USER",
      OrgId: orgId || "",
    }),
    Owner: address,
  });

  return JSON.parse(Messages[0].Data).result;
};
