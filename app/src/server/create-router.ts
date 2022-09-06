import * as trpc from '@trpc/server';
import { Context } from './context';

export const createRouter = () => trpc.router<Context>();

export const createProtectedRouter = () =>
	createRouter().middleware(({ ctx, next }) => {
		if (!ctx.session || !ctx.session.userId) {
			throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
		}

		return next({
			ctx: {
				...ctx,
				// NOTE: Infers that `session` is non-nullable:
				session: { userId: ctx.session.userId }
			}
		});
	});
