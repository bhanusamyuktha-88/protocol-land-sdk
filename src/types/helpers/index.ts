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

export type WithAsyncFn<T = unknown> = () => T | Promise<T>
export type WithAsyncReturn<TData, TError> = Promise<{
  response: TData | null
  error: TError | unknown
}>