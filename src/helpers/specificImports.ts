import { isBrowser, isNode } from "./usageFinder";
import LightningFS from "@isomorphic-git/lightning-fs";
import * as nodeFs from "node:fs";

let fs: any, usageType: "node" | "browser";

if (isNode()) {
  fs = nodeFs;
  usageType = "node";
} else if (isBrowser()) {
  fs = LightningFS;
  usageType = "browser";
} else {
  throw new Error("Unsupported JS runtime");
}

export { fs, usageType };
