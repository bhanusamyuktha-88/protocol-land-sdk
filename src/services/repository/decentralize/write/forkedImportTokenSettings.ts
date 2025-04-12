import { result } from "@permaweb/aoconnect"
import { getTags } from "../../../../helpers/arweave/getTags"
import { sendMessage } from "../../../../helpers/arweave/sendMessage"
import { PL_PROCESS_ID } from "../../../../constants/constants"
import { RepoToken, Tag } from "../../../../types"

export const saveForkedImportTokenSettings = async (id: string, repoToken: RepoToken,wallet:string): Promise<RepoToken> => {
    const msgId = await sendMessage({
      tags: getTags({
        Action: 'Save-Forked-Import-Token-Settings',
        Id: id
      }),
      data: JSON.stringify(repoToken),
      signer: wallet
    })
  
    const { Messages } = await result({
      message: msgId,
      process: PL_PROCESS_ID
    })
  
    if (!Messages[0]) {
      throw new Error('Failed to save token settings')
    }
  
    const actionValue = Messages[0].Tags.find(
      (tag: Tag) => tag.name === 'Action' && tag.value === 'Forked-Repo-Token-Updated'
    )
  
    if (!actionValue) {
      throw new Error('Failed to save forked import token details')
    }
  
    return repoToken
  }