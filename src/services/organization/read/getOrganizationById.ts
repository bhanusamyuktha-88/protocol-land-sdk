import { PL_PROCESS_ID } from "../../../constants/constants"
import { dryrun } from '@permaweb/aoconnect';
import { getTags } from "../../../helpers/arweave/getTags";
import { Organization } from "../../../types";

export const getOrganizationById = async (id: string): Promise<Organization> => {
    const { Messages } = await dryrun({
      process: PL_PROCESS_ID,
      tags: getTags({ Action: 'Get-Organization-By-Id', Id: id })
    })
  
    const organization = JSON.parse(Messages[0].Data).result

    return organization
  }