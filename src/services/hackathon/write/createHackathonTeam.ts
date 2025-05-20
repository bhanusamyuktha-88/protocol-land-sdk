import { v4 as uuidv4 } from "uuid";
import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { getHackathonById } from "../read";
import { CreateHackathonTeam, walletSignerType } from "../../../types";
import { createHackathonTeamSchema } from "../schema"; 

export async function* createHackathonTeam(
  wallet: walletSignerType,
  input: CreateHackathonTeam
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Team Details..." };
    createHackathonTeamSchema.parse(input);

    yield { step: "Checking Hackathon..." };
    const hackathon = await getHackathonById(input.hackathonId);
    if (!hackathon) {
      throw new Error("Hackathon not found");
    }

    yield { step: "Generating Team ID..." };
    const id = uuidv4();

    yield { step: "Sending Team Creation Message..." };
    await sendMessage({
      signer: wallet,
      tags: getTags({
        Action: "Create-Hackathon-Team",
        Id: id,
        Name: input.name,
        "Hackathon-Id": input.hackathonId,
        Members: JSON.stringify(input.members),
      }),
    });

    yield {
      step: "Team Created Successfully",
      data: { id },
    };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
