import JSZip from "jszip";
import {
  CommonBranchOptions,
  CommonPackUnpackGitRepoOptions,
  JWKInterface,
  PrivateState,
  Tag,
} from "../types";
import { waitFor } from "./waitFor";
import { signAndSendTx } from "./arweave/signAndSend";
import { withAsync } from "./withAsync";
import git from "isomorphic-git";

export async function packGitRepo({ fs, dir }: CommonPackUnpackGitRepoOptions) {
  const zip = new JSZip();

  await addFilesToZip(zip, dir, fs);

  await waitFor(500);

  const blob = await zip.generateAsync({ type: "blob" });

  return blob;
}

async function addFilesToZip(zip: JSZip, path: string, fs: any) {
  const dirItems = await fs.promises.readdir(path);

  dirItems.forEach(async (item: any) => {
    const fullPath = path + "/" + item;
    const stats = await fs.promises.stat(fullPath);

    if (stats.isDirectory()) {
      await addFilesToZip(zip, fullPath, fs);
    } else {
      const fileContent = await fs.promises.readFile(fullPath);

      zip.file(
        fullPath.substring(fullPath.startsWith("//") ? 2 : 1),
        fileContent,
        {
          binary: true,
          compression: "DEFLATE",
        }
      ); // Remove leading slash
    }
  });
}

export async function addActivePubKeyToPrivateState(
  id: string,
  currentPrivateStateTxId: string,
  wallet: JWKInterface,
  type: string = "REPO"
) {
  const activePubKey = wallet.n;

  const response = await fetch(
    `https://arweave.net/${currentPrivateStateTxId}`
  );
  const currentPrivateState =
    (await response.json()) as unknown as PrivateState;

  const privateState = {
    ...currentPrivateState,
    pubKeys: [...currentPrivateState.pubKeys, activePubKey],
  };

  const privateInputTags = [
    { name: "App-Name", value: "Protocol.Land" },
    { name: "Content-Type", value: "application/json" },
    {
      name: "Type",
      value: type === "REPO" ? "private-state" : "private-github-sync-state",
    },
    { name: "ID", value: id },
  ] as Tag[];

  const privateStateTxResponse = await signAndSendTx(
    JSON.stringify(privateState),
    privateInputTags,
    wallet
  );

  if (!privateStateTxResponse) {
    throw new Error("Failed to post updated Private State");
  }

  return privateStateTxResponse;
}

export async function getCurrentBranch({ fs, dir }: CommonBranchOptions) {
  const { error, response } = await withAsync(() =>
    git.currentBranch({
      fs,
      dir,
      fullname: false,
    })
  );

  return {
    error,
    result: response,
  };
}

export async function checkoutBranch({
  fs,
  dir,
  name,
}: CommonBranchOptions & { name: string }) {
  return await withAsync(() =>
    git.checkout({
      fs,
      dir,
      ref: name,
      force: true,
      track: false,
    })
  );
}
