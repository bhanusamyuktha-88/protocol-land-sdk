export type CommonPackUnpackGitRepoOptions = {
  fs: any;
  dir: string;
};

export type CommonBranchOptions = {
  fs: any;
  dir: string;
};

export type CreateBranchOptions = CommonBranchOptions & {
  name: string;
};
