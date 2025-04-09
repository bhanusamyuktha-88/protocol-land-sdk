import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { Repo } from "../../../types";

export const getRepoByName = async (
  query: string
): Promise<{ result: Repo[] }> => {
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({ Action: "Get-Repos-By-Name", Query: query }),
  });

  return JSON.parse(Messages[0].Data);
};
