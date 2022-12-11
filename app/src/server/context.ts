import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export async function createContext({
	req,
	res,
}: trpcNext.CreateNextContextOptions) {
	const session = await unstable_getServerSession(req, res, authOptions);

	return { res, session };
}
