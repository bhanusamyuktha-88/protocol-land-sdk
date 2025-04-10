import { dryrun } from '@permaweb/aoconnect';
import { PL_PROCESS_ID } from "../../../constants/constants";
import { getTags } from '../../../helpers/arweave/getTags';

export const getOrganizationNameAvailability = async (
  name: string,
  address: string
): Promise<boolean> => {
  const { Messages } = await dryrun({
    process: PL_PROCESS_ID,
    tags: getTags({
      Action: 'Get-Organization-Name-Availability',
      Name: name
    }),
    Owner: address
  })

  return JSON.parse(Messages[0].Data).result
}
