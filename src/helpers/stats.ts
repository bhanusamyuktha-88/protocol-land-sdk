import { Issue, JWKInterface, PullRequest, Tag } from "../types";
import { signAndSendTx } from "./arweave/signAndSend";

export async function postIssueStatDataTxToArweave(
  address: string,
  name: string,
  id: string,
  issue: Issue,
  wallet: JWKInterface
) {
  const inputTags = [
    { name: "App-Name", value: "Protocol.Land" },
    { name: "User", value: address },
    { name: "Type", value: "stats-issue" },
    { name: "Repo", value: name },
    { name: "Repo-Id", value: id },
    { name: "Timestamp", value: issue.timestamp.toString() },
    { name: "Author", value: issue.author.toString() },
  ] as Tag[];

  const dataTxResponse = await signAndSendTx("stats-issue", inputTags, wallet);

  if (!dataTxResponse) {
    return false;
  }

  return true;
}

export async function postPRStatDataTxToArweave(
  address: string,
  name: string,
  id: string,
  PR: PullRequest,
  wallet: JWKInterface
) {
  const inputTags = [
    { name: "App-Name", value: "Protocol.Land" },
    { name: "User", value: address },
    { name: "Type", value: "stats-pullrequest" },
    { name: "Repo", value: name },
    { name: "Repo-Id", value: id },
    { name: "Timestamp", value: PR.timestamp.toString() },
    { name: "Author", value: PR.author.toString() },
  ] as Tag[];

  const dataTxResponse = await signAndSendTx(
    "stats-pullrequest",
    inputTags,
    wallet
  );

  if (!dataTxResponse) {
    return false;
  }

  return true;
}
