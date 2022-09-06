import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export type Context = inferAsyncReturnType<typeof createContext>;

export function createContext({ res }: CreateNextContextOptions) {
	return { res };
}
