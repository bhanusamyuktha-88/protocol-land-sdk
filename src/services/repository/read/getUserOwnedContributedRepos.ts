import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { withAsync } from "../../../helpers/withAsync";
import { Repo, RepoWithParent } from "../../../types";

export const getUserOwnedContributedRepos = async (address: string) => {
  let repos: RepoWithParent[] = [];

  const { response: ownerReposResponse } = await withAsync(() =>
    dryrun({
      process: PL_PROCESS_ID,
      tags: getTags({
        Action: "Get-User-Owned-Contributed-Repos",
        "User-Address": address as string,
      }),
    })
  );

  if (ownerReposResponse) {
    repos = [
      ...repos,
      ...(JSON.parse(ownerReposResponse?.Messages[0].Data)?.result as Repo[]),
    ];
  }

  return repos;
};
