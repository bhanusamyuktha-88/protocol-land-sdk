export type ApprovePROptions = {
  repoId: string;
  prId: number;
};

export type AddReviewersToPROptions = {
  reviewers: string[];
  repoId: string;
  prId: number;
};

export type createPROptions = {
  baseRepo: PRSide;
  compareRepo: PRSide;
  title: string;
  description: string;
  baseBranch: string;
  compareBranch: string;
  repoId: string;
  address: string;
  linkedIssueId?: number;
};

export type MergePullRequestOptions = {
  fs: any;
  dir: string;
  base: string;
  compare: string;
  author: string;
  dryRun?: boolean;
  repoId: string;
  prId: number;
  fork: boolean;
  isPrivate: boolean;
  privateStateTxId?: string;
};

export type PRSide = {
  repoName: string;
  repoId: string;
};
