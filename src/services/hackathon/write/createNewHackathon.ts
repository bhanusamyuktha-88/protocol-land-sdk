import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { NewHackathonItem, walletSignerType } from "../../../types";
import { createHackathonSchema } from "../schema";
import { v4 as uuidv4 } from "uuid";

export async function* createNewHackathon(
  wallet: walletSignerType,
  input: NewHackathonItem
):  AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating Hackathon Details..." };
    createHackathonSchema.parse(input);

    yield { step: "Generating Hackathon ID..." };
    const id = uuidv4();
    const newHackathon = { ...input, id };

    yield { step: "Sending Hackathon Creation Message..." };

    const msgId = await sendMessage({
      signer: wallet,
      tags: getTags({
        Action: "Create-Hackathon",
        Id: id,
        Title: input.title,
        HostedBy: input.hostedBy,
        StartsAt: input.startsAt.toString(),
        EndsAt: input.endsAt.toString(),
        Location: input.location,
      }),
      data: JSON.stringify(newHackathon),
    });

    yield {
      step: "Hackathon Created Successfully",
      data: {
        id,
        msgId
      },
    };
  } catch (error: any) {
    yield { step: "Error", data: error.message };
  }
}
