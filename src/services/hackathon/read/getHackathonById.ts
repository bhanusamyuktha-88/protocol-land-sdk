import { dryrun } from "@permaweb/aoconnect";
import { getTags } from "../../../helpers/arweave/getTags";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { Hackathon } from "../../../types";
import { idSchema } from "../schema";

export async function getHackathonById(id: string): Promise<Hackathon | null> {
  idSchema.parse(id);
  const args = {
    tags: getTags({
      Action: "Get-Hackathon-By-Id",
      Id: id,
    }),
  } as any;

  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    ...args,
  });

  const hackathon = JSON.parse(Messages[0].Data) as Hackathon;

  if (!hackathon) {
    return null;
  }

  return hackathon;
}
