import { dryrun } from "@permaweb/aoconnect";
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from "../../../helpers/arweave/getTags";
import { User } from "../../../types";
import { sendMessage } from "../../../helpers/arweave/sendMessage";

export const saveUserDetails = async (
  details: Partial<User>,
  address: string,
  signer: string
): Promise<{ result: User }> => {

  await sendMessage({
    tags: getTags({
      Action: "Update-Profile-Details",
      Payload: JSON.stringify(details || {}),
    }),
    signer: signer,
  });

  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({ Action: "Get-User-Details" }),
    Owner: address,
  });

  const userDetails = JSON.parse(Messages[0]?.Data || "{}")?.result as User;

  if (!userDetails)
    return {
      result: {
        statistics: {
          commits: [],
          pullRequests: [],
          issues: [],
        },
        arNSNames: {},
      },
    };

  return { result: userDetails };
};
