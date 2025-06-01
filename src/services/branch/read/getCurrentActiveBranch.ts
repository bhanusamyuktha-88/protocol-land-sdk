import { getCurrentBranch } from "../../../helpers/gitHelpers";
import { usageType, fs } from "../../../helpers/specificImports";

export async function getCurrentActiveBranch(id: string) {
  let newFs: any = fs;
  if (usageType == "browser") {
    newFs = new fs(id);
  }
  const dir = `/${id}`;

  return getCurrentBranch({ fs:newFs, dir });
}
