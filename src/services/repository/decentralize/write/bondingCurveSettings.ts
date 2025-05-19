import { dryrun } from "@permaweb/aoconnect";
import { getTags } from "../../../../helpers/arweave/getTags";
import { sendMessage } from "../../../../helpers/arweave/sendMessage";
import { PL_PROCESS_ID } from "../../../../constants/constants";
import { BondingCurve, walletSignerType } from "../../../../types";

export const saveRepoBondingCurve = async (
  id: string,
  bondingCurve: BondingCurve,
  address: string,
  wallet: walletSignerType
) => {
  await sendMessage({
    tags: getTags({
      Action: "Save-Bonding-Curve-Settings",
      Id: id,
    }),
    data: JSON.stringify(bondingCurve),
    signer: wallet,
  });

  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({ Action: "Get-Repo-Bonding-Curve-Details", Id: id }),
    Owner: address,
  });

  const repoBondingCurveDetails = JSON.parse(Messages[0].Data)
    ?.result as BondingCurve;

  return repoBondingCurveDetails;
};
