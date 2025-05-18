export type SendMessageArgs = {
  data?: string;
  tags: {
    name: string;
    value: string;
  }[];
  pid?: string;
  anchor?: string;
  signer: walletSignerType;
};

export type Tag = {
  name: string;
  value: string;
};

export type WithAsyncFn<T = unknown> = () => T | Promise<T>;
export type WithAsyncReturn<TData, TError> = Promise<{
  response: TData | null;
  error: TError | unknown;
}>;

export interface JWKPublicInterface {
  kty: string;
  e: string;
  n: string;
}
export interface JWKInterface extends JWKPublicInterface {
  d?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
}

export type walletSignerType = JWKInterface | "use_wallet";
