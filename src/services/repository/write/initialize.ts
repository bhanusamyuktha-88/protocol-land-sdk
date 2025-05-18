// TODO: complete initialize repo function

import { v4 as uuid } from "uuid";
import { RepoInitializeOptions, walletSignerType } from "../../../types";
import { createRepoSchema } from "../schema";
import { getRepoAvailability } from "../read";
import {
  createNewRepo,
  postNewRepo,
  spawnTokenProcess,
} from "../../../helpers/repoHelpers";
import { fs, usageType } from "../../../helpers/specificImports";
import { getUserDetails } from "../../user";

export async function* initialize(
  data: RepoInitializeOptions,
  wallet: walletSignerType
): AsyncGenerator<{
  step: string;
  data?: any;
}> {
  try {
    yield { step: "Validating Input Details..." };
    const id = uuid();

    createRepoSchema.parse(data);

    yield { step: " Checking Repository Name Availability..." };
    const isAvailable = await getRepoAvailability(
      data.title,
      data.address,
      data.orgId
    );
    if (!isAvailable) {
      throw new Error("Repository name already exists...");
    }
    yield { step: "Creating Repository...", data: isAvailable };
    const response = await getUserDetails(data.address);
    const ownerDetails = {
      name: response.result.fullname || response.result.username || "",
      email: response.result.email || "",
    };
    let newFs = fs;
    if (usageType === "browser") {
      newFs = new fs(id);
    }
    const createdRepo = await createNewRepo(
      data.title,
      newFs,
      ownerDetails,
      id
    );

    yield { step: "Spawning...." };

    const tokenProcessId = await spawnTokenProcess(data.title, wallet);
    yield {
      step: "Token Process Spawned Successfully",
    };

    if (createdRepo && createdRepo.commit && createdRepo.repoBlob) {
      const { repoBlob } = createdRepo;
      yield { step: "Creating Repository Blob...", data: repoBlob };
      const result = await postNewRepo({
        id,
        title: data.title,
        description: data.description,
        file: repoBlob,
        owner: data.address,
        visibility: data.visibility,
        tokenProcessId,
        creator: data.creator,
        orgId: data.orgId,
        wallet: wallet,
      });

      if (result.txResponse) {
        yield {
          step: "Repository Created Successfully",
          data: id,
        };
      } else {
        throw new Error("Failed to create repository");
      }
    }
  } catch (error: any) {
    yield {
      step: "Error",
      data: error.message || error,
    };
  }
}
