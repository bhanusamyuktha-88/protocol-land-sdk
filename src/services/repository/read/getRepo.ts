import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { Repo } from "../../../types";

export async function getRepo(id: string) {
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({
      Action: "Get-Repo",
      Id: id,
    }),
  });

  const repo = JSON.parse(Messages[0].Data)?.result as Repo;
  return repo;
}
