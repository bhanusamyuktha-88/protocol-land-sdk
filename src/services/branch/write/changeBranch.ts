import { checkoutBranch } from "../../../helpers/gitHelpers";
import { usageType, fs } from "../../../helpers/specificImports";

export async function changeBranch(id: string, branchName: string) {
  let newFs: any = fs;
  if (usageType == "browser") {
    newFs = new fs(id);
  }
  const dir = `/${id}`;

  return checkoutBranch({ fs: newFs, dir, name: branchName });
}
