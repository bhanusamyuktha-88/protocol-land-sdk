import { createNewBranch } from "../../../helpers/gitHelpers";
import { usageType,fs } from "../../../helpers/specificImports";

export async function addNewBranch(id: string, branchName: string) {
  let newFs:any = fs;
  if(usageType == "browser"){
    newFs = new fs(id);

  }
  const dir = `/${id}`;

  return createNewBranch({
    fs: newFs,
    dir,
    name: branchName,
  });
}
