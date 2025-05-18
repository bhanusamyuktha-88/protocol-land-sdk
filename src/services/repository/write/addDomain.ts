import { getTags } from "../../../helpers/arweave/getTags";
import { sendMessage } from "../../../helpers/arweave/sendMessage";
import { Domain, walletSignerType } from "../../../types";
import { getRepo } from "../read";

export async function addDomain(
  domain: Omit<Domain, "timestamp">,
  repoId: string,
  wallet: walletSignerType
) {
  await sendMessage({
    tags: getTags({
      Action: "Add-Domain",
      Id: repoId,
      Domain: JSON.stringify(domain),
    }),
    signer: wallet,
  });

  const repo = await getRepo(repoId);

  return repo.domains;
}
