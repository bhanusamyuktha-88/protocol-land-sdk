import { getAllBranches } from "../../../helpers/gitHelpers";
import { usageType, fs } from "../../../helpers/specificImports";

export async function getBranchList(id: string) {
  let newFs: any = fs;
  if (usageType == "browser") {
    newFs = new fs(id);
  }
  const dir = `/${id}`;

  return getAllBranches({ fs:newFs, dir });
}
