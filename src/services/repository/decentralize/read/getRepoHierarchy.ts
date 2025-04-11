import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../../constants/constants";
import { getTags } from "../../../../helpers/arweave/getTags";

export const getRepoHierarchy = async (id: string) => {
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({ Action: "Get-Repo-Hierarchy", Id: id }),
  });

  return JSON.parse(Messages[0].Data);
};
