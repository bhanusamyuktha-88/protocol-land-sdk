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
  linkedIssueId?: number;
};

export type PRSide = {
  repoName: string;
  repoId: string;
};
