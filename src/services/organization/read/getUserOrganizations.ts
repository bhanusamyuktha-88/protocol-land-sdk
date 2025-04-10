import { PL_PROCESS_ID } from "../../../constants/constants";
import { dryrun } from "@permaweb/aoconnect";
import { getTags } from "../../../helpers/arweave/getTags";
import { withAsync } from "../../../helpers/withAsync";
import { Organization } from "../../../types";

export const getUserOrganizations = async (address: string) => {
  let orgs: Organization[] = [];
  const { response: ownerOrgsResponse } = await withAsync(() =>
    dryrun({
      process: PL_PROCESS_ID,
      tags: getTags({
        Action: "Get-User-Organizations",
        "User-Address": address as string,
      }),
      Owner: address,
    })
  );

  if (ownerOrgsResponse) {
    orgs = [
      ...orgs,
      ...((JSON.parse(ownerOrgsResponse?.Messages[0]?.Data || "{}")
        ?.result as Organization[]) || []),
    ];
  }

  return orgs;
};
