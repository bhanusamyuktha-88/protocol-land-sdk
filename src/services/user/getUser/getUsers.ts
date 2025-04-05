import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { User } from "../../../types";

export const getUsers = async () => {
  const userMap = new Map<string, User>();

  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({ Action: "Get-Users" }),
  });
  const users = JSON.parse(Messages[0].Data||"{}")?.result;
  Object.entries(users).forEach(([address, user]) => {
    userMap.set(address, user as User);
  });
  return userMap;
};
