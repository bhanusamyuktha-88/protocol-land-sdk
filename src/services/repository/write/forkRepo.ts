import { JWKInterface } from "arbundles";
import { spawnTokenProcess } from "../../../helpers/repoHelpers";
import { getRepo, getRepoAvailability } from "../read";
import { forkRepoSchema } from "../schema";
import { arweaveMainNode } from "../../../helpers/arweave/config/arweaveInstance";
import { createForkRepo } from "./services";

export async function* forkRepo(
  data: {
    title: string;
    description: string;
    repoId: string;
  },
  wallet: JWKInterface
): AsyncGenerator<{ step: string; data?: any }> {
  try {
    yield { step: "Validating inputs..." };
    forkRepoSchema.parse(data);

    yield { step: "Fetching repo data..." };
    const address = await arweaveMainNode.wallets.getAddress(wallet);
    const repo = await getRepo(data.repoId);

    yield { step: "Spawning token process..." };
    const tokenProcessId = await spawnTokenProcess(data.title, wallet);

    const payload = {
      name: data.title,
      description: data.description,
      parent: data.repoId,
      dataTxId: repo.dataTxId,
      tokenProcessId,
    };

    const alreadyForked = repo && repo.forks[address];

    if (alreadyForked) {
      throw new Error("You have already forked this repository");
    }
    yield { step: "Finding repo title availability" };
    const isAvailable = await getRepoAvailability(data.title, address);
    if (!isAvailable) {
      throw new Error("Repository name already exists...");
    }

    yield { step: "Creating Fork of the repo..." };
    const response = await createForkRepo(payload, wallet);
    if (!response) {
      throw new Error("Failed to create fork repo");
    }
    yield {
      step: "Forked Repository Successfully",
      data: response,
    };
  } catch (error: any) {
    yield {
      step: "Error",
      data: error.message || error,
    };
  }
}
