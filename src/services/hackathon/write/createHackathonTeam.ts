import { v4 } from "uuid";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getHackathonById } from "../read/getHackathonById";
import { getTags } from "../../../helpers/arweave/getTags";
import { CreateHackathonTeam, Team } from "../../../types";

export async function createHackathonTeam(
  wallet: string,
  payload: CreateHackathonTeam
): Promise<Team> {
  const id = v4();
  const args = {
    signer: wallet,
    tags: getTags({
      Action: "Create-Hackathon-Team",
      Id: id,
      Name: payload.name,
      "Hackathon-Id": payload.hackathonId,
      Members: JSON.stringify(payload.members),
    }),
  } as any;

  await sendMessage(args);

  const hackathon = await getHackathonById(payload.hackathonId);

  if (!hackathon) {
    throw new Error("Hackathon not found");
  }

  return hackathon.teams[id];
}
