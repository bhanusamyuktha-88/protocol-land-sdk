import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { Hackathon } from "../../../types/hackathon";

export async function getAllHackathons(): Promise<Hackathon[]> {
  const args = {
    tags: getTags({
      Action: "Get-All-Hackathons",
    }),
  } as any;
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    ...args,
  });

  const hackathons = JSON.parse(Messages[0].Data) as Hackathon[];

  if (!hackathons) return [];

  return hackathons;
}
