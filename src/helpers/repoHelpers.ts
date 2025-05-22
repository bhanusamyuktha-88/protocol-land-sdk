import git from "isomorphic-git";
import { checkoutBranch, getCurrentBranch, packGitRepo } from "./gitHelpers";
import { waitFor } from "./waitFor";
import { PostUpdatedRepoOptions, Tag, walletSignerType } from "../types";
import { createDataItemSigner, spawn } from "@permaweb/aoconnect";
import { toArrayBuffer } from "./toArrayBuffer";
import { signAndSendTx } from "./arweave/signAndSend";
import { sendMessage } from "./arweave/sendMessage";
import { getTags } from "./arweave/getTags";
import { isBrowser } from "./usageFinder";
import { JWKInterface } from "arbundles";

export async function createNewRepo(
  title: string,
  fs: any,
  owner: { email: string; name: string },
  id: string
) {
  const dir = `/${id}`;
  const filePath = `${dir}/README.md`;

  try {
    await git.init({ fs, dir });

    await fs.promises.writeFile(filePath, `# ${title}`);

    await git.add({ fs, dir, filepath: "README.md" });

    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: owner.name,
        email: owner.email,
      },
      message: "Add README.md",
    });

    await waitFor(1000);

    const repoBlob = await packGitRepo({ fs, dir });
    repoBlob.arrayBuffer();
    return { repoBlob, commit: sha };
  } catch (error) {
    console.error("failed to create repo");
  }
}

export async function spawnTokenProcess(
  tokenName: string,
  signer: walletSignerType,
  processType?: string
) {
  const aosDetails = await getAosDetails();
  let wallet: any = signer;
  if (isBrowser()) {
    wallet = window?.arweaveWallet;
  }
  const tags = [
    { name: "App-Name", value: "aos" },
    { name: "Name", value: tokenName || "Protocol.Land Repo Token" },
    { name: "Process-Type", value: processType || "token" },
    { name: "aos-Version", value: aosDetails.version },
    { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" },
  ] as Tag[];

  const pid = await spawn({
    module: aosDetails.module,
    tags,
    scheduler: aosDetails.scheduler,
    data: "1984",
    signer: createDataItemSigner(wallet),
  });

  await waitFor(2000);

  return pid;
}

export async function postNewRepo({
  id,
  title,
  description,
  file,
  owner,
  visibility,
  tokenProcessId,
  creator,
  orgId,
  wallet,
}: any) {
  const data = isBrowser()
    ? ((await toArrayBuffer(file)) as ArrayBuffer)
    : ((await file.arrayBuffer()) as ArrayBuffer);

  const inputTags = [
    { name: "App-Name", value: "Protocol.Land" },
    { name: "Content-Type", value: file.type },
    { name: "Creator", value: owner },
    { name: "Title", value: title },
    { name: "Description", value: description },
    { name: "Repo-Id", value: id },
    { name: "Type", value: "repo-create" },
    { name: "Visibility", value: visibility },
    { name: "Scope", value: creator },
  ] as Tag[];

  await waitFor(500);

  const dataTxResponse = await signAndSendTx(data, inputTags, wallet);

  if (!dataTxResponse) {
    throw new Error("Failed to post Git repository");
  }

  const tags: Record<string, string> = {
    Action: "Initialize-Repo",
    Id: id,
    Name: title,
    Description: description,
    "Data-TxId": dataTxResponse,
    Visibility: "public",
    "Private-State-TxId": "",
    "Token-Process-Id": tokenProcessId,
    Creator: creator,
  };

  if (orgId) {
    tags["OrgId"] = orgId;
  }

  const msgId = await sendMessage({
    tags: getTags(tags),
    signer: wallet,
  });

  return { txResponse: dataTxResponse };
}

async function getAosDetails() {
  const defaultDetails = {
    version: "1.10.22",
    module: "SBNb1qPQ1TDwpD_mboxm2YllmMLXpWw4U8P9Ff8W9vk",
    scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
  };

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/permaweb/aos/main/package.json"
    );
    const pkg = (await response.json()) as {
      version: string;
      aos: { module: string };
    };
    const details = {
      version: pkg?.version || defaultDetails.version,
      module: pkg?.aos?.module || defaultDetails.module,
      scheduler: defaultDetails.scheduler,
    };
    return details;
  } catch {
    return defaultDetails;
  }
}

export async function postUpdatedRepo(
  { fs, dir, owner, id }: PostUpdatedRepoOptions,
  signer: JWKInterface
) {
  const { error: initialError, result: initialBranch } = await getCurrentBranch(
    { fs, dir }
  );

  if (initialError || (initialBranch && initialBranch !== "master")) {
    await checkoutBranch({ fs, dir, name: "master" });
  }

  await waitFor(500);

  const repoBlob = await packGitRepo({ fs, dir });

  const { result: currentBranch } = await getCurrentBranch({ fs, dir });

  // Checkout back to the initial branch if a different branch was checked out
  if (
    !initialError &&
    initialBranch &&
    currentBranch &&
    currentBranch !== initialBranch
  ) {
    await checkoutBranch({ fs, dir, name: initialBranch });
  }

  const data = (await toArrayBuffer(repoBlob)) as ArrayBuffer;

  await waitFor(500);

  const inputTags = [
    { name: "App-Name", value: "Protocol.Land" },
    { name: "Content-Type", value: repoBlob.type },
    { name: "Creator", value: owner },
    { name: "Repo-Id", value: id },
    { name: "Type", value: "repo-update" },
  ] as Tag[];

  const dataTxResponse = await signAndSendTx(data, inputTags, signer);

  if (!dataTxResponse) {
    throw new Error("Failed to post Git repository");
  }

  await sendMessage({
    tags: getTags({
      Action: "Update-Repo-TxId",
      Id: id,
      "Data-TxId": dataTxResponse,
    }) as Tag[],
    signer,
  });

  return dataTxResponse;
}
