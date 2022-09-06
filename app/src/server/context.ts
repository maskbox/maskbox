import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { SESSION_COOKIE_NAME } from '../constants';
import { prisma } from '../utils/prisma';

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export async function createContext({
	req,
	res
}: trpcNext.CreateNextContextOptions) {
	let session = null;

	if (req.cookies[SESSION_COOKIE_NAME]) {
		session = await prisma.session.findUnique({
			where: {
				token: req.cookies[SESSION_COOKIE_NAME]
			},
			select: {
				userId: true
			}
		});
	}

	return { res, session };
}
