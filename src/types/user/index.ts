export type User = {
  fullname?: string;
  username?: string;
  isUserNameArNS?: boolean;
  avatar?: string;
  bio?: string;
  location?: string;
  twitter?: string;
  email?: string;
  website?: string;
  readmeTxId?: string;
  statistics: {
    commits: UserCommit[];
    pullRequests: UserPROrIssue[];
    issues: UserPROrIssue[];
  };
  arNSNames: ArNSNames;
};

export type ArNSNames = Record<string, ArNSName>;

export type ArNSName = {
  contractTxId: string;
  endTimestamp: number;
  purchasePrice: number;
  startTimestamp: number;
  type: string;
  undernames: number;
};

export type UserCommit = {
  email: string;
  timestamp: number;
  timezoneOffset: number;
};

export type UserPROrIssue = {
  author: string;
  timestamp: number;
};
