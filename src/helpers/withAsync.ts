import { WithAsyncFn, WithAsyncReturn } from "../types"

export async function withAsync<TData = unknown, TError = unknown>(
  fn: WithAsyncFn<TData>
): WithAsyncReturn<TData, TError> {
  try {
    if (typeof fn !== 'function') throw new Error('The first argument must be a function')
    const response = await fn()
    return {
      response,
      error: null
    }
  } catch (error) {
    return {
      error,
      response: null
    }
  }
}
