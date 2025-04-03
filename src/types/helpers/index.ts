export type SendMessageArgs = {
  data?: string;
  tags: {
    name: string;
    value: string;
  }[];
  pid?: string;
  anchor?: string;
  signer: string;
};

export type Tag = {
  name: string;
  value: string;
};
